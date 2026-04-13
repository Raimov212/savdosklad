package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// This script extracts ONLY the COPY data blocks from Savdo_converted.sql
// and wraps them with FK constraint management for safe loading.

func main() {
	inputFile := `Savdo_converted.sql`
	outputFile := `Savdo_data_only.sql`

	f, err := os.Open(inputFile)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error opening input file: %v\n", err)
		os.Exit(1)
	}
	defer f.Close()

	out, err := os.Create(outputFile)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating output file: %v\n", err)
		os.Exit(1)
	}
	defer out.Close()

	writer := bufio.NewWriter(out)
	defer writer.Flush()

	// Header
	writer.WriteString("-- Data-only import from Savdo_converted.sql\n")
	writer.WriteString("-- This file contains only COPY data blocks for loading into existing tables\n\n")
	writer.WriteString("SET statement_timeout = 0;\n")
	writer.WriteString("SET lock_timeout = 0;\n")
	writer.WriteString("SET client_encoding = 'UTF8';\n")
	writer.WriteString("SET standard_conforming_strings = on;\n")
	writer.WriteString("SELECT pg_catalog.set_config('search_path', '', false);\n")
	writer.WriteString("SET check_function_bodies = false;\n")
	writer.WriteString("SET row_security = off;\n\n")

	// Disable FK constraints temporarily
	writer.WriteString("-- Temporarily disable triggers (FK constraints) for bulk loading\n")
	writer.WriteString("SET session_replication_role = 'replica';\n\n")

	scanner := bufio.NewScanner(f)
	buf := make([]byte, 0, 1024*1024)
	scanner.Buffer(buf, 10*1024*1024)

	inCopyBlock := false
	copyCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		stripped := strings.TrimSpace(line)

		// Start of a COPY block
		if strings.HasPrefix(stripped, "COPY public.") {
			inCopyBlock = true
			copyCount++
			writer.WriteString(line + "\n")
			continue
		}

		// Inside a COPY block
		if inCopyBlock {
			writer.WriteString(line + "\n")
			if stripped == `\.` {
				inCopyBlock = false
				writer.WriteString("\n")
			}
			continue
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
		os.Exit(1)
	}

	// Re-enable FK constraints
	writer.WriteString("\n-- Re-enable triggers (FK constraints)\n")
	writer.WriteString("SET session_replication_role = 'origin';\n\n")

	// Reset sequences to max(id) + 1 for each table
	tables := []string{
		"users", "businesses", "categories", "products", "clients",
		"total_transactions", "transactions", "total_refunds", "refunds",
		"total_expenses", "expenses", "fixed_costs", "fixed_facted_costs",
		"money", "calculations", "product_changes", "verifications",
	}

	writer.WriteString("-- Reset sequences to correct values\n")
	for _, table := range tables {
		writer.WriteString(fmt.Sprintf("SELECT setval('%s_id_seq', COALESCE((SELECT MAX(id) FROM %s), 1));\n", table, table))
	}
	writer.WriteString("\n")

	fmt.Println("Data-only extraction complete!")
	fmt.Printf("  Input:  %s\n", inputFile)
	fmt.Printf("  Output: %s\n", outputFile)
	fmt.Printf("  Data COPY blocks: %d\n", copyCount)
}

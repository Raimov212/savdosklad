package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// Table name mapping: "PascalCase" -> snake_case
var tableMap = map[string]string{
	`"Businesses"`:       "businesses",
	`"Calculations"`:     "calculations",
	`"Categories"`:       "categories",
	`"Clients"`:          "clients",
	`"Expenses"`:         "expenses",
	`"FixedCosts"`:       "fixed_costs",
	`"FixedFactedCosts"`: "fixed_facted_costs",
	`"Money"`:            "money",
	`"ProductChanges"`:   "product_changes",
	`"Products"`:         "products",
	`"Refunds"`:          "refunds",
	`"TotalExpenses"`:    "total_expenses",
	`"TotalRefunds"`:     "total_refunds",
	`"TotalTransactions"`: "total_transactions",
	`"Transactions"`:     "transactions",
	`"Users"`:            "users",
	`"Verifications"`:    "verifications",
}

// Sequence name mapping
var seqMap = map[string]string{
	`"Businesses_Id_seq"`:       "businesses_id_seq",
	`"Calculations_Id_seq"`:     "calculations_id_seq",
	`"Categories_Id_seq"`:       "categories_id_seq",
	`"Clients_Id_seq"`:          "clients_id_seq",
	`"Expenses_Id_seq"`:         "expenses_id_seq",
	`"FixedCosts_Id_seq"`:       "fixed_costs_id_seq",
	`"FixedFactedCosts_Id_seq"`: "fixed_facted_costs_id_seq",
	`"Money_Id_seq"`:            "money_id_seq",
	`"ProductChanges_Id_seq"`:   "product_changes_id_seq",
	`"Products_Id_seq"`:         "products_id_seq",
	`"Refunds_Id_seq"`:          "refunds_id_seq",
	`"TotalExpenses_Id_seq"`:    "total_expenses_id_seq",
	`"TotalRefunds_Id_seq"`:     "total_refunds_id_seq",
	`"TotalTransactions_Id_seq"`: "total_transactions_id_seq",
	`"Transactions_Id_seq"`:     "transactions_id_seq",
	`"Users_Id_seq"`:            "users_id_seq",
	`"Verifications_Id_seq"`:    "verifications_id_seq",
}

// Column name mapping: "PascalCase" -> camelCase or lowercase
var columnMap = map[string]string{
	// Common
	`"Id"`:          "id",
	`"Name"`:        "name",
	`"Description"`: "description",
	`"CreatedAt"`:   `"createdAt"`,
	`"UpdatedAt"`:   `"updatedAt"`,

	// Users
	`"Firstname"`:      `"firstName"`,
	`"Lastname"`:       `"lastName"`,
	`"PhoneNumber"`:    `"phoneNumber"`,
	`"Username"`:       `"userName"`,
	`"Password"`:       "password",
	`"Role"`:           "role",
	`"InviterCode"`:    `"inviterCode"`,
	`"OfferCode"`:      `"offerCode"`,
	`"IsVerified"`:     `"isVerified"`,
	`"IsExpired"`:      `"isExpired"`,
	`"TelegramUserId"`: `"telegramUserId"`,
	`"ExpirationDate"`: `"expirationDate"`,

	// Business
	`"BusinessAccountNumber"`: `"businessAccountNumber"`,
	`"Balance"`:               "balance",
	`"UserId"`:                `"userId"`,

	// FK / Reference columns
	`"BusinessId"`:         `"businessId"`,
	`"CategoryId"`:         `"categoryId"`,
	`"ProductId"`:          `"productId"`,
	`"TotalTransactionId"`: `"totalTransactionId"`,
	`"TotalRefundId"`:      `"totalRefundId"`,
	`"TotalExpenseId"`:     `"totalExpenseId"`,
	`"TransactionId"`:      `"transactionId"`,
	`"ClientId"`:           `"clientId"`,
	`"FixedCostId"`:        `"fixedCostId"`,
	`"VerifierUserId"`:     `"verifierUserId"`,

	// Product
	`"ShortDescription"`: `"shortDescription"`,
	`"FullDescription"`:  `"fullDescription"`,
	`"Price"`:            "price",
	`"Discount"`:         "discount",
	`"Quantity"`:          "quantity",
	`"Images"`:           "images",
	`"Barcode"`:          "barcode",
	`"Country"`:          "country",
	`"isDeleted"`:        `"isDeleted"`,
	`"IsDeleted"`:        `"isDeleted"`,

	// Client
	`"Fullname"`: `"fullName"`,
	`"Phone"`:    "phone",
	`"Address"`:  "address",

	// Transaction/Refund/Expense
	`"Total"`:           "total",
	`"Cash"`:            "cash",
	`"Card"`:            "card",
	`"Click"`:           "click",
	`"Debt"`:            "debt",
	`"ClientNumber"`:    `"clientNumber"`,
	`"DebtLimitDate"`:   `"debtLimitDate"`,
	`"ProductPrice"`:    `"productPrice"`,
	`"ProductQuantity"`: `"productQuantity"`,

	// Money
	`"Value"`:      "value",
	`"AmountType"`: `"amountType"`,

	// FixedCosts
	`"Amount"`: "amount",
	`"Type"`:   "type",

	// FixedFactedCosts
	`"Date"`: "date",

	// Calculation
	`"TotalIncome"`:    `"totalIncome"`,
	`"IncomeTax"`:      `"incomeTax"`,
	`"TotalExpense"`:   `"totalExpense"`,
	`"TotalFixedCosts"`: `"totalFixedCosts"`,
	`"Salary"`:         "salary",
	`"SalaryTax"`:      `"salaryTax"`,
	`"Profit"`:         "profit",
	`"Month"`:          "month",
	`"Year"`:           "year",
	`"TotalSale"`:      `"totalSale"`,
	`"AddedMoney"`:     `"addedMoney"`,

	// ProductChanges
	`"OldPrice"`:    `"oldPrice"`,
	`"NewPrice"`:    `"newPrice"`,
	`"OldDiscount"`: `"oldDiscount"`,
	`"NewDiscount"`: `"newDiscount"`,
	`"OldQuantity"`: `"oldQuantity"`,
	`"NewQuantity"`: `"newQuantity"`,

	// Expense
	`"ExpenseDate"`: `"expenseDate"`,

	// EFMigrationsHistory
	`"MigrationId"`:    `"MigrationId"`,
	`"ProductVersion"`: `"ProductVersion"`,
}

func convertTableRefs(line string) string {
	for old, newName := range tableMap {
		line = strings.ReplaceAll(line, "public."+old, "public."+newName)
		line = strings.ReplaceAll(line, old, newName)
	}
	for old, newName := range seqMap {
		line = strings.ReplaceAll(line, "public."+old, "public."+newName)
		line = strings.ReplaceAll(line, old, newName)
	}
	return line
}

func convertColumns(line string) string {
	for old, newName := range columnMap {
		line = strings.ReplaceAll(line, old, newName)
	}
	return line
}

func main() {
	inputFile := `Savdo.sql`
	outputFile := `Savdo_converted.sql`

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

	// Write header
	writer.WriteString("-- Converted from Savdo.sql (PascalCase) to project format (snake_case tables, camelCase columns)\n")
	writer.WriteString("-- Generated automatically by convert_savdo.go\n\n")
	writer.WriteString("SET statement_timeout = 0;\n")
	writer.WriteString("SET lock_timeout = 0;\n")
	writer.WriteString("SET client_encoding = 'UTF8';\n")
	writer.WriteString("SET standard_conforming_strings = on;\n")
	writer.WriteString("SELECT pg_catalog.set_config('search_path', '', false);\n")
	writer.WriteString("SET check_function_bodies = false;\n")
	writer.WriteString("SET row_security = off;\n\n")

	scanner := bufio.NewScanner(f)
	// Increase scanner buffer for large lines
	buf := make([]byte, 0, 1024*1024)
	scanner.Buffer(buf, 10*1024*1024)

	skipMode := false        // skipping CREATE TABLE block
	inCopyBlock := false     // inside COPY data block
	skipCopyBlock := false   // skip this particular COPY block
	skipIdentity := false    // skipping ALTER TABLE ... ADD GENERATED block

	copyCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		stripped := strings.TrimSpace(line)

		// Handle COPY blocks (data sections)
		if strings.HasPrefix(stripped, "COPY public.") {
			if strings.Contains(stripped, "__EFMigrationsHistory") {
				skipCopyBlock = true
				inCopyBlock = true
				continue
			}

			converted := convertTableRefs(line)
			converted = convertColumns(converted)
			writer.WriteString(converted + "\n")
			inCopyBlock = true
			skipCopyBlock = false
			copyCount++
			continue
		}

		// Inside COPY data block
		if inCopyBlock {
			if stripped == `\.` {
				inCopyBlock = false
				if !skipCopyBlock {
					writer.WriteString(line + "\n")
				}
				skipCopyBlock = false
				continue
			}
			if !skipCopyBlock {
				writer.WriteString(line + "\n")
			}
			continue
		}

		// Skip CREATE TABLE blocks
		if strings.HasPrefix(stripped, "CREATE TABLE") {
			skipMode = true
			continue
		}
		if skipMode {
			if strings.HasPrefix(stripped, ");") {
				skipMode = false
			}
			continue
		}

		// Skip ALTER TABLE ... OWNER TO
		if strings.Contains(stripped, "OWNER TO") {
			continue
		}

		// Skip ALTER TABLE ... ADD GENERATED BY DEFAULT AS IDENTITY
		if strings.HasPrefix(stripped, "ALTER TABLE") && strings.Contains(stripped, "ALTER COLUMN") && strings.Contains(stripped, "ADD GENERATED") {
			skipIdentity = true
			continue
		}
		if skipIdentity {
			if strings.HasPrefix(stripped, ");") {
				skipIdentity = false
			}
			continue
		}

		// Skip __EFMigrationsHistory related
		if strings.Contains(stripped, "__EFMigrationsHistory") || strings.Contains(stripped, "EFMigrations") {
			continue
		}

		// Skip SET statements (already in header)
		if strings.HasPrefix(stripped, "SET ") || strings.HasPrefix(stripped, "SELECT pg_catalog.set_config") {
			continue
		}

		// Handle SELECT setval() for sequences
		if strings.Contains(stripped, "SELECT pg_catalog.setval") {
			converted := convertTableRefs(line)
			writer.WriteString(converted + "\n")
			continue
		}

		// Handle ALTER TABLE for constraints
		if strings.HasPrefix(stripped, "ALTER TABLE") {
			converted := convertTableRefs(line)
			converted = convertColumns(converted)
			writer.WriteString(converted + "\n")
			continue
		}

		// Comments - convert table names in them
		if strings.HasPrefix(stripped, "--") {
			converted := convertTableRefs(line)
			writer.WriteString(converted + "\n")
			continue
		}

		// Empty lines
		if stripped == "" {
			writer.WriteString("\n")
			continue
		}

		// Default: convert everything
		converted := convertTableRefs(line)
		converted = convertColumns(converted)
		writer.WriteString(converted + "\n")
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Conversion complete!")
	fmt.Printf("  Input:  %s\n", inputFile)
	fmt.Printf("  Output: %s\n", outputFile)
	fmt.Printf("  Data COPY blocks: %d\n", copyCount)
}

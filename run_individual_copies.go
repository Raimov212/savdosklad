package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func main() {
	infile, err := os.Open("Savdo_data_only.sql")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer infile.Close()

	scanner := bufio.NewScanner(infile)
	buf := make([]byte, 0, 10*1024*1024)
	scanner.Buffer(buf, 10*1024*1024)

	var currentTable string
	var outLines []string
	inBlock := false

	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "COPY public.") {
			parts := strings.Split(line, " ")
			currentTable = parts[1] // e.g. public.users
			inBlock = true
			outLines = []string{
				"SET session_replication_role = 'replica';",
				line,
			}
			continue
		}

		if inBlock {
			outLines = append(outLines, line)
			if strings.TrimSpace(line) == `\.` {
				inBlock = false
				
				// Write temp sql
				tmpFile := "tmp_import.sql"
				os.WriteFile(tmpFile, []byte(strings.Join(outLines, "\n")+"\n"), 0644)
				
				// Run psql
				fmt.Printf("Loading %s... ", currentTable)
				cmd := exec.Command("psql", "-U", "postgres", "-d", "savdosklad", "-f", tmpFile)
				cmd.Env = append(os.Environ(), "PGPASSWORD=asdf3377")
				out, err := cmd.CombinedOutput()
				if err != nil {
					fmt.Printf("FAILED\nError:\n%s\n", string(out))
				} else {
					fmt.Println("SUCCESS")
				}
			}
		}
	}
}

package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    infile, _ := os.Open("Savdo_data_only.sql")
    defer infile.Close()
    
    outfile, _ := os.Create("products_test.sql")
    defer outfile.Close()
    writer := bufio.NewWriter(outfile)
    
    scanner := bufio.NewScanner(infile)
    buf := make([]byte, 0, 10*1024*1024)
    scanner.Buffer(buf, 10*1024*1024)
    
    inProducts := false
    for scanner.Scan() {
        text := scanner.Text()
        if strings.HasPrefix(text, `COPY public.products `) {
            inProducts = true
        }
        if inProducts {
            writer.WriteString(text + "\n")
            if strings.TrimSpace(text) == `\.` {
                break
            }
        }
    }
    writer.Flush()
    fmt.Println("Created products_test.sql")
}

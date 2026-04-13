package main

import (
	"fmt"
	"log"
	"savdosklad/config"
	"savdosklad/pkg/database"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err := database.NewPostgresDB(cfg.DB)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("--- Checking Products for Business 9 ---")
	rows, err := db.Query("SELECT id, \"updatedAt\" FROM products WHERE \"businessId\" = 9")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var updatedAt interface{}
		if err := rows.Scan(&id, &updatedAt); err != nil {
			fmt.Printf("ID %d: SCAN ERROR: %v\n", id, err)
			continue
		}
		
		fmt.Printf("ID %d: Type %T, Value: %v\n", id, updatedAt, updatedAt)
	}
}

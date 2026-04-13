#!/usr/bin/env python3
"""
Convert Savdo.sql from PascalCase naming (Entity Framework .NET)
to the Go project's naming convention:
  - Table names: snake_case (no quotes for simple names)
  - Column names: camelCase (quoted when multi-word)

This script:
1. Reads Savdo.sql
2. Drops CREATE TABLE, ALTER TABLE ... ADD GENERATED, ALTER TABLE ... OWNER TO, 
   and __EFMigrationsHistory-related statements
3. Converts COPY blocks (data) and SELECT setval() with new names
4. Converts FK constraints with new names
5. Outputs Savdo_converted.sql
"""

import re
import sys

# ============================================================
# TABLE NAME MAPPING: "PascalCase" -> snake_case
# ============================================================
TABLE_MAP = {
    '"Businesses"': 'businesses',
    '"Calculations"': 'calculations',
    '"Categories"': 'categories',
    '"Clients"': 'clients',
    '"Expenses"': 'expenses',
    '"FixedCosts"': 'fixed_costs',
    '"FixedFactedCosts"': 'fixed_facted_costs',
    '"Money"': 'money',
    '"ProductChanges"': 'product_changes',
    '"Products"': 'products',
    '"Refunds"': 'refunds',
    '"TotalExpenses"': 'total_expenses',
    '"TotalRefunds"': 'total_refunds',
    '"TotalTransactions"': 'total_transactions',
    '"Transactions"': 'transactions',
    '"Users"': 'users',
    '"Verifications"': 'verifications',
}

# Sequence name mapping
SEQ_MAP = {
    '"Businesses_Id_seq"': 'businesses_id_seq',
    '"Calculations_Id_seq"': 'calculations_id_seq',
    '"Categories_Id_seq"': 'categories_id_seq',
    '"Clients_Id_seq"': 'clients_id_seq',
    '"Expenses_Id_seq"': 'expenses_id_seq',
    '"FixedCosts_Id_seq"': 'fixed_costs_id_seq',
    '"FixedFactedCosts_Id_seq"': 'fixed_facted_costs_id_seq',
    '"Money_Id_seq"': 'money_id_seq',
    '"ProductChanges_Id_seq"': 'product_changes_id_seq',
    '"Products_Id_seq"': 'products_id_seq',
    '"Refunds_Id_seq"': 'refunds_id_seq',
    '"TotalExpenses_Id_seq"': 'total_expenses_id_seq',
    '"TotalRefunds_Id_seq"': 'total_refunds_id_seq',
    '"TotalTransactions_Id_seq"': 'total_transactions_id_seq',
    '"Transactions_Id_seq"': 'transactions_id_seq',
    '"Users_Id_seq"': 'users_id_seq',
    '"Verifications_Id_seq"': 'verifications_id_seq',
}

# ============================================================
# COLUMN NAME MAPPING: "PascalCase" -> new_name
# Single-word lowercase columns don't need quotes.
# Multi-word camelCase columns need quotes.
# ============================================================
COLUMN_MAP = {
    # Common columns
    '"Id"': 'id',
    '"Name"': 'name',
    '"Description"': 'description',
    '"CreatedAt"': '"createdAt"',
    '"UpdatedAt"': '"updatedAt"',

    # Users columns
    '"Firstname"': '"firstName"',
    '"Lastname"': '"lastName"',
    '"PhoneNumber"': '"phoneNumber"',
    '"Username"': '"userName"',
    '"Password"': 'password',
    '"Role"': 'role',
    '"InviterCode"': '"inviterCode"',
    '"OfferCode"': '"offerCode"',
    '"IsVerified"': '"isVerified"',
    '"IsExpired"': '"isExpired"',
    '"TelegramUserId"': '"telegramUserId"',
    '"ExpirationDate"': '"expirationDate"',

    # Business columns
    '"BusinessAccountNumber"': '"businessAccountNumber"',
    '"Balance"': 'balance',
    '"UserId"': '"userId"',

    # FK / Reference columns
    '"BusinessId"': '"businessId"',
    '"CategoryId"': '"categoryId"',
    '"ProductId"': '"productId"',
    '"TotalTransactionId"': '"totalTransactionId"',
    '"TotalRefundId"': '"totalRefundId"',
    '"TotalExpenseId"': '"totalExpenseId"',
    '"TransactionId"': '"transactionId"',
    '"ClientId"': '"clientId"',
    '"FixedCostId"': '"fixedCostId"',
    '"VerifierUserId"': '"verifierUserId"',

    # Product columns
    '"ShortDescription"': '"shortDescription"',
    '"FullDescription"': '"fullDescription"',
    '"Price"': 'price',
    '"Discount"': 'discount',
    '"Quantity"': 'quantity',
    '"Images"': 'images',
    '"Barcode"': 'barcode',
    '"Country"': 'country',
    '"isDeleted"': '"isDeleted"',
    '"IsDeleted"': '"isDeleted"',

    # Client columns
    '"Fullname"': '"fullName"',
    '"Phone"': 'phone',
    '"Address"': 'address',

    # Transaction/Refund/Expense columns
    '"Total"': 'total',
    '"Cash"': 'cash',
    '"Card"': 'card',
    '"Click"': 'click',
    '"Debt"': 'debt',
    '"ClientNumber"': '"clientNumber"',
    '"DebtLimitDate"': '"debtLimitDate"',
    '"ProductPrice"': '"productPrice"',
    '"ProductQuantity"': '"productQuantity"',

    # Money columns
    '"Value"': 'value',
    '"AmountType"': '"amountType"',

    # FixedCosts columns
    '"Amount"': 'amount',
    '"Type"': 'type',

    # FixedFactedCosts columns
    '"Date"': 'date',

    # Calculation columns
    '"TotalIncome"': '"totalIncome"',
    '"IncomeTax"': '"incomeTax"',
    '"TotalExpense"': '"totalExpense"',
    '"TotalFixedCosts"': '"totalFixedCosts"',
    '"Salary"': 'salary',
    '"SalaryTax"': '"salaryTax"',
    '"Profit"': 'profit',
    '"Month"': 'month',
    '"Year"': 'year',
    '"TotalSale"': '"totalSale"',
    '"AddedMoney"': '"addedMoney"',

    # ProductChanges columns
    '"OldPrice"': '"oldPrice"',
    '"NewPrice"': '"newPrice"',
    '"OldDiscount"': '"oldDiscount"',
    '"NewDiscount"': '"newDiscount"',
    '"OldQuantity"': '"oldQuantity"',
    '"NewQuantity"': '"newQuantity"',

    # Expense columns
    '"ExpenseDate"': '"expenseDate"',

    # EFMigrationsHistory (skip table but map just in case)
    '"MigrationId"': '"MigrationId"',
    '"ProductVersion"': '"ProductVersion"',
}


def convert_columns_in_line(line):
    """Replace all PascalCase column names in a line with their camelCase equivalents."""
    for old, new in COLUMN_MAP.items():
        line = line.replace(old, new)
    return line


def convert_table_refs(line):
    """Replace PascalCase table names (with quotes) in a line."""
    for old, new in TABLE_MAP.items():
        line = line.replace(f'public.{old}', f'public.{new}')
        line = line.replace(old, new)
    for old, new in SEQ_MAP.items():
        line = line.replace(f'public.{old}', f'public.{new}')
        line = line.replace(old, new)
    return line


def should_skip_block(line):
    """Check if a line starts a block we want to skip entirely."""
    # Skip CREATE TABLE statements
    if line.strip().startswith('CREATE TABLE'):
        return True
    # Skip ALTER TABLE ... OWNER TO
    if 'OWNER TO' in line:
        return True
    # Skip ALTER TABLE ... ADD GENERATED (sequence definitions)
    if 'ALTER TABLE' in line and 'ADD GENERATED' in line:
        return True
    # Skip __EFMigrationsHistory related
    if '__EFMigrationsHistory' in line or 'EFMigrations' in line:
        return True
    return False


def process_sql(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    output_lines = []
    i = 0
    skip_mode = False
    in_copy_block = False
    skip_copy_block = False

    # Add header
    output_lines.append('-- Converted from Savdo.sql (PascalCase) to project format (snake_case tables, camelCase columns)\n')
    output_lines.append('-- Generated automatically by convert_savdo.py\n')
    output_lines.append('\n')
    output_lines.append('SET statement_timeout = 0;\n')
    output_lines.append('SET lock_timeout = 0;\n')
    output_lines.append("SET client_encoding = 'UTF8';\n")
    output_lines.append('SET standard_conforming_strings = on;\n')
    output_lines.append("SELECT pg_catalog.set_config('search_path', '', false);\n")
    output_lines.append('SET check_function_bodies = false;\n')
    output_lines.append('SET row_security = off;\n')
    output_lines.append('\n')

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Handle COPY blocks (data sections)
        if stripped.startswith('COPY public.'):
            # Check if this is for __EFMigrationsHistory
            if '__EFMigrationsHistory' in stripped:
                skip_copy_block = True
                in_copy_block = True
                i += 1
                continue

            # Convert the COPY line: table name and column names
            converted_line = convert_table_refs(line)
            converted_line = convert_columns_in_line(converted_line)
            output_lines.append(converted_line)
            in_copy_block = True
            skip_copy_block = False
            i += 1
            continue

        # If we're in a COPY data block
        if in_copy_block:
            if stripped == '\\.':
                in_copy_block = False
                if not skip_copy_block:
                    output_lines.append(line)
                skip_copy_block = False
                i += 1
                continue
            else:
                if not skip_copy_block:
                    output_lines.append(line)
                i += 1
                continue

        # Skip CREATE TABLE blocks (multi-line)
        if stripped.startswith('CREATE TABLE'):
            skip_mode = True
            i += 1
            continue

        if skip_mode:
            if stripped.startswith(');'):
                skip_mode = False
            i += 1
            continue

        # Skip ALTER TABLE ... OWNER TO (single line)
        if 'OWNER TO' in stripped:
            i += 1
            continue

        # Skip ALTER TABLE ... ADD GENERATED BY DEFAULT AS IDENTITY blocks
        if stripped.startswith('ALTER TABLE') and 'ALTER COLUMN' in stripped and 'ADD GENERATED' in stripped:
            # Skip until closing );
            while i < len(lines) and not lines[i].strip().startswith(');'):
                i += 1
            i += 1  # skip the );
            continue

        # Skip __EFMigrationsHistory related
        if '__EFMigrationsHistory' in stripped or 'EFMigrations' in stripped:
            i += 1
            continue

        # Handle SELECT setval() for sequences
        if 'SELECT pg_catalog.setval' in stripped:
            converted_line = convert_table_refs(line)
            output_lines.append(converted_line)
            i += 1
            continue

        # Handle ALTER TABLE for constraints (PRIMARY KEY, FK, etc.)
        if stripped.startswith('ALTER TABLE'):
            converted_line = convert_table_refs(line)
            converted_line = convert_columns_in_line(converted_line)
            output_lines.append(converted_line)
            i += 1
            continue

        # Handle SET statements (keep them)
        if stripped.startswith('SET ') or stripped.startswith('SELECT pg_catalog'):
            # Already added in header, skip duplicates
            i += 1
            continue

        # Handle comments (keep them but convert table names in them)
        if stripped.startswith('--'):
            converted_line = convert_table_refs(line)
            output_lines.append(converted_line)
            i += 1
            continue

        # Keep empty lines
        if stripped == '':
            output_lines.append(line)
            i += 1
            continue

        # Default: convert and keep
        converted_line = convert_table_refs(line)
        converted_line = convert_columns_in_line(converted_line)
        output_lines.append(converted_line)
        i += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(output_lines)

    print(f"Conversion complete!")
    print(f"  Input:  {input_path}")
    print(f"  Output: {output_path}")

    # Verification: check for remaining PascalCase table names
    remaining = []
    with open(output_path, 'r', encoding='utf-8') as f:
        content = f.read()
        for old_name in TABLE_MAP.keys():
            if old_name in content:
                remaining.append(old_name)

    if remaining:
        print(f"\n  WARNING: Found remaining PascalCase table names: {remaining}")
    else:
        print(f"\n  All PascalCase table names successfully converted!")

    # Count data sections
    copy_count = content.count('COPY public.')
    print(f"  Data COPY blocks: {copy_count}")


if __name__ == '__main__':
    input_file = 'd:/savdosklad/savdosklad/Savdo.sql'
    output_file = 'd:/savdosklad/savdosklad/Savdo_converted.sql'

    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    if len(sys.argv) > 2:
        output_file = sys.argv[2]

    process_sql(input_file, output_file)

package postgres

import (
	"database/sql"
	"fmt"
	"time"

	"savdosklad/internal/entity"
)

type RefundRepo struct {
	db *sql.DB
}

func NewRefundRepo(db *sql.DB) *RefundRepo {
	return &RefundRepo{db: db}
}

func (r *RefundRepo) CreateTotalRefund(tr *entity.TotalRefund) (int, error) {
	var id int
	err := r.db.QueryRow(
		`INSERT INTO total_refunds (description, total, cash, card, click, debt, "clientNumber", "debtLimitDate", "businessId", "clientId", "createdAt", "updatedAt")
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
		tr.Description, tr.Total, tr.Cash, tr.Card, tr.Click, tr.Debt,
		tr.ClientNumber, tr.DebtLimitDate, tr.BusinessID, tr.ClientID, time.Now(), time.Now(),
	).Scan(&id)
	return id, err
}

func (r *RefundRepo) CreateRefund(rf *entity.Refund) (int, error) {
	var id int
	err := r.db.QueryRow(
		`INSERT INTO refunds (description, "productPrice", "productQuantity", "productId", "businessId", "totalRefundId", "transactionId", "createdAt", "updatedAt")
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
		rf.Description, rf.ProductPrice, rf.ProductQuantity, rf.ProductID, rf.BusinessID, rf.TotalRefundID, rf.TransactionID, time.Now(), time.Now(),
	).Scan(&id)
	return id, err
}

func (r *RefundRepo) GetTotalRefundByID(id int) (*entity.TotalRefund, error) {
	var tr entity.TotalRefund
	err := r.db.QueryRow(
		`SELECT id, description, total, cash, card, click, debt, "clientNumber", "debtLimitDate", "businessId", "clientId", "createdAt", "updatedAt"
		FROM total_refunds WHERE id = $1`, id,
	).Scan(&tr.ID, &tr.Description, &tr.Total, &tr.Cash, &tr.Card, &tr.Click, &tr.Debt,
		&tr.ClientNumber, &tr.DebtLimitDate, &tr.BusinessID, &tr.ClientID, &tr.CreatedAt, &tr.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &tr, nil
}

func (r *RefundRepo) GetTotalRefundsByBusinessID(businessID int) ([]entity.TotalRefund, error) {
	rows, err := r.db.Query(
		`SELECT id, description, total, cash, card, click, debt, "clientNumber", "debtLimitDate", "businessId", "clientId", "createdAt", "updatedAt"
		FROM total_refunds WHERE "businessId" = $1 ORDER BY id DESC`, businessID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []entity.TotalRefund
	for rows.Next() {
		var tr entity.TotalRefund
		if err := rows.Scan(&tr.ID, &tr.Description, &tr.Total, &tr.Cash, &tr.Card, &tr.Click, &tr.Debt,
			&tr.ClientNumber, &tr.DebtLimitDate, &tr.BusinessID, &tr.ClientID, &tr.CreatedAt, &tr.UpdatedAt); err != nil {
			return nil, err
		}
		list = append(list, tr)
	}
	return list, nil
}

func (r *RefundRepo) GetTransactionsByTotalID(totalID int) ([]entity.Transaction, error) {
	return nil, nil
}

func (r *RefundRepo) GetTotalRefundsByPeriod(bid int, start, end time.Time) ([]entity.TotalRefund, error) {
	rows, err := r.db.Query(
		`SELECT id, "total", "cash", "card", "click", "debt", "businessId", "clientId", "createdAt", "updatedAt" 
		 FROM total_refunds 
		 WHERE "businessId" = $1 AND "createdAt" >= $2 AND "createdAt" <= $3`,
		bid, start, end,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []entity.TotalRefund
	for rows.Next() {
		var t entity.TotalRefund
		if err := rows.Scan(&t.ID, &t.Total, &t.Cash, &t.Card, &t.Click, &t.Debt, &t.BusinessID, &t.ClientID, &t.CreatedAt, &t.UpdatedAt); err != nil {
			return nil, err
		}
		results = append(results, t)
	}
	return results, nil
}

func (r *RefundRepo) GetRefundsByTotalID(totalID int) ([]entity.Refund, error) {
	rows, err := r.db.Query(
		`SELECT id, description, "productPrice", "productQuantity", "productId", "businessId", "totalRefundId", "transactionId", "createdAt", "updatedAt"
		FROM refunds WHERE "totalRefundId" = $1 ORDER BY id`, totalID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []entity.Refund
	for rows.Next() {
		var rf entity.Refund
		if err := rows.Scan(&rf.ID, &rf.Description, &rf.ProductPrice, &rf.ProductQuantity, &rf.ProductID, &rf.BusinessID, &rf.TotalRefundID, &rf.TransactionID, &rf.CreatedAt, &rf.UpdatedAt); err != nil {
			return nil, err
		}
		list = append(list, rf)
	}
	return list, nil
}

func (r *RefundRepo) GetStats(bid int, start, end *time.Time) (entity.RefundStats, error) {
	queryString := `SELECT COALESCE(SUM(total), 0), COUNT(*) FROM total_refunds WHERE "businessId" = $1`
	args := []interface{}{bid}
	idx := 2
	if start != nil {
		queryString += fmt.Sprintf(` AND "createdAt" >= $%d`, idx)
		args = append(args, *start)
		idx++
	}
	if end != nil {
		queryString += fmt.Sprintf(` AND "createdAt" <= $%d`, idx)
		args = append(args, *end)
		idx++
	}
	var s entity.RefundStats
	err := r.db.QueryRow(queryString, args...).Scan(&s.Total, &s.Count)
	return s, err
}

DO $$ 
DECLARE 
    r RECORD; 
BEGIN 
    FOR r IN (
        SELECT table_name, column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND data_type LIKE 'timestamp%'
    ) LOOP 
        EXECUTE format('UPDATE %I SET %I = ''1970-01-01'' WHERE %I = ''-infinity''', 
            r.table_name, r.column_name, r.column_name); 
        EXECUTE format('UPDATE %I SET %I = ''2099-12-31'' WHERE %I = ''infinity''', 
            r.table_name, r.column_name, r.column_name); 
    END LOOP; 
END $$;

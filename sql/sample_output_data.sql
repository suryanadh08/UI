-- Insert sample data into output_data
INSERT INTO output_data (source_file_column, derived_column, destination_field, rule_execution_status) VALUES
('CustomerID', 'DerivedCustomerID', 'CustomerID', 'success'),
('AccountNumber', 'DerivedAccountNumber', 'AccountNumber', 'failed'),
('TransactionAmount', NULL, 'TransactionAmount', 'success'),
('TransactionDate', 'DerivedTransactionDate', 'TransactionDate', 'pending');

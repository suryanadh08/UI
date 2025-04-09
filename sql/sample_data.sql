
-- Insert sample data into processes
INSERT INTO processes (process_name, status) VALUES 
('Process 1', 'draft'),
('Process 2', 'active'),
('Process 3', 'completed');

-- Insert sample data into business_rules
INSERT INTO business_rules (process_id, rule_name, version, is_active, status) VALUES 
(1, 'Business Rule 1', 1, 1, 'draft'),
(1, 'Business Rule 2', 1, 1, 'active'),
(2, 'Business Rule 3', 2, 0, 'inactive'),
(3, 'Business Rule 4', 1, 1, 'completed');

-- Insert sample data into rule_records
INSERT INTO rule_records (rule_id, record_data, is_exception) VALUES 
(1, 'Record 1 Data', 0),
(1, 'Record 2 Data', 1),
(2, 'Record 3 Data', 0),
(3, 'Record 4 Data', 1),
(4, 'Record 5 Data', 0);

-- Insert sample data into exceptions
INSERT INTO exceptions (rule_id, remarks, attachment_path, status) VALUES 
(1, 'Validation failed for Record 2', 'path/to/attachment1.pdf', 'pending'),
(3, 'Incorrect data format in Record 4', NULL, 'approved');

-- Insert sample data into rule_versions
INSERT INTO rule_versions (rule_id, version, rule_name, status) VALUES 
(1, 1, 'Business Rule 1', 'draft'),
(2, 1, 'Business Rule 2', 'active'),
(3, 2, 'Business Rule 3', 'inactive'),
(4, 1, 'Business Rule 4', 'completed');

-- Insert sample data into scheduler_configs
INSERT INTO scheduler_configs (process_id, cron_expression, timezone, is_active) VALUES 
(1, '0 0 * * *', 'UTC', 1),
(2, '0 12 * * 1', 'Asia/Kolkata', 1),
(3, '0 18 * * 5', 'America/New_York', 0);

-- Insert sample data into scheduler_logs
INSERT INTO scheduler_logs (scheduler_id, execution_time, status, remarks) VALUES 
(1, '2023-09-01 00:00:00', 'Success', NULL),
(1, '2023-09-02 00:00:00', 'Failed', 'Connection timeout'),
(2, '2023-09-04 12:00:00', 'Success', NULL);

-- Insert sample data into user_groups
INSERT INTO user_groups (group_name, description) VALUES 
('Investigators Group', 'Group responsible for investigating issues'),
('Approvers Group', 'Group responsible for approving requests'),
('Checkers Group', 'Group responsible for reviewing investigations');

-- Insert sample data into user_roles
INSERT INTO user_roles (role_name, description) VALUES 
('Investigator', 'Handles investigations'),
('Checker', 'Reviews investigations'),
('Approver', 'Approves or rejects requests');

-- Insert sample data into user_group_mappings
INSERT INTO user_group_mappings (user_id, group_id) VALUES 
(1, 1), -- User 1 belongs to Investigators Group
(2, 2), -- User 2 belongs to Approvers Group
(3, 3); -- User 3 belongs to Checkers Group

-- Insert sample data into group_role_mappings
INSERT INTO group_role_mappings (group_id, role_id) VALUES 
(1, 1), -- Investigators Group has Investigator role
(2, 3), -- Approvers Group has Approver role
(3, 2); -- Checkers Group has Checker role

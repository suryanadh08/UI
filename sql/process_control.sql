-- Table to store processes
CREATE TABLE processes (
    process_id INT IDENTITY(1,1) PRIMARY KEY,
    process_name NVARCHAR(255) NULL, -- Allow NULL for partial saves
    status NVARCHAR(50) NOT NULL DEFAULT 'draft', -- Default status set to 'draft' for partial saves
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store business rules associated with processes
CREATE TABLE business_rules (
    rule_id INT IDENTITY(1,1) PRIMARY KEY,
    process_id INT NOT NULL FOREIGN KEY REFERENCES processes(process_id) ON DELETE CASCADE,
    rule_name NVARCHAR(255) NULL, -- Allow NULL for partial saves
    version INT NOT NULL DEFAULT 1,
    is_active BIT NOT NULL DEFAULT 1,
    status NVARCHAR(50) NOT NULL DEFAULT 'draft', -- Default status set to 'draft' for partial saves
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store records processed by business rules
CREATE TABLE rule_records (
    record_id INT IDENTITY(1,1) PRIMARY KEY,
    rule_id INT NOT NULL FOREIGN KEY REFERENCES business_rules(rule_id) ON DELETE CASCADE,
    record_data NVARCHAR(MAX) NULL, -- Allow NULL for partial saves
    is_exception BIT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Table to store exception details
CREATE TABLE exceptions (
    exception_id INT IDENTITY(1,1) PRIMARY KEY,
    rule_id INT NOT NULL FOREIGN KEY REFERENCES business_rules(rule_id) ON DELETE CASCADE,
    remarks NVARCHAR(MAX) NULL, -- Allow NULL for partial saves
    attachment_path NVARCHAR(255) NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store rule version history
CREATE TABLE rule_versions (
    version_id INT IDENTITY(1,1) PRIMARY KEY,
    rule_id INT NOT NULL FOREIGN KEY REFERENCES business_rules(rule_id) ON DELETE CASCADE,
    version INT NOT NULL,
    rule_name NVARCHAR(255) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Table to store scheduler configurations for processes
CREATE TABLE scheduler_configs (
    scheduler_id INT IDENTITY(1,1) PRIMARY KEY,
    process_id INT NOT NULL FOREIGN KEY REFERENCES processes(process_id) ON DELETE CASCADE,
    cron_expression NVARCHAR(255) NOT NULL, -- Cron expression for scheduling
    timezone NVARCHAR(100) NOT NULL DEFAULT 'UTC', -- Timezone for the scheduler
    is_active BIT NOT NULL DEFAULT 1, -- Indicates if the scheduler is active
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store user roles at the process level
CREATE TABLE process_user_roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    process_id INT NOT NULL FOREIGN KEY REFERENCES processes(process_id) ON DELETE CASCADE,
    role_name NVARCHAR(50) NOT NULL, -- Roles: Investigator, Checker, Approver
    description NVARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store output data at the process level
CREATE TABLE process_output_data (
    output_id INT IDENTITY(1,1) PRIMARY KEY,
    process_id INT NOT NULL FOREIGN KEY REFERENCES processes(process_id) ON DELETE CASCADE,
    source_file_column NVARCHAR(255) NOT NULL, -- Column from the source file
    derived_column NVARCHAR(255) NULL, -- Derived column
    destination_field NVARCHAR(255) NULL, -- Selected field from the destination table/file
    rule_execution_status NVARCHAR(50) NOT NULL DEFAULT 'pending', -- Status of rule execution
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

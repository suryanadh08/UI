-- Table to store scheduler configurations
CREATE TABLE scheduler_configs (
    scheduler_id INT IDENTITY(1,1) PRIMARY KEY,
    process_id INT NOT NULL FOREIGN KEY REFERENCES processes(process_id) ON DELETE CASCADE,
    cron_expression NVARCHAR(255) NOT NULL, -- Cron expression for scheduling
    timezone NVARCHAR(100) NOT NULL DEFAULT 'UTC', -- Timezone for the scheduler
    is_active BIT NOT NULL DEFAULT 1, -- Indicates if the scheduler is active
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store scheduler execution logs
CREATE TABLE scheduler_logs (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    scheduler_id INT NOT NULL FOREIGN KEY REFERENCES scheduler_configs(scheduler_id) ON DELETE CASCADE,
    execution_time DATETIME NOT NULL, -- Time when the scheduler executed
    status NVARCHAR(50) NOT NULL, -- Status of the execution (e.g., 'Success', 'Failed')
    remarks NVARCHAR(MAX) NULL, -- Additional remarks or error messages
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

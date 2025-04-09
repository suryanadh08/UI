-- Table to store output data
CREATE TABLE output_data (
    output_id INT IDENTITY(1,1) PRIMARY KEY,
    source_file_column NVARCHAR(255) NOT NULL, -- Column from the source file
    derived_column NVARCHAR(255) NULL, -- Derived column
    destination_field NVARCHAR(255) NULL, -- Selected field from the destination table/file
    rule_execution_status NVARCHAR(50) NOT NULL DEFAULT 'pending', -- Status of rule execution
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

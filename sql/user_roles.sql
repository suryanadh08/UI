-- Table to store user groups
CREATE TABLE user_groups (
    group_id INT IDENTITY(1,1) PRIMARY KEY,
    group_name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to store user roles
CREATE TABLE user_roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name NVARCHAR(50) NOT NULL UNIQUE, -- Roles: Investigator, Checker, Approver
    description NVARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- Table to map users to groups
CREATE TABLE user_group_mappings (
    mapping_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL, -- Foreign key to users table (assume a users table exists)
    group_id INT NOT NULL FOREIGN KEY REFERENCES user_groups(group_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Table to map roles to groups
CREATE TABLE group_role_mappings (
    mapping_id INT IDENTITY(1,1) PRIMARY KEY,
    group_id INT NOT NULL FOREIGN KEY REFERENCES user_groups(group_id) ON DELETE CASCADE,
    role_id INT NOT NULL FOREIGN KEY REFERENCES user_roles(role_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

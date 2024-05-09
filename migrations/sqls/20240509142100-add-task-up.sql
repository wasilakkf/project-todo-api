CREATE TABLE task (
	task_id INT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description VARCHAR(300),
	completed BIT NOT NULL DEFAULT 0,
	priority INT NOT NULL DEFAULT 1,
	due_date DATE,
	project_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(project_id) REFERENCES project(project_id) ON DELETE CASCADE
);
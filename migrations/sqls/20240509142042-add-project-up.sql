CREATE TABLE project (
	project_id INT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE task_tags (
	task_id INT,
	tag_id INT,
	PRIMARY KEY(task_id, tag_id),
	FOREIGN KEY(task_id) REFERENCES task(task_id) ON DELETE CASCADE,
	FOREIGN KEY(tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE
);
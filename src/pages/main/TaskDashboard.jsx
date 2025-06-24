import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../stores/tasks/taskStore";
import {
  Card, CardContent, Typography, Button, TextField, Grid, MenuItem,
} from "@mui/material";

const TaskDashboard = () => {
  const { tasks, fetchTasks, addTask, updateTaskStatus } = useTaskStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  const grouped = {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  };

  tasks.forEach((task) => {
    grouped[task.status]?.push(task);
  });

  const statusOptions = ["To Do", "In Progress", "Done"];

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>Task Manager</Typography>
      <div className="mb-4 flex items-center gap-4">
        <TextField
          label="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTask}>Add</Button>
      </div>

      <Grid container spacing={3}>
        {Object.entries(grouped).map(([status, items]) => (
          <Grid item xs={12} md={4} key={status}>
            <Typography variant="h6" gutterBottom>{status}</Typography>
            {items.map((task) => (
              <Card key={task.id} className="mb-2">
                <CardContent>
                  <Typography>{task.title}</Typography>
                  <TextField
                    select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    size="small"
                    fullWidth
                    className="mt-2"
                  >
                    {statusOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskDashboard;

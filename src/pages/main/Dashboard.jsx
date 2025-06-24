import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../stores/tasks/taskStore";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/header/header";
import TaskList from "./components/TaskList";
import TaskState from "./components/TaskState";
import CompletedTaskList from "./components/CompletedTaskList";

const Dashboard = () => {
  const theme = useTheme();
  const { tasks, fetchTasks, addTask, updateTaskStatus } = useTaskStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Group tasks by status
  const grouped = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };
  (tasks || []).forEach((task) => {
    grouped[task.status]?.push(task);
  });

  // Stats for donut charts
  const total = tasks?.length || 0;
  const completed = grouped["Done"].length;
  const inProgress = grouped["In Progress"].length;
  const notStarted = grouped["To Do"].length;

  // Add task handler
  const handleAddTask = () => {
    if (title.trim()) {
      addTask({
        title,
        status: "To Do",
        created_at: new Date().toISOString(),
      });
      setTitle("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        // py: 2,
      }}
    >
      <Header theme={theme} />
    </Box>
  );
};

export default Dashboard;

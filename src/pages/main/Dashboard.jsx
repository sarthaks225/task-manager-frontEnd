import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../stores/tasks/taskStore";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const theme = useTheme();
  const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState("To Do");

  useEffect(() => {
    fetchTasks();
  }, []);

  const grouped = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  (tasks || []).forEach((task) => {
    grouped[task.status]?.push(task);
  });

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

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTitle(task.title);
    setEditedStatus(task.status);
  };

  const handleSave = (task) => {
    if (editedTitle.trim()) {
      updateTask(task.id, {
        title: editedTitle,
        status: editedStatus,
      });
      setEditTaskId(null);
    }
  };

  const handleCancel = () => {
    setEditTaskId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  const columnLabels = {
    "To Do": "Scheduled",
    "In Progress": "In Progress",
    Done: "Completed",
  };

  const TaskCard = ({ task }) => {
    const isEditing = editTaskId === task.id;
    const [localTitle, setLocalTitle] = useState(task.title);
    const [localStatus, setLocalStatus] = useState(task.status);

    useEffect(() => {
      if (isEditing) {
        setLocalTitle(task.title);
        setLocalStatus(task.status);
      }
    }, [isEditing, task.title, task.status]);

    const handleSaveLocal = () => {
      if (localTitle.trim()) {
        updateTask(task.id, {
          ...task,
          title: localTitle,
          status: localStatus,
        });
        setEditTaskId(null);
      }
    };

    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor:
            task.status === "Done"
              ? "#f3f4f6"
              : task.status === "In Progress"
              ? "#ffe0e0"
              : "#e0f7fa",
        }}
      >
        {isEditing ? (
          <>
            <TextField
              fullWidth
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Select
              fullWidth
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value)}
              sx={{ mb: 1 }}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <IconButton onClick={handleSaveLocal} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="error">
                <CloseIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <Typography fontWeight="bold">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(task.created_at).toDateString()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 1,
              }}
            >
              <IconButton onClick={() => handleEdit(task)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <Header theme={theme} />

      {/* Add Task */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <TextField
          label="Add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add
        </Button>
      </Box>

      {/* Columns */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          px: 4,
          flexWrap: "wrap",
        }}
      >
        {Object.keys(grouped).map((status) => (
          <Box
            key={status}
            sx={{
              flex: "1 1 300px",
              maxWidth: 360,
              minWidth: 280,
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
              {status} ({grouped[status].length})
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              {columnLabels[status]}
            </Typography>

            {grouped[status].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

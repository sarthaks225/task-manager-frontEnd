// src/components/Dashboard/TaskList.js
import React from "react";
import {
  Typography,
  Box,
  Card,
  Stack,
  Chip,
  TextField,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useTheme } from "@mui/material/styles";

const statusLabels = {
  "To Do": "Not Started",
  "In Progress": "In Progress",
  Done: "Completed",
};

const TaskList = ({
  grouped,
  title,
  setTitle,
  handleAddTask,
  updateTaskStatus,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        p: 3,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AssignmentIcon sx={{ mr: 1 }} />
          To-Do
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="text"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: 1,
            "&:hover": { color: theme.palette.primary.main },
          }}
          onClick={handleAddTask}
          disabled={!title.trim()}
        >
          ADD TASK
        </Button>
      </Box>

      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="medium"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Divider sx={{ mb: 3 }} />

      {grouped["To Do"].length === 0 ? (
        <Typography color="text.secondary">No tasks here.</Typography>
      ) : (
        grouped["To Do"].map((task) => (
          <Card
            key={task.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              bgcolor: theme.palette.grey[50],
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {/* Title at top left, Menu at top right */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  flex: 1,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.7rem" },
                  mb: 0.5,
                }}
              >
                {task.title}
              </Typography>
              <TextField
                select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                size="small"
                sx={{
                  minWidth: 140,
                  bgcolor: "#fff",
                  ml: 2,
                  mt: 0,
                  ".MuiSelect-select": { py: 1 },
                }}
              >
                {Object.keys(statusLabels).map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {statusLabels[opt]}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {/* Status below the title */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1, ml: 0.2 }}
            >
              <Chip
                label={`Status: ${statusLabels[task.status]}`}
                color="error"
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                Created:{" "}
                {task.created_at
                  ? new Date(task.created_at).toLocaleDateString()
                  : ""}
              </Typography>
            </Stack>
          </Card>
        ))
      )}
    </Box>
  );
};

export default TaskList;

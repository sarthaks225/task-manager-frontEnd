import React from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const TaskCard = ({ task, updateTaskStatus, statusLabels, priorityColors }) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Avatar src={task.image} sx={{ width: 48, height: 48, mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description || "No description"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={`Priority: ${task.priority}`}
            color={priorityColors[task.priority] || "default"}
            size="small"
          />
          <Chip
            label={`Status: ${statusLabels[task.status]}`}
            color="error"
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </Typography>
        </Stack>
      </Box>
      <TextField
        select
        value={task.status}
        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
        size="small"
        sx={{ minWidth: 140, ml: 2, bgcolor: "#fff" }}
      >
        {Object.keys(statusLabels).map((opt) => (
          <MenuItem key={opt} value={opt}>
            {statusLabels[opt]}
          </MenuItem>
        ))}
      </TextField>
      <MoreHorizIcon sx={{ ml: 1, color: "grey.400", cursor: "pointer" }} />
    </Card>
  );
};

export default TaskCard;

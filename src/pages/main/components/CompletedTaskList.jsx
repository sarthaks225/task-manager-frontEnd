import React from "react";
import { Paper, Typography, Card, Avatar, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CompletedTaskList = ({ tasks = [], theme }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        minHeight: 200,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "center", color: theme.palette.text.primary }}
      >
        Completed Task
      </Typography>

      {tasks.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No completed tasks. 🫠
        </Typography>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              bgcolor: theme.palette.success.lighter || "#e8f5e9",
              display: "flex",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: theme.palette.success.dark || "#388e3c" }}
              >
                {task.title}
              </Typography>

              <Typography
                variant="caption"
                color="success.main"
                fontWeight="bold"
              >
                Status: Completed
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                Completed{" "}
                {task.created_at
                  ? new Date(task.created_at).toLocaleDateString()
                  : ""}
              </Typography>
            </Box>
            <MoreHorizIcon
              sx={{
                ml: 1,
                color: theme.palette.grey[400],
                cursor: "pointer",
              }}
            />
          </Card>
        ))
      )}
    </Paper>
  );
};

export default CompletedTaskList;

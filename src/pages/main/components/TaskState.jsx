import React from "react";
import { Paper, Typography, Stack, Box, CircularProgress } from "@mui/material";

const TaskStats = ({ total, completed, inProgress, notStarted, theme }) => {
  const percent = (n) => (total ? Math.round((n / total) * 100) : 0);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 3,
        bgcolor: theme.palette.background.paper,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "center", color: theme.palette.text.primary }}
      >
        Task Status
      </Typography>
      <Stack direction="row" spacing={4} alignItems="center">
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            variant="determinate"
            value={percent(completed)}
            size={70}
            thickness={5}
            color="success"
          />
          <Typography
            variant="subtitle2"
            sx={{
              mt: 1,
              color: theme.palette.success.main,
              fontWeight: "bold",
            }}
          >
            {percent(completed)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Completed
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            variant="determinate"
            value={percent(inProgress)}
            size={70}
            thickness={5}
            color="info"
          />
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, color: theme.palette.info.main, fontWeight: "bold" }}
          >
            {percent(inProgress)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            In Progress
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            variant="determinate"
            value={percent(notStarted)}
            size={70}
            thickness={5}
            color="error"
          />
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, color: theme.palette.error.main, fontWeight: "bold" }}
          >
            {percent(notStarted)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Not Started
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TaskStats;

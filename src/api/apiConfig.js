export const apiConfig = [
  { name: "login", path: "/api/login", method: "POST" },
  { name: "signup", path: "/api/signup", method: "POST" },
  { name: "getTasks", path: "/api/tasks", method: "GET" },
  { name: "addTask", path: "/api/tasks", method: "POST" },
  { name: "updateTask", path: "/api/tasks/{id}", method: "PATCH", hasPathParams: true },
];

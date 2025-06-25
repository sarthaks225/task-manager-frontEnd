# Task Manager FrontEnd

A modern task management web application built with **React** and **Vite**. This project features authentication, task CRUD operations, and a responsive UI using Material-UI (MUI).

## Features

- User authentication (login/signup)
- Create, read, update, and delete tasks
- Responsive dashboard with drag-and-drop columns
- Protected routes for authenticated users
- Integration with a RESTful backend API

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material-UI (MUI)](https://mui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Axios](https://axios-http.com/) for API requests
- [React Router](https://reactrouter.com/) for routing

  #Screenshots

![Login]([https://github.com/sarthaks225/task-manager-backend/blob/main/assets/readme/ER_Diagram.png?raw=true](https://github.com/sarthaks225/task-manager-frontEnd/blob/main/assets/readme%20assets/2.1.png?raw=true))
![Login]([https://github.com/sarthaks225/task-manager-backend/blob/main/assets/readme/ER_Diagram.png?raw=true](https://github.com/sarthaks225/task-manager-frontEnd/blob/main/assets/readme%20assets/1.1.jpg?raw=true))

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sarthaks225/task-manager-frontEnd.git
   cd task-manager-frontEnd
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to see the app in action.

## Project Structure

```
src/
  api/           # API configs and hooks
  components/    # Reusable UI components
  pages/         # Page-level components (Dashboard, Login, Signup, etc.)
  stores/        # Zustand stores for state management
  routes/        # React Router configuration
  App.jsx        # Main app component
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.



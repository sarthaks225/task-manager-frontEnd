import { RouterProvider } from "react-router-dom";
import router from "./routes/routesConfig";
import "./App.css";

function App() {
  return (
    <div
      style={{
        position: "fixed", // covers the screen
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        border: "1px solid red",
        overflow: "auto", // this allows scrolling when content overflows
      }}
    >
      <RouterProvider router={router} />
    </div>

    // <>
    //   <RouterProvider router={router} />
    // </>
  );
}

export default App;

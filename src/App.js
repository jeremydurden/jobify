import { Landing } from "./pages/index.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/register">Register</Link>
          <Link to="/landing">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/register" element={<div>Register</div>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<h1>Error</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

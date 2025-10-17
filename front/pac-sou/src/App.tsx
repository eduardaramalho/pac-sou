import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SouLogin from "./pages/SouLogin"
import SouForm from "./pages/SouForm";
// import SouHistory from "./pages/SouHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SouLogin />} />
        <Route path="/form" element={<SouForm />} />
        {/* <Route path="/history" element={<SouHistory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

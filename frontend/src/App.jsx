import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./res/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorDetail from "./pages/DoctorDetail";
import Doctors from "./res/Doctors";
import PatientTabs from "./user/PatientTabs";
import DoctorTabs from "./doctor/DoctorTabs";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctordetail" element={<DoctorDetail />} />
          <Route path="/patientprofile" element={<PatientTabs />} />
          <Route path="/doctorprofile" element={<DoctorTabs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

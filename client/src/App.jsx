import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage";
import DoctorLogin from "./components/DoctorLogin";
import StaffLogin from "./components/StaffLogin";
import PatientLogin from "./components/PatientLogin";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";


function App() {
  return (
    <>
     
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

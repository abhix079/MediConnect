import "./App.css";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage";
import DoctorLogin from "./components/DoctorLogin";
import StaffLogin from "./components/StaffLogin";
import AdminLogin from "./components/AdminLogin";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";


function App() {
  return (
    <>
     
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LandingPage/>} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

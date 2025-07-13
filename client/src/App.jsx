import "./App.css";
import {BrowserRouter,Routes,Route, Router} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import DoctorLogin from "./components/DoctorLogin";
import StaffLogin from "./components/StaffLogin";
import PatientLogin from "./components/PatientLogin";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";


function App(){
  return (
    <>           
    {/* <Navbar/> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/doctor-login" element={<DoctorLogin/>}/>
      <Route path="/staff-login" element={<StaffLogin/>}/>
      <Route path="/patient-login" element={<PatientLogin/>}/>
      <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
      <Route path="/staff-dashboard" element={<StaffDashboard/>}/>
      <Route path="/patient-dashboard" element={<PatientDashboard/>}/>

      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
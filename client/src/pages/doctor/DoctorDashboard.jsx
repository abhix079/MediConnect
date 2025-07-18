import { useEffect, useState } from "react";
import DoctorNavbar from "../doctor/DoctorNavbar";
import Appointment from "./Appointment";
import History from "./History";
import styles from "../../styles/DoctorDashboard.module.css";

export default function DoctorDashboard() {
  const [greeting, setGreeting] = useState("");
  const [currentView, setCurrentView] = useState("appointments");

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) setGreeting("Morning");
  //   else if (hour < 17) setGreeting("Afternoon");
  //   else setGreeting("Evening");
  // }, []);

    const name = localStorage.getItem("doctorName") || "Doctor";
  return (
    <div className={styles.mainContainer}>
      <DoctorNavbar
        onAppointmentClick={() => setCurrentView("appointments")}
        onHistoryClick={() => setCurrentView("history")}
        selected={currentView}
      />
{/* 
      {currentView === "greeting" && (
        <div className={styles.greetingMsg}>
          <h2>Good {greeting}, {name}</h2>
          <p>You have 3 appointments scheduled today.</p>
        </div>
      )} */}

      {currentView === "appointments" && (
        <div className={styles.appointmentContainer}>
         <Appointment />
        </div>
      )}

      {currentView === "history" && (
        <div className={styles.historyContainer}>
        
          <History goBack={()=>setCurrentView("appointments")}/>
        </div>
      )}
    </div>
  );
}
 
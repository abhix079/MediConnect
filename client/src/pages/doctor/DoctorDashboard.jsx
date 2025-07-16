import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Appointment from "./Appointment";
import History from "./History";
import styles from "../../styles/DoctorDashboard.module.css";

export default function DoctorDashboard() {
  const [greeting, setGreeting] = useState("");
  const [currentView, setCurrentView] = useState("greeting");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Morning");
    else if (hour < 17) setGreeting("Afternoon");
    else setGreeting("Evening");
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Navbar
        onAppointmentClick={() => setCurrentView("appointments")}
        onHistoryClick={() => setCurrentView("history")}
        selected={currentView}
      />

      {currentView === "greeting" && (
        <div className={styles.greetingMsg}>
          <h2>Good {greeting}, Dr. Ankit</h2>
          <p>You have 3 appointments scheduled today.</p>
        </div>
      )}

      {currentView === "appointments" && (
        <div className={styles.appointmentContainer}>
         <Appointment goBack={()=>setCurrentView("greeting")}/>
        </div>
      )}

      {currentView === "history" && (
        <div className={styles.historyContainer}>
        
          <History goBack={()=>setCurrentView("greeting")}/>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import DoctorNavbar from "../doctor/DoctorNavbar";
import Appointment from "./Appointment";
import History from "./History";
import styles from "../../styles/DoctorDashboard.module.css";
import ChatWidget from "../../components/ChatWidget";

export default function DoctorDashboard() {
  const [currentView, setCurrentView] = useState("appointments");
  const name = localStorage.getItem("doctorName") || "Doctor";

  return (
    <div className={styles.mainContainer}>
      <DoctorNavbar
        onAppointmentClick={() => setCurrentView("appointments")}
        onHistoryClick={() => setCurrentView("history")}
        selected={currentView}
      />

      {currentView === "appointments" && (
        <div className={styles.appointmentContainer}>
          <Appointment />
        </div>
      )}

      {currentView === "history" && (
        <div className={styles.historyContainer}>
          <History goBack={() => setCurrentView("appointments")} />
        </div>
      )}

      {/* 🔹 Floating chat */}
      <ChatWidget role="Doctor" name={name} />
    </div>
  );
}

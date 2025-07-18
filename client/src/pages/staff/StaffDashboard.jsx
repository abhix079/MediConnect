import { useState } from "react";
import StaffNavbar from "./StaffNavbar";
import RegisterPatient from "./RegisterPatient";
import History from "../doctor/History";
import styles from "../../styles/StaffDashboard.module.css";

export default function StaffDashboard() {
  const [currentView, setCurrentView] = useState("register");

  return (
    <div className={styles.mainContainer}>
      <StaffNavbar
        onRegisterClick={() => setCurrentView("register")}
        onHistoryClick={() => setCurrentView("history")}
        selected={currentView}
      />

      {currentView === "register" && (
        <div className={styles.registerContainer}>
          <RegisterPatient />
        </div>
      )}

      {currentView === "history" && (
        <div className={styles.historyContainer}>
          <History goBack={() => setCurrentView("register")} />
        </div>
      )}
    </div>
  );
}

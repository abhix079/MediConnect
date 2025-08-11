import styles from "../../styles/Navbar.module.css";
import { useState, useEffect } from "react";
import Logo from "../../components/Logo";

export default function DoctorNavbar({
  onAppointmentClick,
  onHistoryClick,
  selected,
}) {
  const [doctorName, setDoctorName] = useState("");

  // For navbar greeting
  useEffect(() => {
    const name = localStorage.getItem("doctorName") || "Doctor";
    setDoctorName(name);
  }, []);

  // ✅ Proper logout function that removes all stored data
  const handleLogout = () => {
    // Remove all authentication-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("userRole");
   
    
    // Redirect to login/home page
    window.location.href = "/";
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navItems}>
        <Logo />
        <p
          className={`${styles.item} ${
            selected === "appointments" ? styles.active : ""
          }`}
          onClick={onAppointmentClick}
        >
          Appointments
        </p>
        <p
          className={`${styles.item} ${
            selected === "history" ? styles.active : ""
          }`}
          onClick={onHistoryClick}
        >
          History
        </p>
      </div>

      <div className={styles.navItems}>
        <p className={styles.userGreeting}>Welcome Dr. {doctorName}</p>
        <p className={styles.btn} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}
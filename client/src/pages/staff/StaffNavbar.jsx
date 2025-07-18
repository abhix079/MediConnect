// StaffNavbar.jsx
import styles from "../../styles/Navbar.module.css";
import Logo from "../../components/Logo";
import { useState, useEffect } from "react";

export default function StaffNavbar({ onRegisterClick, onHistoryClick, selected }) {
  const [staffName, setStaffName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("staffName") || "Receptionist";
    setStaffName(name);
  }, []);
  

  return (
    <div className={styles.navContainer}>
      <div className={styles.navItems}>
        <Logo />
        <p
          className={`${styles.item} ${selected === "register" ? styles.active : ""}`}
          onClick={onRegisterClick}
        >
          Register Patient
        </p>
        <p
          className={`${styles.item} ${selected === "history" ? styles.active : ""}`}
          onClick={onHistoryClick}
        >
          History
        </p>
      </div>

      <div className={styles.navItems}>
        <p className={styles.userGreeting}>Welcome {staffName}</p>
        <p
          className={styles.btn}
          onClick={() => {
            localStorage.removeItem("staffName");
            window.location.href = "/";
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}

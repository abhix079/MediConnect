// src/components/AdminNavbar.jsx
import { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import Logo from "../../components/Logo";

export default function AdminNavbar({ onAddUser, onManageUser, selected }) {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "User";
    setAdminName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    window.location.href = "/";
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navItems}>
        <Logo />
        <p
          className={`${styles.item} ${
            selected === "addUser" ? styles.active : ""
          }`}
          onClick={onAddUser}
        >
          Add Users
        </p>
        <p
          className={`${styles.item} ${
            selected === "manageUser" ? styles.active : ""
          }`}
          onClick={onManageUser}
        >
          Manage Users
        </p>
      </div>

      <div className={styles.navItems}>
        <p className={styles.userGreeting}>Welcome {adminName}</p>
        <p className={styles.btn} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}

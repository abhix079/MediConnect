import styles from "../styles/Navbar.module.css";
import Logo from "./Logo";

export default function Navbar({
  onAppointmentClick,
  onHistoryClick,
  selected,
}) {
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
        <p className={styles.userGreeting}>Welcome Abhishek</p>
        <p className={styles.btn}>Logout</p>
      </div>
    </div>
  );
}

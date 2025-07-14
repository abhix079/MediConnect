import styles from "../styles/Navbar.module.css";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navItems}>
            <Logo/>
            <p className={styles.item}>Appointments</p>
             <p className={styles.item}>History</p>
        </div>
        
        <div className={styles.navItems}>
            <p className={styles.item}>Welcome Abhishek</p>
            <p className={styles.btn}>Logout</p>


        </div>
      </div>
    </>
  );
}

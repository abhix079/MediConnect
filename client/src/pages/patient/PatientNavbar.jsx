import styles from "../../styles/Navbar.module.css";
import Logo from "../../components/Logo";

export default function PatientNavbar(){
  return (
    <div className={styles.navContainer}>
      <div className={styles.navItems}>
        <Logo />
        
      </div>

      <div className={styles.navItems}>
        <p className={styles.btn} >Logout</p>
      </div>
    </div>
  );
}

import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";
import { FaUser, FaLock} from "react-icons/fa";
import {Link} from "react-router-dom";
 
export default function DoctorLogin() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          <span>Connecting The</span> Pharma World
        </p>
      </div>

      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h2>Login to Continue</h2>
          <p>Access your patient dashboard</p>
        </div>

        <div className={styles.inputContainer}>
          <label>Patient ID</label>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Enter patient ID" />
          </div>

          <label>Phone No.</label>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Enter Phone No." />
            
          </div>

          <Link to="/patient-dashboard"><button className={styles.loginBtn}>Get Started</button></Link>

          

         
        </div>
      </div>
    </div>
  );
}

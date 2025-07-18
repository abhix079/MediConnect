import styles from "../styles/LandingPage.module.css";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";


export default function LandingPage() {
 

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            <span>Connecting The</span> Pharma World
          </p>
        </div>

        <div className={styles.heading}>
          <h1>Welcome back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

       <div className={styles.buttonContainer}>
          <Link to ="/doctor-login" ><button className={styles.roleButton}>Login as Doctor</button></Link>
          <Link to ="/staff-login" ><button className={styles.roleButton}>Login as Staff</button></Link>
          <Link to ="/admin-login" ><button className={styles.roleButton}>Login as Admin</button></Link>
          
         
        </div>
        <p className={styles.termsPara}>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
       
    </>
  );
}

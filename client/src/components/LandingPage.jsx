// components/LandingPage.jsx
import { useState } from "react";
import styles from "../styles/LandingPage.module.css";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

export default function LandingPage() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile.trim()) return;
    navigate(`/patient-dashboard?mobile=${encodeURIComponent(mobile.trim())}`);
  };

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
          <Link to="/doctor-login">
            <button className={styles.roleButton}>Login as Doctor</button>
          </Link>
          <Link to="/staff-login">
            <button className={styles.roleButton}>Login as Staff</button>
          </Link>
          <Link to="/admin-login">
            <button className={styles.roleButton}>Login as Admin</button>
          </Link>
        </div>
        <p className={styles.termsPara}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
        <p className={styles.patientText}> For patients only</p>
        <form className={styles.patientLogin} onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter registered Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
}

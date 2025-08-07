
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      toast.error("Enter User ID and Password");
      return;
    }

    try {
      const res = await axios.post("https://mediconnect-server-tfit.onrender.com/api/admin", {
        userId,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("adminName", res.data.name || "Admin");
        toast.success("Login Successful");
        navigate("/admin-dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p><span>Connecting The</span> Pharma World</p>
      </div>

      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h2>Login to Continue</h2>
          <p>Access your Admin dashboard</p>
        </div>

        <form className={styles.inputContainer} onSubmit={handleLogin}>
          <label>User ID</label>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
          </div>

          <label>Password</label>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <p className={styles.msg}>
            NOTE: Keep your credentials safe to avoid unauthorized access.
          </p>

          <button type="submit" className={styles.loginBtn}>
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

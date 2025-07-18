import { act, useState } from "react";
import styles from "../../styles/RegisterPatient.module.css";

export default function RegisterPatient({ goBack }) {
  const [activeTab, setActiveTab] = useState("newAppointment");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContent}>
        <h2>Register Patient</h2>
      </div>

      <div className={styles.header}>
        <button
          className={`${styles.headerBtn} ${
            activeTab === "newAppointment" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("newAppointment")}
        >
          New Appointment
        </button>
        <button
          className={`${styles.headerBtn} ${
            activeTab === "reschedule" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reschedule")}
        >
          Reschedule Appointment
        </button>
      </div>

      {activeTab === "newAppointment" && (
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input type="text" placeholder="Enter patient's name" required />
          </div>

          <div className={styles.formGroup}>
            <label>Age:</label>
            <input type="number" placeholder="Enter age" required />
          </div>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select required>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Mobile No:</label>
            <input type="tel" placeholder="Enter mobile number" required />
          </div>

          <div className={styles.formGroup}>
            <label>Reason / Symptom:</label>
            <input type="text" placeholder="E.g., fever, cough" required />
          </div>

          <div className={styles.formGroup}>
            <label>Referred By:</label>
            <select required>
              <option value="">Select referring doctor</option>
              <option>A.K. Singh</option>
              <option>Neha Sharma</option>
              <option>Ramesh Patil</option>
              <option>Priya Verma</option>
              <option>Sanjay Mehra</option>
              <option>Self</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Address:</label>
            <textarea placeholder="Enter address" rows={2}></textarea>
          </div>

          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form> 
      )}
      {activeTab ==="reschedule" && (
       <div className={styles.rescheduleContainer}>
        <input type="search" name="" id="" placeholder="Enter Mobile No." className={styles.searchBar} />
        <center>Error 404 : This page is under maintenance</center>
       </div>

      )}
    </div>
  );
}

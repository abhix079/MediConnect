// components/PatientDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/PatientDashboard.module.css";
import PatientNavbar from "./PatientNavbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  const params = new URLSearchParams(location.search);
  const mobile = params.get("mobile");

  useEffect(() => {
    if (!mobile) {
      navigate(-1);
      return;
    }
    
    const fetchPatient = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/api/patients/patientDetail", {
          params: { mobile },
          timeout: 8000,
        });
        setPatient(resp.data.patient);
      } catch (err) {
        console.error("Failed to fetch patient:", err);
        
      }
    };

    fetchPatient();
  }, [mobile, navigate]);

  return (
    <div className={styles.mainContainer}>
      <PatientNavbar />
      <div className={styles.cardContainer}>
        {!patient ? (
          <p>No patient found.</p>
        ) : (
          <>
            <div className={styles.topBar}>
              <p className={styles.date}>
                {new Date(patient.updatedAt || patient.createdAt).toLocaleDateString()}
              </p>
              <p className={styles.status}>{patient.status || "N/A"}</p>
            </div>
            <div className={styles.centerDetail}>
              <p>
                <strong>Referred By :</strong> {patient.referredBy || "N/A"}
              </p>
              <p>
                <strong>Reason : </strong> {patient.reason || "N/A"}
              </p>
              <p>
                <strong>Prescription : </strong> {patient.prescription || "N/A"}
              </p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.actionBtn}>Reschedule Appointment</button>
              <button className={styles.cancelBtn}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

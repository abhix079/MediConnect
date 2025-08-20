import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Active({ appointments, setAppointments, onContinueButton }) {
  useEffect(() => {
    const fetchActiveAppointments = async () => {
      try {
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

        const payload = JSON.parse(atob(token.split(".")[1]));
        const doctorId = payload.id;
        if (!doctorId) return;

        const res = await axios.get(
          `https://mediconnect-server-tfit.onrender.com/api/patients/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Filter only active patients
        const activePatients = res.data.filter(patient => patient.status === "Active");
        setAppointments(activePatients);
      } catch (err) {
        console.error("Error fetching active appointments:", err); 
        setAppointments([]);
      }
    };

    fetchActiveAppointments();
  }, [setAppointments]);

  const handleContinueClick = (patient) => {
    onContinueButton(patient);
  };

  return (
    <>
      {appointments.length === 0 ? (
        <p className={styles.noPatient}>No active patients.</p>
      ) : (
        <table className={styles.appointmentTable}>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Symptom / Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={appt._id || appt.id}>
                <td>{idx + 1}</td>
                <td>{appt.patientId || appt.id}</td>
                <td>{appt.name}</td>
                <td>{appt.reason}</td>
                <td>
                  <p className={styles.activeStatus}>{appt.status}</p>
                </td>
                <td>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => handleContinueClick(appt)}
                  >
                    Continue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Cancelled({ appointments, setAppointments }) {
  useEffect(() => {
    const fetchCancelledAppointments = async () => {
      try {
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

        const payload = JSON.parse(atob(token.split(".")[1]));
        const doctorId = payload.id;
        if (!doctorId) return;

        const res = await axios.get(
          `https://mediconnect-02qp.onrender.com/api/patients/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter only cancelled patients
        const cancelledPatients = res.data.filter(
          (patient) => patient.status === "Cancelled"
        );
        setAppointments(cancelledPatients);
      } catch (err) {
        console.error("Error fetching cancelled appointments:", err);
        setAppointments([]);
      }
    };

    fetchCancelledAppointments();
  }, [setAppointments]);

  return (
    <>
      {appointments.length === 0 ? (
        <p className={styles.noPatient}>No cancelled patients.</p>
      ) : (
        <table className={styles.appointmentTable}>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Symptom / Reason</th>
              <th>Status</th>
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
                  <p className={styles.cancelledStatus}>{appt.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
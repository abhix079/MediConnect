import { useEffect, useState } from "react";
import styles from "../../styles/History.module.css";
import axios from "axios";

export default function History({ goBack }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryAppointments = async () => {
      try {
        setLoading(true);
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

        if (!token) {
          setError("Please login again");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const doctorId = payload.id;
        
        if (!doctorId) {
          setError("Doctor ID not found");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/patients/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Filter only completed and cancelled patients (history)
        const historyPatients = res.data.filter(
          patient => patient.status === "Completed" || patient.status === "Cancelled"
        );
        
        setAppointments(historyPatients);
        setError(null);
      } catch (err) {
        console.error("Error fetching history appointments:", err);
        setError("Failed to fetch appointment history");
        setAppointments([]);
      } 
    };

    fetchHistoryAppointments();
  }, []);

 

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topContent}>
          <h2>Appointments History</h2>
          <button className={styles.btn} onClick={goBack}>Back</button>
        </div>
        
        {appointments.length === 0 ? (
          <div className={styles.noHistory}>
            <p>No appointment history found.</p>
          </div>
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
                <tr key={appt._id}>
                  <td>{idx + 1}</td>
                  <td>{appt.patientId}</td>
                  <td>{appt.name}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <p className={
                      appt.status === "Cancelled" ? styles.cancelledStatus :
                      appt.status === "Completed" ? styles.activeStatus :
                      ""
                    }>
                      {appt.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
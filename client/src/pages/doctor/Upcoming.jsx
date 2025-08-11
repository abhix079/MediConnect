import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Upcoming() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
        }

        // Try different possible token keys
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

        if (!token) {
          setError("No token found. Please login again.");

          return;
        }

        // Try to decode JWT token to get doctor ID
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));

          const doctorId = payload.id;

          if (!doctorId) {
            setError("Invalid token - no doctor ID found");

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

          setAppointments(res.data);
        } catch (decodeError) {
          setError("Invalid token format");
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        console.error("Error response:", err.response?.data);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      {appointments.length === 0 ? (
        <div className={styles.noAppointments}>
          <p>No patients referred to you yet.</p>
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
                  <p className={styles.upcomingStatus}>{appt.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

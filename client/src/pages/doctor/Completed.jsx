import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Completed({ appointments, setAppointments, onViewButton }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      try {
        setLoading(true);
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

        if (!token) {
          console.log("No token found");
          setError("Please login again");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const doctorId = payload.id;
        console.log("Doctor ID:", doctorId);
        
        if (!doctorId) {
          setError("Doctor ID not found");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://mediconnect-02qp.onrender.com/api/patients/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("All patients data:", res.data);
        console.log("Total patients:", res.data.length);

        // Filter only completed patients
        const completedPatients = res.data.filter(
          (patient) => patient.status === "Completed"
        );
        
        console.log("Completed patients:", completedPatients);
        console.log("Completed patients count:", completedPatients.length);
        
        setAppointments(completedPatients);
        setError(null);
      } catch (err) {
        console.error("Error fetching completed appointments:", err);
        setError("Failed to fetch completed appointments");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedAppointments();
  }, [setAppointments]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading completed appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {appointments.length === 0 ? (
        <div className={styles.noAppointments}>
          <p>No completed patients found.</p>
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
              <th>Action</th>
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
                  <p className={styles.completedStatus}>{appt.status}</p>
                </td>
                <td>
                  <button
                    className={styles.actionBtn}
                    onClick={() => onViewButton(appt)}
                  >
                    View
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
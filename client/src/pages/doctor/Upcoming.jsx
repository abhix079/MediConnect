import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Upcoming() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/patients/getPatient", {
        headers: {
          Authorization: `Bearer ${zztoken}`,
        },
      });
      setAppointments(res.data);
    };

    fetchAppointments();
  }, []);

  return (
    <>
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
    </>
  );
}

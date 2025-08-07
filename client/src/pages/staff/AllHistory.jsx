import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/History.module.css";

export default function History({ goBack }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/patients/getAllPatient");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointment history:", err);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Cancelled":
        return styles.cancelledStatus;
      case "Completed":
        return styles.completedStatus;
      case "Pending":
        return styles.pendingStatus;
      case "Active":
        return styles.activeStatus;
      case "Upcoming":
        return styles.upcomingStatus;
      default:
        return "";
    }
  };





  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContent}>
        <h2>Appointments History</h2>
        <button className={styles.btn} onClick={goBack}>Back</button>
      </div>
      <table className={styles.appointmentTable}>
        <thead>
          <tr>
        
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Mobile No.</th>
            <th>Referred By</th>
            <th>Symptom / Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr key={appt._id}>
              
              <td>{appt.patientId}</td>
              <td>{appt.name}</td>
              <td>{appt.mobile}</td>
              <td>{appt.referredBy}</td>
              <td>{appt.reason}</td>
              <td>
                <p className={getStatusClass(appt.status)}>
                  {appt.status || "Upcoming"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

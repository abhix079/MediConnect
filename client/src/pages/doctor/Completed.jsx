import styles from "../../styles/Appointment.module.css";

export default function Completed({ onViewButton }) {
  const appointments = [
    { id: "P001", name: "Aditya Kumar", reason: "Fever and cold", status: "Completed" },
    { id: "P002", name: "Ankit Mishra", reason: "Back pain", status: "Completed" },
    { id: "P003", name: "Abhishek", reason: "Headache", status: "Completed" },
    { id: "P004", name: "Abhay Singh", reason: "Dizziness", status: "Completed" },
    { id: "P005", name: "Adarsh Verma", reason: "Back Pain", status: "Completed" },
    { id: "P006", name: "Aryan Gupta", reason: "Vomiting", status: "Completed" },
  ];

  return (
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
          <tr key={appt.id}>
            <td>{idx + 1}</td>
            <td>{appt.id}</td>
            <td>{appt.name}</td>
            <td>{appt.reason}</td>
            <td><p className={styles.completedStatus}>{appt.status}</p></td>
            <td><button className={styles.actionBtn} onClick={onViewButton}>View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

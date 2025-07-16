import styles from "../../styles/Appointment.module.css";

export default function Cancelled() {
  const appointments = [
    {
      id: "P001",
      name: "Aditya Kumar",
      reason: "Fever and cold",
      status: "Cancelled",
    },
    {
      id: "P002",
      name: "Ankit Mishra",
      reason: "Back pain",
      status: "Cancelled",
    },
    {
      id: "P003",
      name: "Abhishek ",
      reason: "Headache",
      status: "Cancelled",
    },
    {
      id: "P004",
      name: "Abhay Singh ",
      reason: "Dizziness",
      status: "Cancelled",
    },
    {
      id: "P005",
      name: "Adarsh Verma ",
      reason: "Back Pain",
      status: "Cancelled",
    },
    {
      id: "P006",
      name: "Aryan Gupta ",
      reason: "Vomitting",
      status: "Cancelled",
    },
  ];
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
            <tr key={appt.id}>
              <td>{idx + 1}</td>
              <td>{appt.id}</td>
              <td>{appt.name}</td>
              <td>{appt.reason}</td>
              <td>
                <p className={styles.cancelledStatus}>{appt.status}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

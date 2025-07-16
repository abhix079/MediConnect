import styles from "../../styles/Appointment.module.css";

export default function Upcoming() {
  const appointments = [
    {
      id: "P001",
      name: "Aditya Kumar",
      reason: "Fever and cold",
      status: "Upcoming",
    },
    {
      id: "P002",
      name: "Ankit Mishra",
      reason: "Back pain",
      status: "Upcoming",
    },
    {
      id: "P003",
      name: "Abhishek ",
      reason: "Headache",
      status: "Upcoming",
    },
    {
      id: "P004",
      name: "Abhay Singh ",
      reason: "Dizziness",
      status: "Upcoming",
    },
    {
      id: "P005",
      name: "Adarsh Verma ",
      reason: "Back Pain",
      status: "Upcoming",
    },
    {
      id: "P006",
      name: "Ananya Srivastava ",
      reason: "Fever and Cold",
      status: "Upcoming",
    },
    {
      id: "P007",
      name: "Anishka Srivastava ",
      reason: "Viral Fever",
      status: "Upcoming",
    },
    {
      id: "P008",
      name: "Aditya Singh ",
      reason: "Vomitting",
      status: "Upcoming",
    },
    {
      id: "P006",
      name: "Nitish Rana ",
      reason: "Elbow Fracture",
      status: "Upcoming",
    },
    {
      id: "P009",
      name: "Akshay Goyal ",
      reason: "Dengue",
      status: "Upcoming",
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
                <p className={styles.upcomingStatus}>{appt.status}</p>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

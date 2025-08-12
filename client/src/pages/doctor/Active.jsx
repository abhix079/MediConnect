import styles from "../../styles/Appointment.module.css";

export default function Active({ appointments, onContinueButton }) {
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
                  <button className={styles.actionBtn} onClick={onContinueButton}>
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

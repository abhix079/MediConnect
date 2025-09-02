import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Upcoming({
  appointments,
  setAppointments,
  onActivate,
}) {
  useEffect(() => {
    const fetchAppointments = async () => {
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

        // Filter only upcoming patients
        const upcomingPatients = res.data.filter(
          (patient) => patient.status === "Upcoming"
        );
        setAppointments(upcomingPatients);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [setAppointments]);

  const handleTurnIn = async (id) => {
    try {
      let token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("doctorToken");
      const res = await axios.patch(
        `https://mediconnect-02qp.onrender.com/api/patients/${id}/active`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const activatedPatient = appointments.find((appt) => appt._id === id);

      setAppointments((prev) => prev.filter((appt) => appt._id !== id));

      if (onActivate && activatedPatient) {
        onActivate(activatedPatient);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

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
                  <p className={styles.upcomingStatus}>{appt.status}</p>
                </td>
                <td>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleTurnIn(appt._id)}
                  >
                    Turn In
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

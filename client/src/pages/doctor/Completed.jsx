import { useEffect, useState } from "react";
import styles from "../../styles/Appointment.module.css";
import axios from "axios";

export default function Completed({ appointments, setAppointments, onViewButton }) {


  useEffect(() => {
 
    
    const fetchAppointments = async () => {
      try {
       
        
        let token =
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("doctorToken");

       

      

        const payload = JSON.parse(atob(token.split(".")[1]));
        const doctorId = payload.id;
       
        
    

        const res = await axios.get(
          `https://mediconnect-02qp.onrender.com/api/patients/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       

        // Filter only completed patients
        const completedPatients = res.data.filter(
          (patient) => patient.status === "Completed"
        );

        
        setAppointments(completedPatients);
     
      } catch (err) {
        console.error("Error fetching appointments:", err);
        
        setAppointments([]);
       
      }
    };

    fetchAppointments();
  }, [setAppointments]);



  return (
    <div>
      
      {appointments.length === 0 ? (
        <p className={styles.noPatient}>No completed patients.</p>
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
    </div>
  );
}
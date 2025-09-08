import styles from "../styles/Dialog.module.css";
import { FaUser } from "react-icons/fa";

export default function CompletedDialog({ closeDialog, patient }) {
  return (
    <div className={styles.dialogBox}>
      <div className={styles.dialogHeader}>
        <h2>Patient Details</h2>
        <button className={styles.btn} onClick={closeDialog}>
          Close
        </button>
      </div>

      <div className={styles.patientDetail}>
        <p className={styles.dialogHeadings}>Personal Details</p>
        <div className={styles.personalDetail}>
          <div className={styles.leftSide}>
            <p><strong>Patient ID : </strong> {patient.patientId}</p>
            <p><strong>Name : </strong> {patient.name}</p>
            <p><strong>Age : </strong> {patient.age}</p>
            <p><strong>Gender : </strong> {patient.gender}</p>
            <p><strong>Address : </strong> {patient.address}</p>
          </div>
          <div className={styles.rightSide}><FaUser size={60} /></div>
        </div>

        <p className={styles.dialogHeadings}>Medical Details</p>
        <div className={styles.medicalDetail}>
          <p><strong>Referred By : </strong> 
            {patient.referredBy?.firstName} {patient.referredBy?.lastName}
          </p>
          <p><strong>Symptom / Reason : </strong> {patient.reason}</p>
          {patient.prescription && (
            <p><strong>Prescription : </strong> {patient.prescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}

import styles from "../styles/Dialog.module.css";
import { FaUser } from "react-icons/fa";

export default function ActiveDialog({closeDialog}){
    return (
        <>
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
                          <p><strong>Patient ID : </strong> P001</p>
                          <p><strong>Name : </strong> Aditya Kumar</p>
                          <p><strong>Age : </strong>22</p>
                          <p><strong>Gender : </strong>Male</p>
                          
                          <p><strong>Address : </strong>Raptinagar Phase-4, Gorakhpur, 273003</p>
                        </div> 
        
                        <div className={styles.rightSide}>
                          <FaUser size={60} />
                        </div>
                      </div>
                      <p className={styles.dialogHeadings}>Medical Details</p>
                      <div className={styles.medicalDetail}>
                        <p><strong>Referred By : </strong> Dr. Ankit</p>
                        <p><strong>Symptom / Reason : </strong>Cold and Fever</p>
                      </div>
                      <button className={styles.completeButton}onClick={closeDialog}>Complete Checkup</button>
                    </div>
                  </div>
        </>
    )
}
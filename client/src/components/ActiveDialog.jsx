import styles from "../styles/Dialog.module.css";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ActiveDialog({ closeDialog, patientData }) {

  const handleCompleteCheckup = async () => {
    try {
      let token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("doctorToken");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      // Call API to update patient status to "Completed"
      const res = await axios.patch(
        `https://mediconnect-server-tfit.onrender.com/api/patients/${patientData._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Checkup Completed Successfully!");
      closeDialog();
      // Add a small delay before reload to show the toast
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to complete checkup:", error);
      toast.error("Failed to complete checkup. Please try again.");
    }
  };

  // If no patient data is provided, show default or loading state
  if (!patientData) {
    return (
      <div className={styles.dialogBox}>
        <div className={styles.dialogHeader}>
          <h2>Patient Details</h2>
          <button className={styles.btn} onClick={closeDialog}>
            Close
          </button>
        </div>
        <div className={styles.patientDetail}>
          <p>Loading patient data...</p>
        </div>
      </div>
    );
  }

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
              <p>
                <strong>Patient ID : </strong> {patientData.patientId}
              </p>
              <p>
                <strong>Name : </strong> {patientData.name}
              </p>
              <p>
                <strong>Age : </strong> {patientData.age}
              </p>
              <p>
                <strong>Gender : </strong> {patientData.gender}
              </p>
              <p>
                <strong>Mobile : </strong> {patientData.mobile}
              </p>
              <p>
                <strong>Email : </strong> {patientData.email || "Not provided"}
              </p>
              <p>
                <strong>Address : </strong> {patientData.address}
              </p>
            </div>

            <div className={styles.rightSide}>
              <FaUser size={60} />
            </div>
          </div>
          <p className={styles.dialogHeadings}>Medical Details</p>
          <div className={styles.medicalDetail}>
            <p>
              <strong>Referred By : </strong> 
              Dr. {patientData.referredBy?.firstName} {patientData.referredBy?.lastName}
            </p>
            <p>
              <strong>Symptom / Reason : </strong> {patientData.reason}
            </p>
            {patientData.prescription && (
              <p>
                <strong>Prescription : </strong> {patientData.prescription}
              </p>
            )}
          </div>
          <button 
            className={styles.completeButton} 
            onClick={handleCompleteCheckup}
          >
            Complete Checkup
          </button>
        </div>
      </div>
    </>
  );
}
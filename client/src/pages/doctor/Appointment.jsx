import { useState } from "react";
import styles from "../../styles/Appointment.module.css";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import Pending from "./Pending";
import Active from "./Active";
import ActiveDialog from "../../components/ActiveDialog";
import CompletedDialog from "../../components/CompletedDialog";

export default function Appointment({ goBack }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); 
  const [selectedPatient, setSelectedPatient] = useState(null);


  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  const handleActivate = (patient) => {
   
    setUpcomingAppointments((prev) => prev.filter((appt) => appt._id !== patient._id));
  
    if (activeTab === "active") {
      
      setActiveAppointments([]);
    }
  };

  const handleContinueButton = (patient) => {
    setSelectedPatient(patient);
    setDialogType("active");
    setShowDialog(true);
  };

  const handleViewButton = (patient) => {
    setSelectedPatient(patient);
    setDialogType("completed");
    setShowDialog(true);
  };

  const handlePatientCompleted = (completedPatientId) => {
    
    setActiveAppointments(prev => 
      prev.filter(appt => appt._id !== completedPatientId)
    );
    
   
    setCompletedAppointments([]);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogType("");
    setSelectedPatient(null);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContent}>
        <h2>Appointments</h2>
        <button className={styles.btn} onClick={goBack}>Back</button>
      </div>

      <div className={styles.header}>
        <button
          className={`${styles.headerBtn} ${activeTab === "upcoming" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`${styles.headerBtn} ${activeTab === "active" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={`${styles.headerBtn} ${activeTab === "pending" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`${styles.headerBtn} ${activeTab === "completed" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`${styles.headerBtn} ${activeTab === "cancelled" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
      </div>

      <div className={styles.tableContainer}>
        {activeTab === "upcoming" && (
          <Upcoming
            appointments={upcomingAppointments}
            setAppointments={setUpcomingAppointments}
            onActivate={handleActivate}
          />
        )}
        {activeTab === "active" && (
          <Active 
            appointments={activeAppointments} 
            setAppointments={setActiveAppointments}
            onContinueButton={handleContinueButton} 
          />
        )}
        {activeTab === "pending" && <Pending onContinueButton={handleContinueButton} />}
        {activeTab === "completed" && (
          <Completed 
            appointments={completedAppointments}
            setAppointments={setCompletedAppointments}
            onViewButton={handleViewButton} 
          />
        )}
        {activeTab === "cancelled" && (
  <Cancelled 
    appointments={cancelledAppointments}
    setAppointments={setCancelledAppointments}
  />
)}
      </div>

      {showDialog && (
        <div className={styles.dialogOverlay}>
          {dialogType === "active" && (
            <ActiveDialog 
              closeDialog={closeDialog} 
              patientData={selectedPatient}
            />
          )}
          {dialogType === "completed" && (
            <CompletedDialog 
              patient={selectedPatient}
              closeDialog={closeDialog} 
              onPatientCompleted={handlePatientCompleted}
            />
          )}
        </div>
      )}
    </div>
  );
}
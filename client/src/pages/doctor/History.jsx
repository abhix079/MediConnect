import styles from "../../styles/History.module.css";

export default function History ({goBack}){
const appointments = [
    {
      id: "P001",
      name: "Aditya Kumar",
      reason: "Fever and cold",
      status: "Completed",
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
      status: "Completed",
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
      status: "Completed",
    }
    ,
    {
      id: "P007",
      name: "Anishka Srivastava ",
      reason: "Viral Fever",
      status: "Cancelled",
    },
    {
      id: "P006",
      name: "Ananya Srivastava ",
      reason: "Fever and Cold",
      status: "Completed",
    },
    {
      id: "P008",
      name: "Nitish ",
      reason: "Vomitting",
      status: "Cancelled",
    },
    
  ];
    
    return (
        <>
       <div className={styles.mainContainer}>
        <div className={styles.topContent}>
                <h2>Appointments History</h2>
                <button className={styles.btn} onClick={goBack}>Back</button>
              </div>
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
                              {appointments.map((appt,idx)=>(
                                  <tr key={appt.id}>
                                    <td>{idx+1}</td>
                                    <td>{appt.id}</td>
                                     <td>{appt.name}</td>
                                     <td>{appt.reason}</td>
                                     <td >< p className={
                                              appt.status === "Cancelled" ? styles.cancelledStatus :
                                    
                                              appt.status==="Completed" ? styles.activeStatus :
                                              ""
                                     }>{appt.status}</p></td>
                                    
                                      </tr>
              
                              ))}
                          </tbody>
                      </table>
              
       </div>
        </>
    );
}
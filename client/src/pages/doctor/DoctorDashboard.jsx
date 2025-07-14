import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import styles from "../../styles/DoctorDashboard.module.css";

export default function DoctorDashboard(){

    const [greeting,setGreeting]=useState("");

    useEffect(()=>{
        const updateGreeting=()=>{
            const hour= new Date().getHours();
            if (hour<12){
                setGreeting("Morning");
            }
            else if (hour<17){
                setGreeting("Afternoon");

            }
            else{
                setGreeting("Evening");
            }
            

        };
        updateGreeting();
    },[]);
    return(
        <>
        <div className={styles.mainContainer}>
            <Navbar/>
       <div className={styles.greetingMsg}>
       <h2>Good {greeting}, Dr. Ankit</h2>
       <p>You have 3 appointments scheduled today.</p>
       </div>
        </div>
        
        </>
    )
}
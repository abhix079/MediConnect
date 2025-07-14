import styles from "../components/Logo.module.css";
import logo from "../assets/logo.png";


export default function Logo(){
    return (
        <>
        <div className={styles.logoContainer}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            <span>Connecting The</span> Pharma World
          </p>
        </div>
        </>
    )
}
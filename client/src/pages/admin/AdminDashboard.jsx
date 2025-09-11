import { useEffect, useState } from "react";
import AdminNavbar from "../admin/AdminNavbar";
import styles from "../../styles/AdminDashboard.module.css";
import AddUser from "./AddUser";
import ManageUser from "./ManageUser";
import ChatWidget from "../../components/ChatWidget"; // ⬅️ import

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState("addUser");

  return (
    <div className={styles.mainContainer}>
      <AdminNavbar
        onAddUser={() => setCurrentView("addUser")}
        onManageUser={() => setCurrentView("manageUser")}
        selected={currentView}
      /> 

      {currentView === "addUser" && (
        <div className={styles.addUserContainer}>
          <AddUser />
        </div>
      )}

      {currentView === "manageUser" && (
        <div className={styles.manageUserContainer}>
          <ManageUser goBack={() => setCurrentView("addUser")} />
        </div>
      )}

      {/* 🔹 Floating chat */}
      <ChatWidget role="Admin" name="Admin" />
    </div>
  );
}

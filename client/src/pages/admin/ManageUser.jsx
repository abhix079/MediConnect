import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/ManageUser.module.css";

export default function ManageUser({ goBack }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/getUsers");
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      const res = await axios.delete(`http://localhost:8000/api/users/${userId}`);
      if (res.status === 200) {
        fetchUsers(); // Refresh list
      }
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContent}>
        <h2>Manage Users</h2>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search User" />
          <button className={styles.searchBtn}>Search</button>
        </div>
        <button className={styles.btn} onClick={goBack}>
          Back
        </button>
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Mobile No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.userId}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>
                <p className={
                    user.role === "Staff"
                      ? styles.staffStatus
                      : user.role === "Doctor"
                      ? styles.doctorStatus
                      : user.role === "Admin"
                      ? styles.adminStatus
                      : ""
                  }
                >
                  {user.role}
                </p>
              </td>
              <td>{user.phone}</td>
              <td>
                <button className={styles.actionBtn}>Edit</button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

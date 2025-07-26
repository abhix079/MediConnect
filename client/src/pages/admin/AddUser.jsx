import { useState } from "react";
import axios from "axios";
import styles from "../../styles/AddUser.module.css";
import { toast } from "react-hot-toast";

export default function AddUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    department: "",
    role: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users/addUser", formData);
      const { token, userId } = res.data;

      localStorage.setItem("token", token); // ✅ store token
      toast.success("User added successfully");

      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
        email: "",
        department: "",
        role: "",
        gender: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContent}>
        <h2>Add Users</h2>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Firstname" required />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Lastname" required />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>

          <div className={styles.row}>
            <div>
              <label htmlFor="department">Department</label>
              <input type="text" id="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option> {/* ✅ FIXED */}
            </select>
          </div>

          <div className={styles.row}>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            </div>
          </div>

          <div>
            <button type="submit" className={styles.addBtn}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "../../styles/RegisterPatient.module.css";

export default function RegisterPatient({ goBack }) {
  const [activeTab, setActiveTab] = useState("newAppointment");
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    reason: "",
    referredBy: "",
    address: ""
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/getDoctors");
        setDoctors(res.data);
      } catch (error) {
        toast.error("Failed to load doctors list");
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/patients/register", formData);
      toast.success("Patient registered successfully");

      // Clear form
      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        reason: "",
        referredBy: "",
        address: ""
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to register patient";
      toast.error(`${errMsg}`);
      console.error(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
    
      <div className={styles.topContent}>
        <h2>Register Patient</h2>
      </div>

      <div className={styles.header}>
        <button
          className={`${styles.headerBtn} ${
            activeTab === "newAppointment" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("newAppointment")}
        >
          New Appointment
        </button>
        <button
          className={`${styles.headerBtn} ${
            activeTab === "reschedule" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reschedule")}
        >
          Reschedule Appointment
        </button>
      </div>

      {activeTab === "newAppointment" && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient's name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Mobile No:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason / Symptom:</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="E.g., fever, cough"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Referred By:</label>
            <select
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
              required
            >
              <option value="">Select referring doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={`${doc.firstName} ${doc.lastName}`}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
              <option value="Self">Self</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Address:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              
              required
            ></input>
          </div>

          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
      )}

      {activeTab === "reschedule" && (
        <div className={styles.rescheduleContainer}>
          <input
            type="search"
            placeholder="Enter Mobile No."
            className={styles.searchBar}
          />
          <center>Error 404 : This page is under maintenance</center>
        </div>
      )}
    </div>
  );
}

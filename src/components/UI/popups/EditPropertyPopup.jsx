import React, { useState } from "react";
import axios from "axios";
import "../../../assets/css/EditUserPopup.css";
import { BASE_URL } from "../../../utils/constants";

export default function EditPopup(props) {
  //popup open and close logic
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  //api

  const handleEdit = async (event) => {
    event.preventDefault(); //used this to pause console for debugging
    const formData = new FormData(event.target); // to store data coming from html form (input feilds)
    try {
      const response = await axios.put(`${BASE_URL}/admin/edit-user`, {
        userID: props.userID,
        userName: formData.get("name"),
        DOB: formData.get("dob"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      });
      if (response?.data) {
        setPopup(false);
        window.location.reload();
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div className="pop-up-body">
      <button className="button blue-button fs-4" onClick={togglePopup}>
        Edit
      </button>

      {popup && (
        <div className="popup">
          <div onClick={togglePopup} className="overlay"></div>
          <div className="popup-content w-25 p-5">
            <h2 className="text-center fs-5">Edit {props.editType}</h2>
            <form id="editForm" onSubmit={handleEdit}>
              <label className="edit-labels" for="name">
                Property Owner
              </label>
              <input
                className="edit-inputs"
                defaultValue={props.userName}
                type="text"
                id="name"
                name="name"
                required
              />

            <label className="edit-labels" for="name">
                Property Tenant
              </label>
              <input
                className="edit-inputs"
                defaultValue={props.userName}
                type="text"
                id="name"
                name="name"
                required
              />

            <label className="edit-labels" for="name">
                Rent Amount
              </label>
              <input
                className="edit-inputs"
                defaultValue={props.userName}
                type="text"
                id="name"
                name="name"
                required
              />

              <label className="edit-labels" for="email">
                Status
              </label>
              <input
                className="edit-inputs"
                defaultValue={props.userEmail}
                type="email"
                id="email"
                name="email"
                required
              />

              <label className="edit-labels" htmlFor="phone">
                Property Address
              </label>
              <input
                className="edit-inputs"
                defaultValue={props.userPhone}
                type="tel"
                id="phone"
                name="phone"
                pattern="^\d{11}$"
                title="Enter 11-digit number"
                required
              />

              <div style={{ textAlign: "center" }}>
                <button className="button blue-button fs-5 mt-3" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <button
              className="button red-button close-popup mt-1 me-1"
              onClick={togglePopup}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

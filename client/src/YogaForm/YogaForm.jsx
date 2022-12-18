import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import "./YogaForm.css";
export const YogaForm = () => {
  const [typeSelected, setTypeSelected] = useState("Register");
  const [submitType, setSubmitType] = useState();
  const name = useRef();
  const email = useRef();
  const mobilephone = useRef();
  const dateofbirth = useRef();
  const [batchtime, setBatchtime] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let body = {
        fullName: name.current.value,
        mailId: email.current.value,
        mobile: mobilephone.current.value,
        dob: dateofbirth.current.value,
        batch: batchtime,
      };
      console.log(dateofbirth.current.value);
      const res = await axios.post("/api/user/register", body);
      // 		http://localhost:8800
      alert("Register and payment successfull.");
    } catch (error) {
      console.log(error);
      alert("Register failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (submitType === "update") {
      try {
        let body = {
          mailId: email.current.value,
          batch: batchtime,
        };
        const res = await axios.post("/api/user/update", body);
        alert("user updated successfully.");
      } catch (error) {
        console.log(error);
        alert("Update failed");
      }
    } else {
      try {
        let body = {
          mailId: email.current.value,
        };
        const res = await axios.post("/api/user/pay", body);
        alert("Payment successfull.");
      } catch (error) {
        console.log(error);
        alert("payment failed");
      }
    }
  };

  return (
    <div className="right">
      <div className="rightTop">
        <div
          className={typeSelected === "Register" ? "selected item" : "item"}
          onClick={() => setTypeSelected("Register")}
        >
          Register
        </div>
        <div
          className={typeSelected === "existing" ? "selected item" : "item"}
          onClick={() => {
            setTypeSelected("existing");
          }}
        >
          Existing
        </div>
      </div>
      <div className="rightBottom">
        {typeSelected === "Register" ? (
          <form onSubmit={handleRegister}>
            <div className="inputItem">
              <label htmlFor="name">Name</label>
              <input
                className="input"
                type="text"
                id="name"
                placeholder="Your Full Name"
                name="name"
                ref={name}
                required
              />
            </div>
            <div className="inputItem">
              <label htmlFor="email">Email</label>
              <input
                className="input"
                type="text"
                id="email"
                placeholder="Your Email"
                name="email"
                ref={email}
                required
              />
            </div>
            <div className="inputItem">
              <label htmlFor="name">Mobile</label>
              <input
                className="input"
                type="mobile"
                id="name"
                placeholder="Your Personal Number"
                name="mobile"
                ref={mobilephone}
                required
              />
            </div>
            <div className="inputItem">
              <label htmlFor="dob">DOB</label>
              <input
                className="input"
                type="Date"
                id="dob"
                placeholder="Your DOB"
                name="dob"
                ref={dateofbirth}
                required
              />
            </div>
            <div className="inputItem">
              <label htmlFor="batch">Batch Time</label>
              <div className="radioInput">
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="5-6"
                    onClick={() => setBatchtime("5-6")}
                  />
                  <label for="none">5-6</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="6-7"
                    onClick={() => setBatchtime("6-7")}
                  />
                  <label for="none">6-7</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="7-8"
                    onClick={() => setBatchtime("7-8")}
                  />
                  <label for="none">7-8</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="8-9"
                    onClick={() => setBatchtime("8-9")}
                  />
                  <label for="none">8-9</label>
                </div>
              </div>
            </div>
            <div className="inputItem">
              <label htmlFor="fee">Fee (in Rs.)</label>
              <input
                className="input"
                type="Number"
                id="fee"
                placeholder="Rs 500"
                name="fee"
                value="500"
                readonly
              />
            </div>
            <button type="submit" className="btn">
              Pay and Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="inputItem">
              <label htmlFor="email">Email</label>
              <input
                className="input"
                type="text"
                id="email"
                placeholder="Your Email"
                name="email"
                ref={email}
                required
              />
            </div>
            <div className="inputItem">
              <label htmlFor="batch">Batch Time</label>
              <div className="radioInput">
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="5-6"
                    onClick={() => setBatchtime("5-6")}
                  />
                  <label for="none">5-6</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="6-7"
                    onClick={() => setBatchtime("6-7")}
                  />
                  <label for="none">6-7</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="7-8"
                    onClick={() => setBatchtime("7-8")}
                  />
                  <label for="none">7-8</label>
                </div>
                <div className="radioInputItem">
                  <input
                    type="radio"
                    id="none"
                    name="batch"
                    value="8-9"
                    onClick={() => setBatchtime("8-9")}
                  />
                  <label for="none">8-9</label>
                </div>
              </div>
            </div>
            <button
              className="btn"
              type="submit"
              onClick={() => setSubmitType("update")}
            >
              Update Info
            </button>
            <div className="inputItem">
              <label htmlFor="fee">Fee (in Rs.)</label>
              <input
                className="input"
                type="Number"
                id="fee"
                placeholder="Rs 500"
                name="fee"
                value="500"
                readonly
              />
            </div>
            <button
              type="submit"
              className="btn"
              onClick={() => setSubmitType("pay")}
            >
              Pay Fee
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

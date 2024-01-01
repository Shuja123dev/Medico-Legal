import React, { useState, useEffect, useRef } from 'react'
import Card from '../../../components/mainPageCard/MainPagesCard'
import '../signUpVerification/signUpVerification.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const SignUpVerification = () => {
  const inputsRef = useRef(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const phoneNumber = Cookies.get('PhoneNumber');
  const baseURL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const inputs = inputsRef.current;

    const handleInput = (e) => {
      const target = e.target;
      const val = target.value;

      if (isNaN(val)) {
        target.value = "";
        return;
      }

      if (val !== "") {
        const next = target.nextElementSibling;
        if (next) {
          next.focus();
        }
      }

      const otpValues = Array.from(inputs.children).map((input) => input.value);
      setOtp(otpValues.join(""));
    };

    const handleKeyUp = (e) => {
      const target = e.target;
      const key = e.key.toLowerCase();

      if (key === "backspace" || key === "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
          prev.focus();
        }
        return;
      }
    };

    inputs.addEventListener("input", handleInput);
    inputs.addEventListener("keyup", handleKeyUp);

    return () => {
      inputs.removeEventListener("input", handleInput);
      inputs.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  console.log(otp);
  const handleVerification = async () => {
    await axios.post(baseURL + "/api/verifyOTP", {
      PhoneNo: phoneNumber,
      OTP: otp
    }).then(res => {
      console.log(res);
      if (res.data.response.status) {
        Cookies.remove("PhoneNumber")
        navigate('/signup/services-form')
      }
      else
        alert("Wrong OTP")
    })

    if (otp.length === 5) {
    }
  };

  return (
    <div className='container-fluid d-flex justify-content-center mt-5 pt-5'>
      <div className='signup-ver-container d-flex flex-column justify-content-center align-items-center'>
        <Card>
          <h4 className='signup-ver-title text-center'>OTP Verification</h4>
          <p className='signup-ver-text text-center'>Please enter the OTP sent to your mobile number</p>
          <div className='d-flex justify-content-center'>
            <div ref={inputsRef} className="otpInput__inner">
              <input
                className="otpInput__input"
                type="text"
                inputMode="numeric"
                maxLength="1"
              />
              <input
                className="otpInput__input"
                type="text"
                inputMode="numeric"
                maxLength="1"
              />
              <input
                className="otpInput__input"
                type="text"
                inputMode="numeric"
                maxLength="1"
              />
              <input
                className="otpInput__input"
                type="text"
                inputMode="numeric"
                maxLength="1"
              />
              <input
                className="otpInput__input"
                type="text"
                inputMode="numeric"
                maxLength="1"
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn signup-ver-btn' onClick={handleVerification}>Verify</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SignUpVerification
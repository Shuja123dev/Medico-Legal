import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

const SignUpVerification = () => {

  const verifyOtp = async () => {
    await axios.post("http://202.182.110.16/medical/api/verifyOTP", {
      p_phoneno: "03325501021",
      p_otp: "594897"
    }, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzg1NDkyLCJleHAiOjE3MDI1NTgyOTJ9.pRH7vwqE2lRofrSc3LsrRfaXO3T7rxg2wonTEs0TXTA`
      }
    }).then(response => {
      console.log(response);
    })
  }

  const getCookies = () => {
    const value = Cookies.get('token')
    console.log(value);
  }

  const saveCookies = () => {
    Cookies.set('token2', "1234567", { expires: 7 })
    console.log("saved");
  }


  return (
    <>
      <div>SignUpVerification</div>
      <button onClick={getCookies}>Verify Otp</button>
      <button onClick={saveCookies}>Verify Otp</button>
    </>
  )
}

export default SignUpVerification
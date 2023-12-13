import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { InputBox } from '../../views/user/components'

const SignUpVerification = () => {

  const [otpValue, setOTPvalue] = useState();
  const [apiResponse, setApiResponse] = useState();

  const verifyOtp = async () => {
    await axios.post("http://202.182.110.16/medical/api/verifyOTP", {
      PhoneNo: "03325501021",
      OTP: otpValue
    }, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzg1NDkyLCJleHAiOjE3MDI1NTgyOTJ9.pRH7vwqE2lRofrSc3LsrRfaXO3T7rxg2wonTEs0TXTA`
      }
    }).then(response => {
      console.log(response);
      setApiResponse(response.data.response)
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
      <InputBox
        placeholder={"OTP.."}
        value={otpValue}
        type={"number"}
        onChange={(e) => setOTPvalue(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify Otp</button>
      {apiResponse.status ? <p>Correct OTP</p> : <p>Incorrect OTP</p>}

    </>
  )
}

export default SignUpVerification
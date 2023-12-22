import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from '../pageNotFound'
import SignUpForm from './signUpForm/SignUpForm'
import SignUpVerification from './signUpVerification/SignUpVerification'
import SignUpMeetSetup from './signUpMeetSetup/SignUpMeetSetup'
import SignUpServices from './signUpServices/SignUpServices'
import SignUpCredit from './signUpCredit/SignUpCredit'

const SignUp = () => {
  return (
    <>
      <Routes>
        <Route exect path="/" element={<SignUpForm />} />
        <Route path="/verification" element={<SignUpVerification />} />
        <Route path="/meet-setup" element={<SignUpMeetSetup />} />
        <Route path="/services-form" element={<SignUpServices />} />
        <Route path="/credit" element={<SignUpCredit />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default SignUp
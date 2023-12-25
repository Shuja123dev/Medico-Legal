import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpCredit from './signUpCredit/SignUpCredit'
import SignUpForm from './signUpForm/SignUpForm'
import SignUpServices from './signUpServices/SignUpServices'
import SignUpVerification from './signUpVerification/SignUpVerification'
import SignUpMeetSetup from './signUpMeetSetup/SignUpMeetSetup'
import PageNotFound from '../pageNotFound'
import HeaderWithoutCTA from '../../components/header/headerWithoutCTA'

const SignUp = () => {
  return (
    <>
      <HeaderWithoutCTA />
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
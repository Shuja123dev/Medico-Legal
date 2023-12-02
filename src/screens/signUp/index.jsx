import React from 'react'
import { Routes, Route} from 'react-router-dom'
import SignUpCredit from './SignUpCredit'
import SignUpForm from './signUpForm/SignUpForm'
import SignUpServices from './SignUpServices'
import SignUpVerification from './SignUpVerification'
import SignUpMeetSetup from './SignUpMeetSetup'
import PageNotFound from '../pageNotFound'

const SignUp = () => {
  return (
        <>
            <Routes>
                <Route exect path="/" element={<SignUpForm/>} />
                <Route path="/verification" element={<SignUpVerification/>} />
                <Route path="/meet-setup" element={<SignUpMeetSetup/>} />
                <Route path="/services-form" element={<SignUpServices/>} />
                <Route path="/credit" element={<SignUpCredit/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </>
  )
}

export default SignUp
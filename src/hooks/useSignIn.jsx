import axios from 'axios';
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';


const useSignIn = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phoneNumber.trim() || !formData.password.trim()) {
      newErrors.fillAllFields = true;
    }
    else {
      const phoneRegex = /^(\+966|0)(5\d{8})$/;
      if (!formData.phoneNumber.match(phoneRegex)) {
        newErrors.phoneNumber = true;
      }

      // Validate Password Length
      if (formData.password.length < 8) {
        newErrors.password = true;
      }
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Perform signup or submission logic
      console.log('Form is valid, submit the data:', formData);
    } else {
      console.log('Form contains errors, please correct them.');
    }

    // const response = await axios.post("http://202.182.110.16/medical/api/login", {
    //   "user": {
    //     "uid": 1,
    //     "phoneno": "03325501021"
    //   },
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxODY3Mjg0LCJleHAiOjE3MDIwNDAwODR9.O9R5nieg3L0roq34528KeAIbvbppbZRZpIg7PT99mqc"
    // })
    // console.log(response);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form data based on the input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useSignIn;
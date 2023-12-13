import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const useSignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profession: '',
    doctorType: '',
    isExistingCase: '',
    Email: '',
    adress: 'adress 77'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      newErrors.fillAllFields = true;
    }
    else {
      const phoneRegex = /^(\+966|0)(5\d{8})$/;
      if (!formData.phoneNumber.trim().match(phoneRegex)) {
        newErrors.phoneNumber = true;
      }

      // Validate Password Length
      if (formData.password.length < 8) {
        newErrors.password = true;
      } else {

        // Validate Confirm Password

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = true;
        }
      }

    }
    // Validate Profession
    if (!formData.profession) {
      newErrors.profession = true;
    } else if (formData.profession === 'Doctor' && formData.doctorType === '') {
      newErrors.doctorType = true;
    }

    // Additional validation based on experience
    if (!formData.isExistingCase) {
      newErrors.existingCase = true;
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Perform signup or submission logic
      if (formData.existingCase === 'Yes') {
        navigate('meet-setup');
      }
      else {
        navigate('verification');
      }
    } else {
      console.log('Form contains errors, please correct them.');
    }


    // OTP generator
    // await axios.post("http://202.182.110.16/medical/api/generateOTP", {
    //   PhoneNo: "03325501021",
    //   Email: "shuja1339@gmail.com"
    // }, {
    //   headers: {
    //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNDAzMjY0LCJleHAiOjE3MDI1NzYwNjR9.LE15vzh3NAlgIAQKxDi6woFSDr19gn3gPV_vXjr-2GQ`
    //   }
    // }).then(response => {
    //   console.log(response);
    // }).catch(error => {
    //   console.log(error);
    // })

    // signup
    await axios.post("http://202.182.110.16/medical/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.post("http://202.182.110.16/medical/api/signup", {
        PhoneNo: formData.phoneNumber,
        Email: formData.Email,
        ClientName: formData.fullName,
        UserPassword: formData.password,
        ExistingCase: (formData.isExistingCase === "No") ? 0 : 1,
        Type: formData.profession,
        PackageId: 1,
        Address: "abc address"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    })

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form data based on the input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (formData.profession === 'Non Doctor Medical Professional') {
      setFormData((prevData) => ({
        ...prevData,
        doctorType: '',
      }));
    }

  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useSignUp;
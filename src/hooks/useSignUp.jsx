import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { profession } from '../features/profession/professionSlice';
import Cookies from 'js-cookie';

const useSignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profession: '',
    doctorType: '',
    isAestheticGroup: '',
    isExistingCase: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
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
    } else if (formData.doctorType === 'Surgeon' && formData.isAestheticGroup === '') {
      newErrors.isAestheticGroup = true;
    }


    // Additional validation based on experience
    if (!formData.isExistingCase) {
      newErrors.existingCase = true;
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  }

  const generateOTP = async (token) => {
    await axios.post("http://202.182.110.16/medical/api/generateOTP", {
      PhoneNo: formData.phoneNumber,
      Email: formData.email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      navigate('verification');
    })
  }

  const createUser = async () => {
    await axios.post("http://202.182.110.16/medical/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.post("http://202.182.110.16/medical/api/signup", {
        PhoneNo: formData.phoneNumber,
        Email: formData.email,
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
        if (res.status === 200) {
          if (formData.isExistingCase === 'Yes') {
            navigate('meet-setup');
          }
          else {
            console.log("otp");
            generateOTP(token);
          }
        }
      }).catch(error => {
        console.log(error);
      })
    })
  }

  console.log(formData.profession);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Cookies.remove('PhoneNumber');
    createUser();

    if (validateForm()) {

      if (formData.profession === 'Doctor') {
        if (formData.doctorType === 'Surgeon' && formData.isAestheticGroup === 'Yes') {
          dispatch(profession('Aesthetic Surgeon'));
        }
        else if (formData.doctorType === 'Surgeon' && formData.isAestheticGroup === 'No') {
          dispatch(profession('Surgeon'));
        }
        else {
          dispatch(profession(formData.doctorType));
        }
      } else {
        dispatch(profession(formData.profession));
      }

      if (formData.isExistingCase === 'Yes') {
        navigate('meet-setup');
      }
      else {
        navigate('verification');
      }
    } else {

      console.log('Form contains errors, please correct them.', errors);
    }

    // signup
    await axios.post("http://202.182.110.16/medical/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.post("http://202.182.110.16/medical/api/signup", {
        PhoneNo: formData.phoneNumber,
        Email: formData.emailmail,
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
        Cookies.set('PhoneNumber', formData.phoneNumber, { expires: 1 });
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
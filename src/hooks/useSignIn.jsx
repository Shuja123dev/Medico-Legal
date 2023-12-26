import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {

  const [formData, setFormData] = useState({
    PhoneNo: '',
    Password: ''
  });

  const [errors, setErrors] = useState({});




  const validateForm = () => {
    const newErrors = {};

    if (!formData.PhoneNo.trim() || !formData.Password.trim()) {
      newErrors.fillAllFields = true;
    }
    else {
      const phoneRegex = /^(\+966|0)(5\d{8})$/;
      if (!formData.PhoneNo.match(phoneRegex)) {
        newErrors.PhoneNo = true;
      }

      // Validate Password Length
      if (formData.Password.length < 8) {
        newErrors.Password = true;
      }
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    let userRole;
    Cookies.remove('userId');

    event.preventDefault();
    if (validateForm()) {
      // Perform signup or submission logic
      console.log('Form is valid, submit the data:', formData);
    } else {
      console.log('Form contains errors, please correct them.');
    }

    await axios.post("http://202.182.110.16/medical/api/login", {
      ...formData
    }).then(response => {
      const role = response.data.user.role;
      const userId = response.data.user.uid;
      Cookies.set('userId', userId, { expires: 7 });
      if (role === 'E') {
        userRole = 'expert/cases';
      }
      else if (role === 'A') {
        userRole = 'admin/progress';
      }
      else {
        userRole = 'user/packages';
      }

      navigate(`/${userRole}`);
    }).catch(error => {
      console.log(error);
    })

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
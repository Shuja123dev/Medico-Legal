import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const useMeetSetupVerification = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        date: ''
      });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if(!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.email.trim() || !formData.date.trim() ){
        newErrors.fillAllFields = true;
    }
    else
    {
        const phoneRegex = /^(\+966|0)(5\d{8})$/;
        //const emailRegex = /^(\+966|0)(5\d{8})$/;
        if (!formData.phoneNumber.trim().match(phoneRegex)) {
            newErrors.phoneNumber = true;
        }

        // validate email
        // if (!formData.email.trim().match(emailRegex)) {
        //     newErrors.email = true;
        // }

        //validate date
        if(formData.date === '')
        {
            newErrors.date = true;
        }

        //validate date
        if(formData.fullName === '')
        {
            newErrors.fullName = true;
        }

    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
        navigate('/signup/verification');
    } else {
      console.log('Form contains errors, please correct them.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form data based on the input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if(formData.profession === 'Non Doctor Medical Professional'){
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

export default useMeetSetupVerification;
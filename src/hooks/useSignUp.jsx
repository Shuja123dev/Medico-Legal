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
      });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if(!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.password.trim() || !formData.confirmPassword.trim() ){
        newErrors.fillAllFields = true;
    }
    else
    {
        const phoneRegex = /^(\+966|0)(5\d{8})$/;
        if (!formData.phoneNumber.trim().match(phoneRegex)) {
            newErrors.phoneNumber = true;
        }

        // Validate Password Length
    if (formData.password.length < 8) {
        newErrors.password = true;
      }else{

        // Validate Confirm Password
      
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = true;
          }
      }

    }
    // Validate Profession
    if (!formData.profession ) {
      newErrors.profession = true;
    }else if(formData.profession === 'Doctor' && formData.doctorType === ''){
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Perform signup or submission logic
      if (formData.existingCase === 'Yes') {
        navigate('meet-setup');
      }
      else{
        navigate('verification');
      }
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

export default useSignUp;
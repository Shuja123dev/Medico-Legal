import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useCredit = () => {
  const naviagte = useNavigate();
  const service = useSelector(state => state.service.value)

  const [formData, setFormData] = useState({
    cardType: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    promo: '',
    isAgreed: false,
  });

  const [credit, setCredit] = useState({
    amount: '',
    vat: '',
    total: ''
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setCredit({
        amount: service.amount,
        vat: (service.amount * 0.15).toFixed(2),
        total: (service.amount * 1.15).toFixed(2)
      })
    }
  }, [])

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardType) {
      newErrors.cardType = true;
    }

    if (!formData.cardNumber.trim() || !formData.expiryMonth.trim() || !formData.expiryYear.trim() || !formData.cvv.trim()) {
      newErrors.fillAllFields = true;
    }
    else {

      if (formData.cardNumber.length < 16) {
        newErrors.cardNumber = true;
      }

      if (formData.expiryMonth.length < 2) {
        newErrors.expiryMonth = true;
      }

      if (formData.expiryYear.length < 2) {
        newErrors.expiryYear = true;
      }

      if (formData.cvv.length < 4) {
        newErrors.cvv = true;
      }

    }

    if ((Object.keys(newErrors).length === 0) && !formData.isAgreed) {
      newErrors.isAgreed = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form is valid, submit the data:', formData);
      naviagte('/signin')
    } else {
      console.log('Form contains errors, please correct them.', errors);
    }
  };

  const applyPromo = () => {
    console.log('apply')
    if (!promoApplied) {
      setCredit({
        amount: credit.amount - 100,
        vat: ((credit.amount - 100) * 0.15).toFixed(2),
        total: ((credit.amount - 100) * 1.15).toFixed(2)
      })
      setPromoApplied(true)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form data based on the input type
    if (name === 'isAgreed') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: !formData.isAgreed,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

    }
  };


  return {
    formData,
    credit,
    errors,
    handleChange,
    handleSubmit,
    applyPromo,
  };
};

export default useCredit;
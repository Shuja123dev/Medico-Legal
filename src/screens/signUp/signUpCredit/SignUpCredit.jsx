import React,{useState, useEffect} from 'react'
import Card from '../../../components/mainPageCard/MainPagesCard'
import './signUpCredit.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCredit from '../../../hooks/useCredit'

const SignUpCredit = () => {
  const lang = useSelector(state => state.language.value)
  const profession = useSelector(state => state.profession.value)
  const service = useSelector(state => state.service.value)

  const {formData, credit, errors, handleChange, handleSubmit, applyPromo} = useCredit()
  
  const { t } = useTranslation();

  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center'>
      <h1 className='credit-heading text-center mt-5 pt-5'>
        Setup your credit or Mada card
        </h1>
        <div className='credit-container pt-5'>
        
          <Card>
            <div className={`d-flex gap-5 mb-4 mt-3`}>
                <label className={`d-flex gap-2`}>
                  <input
                    type="radio"
                    value="Credit Card"
                    name='cardType'
                    onChange={handleChange}
                  />
                  <span className={`credit-type`}>Credit Card</span>
                </label>
                <label className={`d-flex gap-2`}>
                  <input
                    type="radio"
                    value="Mada Card"
                    name='cardType'
                    onChange={handleChange}
                  />
                  <span className={`credit-type`}>Mada Card</span>
                </label>
            </div>
              {
                  errors.cardType && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.InvalidCardType')}
                    </p>
              }
            <div>
              <div>
                <label className='card-input-label mb-2'>Card Number</label>
                <input type='text' name='cardNumber' placeholder='Card number' className='credit-input mb-3 p-2 w-100' onChange={handleChange}/>
              </div>
              {
                  errors.cardNumber && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.InvalidCardNumber')}
                    </p>
              }
              <div className='d-flex gap-5'>
              
              <div>
                <label className='card-input-label mb-2'>Expiration Date</label>
                <div className='d-flex gap-3'>
                  <input type='text' name='expiryMonth' placeholder='MM' inputMode='numeric' maxLength='2' className='credit-input-date mb-3 p-2' onChange={handleChange}/> /
                  <input type='text' name='expiryYear' placeholder='YY' inputMode='numeric' maxLength='2' className='credit-input-date mb-3 p-2' onChange={handleChange}/>
                </div>
              </div>

              <div>
                <label className='card-input-label mb-2'>CVV</label>
                <input type='text' name='cvv' placeholder='CVV' inputMode='numeric' maxLength='4' className='credit-input mb-3 p-2 w-100' onChange={handleChange}/>
              </div>
              
              </div>
              </div>
              {
                  errors.cvv && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.InvalidCVV')}
                    </p>
              }
              {
                  (errors.expiryMonth || errors.expiryYear ) && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.InvalidExpiryDate')}
                    </p>
              }
              {
                  errors.fillAllFields && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.FillAllFields')}
                    </p>
              }
            <div className='mt-3'>
              <h6 className=''>{service.type} Package for {profession}</h6>
              <div className='credit-subtotal'>
              <span className='amount-label mb-2'>Subtotal :  </span><span className='amount'>{credit.amount}</span>
              </div>
              <div className='cerdit-vat mt-2'>
              <span className='amount-label mb-2'>VAT (15%) :  </span><span className='amount'>{credit.vat}</span>
              </div>
              <div className='d-flex align-items-center gap-3 mt-2'>
                <span className='card-input-label mb-2'>Promo Code</span>
                <input type='text' name='promocode' placeholder='Promo code' className='credit-input-promo mb-3 p-2'/>
                <button className='promo-btn' onClick={applyPromo}>Apply</button>
              </div>
              {
                  errors.promo && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.InvalidPromo')}
                    </p>
              }
              <div className=' d-flex justify-content-between cerdit-total mt-3'>
              <div>
              <span className='amount-label mb-2'>Total :</span><span className='amount total'> {credit.total} </span><span className='currency'> SAR / YEAR </span>
              </div>
              <Link to='/signup/services-form' className='mt-3 change-package-link'>Change Package</Link>
              </div>
            </div>
            <div>
              <p className='terms-and-privacy mt-3'>
              By checking the checkbox below, you agree to our Terms of Use, Privacy Statement
              </p>
              <input type='checkbox' name='isAgreed' className='terms-checkbox mt-2' onChange={handleChange}/> <span className='terms-checkbox-label ms-2'>I agree</span>
              {
                  errors.isAgreed && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('Credit.Errors.Agreed')}
                    </p>
              }
            </div>
            <div className='credit-btn mt-3'>
              <button className='btn text-white w-100' onClick={handleSubmit}>Submit</button>
            </div>
          </Card>
        </div>
    </div>
  )
}

export default SignUpCredit
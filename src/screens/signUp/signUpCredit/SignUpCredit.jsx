import React from 'react'
import Card from '../../../components/mainPageCard/MainPagesCard'
import './signUpCredit.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SignUpCredit = () => {
  const lang = useSelector(state => state.language.value)
  const { t } = useTranslation();
  const navigate = useNavigate()

  const submitHandle = () => {
    console.log('submit')
    navigate('/user')
  };

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
                  />
                  <span className={`credit-type`}>Credit Card</span>
                </label>
                <label className={`d-flex gap-2`}>
                  <input
                    type="radio"
                    value="Mada Card"
                    name='cardType'
                  />
                  <span className={`credit-type`}>Mada Card</span>
                </label>
            </div>
        
            <div>
              <div>
                <label className='card-input-label mb-2'>Card Number</label>
                <input type='text' name='Card Number' placeholder='Card number' className='credit-input mb-3 p-2 w-100'/>
              </div>
              <div className='d-flex gap-5'>
              
              <div>
                <label className='card-input-label mb-2'>Expiration Date</label>
                <div className='d-flex gap-3'>
                  <input type='text' name='Card Number' placeholder='MM' inputMode='numeric' maxLength='2' className='credit-input-date mb-3 p-2'/>
                  <input type='text' name='Card Number' placeholder='YY' inputMode='numeric' maxLength='2' className='credit-input-date mb-3 p-2'/>
                </div>
              </div>
              <div>
                <label className='card-input-label mb-2'>CVV</label>
                <input type='text' name='Card Number' placeholder='CVV' inputMode='numeric' maxLength='4' className='credit-input mb-3 p-2 w-100'/>
              </div>

              </div>
            </div>
            <div className='mt-3'>
              <h6 className=''>General Court Package for Surgeon</h6>
              <div className='credit-subtotal'>
              <span className='amount-label mb-2'>Subtotal :  </span><span className='amount'>5000</span>
              </div>
              <div className='cerdit-vat mt-2'>
              <span className='amount-label mb-2'>VAT (15%) :  </span><span className='amount'>500</span>
              </div>
              <div className='d-flex align-items-center gap-3 mt-2'>
                <span className='card-input-label mb-2'>Promo Code</span>
                <input type='text' name='promocode' placeholder='Promo code' className='credit-input-promo mb-3 p-2'/>
              </div>
              <div className=' d-flex justify-content-between cerdit-total mt-3'>
              <div>
              <span className='amount-label mb-2'>Total :</span><span className='amount total'> 5500 </span><span className='currency'> SAR / YEAR </span>
              </div>
              <Link to='/sign-up/services' className='mt-3 change-package-link'>Change Package</Link>
              </div>
            </div>
            <div>
              <p className='terms-and-privacy mt-3'>
              By checking the checkbox below, you agree to our Terms of Use, Privacy Statement
              </p>
              <input type='checkbox' name='terms' className='terms-checkbox mt-2'/> <span className='terms-checkbox-label ms-2'>I agree</span>
            </div>
            <div className='credit-btn mt-3'>
              <button className='btn text-white w-100' onClick={submitHandle}>Submit</button>
            </div>
          </Card>
        </div>
    </div>
  )
}

export default SignUpCredit
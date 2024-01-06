import React, { useState } from 'react'
import MainPagesCard from '../../../components/mainPageCard/MainPagesCard'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import './signUpForm.css'
import useSignUp from '../../../hooks/useSignUp'
import { FaArrowLeft } from "react-icons/fa";
import logo from '../../../assets/home/RASAN5.png'

const SignUpForm = () => {

  const { t } = useTranslation()

  const lang = useSelector(state => state.language.value)

  const { formData, errors, handleChange, handleSubmit } = useSignUp();

  const [pages, setPages] = useState({
    firstPage: true,
    secondPage: false
  })

  const nextPage = () => {
    setPages({
      firstPage: false,
      secondPage: true
    })
  }

  const prevPage = () => {
    setPages({
      firstPage: true,
      secondPage: false
    })
  }



  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div className='signup-container d-flex justify-content-center align-items-center gap-5 signUpBox'>
        <div className={`company-info d-flex flex-column justify-content-center`}>
          <div className={`company-description ${lang === 'en' ? 'pe-5' : ''} `}>
            <div className={`${lang === 'en' ? 'image-start' : 'image-end'} mb-3`}>
              <img src={logo} className='mid-logo' alt="Logo" style={{ maxHeight: "150px", }} />
            </div>
            <br />
            <p className={`${lang === 'en' ? '' : 'text-end'}`}>
              {t('SignUp.CompanyInfo.Details')}
            </p>
          </div>
          <div className='company-contacts'>
            <h5 className={`${lang === 'en' ? '' : 'text-end'}`}>
              {t('SignUp.CompanyInfo.Contact')}
            </h5>
            <div className={`${lang === 'en' ? '' : 'float-end'}`}>
              <span>support@example.com</span>
              <span> | </span>
              <span>000 - 000 - 000</span>
            </div>
          </div>
        </div>
        <div className='signup-form'>
          <MainPagesCard>
            <div className='signup-form-container'>
              <div className='signup-form-title'>
                <span className={`${lang === 'en' ? '' : 'text-end d-block w-100'}`}>{t('SignUp.Heading')}</span>
                <p className={`${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Subheading')}</p>
              </div>

              <div className='signup-form-inputs'>
                {
                  <div className={`signup-form-inputs  d-flex flex-column gap-3 py-3 ${pages.firstPage ? 'd-block' : 'd-none'}`}>
                    <div className='signup-form-input'>
                      <input type="text" name="fullName" id="fullname" placeholder={t("SignUp.Placeholders.FullName")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                    </div>
                    <div className='signup-form-input'>
                      <input type="email" name="email" id="email" placeholder={t("SignUp.Placeholders.Email")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                    </div>
                    <div className='signup-form-input'>
                      <input type="text" name="phoneNumber" id="PhoneNumber" placeholder={t("SignUp.Placeholders.PhoneNo")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                      {
                        errors.phoneNumber &&
                        <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                          {t('SignUp.Errors.InvalidPhoneNUmber')}
                        </p>
                      }
                      {/* {
                  phoneNoAlreadyExist && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('SignUp.Errors.PhoneNoAlreadyExists')}
                    </p>
                  } */}
                    </div>


                    <div className='signup-form-input'>
                      <input type="password" name="password" id="password" placeholder={t("SignUp.Placeholders.Password")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                    </div>
                    <div className='signup-form-input'>
                      <input type="password" name="confirmPassword" id="confirmPassword" placeholder={t("SignUp.Placeholders.ConfirmPassword")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                    </div>
                    <div>
                      {
                        errors.password &&
                        <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                          {t('SignUp.Errors.InvalidPassword')}
                        </span>
                      }
                      {
                        errors.confirmPassword &&
                        <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                          {t('SignUp.Errors.PasswordMismatch')}
                        </span>
                      }
                      {
                        errors.fillAllFields &&
                        <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                          {t('SignUp.Errors.FillAllFields')}
                        </span>
                      }
                    </div>
                    <div className='signup-form-button'>
                      <button onClick={nextPage}>{t('SignUp.Next')}</button>
                    </div>
                  </div>
                }

                {
                  <div className={`d-flex flex-column gap-4 mt-2 ${pages.secondPage ? 'd-block' : 'd-none'}`}>
                    <div className='pointer' onClick={prevPage}>
                      <span className='text-primary'><FaArrowLeft /> {t('SignUp.Back')}</span>
                    </div>
                    <div className={`signup-form-input d-flex flex-column gap-1 ${lang === 'en' ? '' : 'text-end'}`}>
                      <span className={`profession-heading ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Profession')}</span>
                      <div className={`d-flex flex-column gap-3 ${lang === 'en' ? '' : ''}`}>
                        <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse'}`}>
                          <input
                            type="radio"
                            value="Doctor"
                            name='profession'
                            onChange={handleChange}
                          />
                          <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Doctor')}</span>
                        </label>

                        {
                          formData.profession === 'Doctor' &&
                          <div>
                            <p className={`profession-heading ${lang === 'en' ? 'ms-3' : 'text-end me-3'}`}>{t('SignUp.DoctorType')}</p>
                            <div className={`d-flex gap-3 ${lang === 'en' ? 'ms-3' : 'flex-row-reverse me-3'}`}>

                              <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse '}`}>
                                <input
                                  type="radio"
                                  value="Surgeon"
                                  name='doctorType'
                                  onChange={handleChange}
                                />
                                <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Surgeon')}</span>
                              </label>
                              <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse '}`}>
                                <input
                                  type="radio"
                                  value="Non-Surgeon"
                                  name='doctorType'
                                  onChange={handleChange}
                                />
                                <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.NonSurgeon')}</span>
                              </label>
                            </div>
                            {
                              errors.doctorType &&
                              <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                                {t('SignUp.Errors.InvalidDoctorType')}
                              </span>
                            }
                          </div>
                        }
                        {
                          (formData.profession === 'Doctor' && formData.doctorType === 'Surgeon') &&
                          <div >
                            <p className={`profession-heading ${lang === 'en' ? 'ms-5' : 'text-end me-5 '}`}>{t('SignUp.SurgeonType')}</p>
                            <div className={`d-flex flex-column mb-3 ${lang === 'en' ? 'ms-5' : 'text-end me-5 '}`}>
                              <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.PlasticAndCosmesis')}</span>
                              <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Dermatology')}</span>
                              <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Aneasthesia')}</span>
                              <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.ObstetricAndGynacology')}</span>
                              <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.EmergencyMedicine')}</span>
                            </div>
                            <div className={`d-flex gap-2 ${lang === 'en' ? 'ms-5' : 'me-5'}`}>

                              <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse '}`}>
                                <input
                                  type="radio"
                                  value="Yes"
                                  name='isAestheticGroup'
                                  onChange={handleChange}
                                />
                                <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Yes')}</span>
                              </label>
                              <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse '}`}>
                                <input
                                  type="radio"
                                  value="No"
                                  name='isAestheticGroup'
                                  onChange={handleChange}
                                />
                                <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.No')}</span>
                              </label>

                            </div>
                            {
                              errors.isAestheticGroup &&
                              <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                                {t('SignUp.Errors.InvalidSurgeonType')}
                              </span>
                            }
                          </div>
                        }
                      </div>

                      <label className={`d-flex gap-2 mt-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse '}`}>
                        <input
                          type="radio"
                          name='profession'
                          value="Non Doctor Medical Professional"
                          onChange={handleChange}
                        />
                        <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.NonDoctor')}</span>
                      </label>
                    </div>
                    {
                      errors.profession &&
                      <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                        {t('SignUp.Errors.InvalidProfession')}
                      </span>
                    }

                    <div className={`signup-form-input d-flex flex-column ${lang === 'en' ? '' : 'text-end'}`}>
                      <span className={`profession-heading ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.ExistingCourtCase')}</span>
                      <div className={`d-flex gap-4 ${lang === 'en' ? '' : 'flex-row-reverse'}`}>
                        <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse'}`}>
                          <input
                            type="radio"
                            value="Yes"
                            name='isExistingCase'
                            onChange={handleChange}
                          />
                          <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.Yes')}</span>
                        </label>
                        <label className={`d-flex gap-2 ${lang === 'en' ? '' : 'text-end flex-row-reverse'}`}>
                          <input
                            type="radio"
                            value="No"
                            name='isExistingCase'
                            onChange={handleChange}
                          />
                          <span className={`profession-type ${lang === 'en' ? '' : 'text-end'}`}>{t('SignUp.Placeholders.No')}</span>
                        </label>
                      </div>
                      {
                        errors.existingCase &&
                        <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                          {t('SignUp.Errors.InvalidExistingCourtCase')}
                        </span>
                      }

                    </div>
                    {
                      errors.fillAllFields &&
                      <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                        {t('SignUp.Errors.FillAllFields')}
                      </span>
                    }
                    <div className='signup-form-button'>
                      <button onClick={handleSubmit}>{t('SignUp.SignUp')}</button>
                    </div>
                  </div>
                }
              </div>

              <div className='signup-form-footer'>
                <p className={`${lang === 'en' ? '' : 'text-end'}`}>
                  {t('SignUp.Prompt')}
                  <span>
                    <Link to={'/signin'}>
                      {t('SignUp.PromptLink')}
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </MainPagesCard>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
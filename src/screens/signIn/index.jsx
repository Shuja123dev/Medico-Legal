import React, { useState } from 'react'
import MainPagesCard from '../../components/mainPageCard/MainPagesCard'
import './signIn.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useSignIn from '../../hooks/useSignIn'
import HeaderWithoutCTA from '../../components/header/headerWithoutCTA'
import logo from '../../assets/home/RASAN5.png'

const SignIn = () => {
  const { t } = useTranslation()
  const lang = useSelector(state => state.language.value)

  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
  } = useSignIn();

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <HeaderWithoutCTA />
      <div className='row justify-content-center align-items-center mb-5'>
        <div className='col-md-8 signin-container d-flex justify-content-center align-items-center gap-5'>
          <div className={`company-info d-flex flex-column justify-content-between gap-5`}>
            <div className={`company-description ${lang === 'en' ? 'pe-5' : ''} `}>
              <div className={`${lang === 'en' ? 'image-start' : 'image-end'} mb-3`}>
                <img src={logo} className='mid-logo' alt="Logo" style={{ maxHeight: "150px", }} />
              </div>
              <br />
              <p className={`${lang === 'en' ? '' : 'text-end'}`}>
                {t('SignIn.CompanyInfo.Details')}
              </p>
            </div>
            <div className='company-contacts'>
              <h5 className={`${lang === 'en' ? '' : 'text-end'}`}>
                {t('SignIn.CompanyInfo.Contact')}
              </h5>
              <div className={`${lang === 'en' ? '' : 'float-end'}`}>
                <span>support@example.com</span>
                <span> | 000 - 000 - 000</span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4 d-flex signin-form justify-content-center align-items-center'>
          <MainPagesCard>
            <div className='signin-form-container'>
              <div className='signin-form-title'>
                <span className={`${lang === 'en' ? '' : 'text-end d-block w-100'}`}>{t('SignIn.Heading')}</span>
                <p className={`${lang === 'en' ? '' : 'text-end'}`}>{t('SignIn.Subheading')}</p>
              </div>

              <div className='signin-form-inputs  d-flex flex-column gap-4 py-5'>
                <div className='signin-form-input'>
                  <input type="text" name="PhoneNo" id="phoneNo" placeholder={t("SignIn.Placeholders.PhoneNo")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                </div>
                {
                  errors.phoneNumber &&
                  <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                    {t('SignIn.Errors.InvalidPhoneNUmber')}
                  </span>
                }
                <div className='signin-form-input'>
                  <input type="password" name="Password" id="password" placeholder={t("SignIn.Placeholders.Password")} className='w-100 p-2' onChange={handleChange} dir={`${lang === 'en' ? 'ltr' : 'rtl'}`} />
                </div>
              </div>
              {
                errors.password &&
                <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                  {t('SignIn.Errors.InvalidPassword')}
                </span>
              }
              {
                errors.credentials &&
                <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                  {t('SignIn.Errors.InvalidCredentials')}
                </span>
              }
              {
                errors.fillAllFields &&
                <span className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                  {t('SignIn.Errors.FillAllFields')}
                </span>
              }

              <div className='signin-form-button'>
                <button onClick={handleSubmit}>{t('SignIn.SignIn')}</button>
              </div>
              <div className='signin-form-footer'>
                <p className={`${lang === 'en' ? '' : 'text-end'}`}>
                  {t('SignIn.Prompt')}
                  <span>
                    <Link to={'/signup'}>
                      {t('SignIn.PromptLink')}
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

export default SignIn
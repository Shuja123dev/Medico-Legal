import React from 'react'
import '../signUpMeetSetup/signUpMeetSetup.css'
import Card from '../../../components/mainPageCard/MainPagesCard'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import useMeetSetupVerification from '../../../hooks/useMeetSetupVerification'

const SignUpMeetSetup = () => {
  const {t} = useTranslation()
  const lang = useSelector(state => state.language.value)

  const { formData, errors, handleChange, handleSubmit } = useMeetSetupVerification();


  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div className='meet-setup-container d-flex flex-column'>
        <h2 className='meet-setup-heading text-center'>
        {t('MeetSetup.Heading')}
        </h2>
        <p className='meet-setup-subheading text-center mb-5'>{t('MeetSetup.Subheading')}</p>
        <Card>
          <form className='d-flex flex-column justify-content-center gap-3' onSubmit={handleSubmit}>
            <input type='text' name='fullName' placeholder={t('MeetSetup.Placeholders.FullName')} className='meet-setup-input' dir={lang==='en'?'ltr':'rtl'} onChange={handleChange}/>
            <input type='text' name='email' placeholder={t('MeetSetup.Placeholders.Email')} className='meet-setup-input' dir={lang==='en'?'ltr':'rtl'} onChange={handleChange}/>
            {
                  errors.email && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('MeetSetup.Errors.InvalidEmail')}
                    </p>
                  }
            <input type='text' name='phoneNumber' placeholder={t('MeetSetup.Placeholders.PhoneNumber')} className='meet-setup-input' dir={lang==='en'?'ltr':'rtl'} onChange={handleChange}/>
            {
                  errors.phoneNumber && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('MeetSetup.Errors.InvalidPhoneNUmber')}
                    </p>
                  }
            <input type='date' name='date' placeholder={t('MeetSetup.Placeholders.PreferredDate')} className='meet-setup-input' dir={lang==='en'?'ltr':'rtl'} onChange={handleChange}/>
            {
                  errors.fillAllFields && 
                    <p className={`text-danger error-msg ${lang === 'en' ? '' : 'text-end'}`}>
                      {t('MeetSetup.Errors.FillAllFields')}
                    </p>
                  }
            <button className='btn meet-setup-btn'>{t('MeetSetup.Send')}</button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default SignUpMeetSetup
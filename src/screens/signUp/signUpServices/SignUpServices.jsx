import React from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import './signUpServices.css'
import Card from '../../../components/mainPageCard/MainPagesCard'
import {useNavigate} from 'react-router-dom'

const SignUpServices = () => {
    const lang = useSelector(state => state.language.value)      
    const {t}  = useTranslation();
    const navigate = useNavigate();
    const text = "Membership value without VAT"

    const services = [
        {
            type:"General Court",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"1500"
        },
        {
            type:"General Court and Insurance",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"2500"
        }
    ];

    const handleNext = () => {
        navigate('/signup/credit');
    };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
        <div className='signup-services-container mt-5 pt-5 d-flex flex-column justify-content-center align-items-center gap-3'>
            <h1 className='services-heading text-center'>
                {t('SignUpServices.Heading')}
            </h1>
            <p className='services-subheading text-center mt-4'>
                {t('SignUpServices.Subheading')}
            </p>
            <p className='services-type text-center mt-3'>
            {t('SignUpServices.Type')}
            </p>
            <div className='services-cards d-flex gap-5'>
                {
                    services.map((service, index) => {
                        return (
                            <Card key={index}> 
                                <div className='service-card pointer d-flex  flex-column justify-content-center align-items-start h-100 w-100'>
                                    <h1 className='service-type mt-3'>
                                        {service.type}
                                    </h1>
                                    <p className='service-description mt-3'>
                                        {service.description}
                                    </p>
                                    <p className='service-amount mt-3'>
                                         {service.amount} <span className='currency'>SAR</span>
                                    </p>
                                    <p className='service-text'>
                                        {text}
                                    </p>
                                </div>
                            </Card>
                        )
                    })
                    
                }
            </div>
            <button className='btn signup-services-btn text-white mt-5' onClick={handleNext}>{t('SignUpServices.Next')}</button>
        </div>
    </div>
  )
}

export default SignUpServices
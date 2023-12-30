import React,{useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector, useDispatch} from 'react-redux'
import './signUpServices.css'
import Card from '../../../components/mainPageCard/MainPagesCard'
import {useNavigate} from 'react-router-dom'
import {service} from '../../../features/service/serviceSlice'

const SignUpServices = () => {
    const lang = useSelector(state => state.language.value)
    const profession = useSelector(state => state.profession.value)
    const [services, setServices] = useState([])

    console.log(profession)

    const [selectedService, setSelectedService] = useState('');

    const {t}  = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const text = "Membership value without VAT"

    const packages = {
        Aesthetic:[{
            type:"General Court",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"5000"
        },
        {
            type:"General Court and Insurance",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"6500"
        }],
        Surgeon:[{
            type:"General Court",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"4500"
        },
        {
            type:"General Court and Insurance",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"5500"
        }],
        NonSurgeon:[{
            type:"General Court",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"3000"
        },
        {
            type:"General Court and Insurance",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"4000"
        }],
        MedicalProfessional:[{
            type:"General Court",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"1500"
        },
        {
            type:"General Court and Insurance",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            amount:"2500"
        }],
    };

    

    useEffect(() => {
        if(profession === 'Aesthetic Surgeon'){
            setServices(packages.Aesthetic);
        }else if(profession === 'Surgeon'){
            setServices(packages.Surgeon);
        }else if(profession === 'Non-Surgeon'){
            setServices(packages.NonSurgeon);
        }else if(profession === 'Non Doctor Medical Professional'){
            setServices(packages.MedicalProfessional);
        }
    },[])

    const handleService = (index) => {
        setSelectedService(index);
        dispatch(service(services[index]));
    };

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
                {profession}
            </p>
            <div className='services-cards d-flex gap-5'>
                {
                    services.map((service, index) => {
                        return (
                            <div key={index} className={`service-card-outer ${selectedService === index ? 'selected-service':''} `} onClick={()=>handleService(index)}>
                                <Card > 
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
                            </div>
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
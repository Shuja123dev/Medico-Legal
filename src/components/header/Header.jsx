import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Header.css'
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {language} from '../../features/language/lanSlice'

const Header = () => {
    const { t, i18n } = useTranslation();
    const lang = useSelector(state => state.language.value);
    const dispatch = useDispatch();  

    const changeLanguage = (lng) => {
        if(lng === 'ar'){
            dispatch(language('ar'))
        }else{
            dispatch(language('en'))
        }
        i18n.changeLanguage(lng);
    };

  return (
    <div className='header-container d-flex justify-content-center py-3'>
    <div className={`d-flex ${lang == 'en'?'':'flex-row-reverse'}  justify-content-between header mx-3 p-2`}>
        <div className={lang == 'en'?'d-flex':'d-flex flex-row-reverse'}>
            <div className={lang== 'en'?'me-5':'ms-5'}>
                <Link to={'/'}>
                    <img src="" alt="Logo" />
                </Link>
            </div>
            <ul className={`list-unstyled d-flex align-items-center gap-5 max-width-[1200px] ${lang == 'en'?'ms-5':'flex-row-reverse me-5'}`}>
                <li className='pointer'><Link to={'/'} className='link'>{t("Header.Home")}</Link></li>
                <li className='pointer'><Link to={'/services'} className='link'>{t("Header.Services")}</Link></li>
                <li className='pointer'><Link to={'/blogs'} className='link'>{t("Header.Blogs")}</Link></li>
                <li className='pointer'><Link to={'/contact-us'} className='link'>{t("Header.ContactUs")}</Link></li>
                <li className='lan-nav-item pointer'>{lang == 'en'?'en':'العربية'} <BsChevronDown className='bi-chevron-down'/>
                    <ul className='list-unstyled lan-dropdown border rounded p-2'>
                        <li className='pointer px-3 py-1 border-bottom' onClick={()=> changeLanguage('en')}>en</li>
                        <li className='pointer px-3' onClick={()=> changeLanguage('ar')}>العربية</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className='d-flex gap-3'>
            <Link to="/signin" className='text-decoration-none link sign-in-link'>{t("Header.SignIn")}</Link>
            <Link to="/signup" className='text-decoration-none link sign-up-link'>{t("Header.SignUp")}</Link>
        </div>
    </div>
    </div>
  )
}

export default Header
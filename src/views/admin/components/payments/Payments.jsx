import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import PaymentTable from './PaymentTable'
import axios from 'axios'
import Cookies from 'js-cookie'


const Payments = () => {

    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const [payments, setPayments] = useState([])

    const getPayments = async () => {
        await axios.get(baseURL + "/api/getallpayment", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(reponse => {
            console.log(reponse);
            setPayments(reponse.data.response.data)
        })
    }

    useEffect(() => {
        getPayments();


    }, [])


    return (
        <>
            <H2 text={"PAYMENTS"} className='mb-4' />
            <PaymentTable
                tableData={payments}
                labels={[
                    "PAYMENT ID",
                    // "CLIENT",
                    // "PHONE NO",
                    // "AMOUNT",
                    // "CHANNEL",
                    // "ACCOUNT NO",
                    // "Trx ID",
                    // "DATE",\
                    "Trx ID",
                    "CardType",
                    "Card No",
                    "Transaction Date",
                    "Amount",
                    "STATUS",
                    "ACTION"
                ]} />

        </>
    )
}

export default Payments

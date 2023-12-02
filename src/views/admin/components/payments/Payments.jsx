import React from 'react'
import { H2 } from '../../../user/components'
import PaymentTable from './PaymentTable'

const tableData = [
    {
        id: "123",
        client: "Ali Ahmad",
        phNo: "966 - 899 - 9789789",
        amount: "2500",
        channel: "Bank Name",
        accountNo: "000000608010167519",
        trxId: "123345232",
        date: "12/23/2021",
    }
]

const Payments = () => {

    return (
        <>
            <H2 text={"PAYMENTS"} className='mb-4' />
            <PaymentTable
                tableData={tableData}
                labels={[
                    "ID",
                    "CLIENT",
                    "PHONE NO",
                    "AMOUNT",
                    "CHANNEL",
                    "ACCOUNT NO",
                    "Trx ID",
                    "DATE",
                    "ACTION"
                ]} />
        </>
    )
}

export default Payments

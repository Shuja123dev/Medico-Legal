import React from 'react'
import { H2 } from '../../../user/components'
import ProfileRequestTable from './ProfileRequestTable'

const ProfileRequests = () => {

    const tableData1 = [
        {
            id: "123",
            clientName: "Ali Ahmad",
            clientType: "Doctor, Surgeon",
        }
    ]

    const tableData2 = [
        {
            id: "123",
            clientName: "Ali Ahmad",
            expertName: "Arslan",
            caseName: "Case Name"
        }
    ]

    return (
        <>
            <H2 text={"PROFILE EDIT REQUESTS"} className='mb-4' />
            <ProfileRequestTable
                tableData={tableData1}
                labels={[
                    "ID",
                    "CLIENT Name",
                    "CLIENT TYPE",
                    "ACTIONS"
                ]} />

            <H2 text={"REMOVE EXPERT REQUESTS"} className='my-4 mt-5' />
            <ProfileRequestTable
                tableData={tableData2}
                labels={[
                    "ID",
                    "CLIENT Name",
                    "EXPERT NAME",
                    "CASE NAME",
                    "ACTIONS"
                ]} />
        </>
    )
}

export default ProfileRequests

import React from 'react'
import MembershipTable from './MembershipTable'
import { H2 } from '../../../user/components'


const Membership = () => {


    const tableData = [
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
        {
            id: "123",
            name: "Ali Ahmed",
            clientType: "Doctor, Sergon",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "500"
        },
    ]

    return (
        <>
            <H2 text={"MEMBERSHIP REQUESTS"} className='mb-4' />
            <MembershipTable tableData={tableData} />
        </>
    )
}

export default Membership

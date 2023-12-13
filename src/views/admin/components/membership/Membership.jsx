import React, { useEffect } from 'react'
import MembershipTable from './MembershipTable'
import { H2 } from '../../../user/components'
import axios from 'axios'


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

    const getMemberships = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallmembers", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
            })
        })
    }

    useEffect(() => {
        getMemberships();
    }, [])

    return (
        <>
            <H2 text={"MEMBERSHIP REQUESTS"} className='mb-4' />
            <MembershipTable tableData={tableData} />
        </>
    )
}

export default Membership

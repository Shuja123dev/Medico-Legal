import React, { useEffect, useState } from 'react'
import MembershipTable from './MembershipTable'
import { H2 } from '../../../user/components'
import axios from 'axios'
import Cookies from 'js-cookie'
import MeetingTable from './MeetingTable'


const Membership = () => {

    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const [memberships, setMemberships] = useState([])


    const getMemberships = async () => {
        await axios.get(baseURL + "/api/getallmembers", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setMemberships(res.data.response.data)
        })
    }

    useEffect(() => {
        getMemberships();
    }, [])

    return (
        <>
            <H2 text={"MEMBERSHIP REQUESTS"} className='mb-4' />
            <MembershipTable tableData={memberships} />
            <H2 text={"MEETING REQUESTS"} className='my-4 mt-5' />
            <MeetingTable tableData={memberships} />
        </>
    )
}

export default Membership

import React, { useEffect, useState } from 'react'
import { H3 } from '../../../user/components'
import Card from '../Card/Card'
import { CardLayout } from '../../../user/containers'
import { Cases } from '../../../user/screens'
import axios from 'axios'

const dummyCases = [
    {
        id: 1,
        caseName: "Personal Injury Lawsuit",
        type: "Public Court",
        experts: 3,
        status: "In Progress",
    },
    {
        id: 2,
        caseName: "Business Contract Dispute",
        type: "Public Court",
        experts: 2,
        status: "New",
    },
    {
        id: 3,
        caseName: "Criminal Defense - Assault",
        type: "Public Court",
        experts: 1,
        status: "Under Review",
    },
    {
        id: 4,
        caseName: "Intellectual Property Dispute",
        type: "Public Court",
        experts: 4,
        status: "Closed",
    },
    {
        id: 5,
        caseName: "Family Law - Custody Battle",
        type: "Public Court",
        experts: 2,
        status: "Opened",
    },
    {
        id: 6,
        caseName: "Real Estate Transaction Dispute",
        type: "Public Court Arbitration",
        experts: 3,
        status: "In Progress",
    },
    {
        id: 7,
        caseName: "Labor Law Violation",
        type: "Public Court",
        experts: 2,
        status: "Won",
    },
    {
        id: 8,
        caseName: "Environmental Regulations Violation",
        type: "Public Court",
        experts: 5,
        status: "Lost",
    },
    {
        id: 9,
        caseName: "Medical Malpractice Lawsuit",
        type: "Public Court",
        experts: 3,
        status: "Under Review",
    },
    {
        id: 10,
        caseName: "Tax Evasion Allegations",
        type: "Public Court",
        experts: 2,
        status: "New",
    },
    {
        id: 11,
        caseName: "Product Liability Lawsuit",
        type: "Public Court",
        experts: 3,
        status: "New",
    },
    {
        id: 12,
        caseName: "Employment Discrimination",
        type: "Public Court",
        experts: 2,
        status: "Under Review",
    },
    {
        id: 13,
        caseName: "Bankruptcy Filing",
        type: "Public Court",
        experts: 1,
        status: "In Progress",
    },
    {
        id: 14,
        caseName: "Insurance Fraud Investigation",
        type: "Public Court",
        experts: 4,
        status: "Closed",
    },
    {
        id: 15,
        caseName: "Landlord-Tenant Dispute",
        type: "Public Court",
        experts: 2,
        status: "Opened",
    },
    {
        id: 16,
        caseName: "Antitrust Violation",
        type: "Public Court",
        experts: 3,
        status: "Won",
    },
    {
        id: 17,
        caseName: "Immigration Appeal",
        type: "Public Court",
        experts: 2,
        status: "Lost",
    },
    {
        id: 18,
        caseName: "Personal Data Breach Lawsuit",
        type: "Public Court Court",
        experts: 5,
        status: "Under Review",
    },
    {
        id: 19,
        caseName: "Construction Contract Dispute",
        type: "Public Court",
        experts: 3,
        status: "New",
    },
    {
        id: 20,
        caseName: "Civil Rights Violation",
        type: "Public Court Court",
        experts: 2,
        status: "In Progress",
    },
];

const AdminCases = () => {

    const [cases, setCases] = useState([]);

    const getCases = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallcase", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setCases(res.data.response.data)
            }).catch(error => {
                console.log(error);
            })
        })
    }

    useEffect(() => {
        getCases();
    }, [])

    return (
        <>
            <div className='row mb-5'>
                <div className="col-md-6 col-sm-12 mb-3">
                    <div className="row cardsRow px-2">
                        <Card className='col-md-5'>
                            <p>Total Contracts</p>
                            <h1>137</h1>
                        </Card>
                        <Card className='col-md-5'>
                            <p>last 30 days</p>
                            <h1>23</h1>
                        </Card>
                        <Card className='col-md-5'>
                            <p>Revenue</p>
                            <div className='cardContent'>
                                <h3 className="text-secondary fw-bold  h3_comp" style={{ marginBottom: '12px' }}>SR</h3>
                                <h1>1.2 M</h1>
                            </div>
                        </Card>
                        <Card className='col-md-5'>
                            <p>Revenue</p>
                            <div className='cardContent'>
                                <h3 className="text-secondary fw-bold  h3_comp" style={{ marginBottom: '12px' }}>SR</h3>
                                <h1>1.2 M</h1>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <CardLayout>
                        <p className='blurTxt'>Others</p>
                        <div className="row">
                            <div className="col-lg-7 col-md-12">
                                <div className="record_row d-flex align-items-center justify-content-between py-2 mb-2">
                                    <p class="blurTxt headingBlur">New</p>
                                    <H3 text={12} />
                                </div>
                                <div className="record_row d-flex align-items-center justify-content-between py-2 mb-2">
                                    <p class="blurTxt headingBlur">OPENED</p>
                                    <H3 text={12} />
                                </div>
                                <div className="record_row d-flex align-items-center justify-content-between py-2 mb-2">
                                    <p class="blurTxt headingBlur">UNDER REVIEW</p>
                                    <H3 text={12} />
                                </div>
                                <div className="record_row d-flex align-items-center justify-content-between py-2 mb-2">
                                    <p class="blurTxt headingBlur">CLOSED</p>
                                    <H3 text={12} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12"></div>
                        </div>
                    </CardLayout>
                </div>
            </div>
            <Cases cases={cases} role='admin' />
        </>
    )
}

export default AdminCases

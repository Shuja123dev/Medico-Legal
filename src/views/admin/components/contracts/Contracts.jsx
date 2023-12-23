import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import Card from '../Card/Card'
import lineChart from "./Line chart.png"
import barChart from "./BarChart.png"
import circleGraph from "./CircleGraph.png"
import { CardLayout } from '../../../user/containers'
import NameCard from '../Card/NameCard'
import axios from 'axios'

const Contracts = () => {

    const [experts, setExperts] = useState([]);

    const getExperts = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallexperts", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                setExperts(res.data.response.data)
            })
        })
    }

    useEffect(() => {
        getExperts()
    }, [])

    return (
        <>
            <H2 text={"CONTRACTS"} />
            <div className='row mb-5'>
                <div className="col-lg-6">
                    <div className="row p-2 contarct_card_container">
                        <div className="p-2 col-lg-5 col-md-6 col-md-12">
                            <Card>
                                <p>Total Contracts</p>
                                <h1>137</h1>
                            </Card>
                        </div>
                        <div className="p-2 col-lg-5 col-md-6 col-md-12">
                            <Card>
                                <p>last 30 days</p>
                                <h1>23</h1>
                            </Card>
                        </div>
                        <div className="p-2 col-lg-5 col-md-6 col-md-12">
                            <Card>
                                <p>Revenue</p>
                                <div className='cardContent'>
                                    <h3 className="text-secondary fw-bold  h3_comp" style={{ marginBottom: '12px' }}>SR</h3>
                                    <h1>1.2 M</h1>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 px-3">
                    <CardLayout className='bar_chart'>
                        <p className='blurTxt'>Last Year</p>
                        <img src={lineChart} alt="" />
                    </CardLayout>
                </div>
            </div>
            <H2 text={"EXPERTS"} className='mx-2' />
            <div className='row mb-5'>
                <div className="col-lg-6 col-md-12 p-3">
                    <CardLayout>
                        <p className='blurTxt'>Experts Progress</p>
                        <div className='row'>
                            {experts.length < 0 ?
                                <>
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' value={70} />
                                    <NameCard className='col-md-6 col-sm-12' value={30} />
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' />
                                    <NameCard className='col-md-6 col-sm-12' value={70} />
                                    <NameCard className='col-md-6 col-sm-12' value={30} />
                                </> :
                                experts.map((exp) => {
                                    return <NameCard className='col-md-6 col-sm-12' name={exp.ExpertName} />
                                })
                            }
                        </div>
                    </CardLayout>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="row p-2 contarct_card_container">
                        <div className="p-2 col-lg-5 col-md-6 col-md-12">
                            <Card>
                                <p>Total Experts</p>
                                <h1>30</h1>
                            </Card>
                        </div>
                        <div className="p-2 col-lg-5 col-md-6 col-md-12">
                            <Card>
                                <p>Experts in active cases</p>
                                <h1>17</h1>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <H2 text={"CASES"} />
            <div className='row mb-5'>
                <div className="col-md-12 mb-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="row p-2 contarct_card_container">
                                <div className="p-2 col-lg-12 col-md-6 col-md-12">
                                    <Card>
                                        <p>Total Experts</p>
                                        <h1>30</h1>
                                    </Card>
                                </div>
                                <div className="p-2 col-lg-12 col-md-6 col-md-12">
                                    <Card>
                                        <p>Experts in active cases</p>
                                        <h1>17</h1>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <CardLayout className='bar_chart mx-2'>
                                <p className='blurTxt'>Last Year</p>
                                <img src={barChart} alt="" />
                            </CardLayout>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-3">
                            <CardLayout className='mx-2'>
                                <p className='blurTxt'>All Cases</p>
                                <div className="flex_box">
                                    <img src={circleGraph} alt="" />
                                </div>
                            </CardLayout>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="p-2 col-lg-7 col-md-6 col-md-12">
                                <Card>
                                    <p>Cases Won</p>
                                    <h1>109</h1>
                                </Card>
                            </div>
                            <div className="p-2 col-lg-7 col-md-6 col-md-12">
                                <Card>
                                    <p>Cases Lost</p>
                                    <h1>7</h1>
                                </Card>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contracts

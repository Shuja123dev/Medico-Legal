import React from 'react'
import { H2 } from '../../../user/components'
import MainPagesCard from '../../../../components/mainPageCard/MainPagesCard'
import Card from '../Card/Card'
import lineChart from "./Line chart.png"
import barChart from "./BarChart.png"
import circleGraph from "./CircleGraph.png"
import { CardLayout } from '../../../user/containers'
import NameCard from '../Card/NameCard'

const Contracts = () => {
    return (
        <>
            <H2 text={"CONTRACTS"} />
            <div className='contract_summary'>
                <div className="cards_box">
                    <Card>
                        <p>Total Contracts</p>
                        <h1>137</h1>
                    </Card>
                    <Card>
                        <p>last 30 days</p>
                        <h1>23</h1>
                    </Card>
                    <Card>
                        <p>Revenue</p>
                        <div className='cardContent'>
                            <h3 className="text-secondary fw-bold  h3_comp" style={{ marginBottom: '12px' }}>SR</h3>
                            <h1>1.2 M</h1>
                        </div>
                    </Card>
                </div>
                <CardLayout>
                    <p className='blurTxt'>Last Year</p>
                    <img src={lineChart} alt="" />
                </CardLayout>
            </div>
            <H2 text={"EXPERTS"} />
            <div className='contract_summary'>
                <CardLayout className='exp_progress'>
                    <p className='blurTxt'>Experts Progress</p>
                    <div className='nameCardBox'>
                        <NameCard />
                        <NameCard />
                        <NameCard />
                        <NameCard value={70} />
                        <NameCard value={30} />
                        <NameCard />
                        <NameCard />
                        <NameCard />
                        <NameCard value={70} />
                        <NameCard value={30} />
                    </div>
                </CardLayout>
                <div className="cards_box columnFlexBox">
                    <Card>
                        <p>Total Experts</p>
                        <h1>30</h1>
                    </Card>
                    <Card>
                        <p>Experts in active cases</p>
                        <h1>17</h1>
                    </Card>
                </div>
            </div>

            <H2 text={"CASES"} />
            <div className='contract_summary casesBox'>
                <div className='flex_box'>
                    <div className="cards_box columnFlexBox" style={{ width: '25%' }}>
                        <Card>
                            <p>Total Cases</p>
                            <h1>137</h1>
                        </Card>
                        <Card>
                            <p>Last 30 Days</p>
                            <h1>23</h1>
                        </Card>
                    </div>
                    <CardLayout className='barGraph'>
                        <p className='blurTxt'>Last Year</p>
                        <img src={barChart} alt="" />
                    </CardLayout>
                </div>
                <div className="flex_box allCases">
                    <div className="exp_progress">
                        <CardLayout>
                            <p className='blurTxt'>All Cases</p>
                            <div className="flex_box">
                                <img src={circleGraph} alt="" />
                            </div>
                        </CardLayout>
                    </div>
                    <div className="cards_box columnFlexBox" style={{ width: '25%' }}>
                        <Card>
                            <p>Cases Won</p>
                            <h1>109</h1>
                        </Card>
                        <Card>
                            <p>Cases Lost</p>
                            <h1>7</h1>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contracts

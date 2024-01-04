import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import Card from '../Card/Card'
import lineChart from "./Line chart.png"
import barChart from "./BarChart.png"
import circleGraph from "./CircleGraph.png"
import { CardLayout } from '../../../user/containers'
import NameCard from '../Card/NameCard'
import axios from 'axios'
import Cookies from 'js-cookie'

const Contracts = () => {

    const [experts, setExperts] = useState([]);

    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const getExperts = async () => {
        await axios.get(baseURL + "/api/getallexperts", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            setExperts(res.data.response.data)
        })
    }

    const plotCirlceGraph = () => {
        const xValues = ["Opened", "New", "Under Review", "In progress", "Closed", "Lost", "Won"];
        const yValues = [55, 49, 44, 24, 15, 20, 10];
        const barColors = [
            "#2F4058",
            "#5C6D85",
            "#BFC0C2",
            "#D9D9D9",
            "#F0F0F0",
            "#5C6D85",
            "#A3A3A3",
        ];

        new Chart("circleGraph", {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                }
            }
        });
    }

    const plotLineGraph = () => {
        const xValues = [0, 10, 20, 30, 40];
        const yValues = [1, 5, 15, 8, 9, 9, 9, 10, 45, 14, 14, 15];

        new Chart("lineGraph", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#2F4058",
                    borderColor: "#2F4058",
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { min: 0, max: 30, stepSize: 10 } }],
                }
            }
        });
    }

    const plotBarGraph = () => {
        const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const yValues = [10, 20, 35, 20, 36, 35, 35, 30, 0, 25, 20, 39]
        const barColors = "#2F4058"

        new Chart("barGraph", {
            type: "bar",
            data: {
                labels: xValues,
                // yValues: yLables,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    // text: "World Wine Production 2018"
                },
                scales: {
                    x: [{
                        grid: {
                            display: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 10,
                            max: 40,
                        }
                    }]
                }
            }
        })
    }


    useEffect(() => {
        getExperts();
        plotBarGraph();
        plotCirlceGraph();
        plotLineGraph();
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
                        <canvas id="lineGraph" style={{ width: "100%" }}></canvas>
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
                                <canvas id="barGraph" style={{ width: "100%" }}></canvas>
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
                                    <canvas id="circleGraph" style={{ width: "100%", height: '350px' }}></canvas>
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

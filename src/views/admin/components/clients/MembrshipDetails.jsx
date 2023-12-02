import React from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'

const MembrshipDetails = () => {
    return (
        <>
            <CardLayout>
                <div className='p-4'>
                    <H2 text={"Membership Details"} className='mb-5' />
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>NAME</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>Full Protection</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>DESCRIPTION</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>YEAR</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>2</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>AMOUNT</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>5000 SR</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>DATE OF CONTRACT</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>12/04/2022</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>TIME REMAINING</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>45 days</p>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default MembrshipDetails

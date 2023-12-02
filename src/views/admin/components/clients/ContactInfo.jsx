import React from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'

const ContactInfo = () => {
    return (
        <>
            <CardLayout>
                <div className='p-4'>
                    <H2 text={"Membership Details"} className='mb-5' />
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>EMAIL</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>example@gmail.com</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p className='headingBlur'>PHONE NO</p>
                        </div>
                        <div className="col-md-8 tableinfo">
                            <p>+966 14847 9797</p>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default ContactInfo

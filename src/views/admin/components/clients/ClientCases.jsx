import React from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import { NavLink } from 'react-router-dom'

const ClientCases = () => {
    return (
        <>
            <H2 text={"Cases"} className='mb-3' />
            <div className="row cards_row">
                <div className="col-md-4">
                    <NavLink to="/admin/clients/123/details">
                        <CardLayout>
                            <h6>Name</h6>
                            <p className='blurTxt'>Public and Insurance Court</p>
                            <div className='statusBox'>
                                Status
                            </div>
                        </CardLayout>
                    </NavLink>
                </div>
                <div className="col-md-4">
                    <NavLink to="/admin/clients/456/details">
                        <CardLayout>
                            <h6>Name</h6>
                            <p className='blurTxt'>Public and Insurance Court</p>
                            <div className='statusBox'>
                                Status
                            </div>
                        </CardLayout>
                    </NavLink>
                </div>
                <div className="col-md-4">
                    <NavLink to="/admin/clients/789/details">
                        <CardLayout>
                            <h6>Name</h6>
                            <p className='blurTxt'>Public and Insurance Court</p>
                            <div className='statusBox'>
                                Status
                            </div>
                        </CardLayout>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default ClientCases

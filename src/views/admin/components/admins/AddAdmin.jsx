import React from 'react'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"
import { H2, H3 } from '../../../user/components'

const AddAdmin = () => {
    return (
        <>
            <H2 text={"NEW ADMIN"} className='mb-4 ' />
            <CardLayout>
                <div className='flex_box px-1' style={{ justifyContent: "start" }}>
                    <H3 text={"Admin Details"} />
                </div>
                <div className="row my-4 mb-5">
                    <div className="col-md-2 col-sm-12">
                        <img className='expert-main-img' src={ClientAvatar} alt="" />
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default AddAdmin

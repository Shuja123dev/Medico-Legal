import React from 'react'
import nameAvatar from "./NameAvatar.png"
import "./Card.css"

const NameCard = ({ value = 50, className = "" }) => {
    return (
        <>
            <div className={'nameBox ' + className}>
                <div className="imgBox">
                    <img src={nameAvatar} alt="" />
                </div>
                <div className='nameData'>
                    <p>Name</p>
                    <div className="progressBar">
                        <div className="progressValue" style={{ width: `${value}%` }}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NameCard

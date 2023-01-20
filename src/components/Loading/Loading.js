import React from 'react'
import './Loading.css'

const Loading = (props) => {
    return (
        <>
            {props.loading
                ?
                <div className='text-bubble'>
                    <div className='text-circle' />
                    <div className='text-circle' />
                    <div className='text-circle' />
                </div>
                :
                <></>}
        </>
    )
}

export default Loading
import React, { useEffect, useState, useRef } from "react";


const ToastMessage = (props) => {
    const { messages } = props
    const refs = useRef([])

    const [wrapStyle, setWarpStyle] = useState({
        marginBottom:'70px',
        padding:'10px',
        display:'Flex',
        justifyContent:'center'
    })


    if (messages.length == 0) {
        setWarpStyle({...wrapStyle, marginBottom:'0'})
    }

    let count = messages.length
    const handleCloseMessageBox = (id) => {
        refs.current[id].style.display= 'none'
        count --;
        if (count == 0) {
            setWarpStyle({...wrapStyle, marginBottom:'0'})
        }
      }
       

    return(
    <div style={wrapStyle}>
        <div style={{position: 'absolute', top:'80px'}}>
            {messages.map((item, index) => {
                return  <div key={index} id={index} ref={(element) => {refs.current[index] = element;}} className="messageBox messages-item fadeInDown">{item} 
                            <span onClick={() => handleCloseMessageBox(index)} className='closeMessageBox ' >X</span>
                        </div>
            })}
        </div>
    </div>
    )
}

export default ToastMessage
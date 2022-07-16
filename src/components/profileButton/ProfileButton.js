import React, { useState } from "react"
import {Button} from './button.style'
const ProfileButton = (props) => {
 const { registeredWallet, citizenID, setBrightIdModal, handleSelectToken, setTransferModal } = props
 const [color, setColor] = useState('#300c4b')

console.log(registeredWallet, citizenID)

 let btn = ''

 const handleBrightID = () => {
    setBrightIdModal(true)
}

const handleTransfer = (item) => {
    setColor('#300c4b')
    handleSelectToken(item)
    setBrightIdModal(false)
    setTransferModal(true)
}

if(!citizenID){
    btn = ''
}

 if(registeredWallet == false && Number(citizenID != 0)) {
    btn = <div>
                <Button color='#fff' onClick={handleBrightID}>Connect to BrightID</Button>
                <Button color='#fff' onClick={() => handleTransfer(citizenID)}>Transfer</Button>
            </div>     
 }

 if(registeredWallet == false && Number(citizenID == 0)) {
    btn = <div>
            <Button color='#fff' onClick={handleBrightID}>Connect to BrightID</Button>
        </div>     
}

if(registeredWallet == true && Number(citizenID == 0)) {
    btn = <div style={{width:"100%",textAlign:"center",color:"rgb(104, 63, 135)",border:"1px solid #9682a5", boxShadow: "0 0 20px rgb(0 0 0 / 15%)", borderRadius: "5px", padding:"10px",paddingTop:"15px", paddingBottom:"0px"}}>
            <p style={{display:"inline-block", marginRight:"10px"}}>You have not citizenID on utopia42</p> 
                <a href="/Mint">Mint</a>
          </div>
}

if(registeredWallet == true && Number(citizenID != 0)) {

}

 return(
    <>
        {btn}
    </>
 )
}

export default ProfileButton
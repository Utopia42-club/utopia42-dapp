import React, { useState } from "react"
import {Button} from './button.style'
import useSetBrightId from "../../hooks/useSetBrightId"
import { useWeb3React } from "@web3-react/core"
import Router from 'next/router'

const ProfileButton = (props) => {
 const { account } = useWeb3React()
 const setBrightId = useSetBrightId(account)
 const {checkNFT, registeredWallet, citizenID, setBrightIdModal, handleSelectToken, setTransferModal, isSetNFTtoBrightID} = props
 const [color, setColor] = useState('#300c4b')
 const [btnSetBrightID, setBtnSetBrightId] = useState('Connect BrightID')
// console.log(registeredWallet, citizenID)

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

const handleSetBrightID = async () => {
setBtnSetBrightId('Connect BrightID ...')
    try{
        await setBrightId(citizenID)
        setBtnSetBrightId('Connect BrightID')
        checkNFT()
    }
    catch{
        setBtnSetBrightId('Connect BrightID')
    }
}

const handleMint = async () => {
    Router.push('/Mint')
}


if(!citizenID){
    btn = ''
}

 if(registeredWallet == false && Number(citizenID != 0)) {
    btn = <div>
                <Button color='#fff' onClick={handleBrightID}>Connect you'r wallet to BrightID</Button>
                <Button color='#fff' onClick={() => handleTransfer(citizenID)}>Transfer</Button>
            </div>     
 }

 if(registeredWallet == false && Number(citizenID == 0)) {
    btn = <div>
            <Button color='#fff' onClick={handleBrightID}>Connect you'r wallet to BrightID</Button>
            <Button color='#fff' onClick={handleMint}>Mint</Button>
        </div>     
}

if(registeredWallet == true && Number(citizenID == 0)) {
    btn = <div>
            <Button color='#fff' onClick={handleMint}>Mint</Button>
        </div>
}

if(registeredWallet == true && Number(citizenID != 0) && Number(isSetNFTtoBrightID) == 0) {
    btn = <div>
            <Button color='#fff' onClick={handleSetBrightID}>{btnSetBrightID}</Button>
          </div>   
}

 return(
    <>
        {btn}
    </>
 )
}

export default ProfileButton
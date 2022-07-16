import {Td, Th, Table, Thead, Tr, Tbody, Wrapper, Container}  from './table.style'
import {Button} from './button.style'
import useSetBrightId from "../../hooks/useSetBrightId"
import { useWeb3React } from "@web3-react/core"
import React, {useState} from 'react'
import Router from 'next/router'

const ProfileTable = (props) => {
    const { account } = useWeb3React()
    const {handleSelectToken, setTransferModal, citizenId, brightId, avatarLink, isSetNFTtoBrightID, setBrightIdModal, checkNFT} = props
    const setBrightId = useSetBrightId(account)
    let citizenIDvalue;
    let isSetNFTtoBrightIDvalue;
    const [btnSetBrightID, setBtnSetBrightId] = useState('Set BrightID')


    if(Number(isSetNFTtoBrightID) == 0 || !isSetNFTtoBrightID) {
        isSetNFTtoBrightIDvalue = 'Not Registered'
    }
    else {
        isSetNFTtoBrightIDvalue = isSetNFTtoBrightID
    }

    if (Number(citizenId) == 0 || !citizenId) {
        citizenIDvalue = 'Not have citizenID'
    }
    else{
        citizenIDvalue = '#'+ citizenId
    }
    let isBrightId;
    if(brightId){
        isBrightId = 'true'
    }
    else{
        isBrightId = 'false'
    }

    const handleBrightID = () => {
        setBrightIdModal(true)
    }

    const handleMint = async () => {
        Router.push('../Mint')
    }

    const handleCreateAvatar = async () => {
        Router.push('/CreateAvatar')
    }

    const handleTransfer = (item) => {
        handleSelectToken(item)
        setBrightIdModal(false)
        setTransferModal(true)
    }

    const handleSetBrightID = async () => {
        setBtnSetBrightId('Set BrightID ...')
            try{
                await setBrightId(citizenId)
                setBtnSetBrightId('Set BrightID')
                checkNFT()
            }
            catch{
                setBtnSetBrightId('Set BrightID')
            }
    }

    return (
        <>
            <Table id="table">
                <Tbody>
                <Tr>
                    <Th>CitizenID</Th>
                    <Td>{citizenIDvalue}</Td>
                    {Number(citizenId) == 0 ? <Td><Button color='#fff' backgroundColor="#76568e" onClick={handleMint}>Mint</Button></Td> : ''}
                    {Number(citizenId) != 0 && !brightId? <Td> <Button color='#fff' onClick={() => handleTransfer(citizenId)}>Transfer</Button></Td> : ''}
                </Tr>
                <Tr>
                    <Th>Connect wallet to BrightID</Th>
                    <Td>{isBrightId}</Td>
                   {!brightId ? <Td><Button color='#fff'  backgroundColor="#76568e" onClick={handleBrightID}>Connect you'r wallet to BrightID</Button></Td>:""}
                </Tr>
                <Tr>
                    <Th>Set NFT to BrightID</Th>
                    <Td>{isSetNFTtoBrightIDvalue}</Td>
                    {brightId == true && Number(citizenId != 0) && Number(isSetNFTtoBrightID) == 0 ? <Td><Button color='#fff' onClick={handleSetBrightID}>{btnSetBrightID}</Button></Td> : ''}
                </Tr>
                <Tr>
                    <Th>Avatar Link</Th>
                    {avatarLink ? <Td><a target="_blank" href={avatarLink}>You'r avatar link</a></Td> : <Td>Don't have avatar link</Td>}
                    {Number(citizenId) != 0 && !avatarLink ? <Td><Button color='#fff'  backgroundColor="#76568e" onClick={handleCreateAvatar}>Create Avatar</Button></Td> : ''}
                </Tr>
                </Tbody>
            </Table>
        </>
    )
}

export default ProfileTable
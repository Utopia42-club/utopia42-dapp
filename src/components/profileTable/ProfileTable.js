import {Td, Th, Table, Thead, Tr, Tbody, Wrapper, Container}  from './table.style'
import {Button} from './button.style'
import useSetBrightId from "../../hooks/useSetBrightId"
import { useWeb3React } from "@web3-react/core"
import React, {useState} from 'react'
import Router from 'next/router'

const ProfileTable = (props) => {
    const [copyState, setCopyState] = useState('Copy Link')
    const { account } = useWeb3React()
    const {handleSelectToken, setTransferModal, citizenId, brightId, avatarLink, isSetNFTtoBrightID, setBrightIdModal, checkNFT, isTransferable, NFTs} = props
    const setBrightId = useSetBrightId(account)
    let citizenIDvalue;
    let isSetNFTtoBrightIDvalue;
    const [btnSetBrightID, setBtnSetBrightId] = useState('Set BrightID')
    console.log(NFTs[0], citizenId)

    async function copyTextToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(text);
        } else {
          let textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise((res, rej) => {
              // here the magic happens
              document.execCommand('copy') ? res() : rej();
              textArea.remove();
          });
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(avatarLink)
          .then(() => {
            setCopyState('Copied')
          })
          .catch((err) => {
            console.log(err);
          });
    }

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

    const handleTransfer = (item) => {
        handleSelectToken(item)
        setBrightIdModal(false)
        setTransferModal(true)
        checkNFT()
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
                        {/* {Number(citizenId) == 0 ? <Td className='secondTd' ><Button color='#fff' backgroundColor="#76568e" onClick={handleMint}>Mint</Button></Td> : ''} */}
                        {Number(citizenId) != 0 && Number(!isTransferable) ? <Td className='secondTd'> <Button color='#fff' onClick={() => handleTransfer(citizenId)}>Transfer</Button></Td> : ''}
                    </Tr>
                    {!brightId  ?
                    <Tr>
                        <Th>Connect wallet to BrightID</Th>
                        <Td>{isBrightId}</Td>
                    {!brightId ? <Td className='secondTd'><Button color='#fff'  backgroundColor="#76568e" onClick={handleBrightID}>Connect you'r wallet to BrightID</Button></Td>:""}
                    </Tr>
                    :
                    ''}
                     {brightId == true && Number(citizenId != 0) && Number(isSetNFTtoBrightID) == 0 ?
                    <Tr>
                        <Th>Connect CitizenID to BrightID</Th>
                        <Td>{isSetNFTtoBrightIDvalue}</Td>
                        <Td className='secondTd'><Button color='#fff' onClick={handleSetBrightID}>{btnSetBrightID}</Button></Td>
                    </Tr>
                    :
                    ""
                     }

                    {avatarLink ?
                    <Tr>
                        <Th>Avatar Link</Th>
                         <Td><a target="_blank" href={avatarLink}>You'r avatar link</a></Td>
                        {avatarLink ? <Td className='secondTd'><Button  onClick={handleCopyClick} color='#fff'  backgroundColor="#76568e" >{copyState}</Button></Td> : ''}
                        {/* {Number(citizenId) != 0 && !avatarLink ? <Td className='secondTd'><Button color='#fff'  backgroundColor="#76568e" onClick={handleCreateAvatar}>Create Avatar</Button></Td> : ''} */}
                    </Tr>
                    :
                    ''
                    }
                </Tbody>
            </Table>
        </>
    )
}

export default ProfileTable
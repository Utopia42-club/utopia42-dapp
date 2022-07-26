import {Td, Th, Table, Thead, Tr, Tbody, Wrapper, Container ,Button}  from './table.style'
// import {Button} from './button.style'
import useSetBrightId from "../../hooks/useSetBrightId"
import { useWeb3React } from "@web3-react/core"
import React, {useState} from 'react'
import Router from 'next/router'
import Show3dAvatar from '../show3dAvatar/Show3dAvatar'
import Swal from 'sweetalert2'

const ProfileTable = (props) => {
    const [copyState, setCopyState] = useState('Copy Link')
    const { account } = useWeb3React()
    const { handleSelectToken, setTransferModal, citizenId, brightId, avatarLink, isSetNFTtoBrightID, registeredNFT, setBrightIdModal, checkNFT, isTransferable, NFTs } = props
    const setBrightId = useSetBrightId(account)
    const [showAvatarLink, setShowAvatarLink] = useState(false)
    let citizenIDvalue;
    let isSetNFTtoBrightIDvalue;
    const [btnSetBrightID, setBtnSetBrightId] = useState('Set BrightID')
    console.log(NFTs[0], citizenId, registeredNFT)

    const handleShowAvatar = () => {
        setShowAvatarLink(!showAvatarLink)
    }

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
        if(registeredNFT && NFTs[0] && Number(registeredNFT) != 0 && Number(registeredNFT) != Number(NFTs[0])){
            return Swal.fire({
                text:"Transfer you'r CitizenID",
                icon:'error',
                showConfirmButton: false,
                timer: 2500

            })
        }
        setBtnSetBrightId('Set BrightID ...')
            try{
                if(registeredNFT && registeredNFT != 0){
                    console.log(registeredNFT)
                    await setBrightId(registeredNFT)
                }
                else{
                    await setBrightId(citizenId)
                }
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
                    {Number(citizenId) != 0 ?
                    <Tr>
                        <Th>CitizenID</Th>
                        <Td>{citizenIDvalue}</Td>
                        {Number(!isTransferable) ? <Td className='secondTd'> <Button color='#fff' onClick={() => handleTransfer(citizenId)}>Transfer</Button></Td> : ''}
                    </Tr>
                    :
                    ''
                    }
                    {Number(citizenId) > 0 && Number(registeredNFT) > 0 && Number(citizenId) == Number(registeredNFT) && Number(NFTs[0]) > 0 && Number(NFTs[0]) != Number(registeredNFT)?
                    <Tr>
                        <Th>NFT</Th>
                        <Td>{NFTs[0]}</Td>
                        <Td className='secondTd'> <Button color='#fff' onClick={() => handleTransfer(NFTs[0])}>Transfer</Button></Td>
                    </Tr>
                    :
                    ''
                    }
                    {!brightId  ?
                    <Tr>
                        <Th>Connect wallet to BrightID</Th>
                        <Td>{isBrightId}</Td>
                    {!brightId ? <Td className='secondTd'><Button color='#fff'  backgroundColor="#76568e" onClick={handleBrightID}>Connect you'r wallet to BrightID</Button></Td>:""}
                    </Tr>
                    :
                    ''}
                     {brightId == true  && Number(isSetNFTtoBrightID) == 0 ?
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
                         <Td><a target="_blank" href={avatarLink}>Download avatar</a></Td>
                        {avatarLink ? <Td className='secondTd'>
                            <Button  onClick={handleCopyClick} color='#fff'  backgroundColor="#76568e" >{copyState}</Button>
                            <Button  onClick={handleShowAvatar} color='#fff'  backgroundColor="#76568e" >View</Button>
                            </Td> : ''}
                    </Tr>
                    :
                    ''
                    }
                </Tbody>
            </Table>
            {showAvatarLink ?
            <Show3dAvatar avatarLink={avatarLink}/>
            :
            ''
            }
        </>
    )
}

export default ProfileTable
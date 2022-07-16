import { useState } from 'react'
import styled from 'styled-components'
import useUpdateSetting from "../../hooks/useUpdateSetting.js";
import { useWeb3React } from '@web3-react/core'
import Swal from "sweetalert2";
import { Input } from '../common/FormControlls';
import { Box, Container, Wrapper } from '../container/Container';
import { Flex } from "rebass";
import { Button } from '../button/Button'
import { Type } from '../text/Text'



const AvatarForm = (props) => {
  const { avatarLink, citizenID} = props;
  const [btnName, setBtnName] = useState('Update Avatar')
  // const [telegram, setTelegram] = useState('')
  // const [name, setName] = useState('')
  // const [instagram, setInstagram] = useState('')
  // const [discord, setDiscord] = useState('')
  // const [facebook, setFacebook] = useState('')
  // const [twitter, setTwitter] = useState('')
  // const [bio, setBio] = useState('')
  // const [image, setImage] = useState('')
  const  updateSetting = useUpdateSetting()
  const { account, chainId } = useWeb3React()

  let valuesList = [];
  let keyList = [];

  const handleUpdate = async () => {
   
    if(!account) {
      return Swal.fire({
          text:'Wallet is not connect',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
      })
    }

    if(avatarLink){
      // console.log(valuesList)
      valuesList.push(avatarLink)
      keyList.push('avatar')
    }
    if(valuesList.length == 0){
      return Swal.fire({
        text:'No data for update',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    })
    }
    setBtnName('Updating Avatar ...')
    await updateSetting(account, keyList, valuesList, citizenID)
    setBtnName('Update Avatar')
  }

  return (
    <>
      <Container>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      {Number(citizenID) != 0 ? 
      <>
      <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          {'Avatar Link'}
        </Type.SM>
      </Flex>
      <Input placeholder='Avatar Link' value={avatarLink ?? ''} readOnly/>

      <Button 
          margin="10px"
          onClick={handleUpdate} 
          background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">{btnName}
      </Button> 
      </>
      : 
        <div style={{width:"100%",textAlign:"center",color:"rgb(104, 63, 135)",border:"1px solid #9682a5", boxShadow: "0 0 20px rgb(0 0 0 / 15%)", borderRadius: "5px", padding:"10px",paddingTop:"15px", paddingBottom:"0px"}}>
            <p style={{display:"inline-block", marginRight:"10px"}}>You have not citizenID on utopia42</p> 
                <a href="/Mint">Mint</a>
        </div>
      }
      </Flex>
     </Container> 
    </>
  )
}

export default AvatarForm


import { useState } from 'react'
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
  const  updateSetting = useUpdateSetting()
  const { account, chainId } = useWeb3React()

  let valuesList = [];
  let keyList = [];

  const handleUpdate = async () => {
   
    if(!account) {
      return Swal.fire({
          text:'Wallet is not connected',
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
        text:'No data to update',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    })
    }
    setBtnName('Updating Avatar ...')
    await updateSetting(account, keyList, valuesList, citizenID)
    setBtnName('Update Avatar')
  }

  const handleMint = async () => {
    Router.push('/Mint')
}

  return (
    <>
      {/* <Container> */}
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      {Number(citizenID) != 0 ? 
      <>
      <Input width='100%' placeholder='Avatar Link' value={avatarLink ?? ''} readOnly/>

      <Button 
          margin="10px"
          background= "#76568e"
          onClick={handleUpdate}
          color="#fff" 
          >{btnName}
      </Button> 
      </>
      : 
        <div style={{width:"100%",textAlign:"center",color:"rgb(104, 63, 135)", borderRadius: "5px", padding:"10px",paddingTop:"15px", paddingBottom:"0px"}}>
            <p style={{display:"inline-block", marginRight:"10px"}}>You have not citizenID on utopia42</p> 
            <div>
            <Button color='#fff' background="#76568e" onClick={handleMint}>Mint</Button>
        </div>
        </div>
      }
      </Flex>
     {/* </Container>  */}
    </>
  )
}

export default AvatarForm


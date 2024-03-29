import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper, Box, Label } from '../container/Container'
import { Flex } from 'rebass'
import { Button, ActionText } from '../button/Button'
import useCreateVerse from '../../hooks/useCreateVerse';
import { Type } from '../text/Text'
import ConnectWallet from '../connectWallet/ConnectWallet'
import { useWeb3React } from '@web3-react/core';
import CreateCollectionsTable from '../createCollectionsTable/createCollectionsTable';
import { toCheckSumAddress } from '../../utils/toCheckSumAddress';
import ToastMessage from '../ToastMessage/TostMessage';

const CreateVerse = () => {

    const [admin, setAdmin] = useState('')
    const { account, chainId }  = useWeb3React()
    const createVerse = useCreateVerse(account, chainId)
    const [buttonName, setButtonName] = useState('Create')
    const [verseName, setVerseName] = useState('')
    const [assignEnable , setAssignEnable] = useState(true)

    const handleCreateVerse = async () => {
        if(verseName.trim() == ''){
            return Swal.fire({
                text: 'Enter verse name',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }

        if(admin.trim() == ''){
            return Swal.fire({
                text: 'Enter Admin Wallet',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
        try{
            toCheckSumAddress(admin)
        }
        catch{
            return Swal.fire({
                text: 'Invalid Admin address',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
        if(account){
            setButtonName('Create ...')
            try{
                await createVerse(account, admin, verseName, assignEnable)
            }
            catch{
                console.log('error')
                setButtonName('Create')
            }
            setButtonName('Create')
        }
        else{
            return Swal.fire({
                text: 'Wallet is not connected',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    return(
<>
{account && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN ?

<Container>

  <Wrapper maxWidth="300px" width="100%"></Wrapper>
  <Wrapper maxWidth="470px" width="100%">
  <ToastMessage  messages={[<span>Creating Utopia42 Verses is not public yet. Please contact the team on <a href='https://discord.com/invite/TphaKUZzHx' target="_blank">Utopia42 discord</a> channel for more information.</span>]}/>
  <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
  <GradientTitle margin="0 0 10px">Create a new Verse</GradientTitle>
  <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
    <div style={{width:"100%"}}>
    {/* <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          {'Admin Wallet'}
        </Type.SM>
    </Flex> */}
    <Input style={{marginBottom:'10px'}} placeholder='Verse Name' width="100%" maxWidth='420px' value={verseName} onChange={(event) => {setVerseName(event.target.value)}}/>
    <Input style={{marginBottom:'10px'}} placeholder='Admin Wallet' width="100%" maxWidth='420px' value={admin} onChange={(event) => {setAdmin(event.target.value)}}/>
    <label>Allow users to assign land</label>
    <select className='create-verse-select select-box' value={assignEnable ?? ''} onChange={(event) => setAssignEnable(event.target.value)} >
        <option value={true}>YES</option>
        <option value={false}>NO</option>
    </select>
    </div>
  </Box>
  <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
    <TriangleDown />
  </Box>
  <div style={{width:"100%", background:"linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%"}}>
    <Box marginTop="10" background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
    <button className='profile-btn' onClick={handleCreateVerse}>{buttonName}</button>
    </Box>
  </div>
  </Flex>
  </Wrapper>
  <Wrapper maxWidth="300px" width="100%">
  </Wrapper>
</Container>
:
<ConnectWallet name='Create a new Verse'/>
}
</>

    )

}

export default CreateVerse



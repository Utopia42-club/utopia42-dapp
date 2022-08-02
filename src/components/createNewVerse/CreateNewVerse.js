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

const CreateVerse = () => {

    const [admin, setAdmin] = useState('')
    const { account, chainId }  = useWeb3React()
    const createVerse = useCreateVerse(account, chainId)
    const [buttonName, setButtonName] = useState('Create New Verse')
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
        if(account){
            setButtonName('Creating New Verse ...')
            try{
                await createVerse(account, admin, verseName, assignEnable)
            }
            catch{
                console.log('error')
                setButtonName('Create New Verse')
            }
            setButtonName('Create New Verse')
        }
        else{
            return Swal.fire({
                text: 'Wallet is not connect',
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
  <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
  <GradientTitle margin="0 0 10px">Create Verse</GradientTitle>
  <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
    <div style={{width:"100%"}}>
    {/* <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          {'Admin Wallet'}
        </Type.SM>
    </Flex> */}
    <Input style={{marginBottom:'10px'}} placeholder='Verse Name' width="100%" maxWidth='420px' value={verseName} onChange={(event) => {setVerseName(event.target.value)}}/>
    <Input style={{marginBottom:'10px'}} placeholder='Admin Wallet' width="100%" maxWidth='420px' value={admin} onChange={(event) => {setAdmin(event.target.value)}}/>
    <label>Allow users to assign land
    </label>
    <select value={assignEnable ?? ''} onChange={(event) => setAssignEnable(event.target.value)} id='select-box'>
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
<ConnectWallet name='Create Verse'/>
}
</>

    )

}

export default CreateVerse



import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import { Box } from './Container';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper } from '../container/Container'
import ActionButton from '../actionButton/ActionButton'
import { Flex } from 'rebass'
import useMinterNft from '../../hooks/useMinterNft'
import { useWeb3React } from '@web3-react/core';
import useCitizenId from '../../hooks/useCitizenId'


const MintCitizenNFT = () => {
    const { account, chainId} = useWeb3React()
    const [count, setCount] = useState("You'r wallet");
    const [status, setStatus] = useState()
    const getCitizenId = useCitizenId()
    const mint = useMinterNft(account, chainId)


    const checkCitizenID = async () => {
      const citizenID = await getCitizenId(account)
      if (Number(citizenID) != 0 ){
          setStatus('Duplicate citizenID')
      }
      else
      setStatus('Mint')
    }

    useEffect(() => {

        if(account && chainId == 80001){
            setCount(account)
            checkCitizenID()
        }
        else{
            setCount("You'r wallet")
        }
    }, [account])


    const handleMint = async () => {

              try{
                setStatus('Minting ...')
                await mint()
                setStatus('Mint')
                checkCitizenID()
              }
              catch{
                console.log('error')
                checkCitizenID()
              }
    }

    return(
    <>
    {chainId == 80001 ?
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle margin="0 0 10px">Mint Citizen NFTs</GradientTitle>
      <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
        <Input
            type="text"
            label = 'Count'
            readOnly
            placeholder = "You'r wallet"
            value = {count ?? ''} 
            fontSize= '14px'
            color='#999'
        /> 

      </Box>
      <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
        <TriangleDown />
      </Box>
      <div style={{width:"100%", background:"linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%"}}>
      <Box marginTop="10" background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
        <ActionButton checkCitizenID={checkCitizenID} handleMint={handleMint} status={status} />
      </Box>
      </div>
      </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
      </Wrapper>
    </Container>
    :
    ''
    }
    </>
    )


}


export default MintCitizenNFT
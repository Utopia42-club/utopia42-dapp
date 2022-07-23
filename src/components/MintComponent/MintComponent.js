import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import { Box } from './Container';
import { useEffect, useState } from 'react';
import { Container, Wrapper } from '../container/Container'
import useCitizenId from '../../hooks/useCitizenId';
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core';
import { Button, ActionText } from '../button/Button'
import Router from 'next/router'



const MintComponent = (props) => {
    const {titleName} = props
    const { account, chainId} = useWeb3React()
    const getCitizenId = useCitizenId()
    const [citizenID, setCitizenID] = useState()
    const [buttonName, setButtonName] = useState('Mint')

  const checkCitizenId = async () => {
    setCitizenID(await getCitizenId(account))
  }

    useEffect(() => {

        if(account && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN){
          checkCitizenId()
        }

    }, [account])


    const handleMint = async () => {
      Router.push('/Mint')
    }

    return(
    <>
    {account && Number(citizenID) == 0 && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN?
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle margin="0 0 10px">{titleName}</GradientTitle>
      <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
        <p style={{fontSize:"16px", color:"#76568e"}}>You don't have citizenID</p>
      </Box>
      <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
        <TriangleDown />
      </Box>
      <div style={{width:"100%", background:"linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%"}}>
      <Box marginTop="10" background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
        <Button background="#76568e" margin="25px 0 0" color='#FFF' onClick={handleMint} >{buttonName}</Button>
      </Box>
      </div>
      </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
      </Wrapper>
    </Container>
    : ''}
    </>
    )


}


export default MintComponent
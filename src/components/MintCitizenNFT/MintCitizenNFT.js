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
import ConnectWallet from '../connectWallet/ConnectWallet';
// import ToastMessage from '../ToastMessage/TostMessage';


const MintCitizenNFT = () => {
    const { account, chainId} = useWeb3React()
    const [count, setCount] = useState("You'r wallet");
    const [status, setStatus] = useState()
    const getCitizenId = useCitizenId()
    const mint = useMinterNft(account, chainId)
    // const [showMessage, setShowMessage] = useState(true)


    const checkCitizenID = async () => {
      const citizenID = await getCitizenId(account)
      if (Number(citizenID) != 0 ){
          setStatus('Duplicate citizenID')
      }
      else
      setStatus('Mint for 5.5 MATIC')
    }

    useEffect(() => {

        if(account && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN){
            setCount(account)
            checkCitizenID()
        }
        else{
            setCount("You'r wallet")
        }
    }, [account, chainId])


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
    {chainId == process.env.NEXT_PUBLIC_VALID_CHAIN && account?
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        {/* {showMessage ? 
        <ToastMessage setShowMessage = {setShowMessage} messages={['Mint Article', 'test1', 'test2']}/>
        :
        ''
        } */}
      <GradientTitle margin="0 0 10px">Mint Utopia42 Citizen ID</GradientTitle>
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
    <ConnectWallet name="Mint Utopia42 Citizen ID"/>
    }
    </>
    )


}


export default MintCitizenNFT
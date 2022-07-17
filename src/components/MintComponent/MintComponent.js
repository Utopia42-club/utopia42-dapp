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
// import {Button} from '../profileButton/button.style'
import { Button, ActionText } from '../button/Button'



const MintComponent = (props) => {
    const {checkNFT, checkCitizenId} = props
    const { account, chainId} = useWeb3React()
    const [count, setCount] = useState("You'r wallet");
    const [buttonName, setButtonName] = useState('Mint')

    const mint = useMinterNft(account, chainId)



    useEffect(() => {

        if(account && chainId == 80001){
            setCount(account)
        }
        else{
            setCount("You'r wallet")
        }
    }, [account])


    const handleMint = async () => {
              console.log('mint')
              try{
                setButtonName('Minting ...')
                await mint()
                setButtonName('Minting')
                if (checkNFT) {
                  checkNFT()
                }
                if (checkCitizenId) {
                  checkCitizenId()
                }
                
              }
              catch{
                console.log('error')
                setButtonName('Minting')
              }
    }

    return(
    <>
    {account ?
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
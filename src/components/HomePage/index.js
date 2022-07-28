import React from 'react'
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from '../connectWallet/ConnectWallet'
// import { Container, Wrapper, Box } from '../container/Container'
// import { Flex } from 'rebass'


const HomePage = () => {
    const {account, chainId} = useWeb3React()
    return (
        <>
        {!account || chainId != process.env.NEXT_PUBLIC_VALID_CHAIN ? <ConnectWallet name=''/> : ''}
        </>
        // <Container>
        // <Wrapper width="100%" marginTop="50px">
        // <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        // <Box background="none"> 
        //     <h1 style={{color:'#814f8c', marginBottom:'30px'}}>UTOPIA42</h1>
        //     <p>THE SKY IS NOT THE LIMIT. UTOPIA42 IS A DECENTRALIZED <a style={{color:"#814f8c"}} target="_blank" href="https://en.wikipedia.org/wiki/Multiverse">Multiverse</a> WHERE EVERYONE CAN BUILD THEIR OWN METAVERSE.</p>     
        // </Box>
        // </Flex>
        // </Wrapper>
        // </Container>
    )
}

export default HomePage



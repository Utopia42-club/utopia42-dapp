import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper, Box, Label } from '../container/Container'
import { Flex } from 'rebass'
import { Button, ActionText } from '../button/Button'
import useGetCollections from '../../hooks/useGetCollections';
import { useWeb3React } from '@web3-react/core';
import CreateCollectionsTable from '../createCollectionsTable/createCollectionsTable';
import ConnectWallet from '../connectWallet/ConnectWallet'

const VersesFactory = () => {
    const { account, chainId }  = useWeb3React()
    return (
        <>
        {account && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN ?
        <Container>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        <Wrapper  width="100%">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        {/* <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)"> */}
        <CreateCollectionsTable/>
        {/* </Box> */}
        
        </Flex>
        </Wrapper>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        </Container>
        :
        <ConnectWallet name='Verses'/>
        }
        </>
    )
}

export default VersesFactory
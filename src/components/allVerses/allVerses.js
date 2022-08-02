import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper, Box, Label } from '../container/Container'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core';
import ExploreVerses from '../exploreVerses.js/exploreVerse';
import ConnectWallet from '../connectWallet/ConnectWallet'

const AllVerses = () => {
    const { account, chainId }  = useWeb3React()


    return (
        <>
        {account && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN ?
        <Container>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        <Wrapper  width="100%">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">

        <ExploreVerses />

        
        </Flex>
        </Wrapper>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        </Container>
        :
        <ConnectWallet name='All Utopia42 Verses'/>
        }
        </>
    )
}

export default AllVerses
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

const VersesFactory = () => {
    const { account, chainId }  = useWeb3React()
    const [allCollections, setAllCollections] = useState()
    const getCollections = useGetCollections()
    const collections = async() => {
        setAllCollections(await getCollections(account))
    }

    useEffect(() => {

        if(chainId ==  process.env.NEXT_PUBLIC_VALID_CHAIN){
            collections()
        }
        else{
            setAllCollections([])
        }

    },[account, chainId])


    return (
        <>
        <Container>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        <Wrapper  width="100%">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        {/* <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)"> */}
        {allCollections && <CreateCollectionsTable data={allCollections}/>}
        {!allCollections && <CreateCollectionsTable data={[]}/>}
        {/* </Box> */}
        
        </Flex>
        </Wrapper>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        </Container>
        </>
    )
}

export default VersesFactory
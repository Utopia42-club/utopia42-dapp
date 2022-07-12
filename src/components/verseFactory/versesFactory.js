import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper, Box, Label } from '../container/Container'
import { Flex } from 'rebass'
import { Button, ActionText } from '../button/Button'
import useCreateVerse from '../../hooks/useCreateVerse';
import useGetCollections from '../../hooks/useGetCollections';
import { useWeb3React } from '@web3-react/core';
import CreateCollectionsTable from '../createCollectionsTable/createCollectionsTable';

const VersesFactory = () => {
    const [admin, setAdmin] = useState('')
    const { account, chainId }  = useWeb3React()
    const createVerse = useCreateVerse(account, chainId)
    const [allCollections, setAllCollections] = useState()
    const getCollections = useGetCollections()
    const [buttonName, setButtonName] = useState('Create New Verse')


    const collections = async() => {
        setAllCollections(await getCollections(account))
    }

    useEffect(() => {

        if(chainId == 80001){
            collections()
        }
        else{
            setAllCollections([])
        }

    },[account, chainId])

    // const handleCreateVerse = async () => {
    //     if(chainId != 80001){
    //         return Swal.fire({
    //             text: 'Wrong Network',
    //             icon: 'error',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //     }

    //     if(account){
    //         setButtonName('Creating New Verse...')
    //         try{
    //             await createVerse(account, admin)
    //         }
    //         catch{
    //             console.log('error')
    //         }
    //         setButtonName('Create New Verse')
    //         collections()
    //     }
    //     else{
    //         return Swal.fire({
    //             text: 'Wallet is not connect',
    //             icon: 'error',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //     }

    //     if(admin.trim() == ''){
    //         return Swal.fire({
    //             text: 'Enter Admin Wallet',
    //             icon: 'error',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //     }
    // }

    return (
        <>
        <Container>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        <Wrapper  width="100%">
        {/* <Box  background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
            <div >
                <GradientTitle  fontSize="14px">Admin Wallet</GradientTitle>
            </div>
            <Input width="100%" maxWidth='420px' value={admin} onChange={(event) => {setAdmin(event.target.value)}}/>
            <Button onClick={handleCreateVerse} maxWidth='420px' margin="10px 0 0" color="#300c4b" background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">{buttonName}</Button>
        </Box>
        <Box background="#f2f4fb" paddingBottom="10px" padding="0" borderRadius="0" border="none" width="100%">
        <TriangleDown />
        </Box> */}
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
        {allCollections && <CreateCollectionsTable data={allCollections}/>}
        {!allCollections && <CreateCollectionsTable data={[]}/>}
        </Box>
        
        </Flex>
        </Wrapper>
        <Wrapper maxWidth="100px" width="100%"></Wrapper>
        </Container>
        </>
    )
}

export default VersesFactory
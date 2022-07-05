import { GradientTitle } from '../text/Title';
import { Input } from '../common/FormControlls';
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
    const createVerse = useCreateVerse()
    const { account, chainId} = useWeb3React()
    const [allCollections, setAllCollections] = useState()
    const getCollections = useGetCollections()
    const [buttonName, setButtonName] = useState('Create New Verse')


    const collections = async() => {
        setAllCollections(await getCollections(account))
    }

    useEffect(() => {

        if(chainId == 4){
            collections()
        }

    },[account])

    const handleCreateVerse = async () => {

        if(account){
            setButtonName('Creating New Verse...')
            await createVerse(account, admin)
            setButtonName('Create New Vers')
            collections()
        }
        else{
            return Swal.fire({
                text: 'Wallet is not connect',
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
    }


    return(
        <>
        <Container>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
        <Wrapper  width="100%">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
        {allCollections && <CreateCollectionsTable data={allCollections}/>}
        {/* {!allCollections && <CreateCollectionsTable data={[]}/>} */}
            <div>
                <label>Admin Wallet</label>
                <Input value={admin} onChange={(event) => {setAdmin(event.target.value)}}/>
            </div>
            <Button onClick={handleCreateVerse} maxWidth='25%' margin="25px 0 0" color="#300c4b" background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">{buttonName}</Button>
        </Box>
        </Flex>
        </Wrapper>
        <Wrapper maxWidth="300px" width="100%">

        </Wrapper>
        </Container>
        </>
    )
}

export default VersesFactory

import { GradientTitle } from '../text/Title';
import { Input } from '../common/FormControlls';
import { Box } from './Container';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Container, Wrapper } from '../container/Container'
import Modal from '../modal/Modal';
import useBrightIdApi from '../../hooks/useBrightIdApi'
import useOwnerToken from '../../hooks/useOwnerToken';
import useUserRegisterNFTs from '../../hooks/useUserRegisterNFTs';
import { useWeb3React } from '@web3-react/core';
import BrightId from '../BrightIdApp/BrightIdApp';
import useUserNFTs from '../../hooks/useUserNFTs';
import useSafeTransfer from '../../hooks/useSafeTransfer';
import { Button } from '../button/Button'
import CreateTable from '../createTable/createTable';

const NftList = () => {
    const { account } = useWeb3React()
    const [registeredNFT, setRegisteredNFT] = useState('0')
    const [registeredWallet, setRegisteredWallet] = useState(null)
    const [NFTs, setNFTs] = useState(null);
    const [selectedNFT, setSelectedNFT] = useState(null)
    const brightIdData = useBrightIdApi()
    const getRegisterNFTs = useUserRegisterNFTs(account)
    // const [status, setStatus] = useState()
    const isOwner = useOwnerToken(selectedNFT, account)
    const getNFTs = useUserNFTs(account)
    const [toAddress, setToAddress] = useState()
    const safeTransfer = useSafeTransfer()
    const [transferNTF, setTransferNFT] = useState('Transfer')
    let data;
    const [transferModal, setTransferModal] = useState(false)
    const [brightIdModal, setBrightIdModal] = useState(false)

    const isRegisteredWallet = async () => {
        data = await brightIdData()
        if (data.error) {
            console.log(data.error)
            setRegisteredWallet(false)
        }
        else{
            setRegisteredWallet(true)
        }
    }

    const isRegisteredNFT = async () => {
        setRegisteredNFT(await getRegisterNFTs())
        if (registeredNFT != '0'){
            // setStatus("Registered before")
        }
    }

    const checkNFT = async () => {
        setSelectedNFT(null)
        setNFTs(await getNFTs())
        // setRegisteredNFT(await getRegisterNFTs())
        isRegisteredWallet()
        isRegisteredNFT()
        if(registeredNFT == '0' && registeredWallet){
            // setStatus('Register')
        }
    }

    const handleTransfer = async () => {
        if (!toAddress) {
          return Swal.fire({
            text:"Please enter Address",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
        if (!selectedNFT) {
          return Swal.fire({
            text:"Please select NFT ID",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
        try{
          setTransferNFT('Transferring ...')
          await safeTransfer(toAddress, selectedNFT)
          setTransferModal(false)
          setTransferNFT('Transfer')
          setNFTs(null)
          setSelectedNFT(null)
          updateData()
        }
        catch{
            setTransferModal(false)
            console.log('error')
            setTransferNFT('Transfer')
        }
    }

    const updateData = useCallback(async () => {
        setNFTs(await getNFTs())
        setRegisteredNFT(await getRegisterNFTs())
    })

    useEffect(() => {
        checkNFT()

    }, [account])
    

    const handleSelectToken = (item) => {
      console.log(item)
        // if(registeredNFT > 0){
        //   return Swal.fire({
        //     icon: 'error',
        //     text: 'Yor registered before',
        //     showConfirmButton: false,
        //     timer: 1500,
        //   })
        // }
        // else {
          setSelectedNFT(item)
          setTransferModal(true)
        // }
    }

    const handleRegister = async () => {
        console.log(selectedNFT)
        if(!selectedNFT){
          return Swal.fire({
            text: "Please select NFT ID",
            icon: 'error',
            timer:1500,
            showConfirmButton: false,
          })
        }
        if(!data.error){
          try{
            await isOwner(data)
          }
          catch{
            console.log('error')
          }
        }
        else{
          Swal.fire({
            text: "You'r account is not registered on BrightID",
            icon: 'error',
            timer:3500,
            showConfirmButton: false,
          })
          console.log(data.error)
        }
    }

    return(
    <>
    {
      NFTs &&
      <>
      <CreateTable 
        data={NFTs} 
        registeredWallet={registeredWallet} 
        registeredNFT={registeredNFT} 
        setBrightIdModal={setBrightIdModal} 
        handleSelectToken={handleSelectToken} 
        handleRegister={handleRegister}/>
        </>
    }
    <Container>
      <Modal 
        open={transferModal}         
        backgroundColor={'#313144'}
        hide={() => {
          setTransferNFT('Transfer')
          setSelectedNFT(null)
          setToAddress(null)
          setTransferModal(!transferModal)
        }}>
        <>
        <GradientTitle margin="0 0 10px">Transfer Citizen ID: {selectedNFT}</GradientTitle>
        <Box background="linear-gradient(0deg,#f0f2f5 0%,rgb(183 188 199 / 76%) 126.95%);">
        <div style={{marginLeft:'-220px',display:"flex"}}>
        </div>
          <Input placeholder='To address' value={toAddress ?? ''} onChange={(event) => {setToAddress(event.target.value)}} />
          <Button color='#300c4b' fontSize="18px" margin="25px 0 0" background="linear-gradient(0deg, rgb(118, 86, 142) 0%, rgba(231, 235, 243, 0) 126.95%);"  onClick={handleTransfer}>{transferNTF}</Button>
        </Box>
        </>
      </Modal>

      <Modal
        open={brightIdModal}         
        hide={() => {
          setBrightIdModal(!brightIdModal)
        }}
        mainBack={'#fff'}
      >
        <Wrapper maxWidth="470px" width="100%">
          <BrightId account={account}/>
        </Wrapper>
      </Modal>

      <Wrapper maxWidth="300px" width="100%">

      </Wrapper>
    </Container>
    </>
    )


}





export default NftList
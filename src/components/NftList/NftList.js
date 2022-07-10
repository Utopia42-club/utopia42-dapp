
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
import useRegisterToken from '../../hooks/useRegisterToken';

const NftList = () => {
    const { account, chainId } = useWeb3React()
    const [registeredNFT, setRegisteredNFT] = useState('0')
    const [registeredWallet, setRegisteredWallet] = useState(null)
    const [NFTs, setNFTs] = useState(null);
    const [selectedNFT, setSelectedNFT] = useState(null)
    const brightIdData = useBrightIdApi()
    const getRegisterNFTs = useUserRegisterNFTs(account)
    const register = useRegisterToken()
    // const [status, setStatus] = useState()
    const isOwner = useOwnerToken(account)
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
          setRegisteredNFT(await getRegisterNFTs())
          setRegisteredWallet(false)
            
        }
        else{
            let lastContextId = data.contextIds[data.contextIds.length-1]
            setRegisteredWallet(true)
            setRegisteredNFT(await getRegisterNFTs(lastContextId))
        }
    }
 
    const checkNFT = async () => {
        setSelectedNFT(null)
        setNFTs(await getNFTs())
        isRegisteredWallet()
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
          setToAddress(null)
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
      console.log(await getNFTs())
        setNFTs(await getNFTs())
        isRegisteredWallet()
    })

    useEffect(() => {
      if(chainId == 80001){
        checkNFT()
        setTransferModal(false)
      }
      else{
        setTransferModal(false)
        setNFTs(null)
        setRegisteredNFT('0')
      }
    }, [account, chainId])
    

    const handleSelectToken = (item) => {
          console.log(item)
          setSelectedNFT(item)
    }

    const handleRegister = async (id) => {
      console.log(id)
      data = await brightIdData()
        if(!data.error){
          console.log('set brightID')
          try{
            await isOwner(data, id)
            updateData()
          }
          catch{
            updateData()
            console.log('error')
          }
        }
        else{
          console.log(id, 'no brightId')
          try{
            await register(account, id)
            updateData()
          }
          catch{
            console.log('error')
            updateData()
          }
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
        handleRegister={handleRegister}
        setTransferModal={setTransferModal}
        />
        </>
    }
    {
      !NFTs &&
      <>
      <CreateTable 
        data={[]} 
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
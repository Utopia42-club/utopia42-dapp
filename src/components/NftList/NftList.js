
import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
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
import useCitizenId from '../../hooks/useCitizenId';
import { Flex } from 'rebass';
import ProfileButton from '../profileButton/ProfileButton';
import ProfileTable from '../profileTable/ProfileTable';
import useGetAvatarLink from '../../hooks/useGetAvatarLink';
import useIsSetBrightID from '../../hooks/useIsSetBrightId';
// import loading from '../media/common/xm-loader.gif'

const NftList = () => {
    const { account, chainId } = useWeb3React()
    const getAvatarLink = useGetAvatarLink()
    const [registeredWallet, setRegisteredWallet] = useState(null)
    const [selectedNFT, setSelectedNFT] = useState(null)
    const brightIdData = useBrightIdApi()
    const [citizenID, setCitizenID] = useState()
    const [isSetNFTtoBrightID, setIsSetNFTtoBrightID] = useState()
    const [toAddress, setToAddress] = useState()
    const safeTransfer = useSafeTransfer()
    const [ready, setReady] = useState(false)
    const [transferNTF, setTransferNFT] = useState('Transfer')
    let data;
    const [transferModal, setTransferModal] = useState(false)
    const [brightIdModal, setBrightIdModal] = useState(false)
    const getCitizenId = useCitizenId()
    const [avatarLink, setAvatarLink] = useState()
    const isSetBrightID = useIsSetBrightID()

    const isRegisteredWallet = async () => {
        data = await brightIdData()
        if (data.error) {
          setRegisteredWallet(false)
            
        }
        else{
          setRegisteredWallet(true)
        }
    }
 
    const checkNFT = async () => {
        setIsSetNFTtoBrightID(await isSetBrightID(account))
        setCitizenID(await getCitizenId(account))
        setAvatarLink(await getAvatarLink(account))
        await isRegisteredWallet()
        setReady(true)
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
          setToAddress(null)
          setSelectedNFT(null)
          updateData()
        }
        catch(error){
            setTransferModal(false)
            setToAddress(null)
            setTransferNFT('Transfer')
            if(String(error).includes('Given address')){
              return Swal.fire({
                text:"Wrong Address",
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              })
            }
        }
    }

    const updateData = useCallback(async () => {
        await isRegisteredWallet()
    })

    useEffect(() => {
      setReady(false)
      if(chainId == 80001){
        checkNFT()
        setTransferModal(false)
      }
      else{
        setTransferModal(false)
      }
    }, [account, chainId])
    

    const handleSelectToken = (item) => {
          console.log(item)
          setSelectedNFT(item)
    }

    return(
    <>
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle margin="0 0 10px">Profile</GradientTitle>
      {/* <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);"> */}
        {chainId == 80001 && ready ? 
        <ProfileTable  checkNFT={checkNFT} setTransferModal={setTransferModal} handleSelectToken={handleSelectToken} setBrightIdModal={setBrightIdModal} citizenId={citizenID} brightId={registeredWallet} avatarLink={avatarLink} isSetNFTtoBrightID={isSetNFTtoBrightID}/>
        : account && !ready && chainId == 80001?
        <img width='100px' src='media/common/loading-gif.jpg' />
        :
        ""
        }
        {/* </Box> */}

      </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
      </Wrapper>
    </Container>
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
          <Button color='#fff' fontSize="18px" margin="25px 0 0" background="#76568e" onClick={handleTransfer}>{transferNTF}</Button>
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
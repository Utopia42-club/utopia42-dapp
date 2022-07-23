
import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import { Box } from './Container';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Container, Wrapper } from '../container/Container'
import Modal from '../modal/Modal';
import useBrightIdApi from '../../hooks/useBrightIdApi'
import { useWeb3React } from '@web3-react/core';
import BrightId from '../BrightIdApp/BrightIdApp';
import useUserNFTs from '../../hooks/useUserNFTs';
import useSafeTransfer from '../../hooks/useSafeTransfer';
import { Button } from '../button/Button'
import useCitizenId from '../../hooks/useCitizenId';
import { Flex } from 'rebass';
import ProfileTable from '../profileTable/ProfileTable';
import useGetAvatarLink from '../../hooks/useGetAvatarLink';
import useIsSetBrightID from '../../hooks/useIsSetBrightId';
import useIsVerified from '../../hooks/useIsVerified';
import MintComponent from '../MintComponent/MintComponent';
import useGetLastCitizenId from '../../hooks/useGetLastCitizenId';
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
    const [isTransferable, setIsTransferable] = useState()
    const [transferModal, setTransferModal] = useState(false)
    const [brightIdModal, setBrightIdModal] = useState(false)
    const getCitizenId = useCitizenId()
    const [avatarLink, setAvatarLink] = useState()
    const isSetBrightID = useIsSetBrightID()
    const isVerified = useIsVerified()
    const [NFTs, setNFTs] = useState()
    const [registeredNFT, setRegisteredNFT] = useState()
    const getNFTs = useUserNFTs(account)
    const getLastCitizenId = useGetLastCitizenId()

    const isRegisteredWallet = async () => {
        data = await brightIdData()
        console.log(data)
        if (data.error) {
          setRegisteredNFT(null)
          setRegisteredWallet(false)
          
        }
        else{
          let lastContextId = data.contextIds[data.contextIds.length-1]
          setRegisteredNFT(await getLastCitizenId(lastContextId))
          setRegisteredWallet(true)
        }
    }
 
    const checkNFT = async () => {
        setIsSetNFTtoBrightID(await isSetBrightID(account))
        let id = await getCitizenId(account)
        await isRegisteredWallet()
        setCitizenID(id)
        setAvatarLink(await getAvatarLink(account))
        setIsTransferable(await isVerified(id))
        setNFTs(await getNFTs())
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
          checkNFT()
          setTransferModal(false)
          setTransferNFT('Transfer')
          setToAddress(null)
          setSelectedNFT(null)
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
    {Number(citizenID!=0 ) || registeredNFT && Number(registeredNFT) != 0 && chainId == 80001 ?
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle margin="0 0 10px">Profile</GradientTitle>
        {chainId == 80001 && ready ? 
        <ProfileTable NFTs={NFTs} isTransferable={isTransferable} registeredNFT={registeredNFT}  checkNFT={checkNFT} setTransferModal={setTransferModal} handleSelectToken={handleSelectToken} setBrightIdModal={setBrightIdModal} citizenId={citizenID} brightId={registeredWallet} avatarLink={avatarLink} isSetNFTtoBrightID={isSetNFTtoBrightID}/>
        : account && !ready && chainId == 80001?
        <img width='100px' src='media/common/loading-gif.jpg' />
        :
        ""
        }
      </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
      </Wrapper>
    </Container>
    :
    <MintComponent titleName={'Profile'}/>
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
          <BrightId account={account} checkNFT={checkNFT} registeredNFT={registeredNFT} citizenId={citizenID} NFTs={NFTs}/>
        </Wrapper>
      </Modal>

      <Wrapper maxWidth="300px" width="100%">

      </Wrapper>
    </Container>
    </>
    )


}





export default NftList
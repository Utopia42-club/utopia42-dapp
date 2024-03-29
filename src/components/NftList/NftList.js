
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
import ProfileTable from '../profileTable/ProfileTable';
import useGetAvatarLink from '../../hooks/useGetAvatarLink';
import useIsSetBrightID from '../../hooks/useIsSetBrightId';
import useIsVerified from '../../hooks/useIsVerified';
import MintComponent from '../MintComponent/MintComponent';
import useGetLastCitizenId from '../../hooks/useGetLastCitizenId';
import ConnectWallet from '../connectWallet/ConnectWallet'
import useIsRegister from '../../hooks/useIsRegister'
import AddNewItem from '../addNewItem/AddNewItem';
import { toCheckSumAddress } from '../../utils/toCheckSumAddress'


const NftList = () => {
    const { account, chainId } = useWeb3React()
    const isRegister = useIsRegister() 
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
    const [firsID, setFiresID] = useState()
    const [lastCitizenID, setLastCitizenID] = useState()
    const [lastContextID, setLastContextID] = useState()
    const [updateBrightID, setUpdateBrightId] = useState()

    const isRegisteredWallet = async () => {
        data = await brightIdData(account)
        // console.log(data)
        if (data.error) {
          setRegisteredNFT(false)
          setRegisteredWallet(false)
          setLastCitizenID(0)
        }
        else{
          setLastContextID(data.contextIds[0])
          let id = data.contextIds[0]
          setLastCitizenID(await getLastCitizenId(id))
          setFiresID(await getLastCitizenId(data.contextIds[data.contextIds.length-1]))
          if(!await isRegister(account) && !await isRegister(data.contextIds[data.contextIds.length-1])){
            setRegisteredNFT(false)
          }
          else{
            setRegisteredNFT(true)
          }
          setRegisteredWallet(true)
        }
    }
 
    const checkNFT = async () => {
        setIsSetNFTtoBrightID(await isSetBrightID(account))
        let id = await getCitizenId(account)
        // console.log(id)
        await isRegisteredWallet()
        setCitizenID(id)
        setAvatarLink(await getAvatarLink(account))
        setIsTransferable(await isVerified(id))
        setNFTs(await getNFTs())
        setReady(true)
    }

    const handleTransfer = async () => {
        if (!toAddress  || toAddress.trim() == '') {
          return Swal.fire({
            text:"Please enter an address",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
        try {
          toCheckSumAddress(toAddress)
        }
        catch{
          return Swal.fire({
            text: 'Wrong address',
            icon:'error',
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
      if(chainId == process.env.NEXT_PUBLIC_VALID_CHAIN){
        checkNFT()
        setTransferModal(false)
      }
      else{
        setTransferModal(false)
      }
    }, [account, chainId])
    

    const handleSelectToken = (item) => {
          // console.log(item)
          setSelectedNFT(item)
    }

    return(
      <>
    {!account || chainId != process.env.NEXT_PUBLIC_VALID_CHAIN ? <ConnectWallet name='Profile'/> : ''}
    {Number(citizenID!=0 ) || registeredNFT && lastCitizenID == 0 && firsID > 0  && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN ?
    <>
      {/* <Wrapper maxWidth="300px" width="100%"></Wrapper> */}
      {/* <Wrapper width="100%"> */}
      {/* <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%"> */}
        {chainId ==  process.env.NEXT_PUBLIC_VALID_CHAIN && ready ? 
        <>
        {/* <GradientTitle margin="0 0 10px">Profile</GradientTitle> */}
        <ProfileTable setUpdateBrightId={setUpdateBrightId} firsID={firsID} lastContextID={lastContextID} lastCitizenID={lastCitizenID} NFTs={NFTs} isTransferable={isTransferable} registeredNFT={registeredNFT}  checkNFT={checkNFT} setTransferModal={setTransferModal} handleSelectToken={handleSelectToken} setBrightIdModal={setBrightIdModal} citizenId={citizenID} brightId={registeredWallet} avatarLink={avatarLink} isSetNFTtoBrightID={isSetNFTtoBrightID}/>
        <AddNewItem citizenId={citizenID} />
        </>
        : 
        account && !ready && chainId == process.env.NEXT_PUBLIC_VALID_CHAIN ?
        <div className='loading-icon'>
          <img width='100px' src='media/common/loading-gif.jpg' />
        </div>
        :
        ''
        }
      {/* </Flex> */}
      {/* </Wrapper> */}
      {/* <Wrapper maxWidth="300px" width="100%"> */}
      {/* </Wrapper> */}
    </>
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
        <GradientTitle margin="0 0 10px">Transfer Citizen ID #{selectedNFT}</GradientTitle>
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
          <BrightId updateBrightID={updateBrightID} account={account} checkNFT={checkNFT} registeredNFT={registeredNFT} citizenId={citizenID} NFTs={NFTs}/>
        </Wrapper>
      </Modal>

      <Wrapper maxWidth="300px" width="100%">

      </Wrapper>
    </Container>
    </>
    )


}





export default NftList
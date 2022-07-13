import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import { Box } from './Container';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper } from '../container/Container'
import ActionButton from '../actionButton/ActionButton'
import { Flex } from 'rebass'
import useBrightIdApi from '../../hooks/useBrightIdApi'
import useMinterNft from '../../hooks/useMinterNft'
import useMintNFTsetBrightId from '../../hooks/useMintNFTsetBrightId'
import useUserRegisterNFTs from '../../hooks/useUserRegisterNFTs';
import { useWeb3React } from '@web3-react/core';
import BrightId from '../BrightIdApp/BrightIdApp';
import useMaxPerUser from '../../hooks/useMaxPerUser';
import useMintAndRegisterNotId from '../../hooks/useMintAndRegisterNotId'


const MintCitizenNFT = () => {
    const { account, chainId} = useWeb3React()
    let toAddress = account
    const [count, setCount] = useState();
    const [checked, setChecked] = useState(false);
    const [registeredNFT, setRegisteredNFT] = useState('0')
    const [registeredWallet, setRegisteredWallet] = useState(false)
    const brightIdData = useBrightIdApi()
    const [max, setMax] = useState('')
    const getRegisterNFTs = useUserRegisterNFTs(account)
    const [status, setStatus] = useState('Mint')
    const [isSetOnBrightID, setIsSetOnBrightId] = useState(false)
    const mint = useMinterNft(account, chainId, count, toAddress)
    const mintAndSet = useMintNFTsetBrightId(toAddress)
    const maxPay = useMaxPerUser()
    const mintAndRegisterNotID = useMintAndRegisterNotId(account, chainId)
    let data;

    const getMaxPay = async () => {
        setMax(await maxPay())
    }
    
    const handleChange = async () => {
        // console.log('handle change')
        if (!account) {
            return Swal.fire({
                text: 'Wallet is not connect',
                timer:1500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
        if (chainId != 80001){
            return
        }
        // console.log(checked)
        if(checked){
            setStatus('Mint')
            setIsSetOnBrightId(false)
        }
        setChecked(!checked);
    };

    useEffect(() => {
        setChecked(false)
        setIsSetOnBrightId(false)
        setStatus('Mint')
        setCount('')
        if(account && chainId == 80001){
            getMaxPay()
        }
    }, [account])

    const handelCountChange = async  (value) => {

        if(Number(value) <= Number(max) && Number(value) >= 0){
            setCount(value)
        } 
    }

    const isRegisteredWallet = async () => {
        data = await brightIdData()
        console.log(data)
        if (data.error) {
          setRegisteredNFT(await getRegisterNFTs())
          setRegisteredWallet(false)
          setIsSetOnBrightId(true)
            
        }
        else{
            let lastContextId = data.contextIds[0]
            console.log(lastContextId)
            setRegisteredWallet(true)
            setRegisteredNFT(await getRegisterNFTs(lastContextId))
        }
        // console.log(data)
    }

    const afterMint = async () => {
        setIsSetOnBrightId(false)
        setCount('')
        setChecked(false);
        setStatus('Mint')
    }


    useEffect(() => {
        if(checked === true){
            isRegisteredWallet()
            console.log(registeredNFT, registeredWallet)
            if (registeredNFT == '0' && registeredWallet == true) {
                setStatus('Mint and register')
            }
            else if(registeredNFT != '0' && registeredWallet == true){
                setStatus('Registered before')
            }
            else if(registeredNFT != '0' && registeredWallet == false){

                setStatus('Registered before')
            }
            else if(registeredNFT == '0' && registeredWallet == false){

                setStatus('Mint and register')
            }
        }
    }, [checked,registeredWallet,registeredNFT])




    const handleMintAndSet = async () => {
        // if (registeredNFT == '0' && registeredWallet == true) {
        let data = await brightIdData()
        if (data.error) {
            console.log('error')
            try{
                setStatus('Mint and register ...')
                await mintAndRegisterNotID(account)
                afterMint()
            }

            catch{
                console.log('err')
                setStatus('Mint and register') 
            }
        }
        else{

            try{
                setStatus('Mint and register ...')
                await mintAndSet(data, chainId)
                afterMint()

            }
            catch{
                console.log('err')
                setStatus('Mint and register')
            }
        }

    }


    const handleMint = async () => {

            if (!count) {
                return Swal.fire({
                  icon: 'error',
                  text: 'Please Enter count',
                  showConfirmButton: false,
                  timer: 1500,
                })
              } 

            if(count < 1){
                return Swal.fire({
                    icon: 'error',
                    text: 'Please Enter count',
                    showConfirmButton: false,
                    timer: 1500,
                  })
            }

              try{
                setStatus('Minting ...')
                await mint()
                setCount('')
                setStatus('Mint')
              }
              catch{
                console.log('error')
                setStatus('Mint')
              }
    }

    return(
    <>
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle margin="0 0 10px">Mint Citizen NFTs</GradientTitle>
      <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
        {/* {!checked ?  */}
        <Input
            background="rgb(230, 236, 242)"
            type="text"
            label = 'Count'
            placeholder = {`Max count for user ${max}`}
            value = {count ?? ''} 
            onChange = {(event) => handelCountChange(event.target.value)} 
        /> 
        {/* // :''} */}
        {/* <div>
            <div style={{display:"flex", marginBottom:"20px", marginTop:"20px"}}>
                <label style={{marginRight:"10px", fontFamily:'Montserrat', fontSize:'12.5px'}}>
                    Mint and Register
                </label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange} 
                />
            </div>
            {isSetOnBrightID  ? <BrightId account={account}/> : ''}
        </div> */}

      </Box>
      <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
        <TriangleDown />
      </Box>
      <div style={{width:"100%", background:"linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%"}}>
      <Box marginTop="10" background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
        <ActionButton handleMint={handleMint} handleMintAndSet={handleMintAndSet} status={status} checked={checked}/>
      </Box>
      </div>
      </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
      </Wrapper>
    </Container>
    </>
    )


}


export default MintCitizenNFT
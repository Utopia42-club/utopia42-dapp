import { GradientTitle } from '../text/Title';
import { Input, TriangleDown } from '../common/FormControlls';
import { Box } from './Container';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { Container, Wrapper } from '../container/Container'
import ActionButton from '../actionButton/ActionButton'
import { Flex } from 'rebass'
// import useBrightIdApi from '../../hooks/useBrightIdApi'
import useMinterNft from '../../hooks/useMinterNft'
// import useMintNFTsetBrightId from '../../hooks/useMintNFTsetBrightId'
// import useUserRegisterNFTs from '../../hooks/useUserRegisterNFTs';
import { useWeb3React } from '@web3-react/core';
// import BrightId from '../BrightIdApp/BrightIdApp';
// import useMaxPerUser from '../../hooks/useMaxPerUser';
// import useMintAndRegisterNotId from '../../hooks/useMintAndRegisterNotId'
import useCitizenId from '../../hooks/useCitizenId'


const MintCitizenNFT = () => {
    const { account, chainId} = useWeb3React()
    const [count, setCount] = useState("You'r wallet");
    const [status, setStatus] = useState()
    const getCitizenId = useCitizenId()
    const mint = useMinterNft(account, chainId)


    const checkCitizenID = async () => {
        const citizenID = await getCitizenId(account)
        if (Number(citizenID) != 0 ){
            setStatus('Duplicate citizenID')
        }
        else
        setStatus('Mint')
    }

    useEffect(() => {

        if(account && chainId == 80001){
            setCount(account)
            checkCitizenID()
        }
        else{
            setCount("You'r wallet")
        }
    }, [account])


    const afterMint = async () => {
    }





    // const handleMintAndSet = async () => {
    //     // if (registeredNFT == '0' && registeredWallet == true) {
    //     let data = await brightIdData()
    //     if (data.error) {
    //         console.log('error')
    //         try{
    //             setStatus('Mint and register ...')
    //             await mintAndRegisterNotID(account)
    //             afterMint()
    //         }

    //         catch{
    //             console.log('err')
    //             setStatus('Mint and register') 
    //         }
    //     }
    //     else{

    //         try{
    //             setStatus('Mint and register ...')
    //             await mintAndSet(data, chainId)
    //             afterMint()

    //         }
    //         catch{
    //             console.log('err')
    //             setStatus('Mint and register')
    //         }
    //     }

    // }


    const handleMint = async () => {

              try{
                setStatus('Minting ...')
                await mint()
                checkCitizenID()
              }
              catch{
                console.log('error')
                checkCitizenID()
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
            type="text"
            label = 'Count'
            readOnly
            placeholder = "You'r wallet"
            value = {count ?? ''} 
            fontSize= '14px'
            color='#999'
            // onChange = {(event) => handelCountChange(event.target.value)} 
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
        <ActionButton handleMint={handleMint} status={status} />
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
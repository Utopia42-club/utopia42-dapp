import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
import useLastCitizenId from './useLastCitizenId';
import useCitizenId from './useCitizenId'
import { useState } from 'react';
import { formatAddress } from '../utils/formatAddress'
import useIsRegister from './useIsRegister';
import { toCheckSumAddress } from '../utils/toCheckSumAddress';
import { useWeb3React } from '@web3-react/core';

const useSetBrightIdQrCode = (NFTs, checkNFT, setBtnName) => {
    let nftID;
    const web3 = useWeb3()
    const getCitizenID = useCitizenId() 
    const isRegister = useIsRegister()
    const getLastID = useLastCitizenId()
    let status = 'Register'
    const brightIdData = useBrightIdApi()
    let registeredNFT
    let lastId;
    let firstId;
    let lastContextId;
    const { account} = useWeb3React()
    
    const setBrightId = async (account_, isMobile) => {
        // console.log(account_)
        if(!account_ || account_.trim() == ''){
            return Swal.fire({
                text:'Please enter an address',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })  
        }
        try{
            toCheckSumAddress(account_)
        }
        catch{
            return Swal.fire({
                text:'Invalid address',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
        const citizenID = await getCitizenID(account_)
        const data = await brightIdData(account_)
        // console.log(data)
        if (data.error){
            setBtnName('Set BrightID')
            lastId = 0
            let text;
            if(isMobile){
                text = "Link you'r BrightID to Utopia42"
            }
            else{
                text = "Please scan QR code"
            }
            return Swal.fire({
                text: text,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
        }
        // if (data.contextIds.includes(account_.toLowerCase())){
        //     return Swal.fire({
        //         text:"This wallet is connected before",
        //         icon:'error',
        //         showConfirmButton: false,
        //         timer: 2500
      
        //     })
        // }
        lastContextId = data.contextIds[0]
        if(!await isRegister(account_) && !await isRegister(data.contextIds[data.contextIds.length-1])) {
            registeredNFT =  false
        }
        else{
            registeredNFT =  true
        }
        // console.log(lastContextId)
        lastId = await getLastID(lastContextId)
        firstId = await getLastID(data.contextIds[data.contextIds.length-1])

        if(registeredNFT && citizenID != 0){
            checkNFT()
            setBtnName('Set BrightID')
            return Swal.fire({
                text:"Already has CitizenID",
                icon:'error',
                showConfirmButton: false,
                timer: 2500
      
            })
        }

        if(account_.toLocaleLowerCase() != lastContextId.toLocaleLowerCase() && lastId != 0) {
            // console.log(account_, lastContextId, lastId)
            return Swal.fire({
                icon:'error',
                text: `Transfer CitizenID from ${formatAddress(lastContextId)} to another address`,
                showConfirmButton: false,
                timer:3000,
            })
        }

        if (registeredNFT) {
            nftID = firstId
        }

        else{
            nftID = citizenID
        }

        // console.log(nftID)
        let contextIds = data.contextIds
        let sgiR = '0x' + data.sigR
        let sugS = '0x' + data.sigS
        let sigV = data.sigV
        let timestamp = data.timestamp
        try {
            const NFTContract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
                return sendTransaction(
                    status,
                    NFTContract,
                    'setBrightId',
                    [nftID,
                        contextIds,
                        timestamp, 
                        sigV,
                        sgiR,
                        sugS,],
                        account
                    )
        }
        catch(err){
            setBtnName('Set BrightID')
            checkNFT()
            let error;
            err.reason ?  error = err.reason : error = err.message 
            return Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }

    }
    return setBrightId
}

export default useSetBrightIdQrCode
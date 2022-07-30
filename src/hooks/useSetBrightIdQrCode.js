import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
import useGetLastCitizenId from './useGetLastCitizenId';
import useLastCitizenId from './useLastCitizenId';
import useCitizenId from './useCitizenId'
import { useState } from 'react';
import { formatAddress } from '../utils/formatAddress'
import useIsRegister from './useIsRegister';

const useSetBrightIdQrCode = (account,  NFTs, checkNFT, setBtnName) => {
    let nftID;
    const web3 = useWeb3()
    const getCitizenID = useCitizenId() 
    const isRegister = useIsRegister()
    const getLastCitizenId = useGetLastCitizenId()
    const [lastCitizenID, setLastCitizenID] = useState()
    const getLastID = useLastCitizenId()
    let status = 'Register'
    const brightIdData = useBrightIdApi()
    let registeredNFT
    let lastId;
    let firstId;
    let lastContextId;
    
    const setBrightId = async (isMobile) => {
        const citizenID = await getCitizenID(account)
        console.log(citizenID)
        const data = await brightIdData()
        console.log(data)
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
        lastContextId = data.contextIds[0]
        if(!await isRegister(account) && !await isRegister(data.contextIds[data.contextIds.length-1])) {
            registeredNFT =  false
        }
        else{
            registeredNFT =  true
        }
        console.log(lastContextId)
        lastId = await getLastID(lastContextId)
        firstId = await getLastID(data.contextIds[data.contextIds.length-1])

        if(registeredNFT && citizenID != 0){
            checkNFT()
            setBtnName('Set BrightID')
            return Swal.fire({
                text:"Transfer you'r CitizenID",
                icon:'error',
                showConfirmButton: false,
                timer: 2500
      
            })
        }

        if(account.toLocaleLowerCase() != lastContextId.toLocaleLowerCase() && lastId != 0) {
            console.log(account, lastContextId, lastId)
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

        console.log(nftID)
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
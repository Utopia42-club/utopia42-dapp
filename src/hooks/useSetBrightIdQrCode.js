import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
import useGetLastCitizenId from './useGetLastCitizenId';
import useCitizenId from './useCitizenId'
import { useState } from 'react';

const useSetBrightIdQrCode = (account,  NFTs, checkNFT, setBtnName) => {
    let nftID;
    const web3 = useWeb3()
    const getCitizenID = useCitizenId() 
    const getLastCitizenId = useGetLastCitizenId()
    const [lastCitizenID, setLastCitizenID] = useState()
    let status = 'Register'
    const brightIdData = useBrightIdApi()
    const setBrightId = async (isMobile) => {
        const citizenID = await getCitizenID(account)
        console.log(citizenID)
        const data = await brightIdData()
        console.log(data)
        if (data.error){
            setBtnName('Set BrightID')
            setLastCitizenID(0)
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
        let lastContextId = data.contextIds[data.contextIds.length-1]
        let registeredNFT =  await getLastCitizenId(lastContextId, setLastCitizenID)
        console.log(registeredNFT)

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

        if (registeredNFT){
            nftID = lastCitizenID
        }

        else{
            nftID = citizenID
        }

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
import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
import useGetLastCitizenId from './useGetLastCitizenId';

const useSetBrightIdQrCode = (account,  NFTs, checkNFT, setBtnName) => {
    const web3 = useWeb3()
    const getLastCitizenId = useGetLastCitizenId()
    let status = 'Register'
    const brightIdData = useBrightIdApi()
    const setBrightId = async () => {
        console.log(registeredNFT)
        const data = await brightIdData()
        console.log(data)
        if (data.error){
            setBtnName('Set BrightID')
            return Swal.fire({
                text: 'Please scan QR code',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
        }
        let lastContextId = data.contextIds[data.contextIds.length-1]
        let registeredNFT =  await getLastCitizenId(lastContextId)
        console.log(registeredNFT)

        if(registeredNFT && NFTs[0] && Number(registeredNFT) != Number(NFTs[0])){
            checkNFT()
            setBtnName('Set BrightID')
            return Swal.fire({
                text:"Transfer you'r CitizenID",
                icon:'error',
                showConfirmButton: false,
                timer: 2500
      
            })
          }
        // if (!id || Number(id) == 0) {
        //     return Swal.fire({
        //         text: 'Invalid NFT Id',
        //         icon: 'error',
        //         showConfirmButton: false,
        //         timer: 1500
    
        //     })
        // }
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
                    [registeredNFT,
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
            //  setMintName('Mint')
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
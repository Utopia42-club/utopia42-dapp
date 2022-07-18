import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
import useCitizenId from './useCitizenId';
const useSetBrightIdQrCode = (account) => {
    const web3 = useWeb3()
    let status = 'Register'
    const getCitizenId = useCitizenId()
    const brightIdData = useBrightIdApi()
    const setBrightId = async () => {
        let id = await getCitizenId(account)
        const data = await brightIdData()
        console.log(data)
        if (data.error){
            return Swal.fire({
                text: 'Please scan QR code',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
        }
        if (!id || Number(id) == 0) {
            return Swal.fire({
                text: 'Invalid NFT Id',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
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
                    [id,
                        contextIds,
                        timestamp, 
                        sigV,
                        sgiR,
                        sugS,],
                        account
                    
                    )
        }
        catch(err){
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
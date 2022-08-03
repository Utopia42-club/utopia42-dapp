import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import useBrightIdApi from './useBrightIdApi'
const useSetBrightId = (account) => {
    const web3 = useWeb3()
    let status = 'Register'
    const brightIdData = useBrightIdApi()
    const setBrightId = async (id) => {
        const data = await brightIdData(account)
        // console.log(id)
        if (!id) {
            return Swal.fire({
                text: 'Invalid NFT Id',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
        }
        // console.log(account, id, data)
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

export default useSetBrightId
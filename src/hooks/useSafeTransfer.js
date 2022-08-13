import { unbcNFTAbi } from '../ABI/ABI'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

import useCitizenId from './useCitizenId'
import Swal from 'sweetalert2'

const useSafeTransfer = () => {
    const web3 = useWeb3()
    const getCitizenId = useCitizenId()
    const { account } = useWeb3React()
    let status = 'Transfer'
    // const contractAddress = '0xb800B8AC21a451444A5E9d21ce0ac89Da219F3D4'
    const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)

    const safeTransfer = async (toAddress, tokenId) => {
        if(Number(await getCitizenId(toAddress)) != 0 ) {
          return Swal.fire({
            text: 'Destination Address has citizenID',
            icon:'error',
            showConfirmButton: false,
            timer: 1500
          })
        }

        // console.log(toCheckSumAddress(toAddress))

        if (!contract) {
            console.error('contract is null')
            return
          }
      
          return sendTransaction(
            status,
            contract,
            'transferFrom',
            [account, toAddress, tokenId],
            account,
          )
    }

    return safeTransfer
}

export default useSafeTransfer

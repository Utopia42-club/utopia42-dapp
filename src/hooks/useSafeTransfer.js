import { unbcNFTAbi } from '../ABI/ABI'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useSafeTransfer = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React()
    // const contractAddress = '0xb800B8AC21a451444A5E9d21ce0ac89Da219F3D4'
    const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)

    const safeTransfer = async (toAddress, tokenId) => {
        
        if (!contract) {
            console.error('contract is null')
            return
          }
      
          return sendTransaction(
            contract,
            'transferFrom',
            [account, toAddress, tokenId],
            account,
          )
    }

    return safeTransfer
}

export default useSafeTransfer

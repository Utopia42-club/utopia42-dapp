import { unbcNFTAbi } from '../ABI/ABI'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useSafeTransfer = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React()
    const contractAddress = '0x7A4aCd401DBea587fb7ecC42D6a74AED86694fE2'
    const contract = getContract(unbcNFTAbi, contractAddress, web3)

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

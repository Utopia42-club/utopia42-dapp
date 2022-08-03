import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import { sendTransaction } from '../utils/sendTx'

const useRegisterToken = () => {
    const web3 = useWeb3()
    let status = 'Register'
    const register = async (account, tokenId) => {
        // console.log(account, tokenId)
        if (account != undefined){

            const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
            return sendTransaction(
                status,
                contract,
                'registerToken',
                [tokenId],
                account,
              )
        }
    }
    return register
}

export default useRegisterToken
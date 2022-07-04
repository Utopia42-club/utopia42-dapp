import { mrc721MinterAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { minterContractAddress } from '../ContractsAddresses'

const useMaxPerUser = () => {
    const web3 = useWeb3()
    const maxPerUser = async () => {
        const contract = getContract(mrc721MinterAbi, minterContractAddress, web3)
        return await contract.methods.maxPerUser().call()
    }
    
    return maxPerUser
}

export default useMaxPerUser
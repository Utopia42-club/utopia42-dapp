import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses'

const useLastCitizenId = () => {
    const web3 = useWeb3()
    const getLastID = async (account) => {
        const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const citizenID = await contract.methods.getCitizenID(account).call()
        return citizenID
    }

    return getLastID
}

export default useLastCitizenId
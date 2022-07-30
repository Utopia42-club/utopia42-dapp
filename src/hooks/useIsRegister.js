import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses'

const useIsRegister = () => {
    const web3 = useWeb3()
    const isRegister = async (account) => {
        const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const citizenID = await contract.methods.getCitizenID(account).call()
        const isRegistered = await contract.methods.params(citizenID).call()
        return isRegistered.isVerified
    }

    return isRegister
}

export default useIsRegister
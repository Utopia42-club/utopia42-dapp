import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses'

const useGetLastCitizenId = () => {
    const web3 = useWeb3()
    const getCitizenId = async (account, setLastCitizenID) => {
        const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const citizenID = await contract.methods.getCitizenID(account).call()
        setLastCitizenID(citizenID)
        const isRegistered = await contract.methods.params(citizenID).call()
        console.log(isRegistered.isVerified)
        return isRegistered.isVerified
    }

    return getCitizenId
}

export default useGetLastCitizenId
import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useIsVerified = () => {
    const web3 = useWeb3()
    const isVerified = async (nftID) => {
        const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const res = await contract.methods.params(nftID).call();
        return res['isVerified']
    }

    return isVerified
}

export default useIsVerified
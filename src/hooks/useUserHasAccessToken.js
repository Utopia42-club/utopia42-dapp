import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useUserHasAccessToken = () => {
    const web3 = useWeb3()
    const hasToken = async (account, tokenId) => {
        if (account != undefined){
            const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
            const res =  await contract.methods.userHasAccessToken(account, tokenId).call();
            return res
        }
    }

    return hasToken
}

export default useUserHasAccessToken
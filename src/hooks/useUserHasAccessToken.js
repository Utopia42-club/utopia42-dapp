import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useUserHasAccessToken = () => {
    const web3 = useWeb3()
    const hasToken = async (account) => {
        if (account != undefined){
            const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
            const tokenId = await contract.methods.uniqueOwner(account).call()
            // console.log(tokenId)
            const res =  await contract.methods.userHasAccessToken(account, tokenId).call();
            // console.log(res)
            return {res: res, tokenId:tokenId}
        }
    }

    return hasToken
}

export default useUserHasAccessToken
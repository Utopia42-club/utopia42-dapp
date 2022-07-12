import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useUserRegisterNFTs =  (account) => {
    const web3 = useWeb3()
    const getRegisterNFTs = async (lastContextId) => {
        const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        if (lastContextId) {
            const tokenId =  await contract.methods.uniqueOwner(account).call();
            const res =  await contract.methods.userHasAccessToken(lastContextId, tokenId).call();
            console.log({res: res, tokenId:tokenId})
            // if (!res) {
            //     return '0'
            // }
            // else{
                return tokenId
            // }
        }
        else{
            // const tokenId =  await contract.methods.usersTokenRegistered(account).call();
            // if (tokenId == 0){
            //     return '0'
            // }
            // const res =  await contract.methods.userHasRegisteredToken(account, tokenId).call();
            // if (!res){
            //     return '0'
            // }
            // else{
                // return tokenId
            // }
        }
    }

    return getRegisterNFTs
}

export default useUserRegisterNFTs
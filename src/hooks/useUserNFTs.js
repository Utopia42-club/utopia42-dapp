import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useUserNFTs =  (account) => {
    const web3 = useWeb3()
    const getNFTs = async () => {

        if (account != undefined){
            const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
            const res =  await contract.methods.tokensOfOwner(account).call();
            return res
        }
    }

    return getNFTs
}

export default useUserNFTs
import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useIsSetBrightID = () => {
    const web3 = useWeb3()
    const isSetBrightID = async (account) => {
        const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const res = await contract.methods.brightIDAddrs(account).call();
        return res
    }

    return isSetBrightID
}

export default useIsSetBrightID
import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import { useWeb3React } from '@web3-react/core';

const useIsSetBrightID = () => {
    const { account, chainId } = useWeb3React()
    console.log(chainId)
    const web3 = useWeb3()
    const isSetBrightID = async (account) => {
        const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        const res = await contract.methods.brightIDAddrs(account).call();
        return res
    }

    return isSetBrightID
}

export default useIsSetBrightID
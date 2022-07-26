import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';
import { useWeb3React } from '@web3-react/core';

const useIsSetBrightID = () => {
    const { account, chainId } = useWeb3React()


    const web3 = useWeb3()
    const isSetBrightID = async (account) => {
        const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
        // console.log(contract)
        const res = await contract.methods.brightIDAddrs(account).call();
        return res
    }

    return isSetBrightID
}

export default useIsSetBrightID
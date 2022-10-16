import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses'

const useGetPrice = () => {
  const web3 = useWeb3();

  const getTotalSupply = async () => {
    const contract = await getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
    // console.log(contract)
    if (!contract) {
      console.error('contract is null')
      return
    }

    const totalSupply =  await contract.methods.totalSupply().call()
    // console.log(totalSupply)
    return totalSupply

  }

  return getTotalSupply
}

export default useGetPrice

import { mrc721MinterAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { minterContractAddress } from '../ContractsAddresses'

const useGetMaticPrice = () => {
    const web3 = useWeb3();

    const getPrice = async () => {
        const contract = await getContract(mrc721MinterAbi, minterContractAddress, web3)

    if (!contract) {
        console.error('contract is null')
        return
      }
  
      const price =  await contract.methods.price('1').call()
      return price
    }

    return getPrice
}



export default useGetMaticPrice
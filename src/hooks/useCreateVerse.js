import { utopiaFactoryAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { utopiaFactoryContractAddress } from '../ContractsAddresses'

const useCreateVerse = () => {
  const web3 = useWeb3();
  let status = 'Created new verse'
  
  const createVerse = async (account ,admin) => {
    const contract = getContract(utopiaFactoryAbi, utopiaFactoryContractAddress, web3)

    if (!contract) {
      console.error('contract is null')
      return
    }

      return sendTransaction(
        status,
        contract,
        'createVerse',
        [admin],
        account,
      )
  }

  return createVerse
}

export default useCreateVerse

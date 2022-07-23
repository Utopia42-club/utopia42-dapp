import { utopiaFactoryAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import { utopiaFactoryContractAddress } from '../ContractsAddresses'
import useWalletBalance from './useWalletBalance'
import { fromWei } from '../utils/wei'
import Swal from 'sweetalert2'
import { toCheckSumAddress } from '../utils/toCheckSumAddress'
const useCreateVerse = (account, chainId) => {
  const web3 = useWeb3();
  let status = 'Created new verse'
  const fetchBalance = useWalletBalance(account, chainId)

  const createVerse = async (account ,admin, verseName, assignEnable) => {
    const balance = await fetchBalance()
    console.log(balance, verseName, assignEnable)
    toCheckSumAddress(admin)
    const contract = getContract(utopiaFactoryAbi, utopiaFactoryContractAddress, web3)
    if (!contract) {
      console.error('contract is null')
      return
    }

    const verseCreationFee =  await contract.methods.verseCreationFee().call()
    if(Number(balance) > Number(fromWei(verseCreationFee))){
      return sendTransaction(
        status,
        contract,
        'createVerse',
        [admin, verseName, assignEnable],
        account,
        verseCreationFee,
      )
    }
    else{
      return Swal.fire({
        title: 'Insufficient Balance',
        icon: 'error',
        showConfirmButton: false,
        time: 1500
      })
    }

  }

  return createVerse
}

export default useCreateVerse

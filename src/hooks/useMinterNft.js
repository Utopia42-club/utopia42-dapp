import { mrc721MinterAbi } from '../ABI/ABI';
import { getContract } from '../utils/contractHelpers';
import { sendTransaction } from '../utils/sendTx';
import useWeb3 from './useWeb3';
import useWalletBalance from './useWalletBalance';
import { fromWei } from '../utils/wei';
import { minterContractAddress } from '../ContractsAddresses';
import { useWeb3React } from '@web3-react/core'

const useMinterNft = (address, chainId) => {
  const { account } = useWeb3React()
  const Swal = require('sweetalert2')
  const web3 = useWeb3();
  let status = 'Mint'
  const balance = useWalletBalance(address, chainId)
  const mint = async () => {
    const fetchBalance = await balance()
    const contract = getContract(mrc721MinterAbi, minterContractAddress, web3)
    if (!contract) {
      console.error('contract is null')
      return
    }

    const price =  await contract.methods.price('1').call()
    console.log(price)
    console.log(Number(fetchBalance), fromWei(price))
    if (Number(fetchBalance) < fromWei(price)){
      return Swal.fire({
        text: 'Insufficient balance',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
      return sendTransaction(
        status,
        contract,
        'mint',
        [address, '1'],
        address,
        price
      )
  }

  return mint
}

export default useMinterNft

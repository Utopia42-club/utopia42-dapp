import { mrc721MinterAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import useWalletBalance from './useWalletBalance'
import { fromWei } from '../utils/wei'
import { minterContractAddress } from '../ContractsAddresses'

const useMinterNft = (address, chainId, count, toAddress) => {
  const Swal = require('sweetalert2')
  const web3 = useWeb3();
  let status = 'Mint'
  // const contractAddress = '0xAE2ade04cBd44D2c723252114f3545130D609a93'
  const balance = useWalletBalance(address, chainId)

  const mint = async () => {
    const contract = getContract(mrc721MinterAbi, minterContractAddress, web3)
    console.log(contract)
    if (!contract) {
      console.error('contract is null')
      return
    }
    
    const price =  await contract.methods.price(count).call()

    if (Number(balance) < fromWei(price)){
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
        [toAddress, count],
        address,
        price
      )
  }

  return mint
}

export default useMinterNft

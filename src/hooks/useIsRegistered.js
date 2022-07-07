import { mrc721MinterAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useMinterNft = (address, chainId, count, toAddress) => {
  console.log(chainId)
  const web3 = useWeb3()
  const contractAddress = '0xaF7f06309dbefd4cA671111B587013B7B58588cc'

  const mint = async () => {
    const contract = getContract(mrc721MinterAbi, contractAddress, web3)
    // console.log(contract)
    if (!contract) {
      console.error('contract is null')
      return
    }
    
    const price =  await contract.methods.price(count).call()
    // console.log(price)
      return sendTransaction(
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

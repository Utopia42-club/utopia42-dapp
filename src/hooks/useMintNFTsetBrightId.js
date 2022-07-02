import { mrc721MinterAbi } from '../ABI/ABI'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useMintNFTsetBrightId = () => {
    const Swal = require('sweetalert2')
    const { account } = useWeb3React()
    const contractAddress = '0xaF7f06309dbefd4cA671111B587013B7B58588cc'
    const web3 = useWeb3()

    const mintAndSet = async (data) => {

      console.log('mintAndSet')

      let contextIds = data.contextIds
      let sgiR = '0x' + data.sigR
      let sugS = '0x' + data.sigS
      let sigV = data.sigV
      let timestamp = data.timestamp

      // if (toAddress == null){
      //   return Swal.fire({
      //       text: "Please enter Address for mint NFT",
      //       icon: 'error',
      //       showConfirmButton: false,
      //       timer: 1500
      //   })
      // }

      if (!contextIds.includes(account.toLowerCase())){
        return Swal.fire({
            text: "'Wrong Address'",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
      }
      console.log(account)
      if (account == null){
        return Swal.fire({
            text: "You'r wallet is not connect",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
      }

      const contract = getContract(mrc721MinterAbi, contractAddress, web3)
      const price =  await contract.methods.price('1').call()
      console.log(price)

      return sendTransaction(
        contract,
        'mintAndRegister',
        [ account,
          contextIds,
          timestamp, 
          sigV,
          sgiR,
          sugS],
          account,
        price
      )
      }

 return mintAndSet
}

export default useMintNFTsetBrightId
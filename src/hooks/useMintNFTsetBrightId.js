import { mrc721MinterAbi } from '../ABI/ABI'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import useWalletBalance from './useWalletBalance'
import { fromWei } from '../utils/wei'
import { minterContractAddress } from '../ContractsAddresses'

const useMintNFTsetBrightId = () => {
  const Swal = require('sweetalert2')
  const { account } = useWeb3React()
  const web3 = useWeb3()
    
  const mintAndSet = async (data) => {
     let status = 'Mint and Register'
    
      const balance = useWalletBalance(account, chainId)
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
      if (account == null){
        return Swal.fire({
            text: "You'r wallet is not connect",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
      }

      const contract = getContract(mrc721MinterAbi, minterContractAddress, web3)
      const price =  await contract.methods.price('1').call()
      if (Number(balance) < fromWei(price)){
        return Swal.fire({
          text: 'Insufficient balance',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }

      await sendTransaction(
        status,
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
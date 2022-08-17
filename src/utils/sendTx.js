// import { TransactionStatus } from '../constants/transactionStatus'
import Swal from 'sweetalert2'
import axios from 'axios'
import Web3 from 'web3'

export const sendTransaction = (status, contract, methodName, params, account, 
  payableValue = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = null
      let options = { from: account }
      if(payableValue !== null)
      {
        options['value'] = payableValue
      }
      const gasEstimate = await axios.get('https://gasstation-mainnet.matic.network/v2')
      console.log(gasEstimate)
      console.log(options, 'options')
      options.gasPrice = Web3.utils.toWei(Number(gasEstimate.data.standard.maxFee).toFixed().toString(), 'gwei')
      contract.methods[methodName](...params)
        .send(options)
        .once('transactionHash', (tx) => {
          hash = tx

        })
        .once('receipt', () => {
          Swal.fire({
            icon: 'success',
            text:`${status} Successfully`,
            showConfirmButton: false,
            timer:1500
          })
        })
        .once('error', (error) => {
          Swal.fire({
            icon: 'error',
            text: error.message,
            showConfirmButton: false,
            timer:1500
          })
          if (!hash) {

            reject()
            return
          }

          console.log('error in sendTX', error)
          reject()
        })
        .then(receipt => {
          resolve(receipt)
        })
    } catch (error) {
      console.log('error happend in send Transaction', error)
      return Swal.fire({
        icon: 'error',
        text:error,
        showConfirmButton: false,
        timer:1500
      })
    }
  })
}

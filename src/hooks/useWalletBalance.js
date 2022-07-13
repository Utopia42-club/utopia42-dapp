import { useState, useEffect } from 'react'
import { fromWei } from '../utils/wei'
import { getWeb3NoAccount } from '../utils/web3'

const useWalletBalance = (account, chainId) => {
  // const [balance, setBalance] = useState('0')
  const web3 = getWeb3NoAccount(chainId)
  let balance;
  
    const fetchBalance = async () => {
     try {
      let walletBalance = null
      walletBalance = await web3.eth.getBalance(account)
      balance = fromWei(walletBalance)
     } catch (error) {
       console.log("error happend in fetch balance",error)
     }
     return balance
    }

    return fetchBalance
    // if (account && chainId == 80001) fetchBalance()
}

export default useWalletBalance

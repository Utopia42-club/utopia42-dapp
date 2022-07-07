import { useState, useEffect } from 'react'
import { fromWei } from '../utils/wei'
import { getWeb3NoAccount } from '../utils/web3'

const useWalletBalance = (account, chainId) => {
  const [balance, setBalance] = useState('0')
  const web3 = getWeb3NoAccount(chainId)
  useEffect(() => {
    const fetchBalance = async () => {
      // console.log('fetch balance')
     try {

      let walletBalance = null
      walletBalance = await web3.eth.getBalance(account)
      setBalance(fromWei(walletBalance))
     } catch (error) {
       console.log("error happend in fetch balance",error)
     }
    }
    if (account && chainId == 80001) fetchBalance()
  }, [account])
  return balance
}

export default useWalletBalance

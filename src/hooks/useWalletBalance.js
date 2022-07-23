import { useState, useEffect } from 'react'
import { fromWei } from '../utils/wei'
import { getWeb3NoAccount } from '../utils/web3'

const useWalletBalance = (account, chainId) => {
  const web3 = getWeb3NoAccount(chainId)
  let balance;
  
    const fetchBalance = async () => {
     try {
      let walletBalance = null
      if(account){
        walletBalance = await web3.eth.getBalance(account)
        balance = fromWei(walletBalance)
      }
      else{
        balance = '0'
      }
     } catch (error) {
       console.log("error happend in fetch balance",error)
     }
     return balance
    }

    return fetchBalance
}

export default useWalletBalance

import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from './connectors'
import { connectorsByName } from './connectors'
import { useSaveWalletType } from '../state/walletType/hooks'

export function getLibrary(provider) {
  return provider
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)
  const walletType = useSaveWalletType()
  
  useEffect(() => {
    
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && localStorage?.getItem('isWalletConnected') === 'MetaMask' && localStorage?.getItem('walletConnectedFlag') == 'true') {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } 
      else if (localStorage?.getItem('isWalletConnected') === 'WalletConnect' && localStorage?.getItem('walletConnectedFlag') == 'true') {
        activate(connectorsByName['WalletConnect'], undefined, true).catch(() => {
          setTried(true)
        })
      }
      else{
        setTried(true)
      }
    })
  }, []) //eslint-disable-line
  //intentionally only running on mount(make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
      
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()
  useEffect(() => {


    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}

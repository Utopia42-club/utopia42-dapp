import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from './connectors'
import { connectorsByName } from './connectors'

export function getLibrary(provider) {
  return provider
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)

  useEffect(() => {

    injected.isAuthorized().then((isAuthorized) => {

      if (isAuthorized && localStorage?.getItem('isWalletConnected') === 'true' && !localStorage?.getItem('walletconnect')) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } 
      else if (isAuthorized && localStorage?.getItem('walletconnect')) {
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
    if(!active){
      localStorage.setItem('isWalletConnected', 'false')
    }

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

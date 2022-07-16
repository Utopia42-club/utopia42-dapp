import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, ActionText } from '../button/Button'
import { UnsupportedChainIdError } from '@web3-react/core'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { useBridge } from '../../state/bridge/hooks'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'

const ActionButtonComponent = (props) => {
  const { handleMint, status} = props
  console.log(status)
  const [open, setOpen] = useState(false)
  const { account, chainId, error } = useWeb3React()
  const bridge = useBridge()
  const wrongNetwork = !validChains.includes(chainId)

  let validChainId = null
  if (bridge.fromChain) {
    if (bridge.fromChain.id !== chainId) validChainId = bridge.fromChain.id
  }

  const handleConnectWallet = () => {
    // localStorage.setItem('isWalletConnected', 'true')
    try{
      setOpen(true)
    }

    catch{
      localStorage.setItem('isWalletConnected', 'false')
      console.log('close wallet')
    }
  }

  let contentBtn = ''
  if (!account && !(error instanceof UnsupportedChainIdError))
    contentBtn = (
      <Button margin="25px 0 0" color="#300c4b" background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%)" onClick={handleConnectWallet}>
          Connect Wallet
      </Button>
    )
  else if (wrongNetwork || validChainId || error instanceof UnsupportedChainIdError) {
    contentBtn = (
      <Button
        margin="25px 0 0"
        background={'rgba(255, 164, 81, 0.2)'}
        border="1px solid rgba(255, 164, 81, 1)"
        cursor="pointer"
        onClick={() =>
          wrongNetwork ? addRPC(bridge.fromChain ? bridge.fromChain.id : validChains[0]) : addRPC(validChainId)
        }
      >
        <Type.MD color={'rgba(49, 49, 68, 1)'} fontWeight="bold">
          {wrongNetwork
            ? ` Switch to ${NameChainMap[bridge.fromChain ? bridge.fromChain.id : validChains[0]]}`
            : ` Switch to ${NameChainMap[validChainId]}`}
        </Type.MD>
      </Button>
    )
  } 
  else if(status == 'Mint' || status == 'Minting ...') {

        contentBtn = (
          <Button border="2px solid #9682a5" fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif" margin="25px 0 0" color="#fff" background="#76568e"  onClick={handleMint} >
            {status}
          </Button>
        )
  }

  else if(status == 'Duplicate citizenID') {

    contentBtn = (
      <Button         
      margin="25px 0 0"
      background={'rgba(255, 164, 81, 0.2)'}
      border="1px solid rgba(255, 164, 81, 1)"
      cursor="text" >
        {status}
      </Button>
    )

  }


  return (
    <>
      {contentBtn}
      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}

export default ActionButtonComponent

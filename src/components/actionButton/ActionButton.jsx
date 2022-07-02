import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, ActionText } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { useBridge } from '../../state/bridge/hooks'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'

const ActionButtonComponent = (props) => {
  const { handleMint, status, checked } = props
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React()
  const bridge = useBridge()
  const wrongNetwork = !validChains.includes(chainId)

  let validChainId = null
  if (bridge.fromChain) {
    if (bridge.fromChain.id !== chainId) validChainId = bridge.fromChain.id
  }

  const handleConnectWallet = () => {
    setOpen(true)
  }
  let contentBtn = ''
  if (!account)
    contentBtn = (
      <Button margin="25px 0 0" background="#5F5CFE" onClick={handleConnectWallet}>
        <Type.LG color="#ffffff" fontSizeXS="16px">
          Connect Wallet
        </Type.LG>
      </Button>
    )
  else if (wrongNetwork || validChainId) {
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
  else if(!checked) {

        contentBtn = (
          <Button margin="25px 0 0" color="#300c4b" background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);"  onClick={handleMint} >
            {status}
          </Button>
        )
  }

  else if(status == 'Registered before' && checked) {

    contentBtn = (
      <Button         
      margin="25px 0 0"
      background={'rgba(255, 164, 81, 0.2)'}
      border="1px solid rgba(255, 164, 81, 1)"
      cursor="text" >
        Registered before
      </Button>
    )

  }

    else if(status == 'Mint and register' && checked) {

      contentBtn = (
        <Button margin="25px 0 0" color="#300c4b" background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);"  onClick={handleMint}>
          <ActionText >{status}</ActionText>
        </Button>
      )
  }

  else if(status === "You'r wallet is not registered on brightID" && checked) {
    contentBtn = (
      <Button         
      margin="25px 0 0"
      background={'rgba(255, 164, 81, 0.2)'}
      border="1px solid rgba(255, 164, 81, 1)"
      cursor="text">
        Mint and Register NFT: You'r wallet is not registered on brightID
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

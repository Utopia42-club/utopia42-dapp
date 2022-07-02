import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { Button, ActionButton, ActionText } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { ActionBtnType } from '../../constants/constants'
import { useBridge } from '../../state/bridge/hooks'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'

const ActionButtonComponent = (props) => {
  const { handleTransfer } = props
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React()
  const bridge = useBridge()

  const wrongNetwork = !validChains.includes(chainId)

  let validChainId = null
  if (bridge.fromChain) {
    // if (actionBtn === ActionBtnType.ADD_BRIDGE_TOKEN && bridge.toChain.id !== chainId) validChainId = bridge.toChain.id
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
  else {

        contentBtn = (
          <Button margin="25px 0 0" background="#5F5CFE" onClick={handleTransfer} active={'active'}>
            Transfer NFT
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

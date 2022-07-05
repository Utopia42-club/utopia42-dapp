import React from 'react'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'
import { Image } from '../common/FormControlls'
import Modal from './Modal'
import { connectorsByName } from '../../utils/connectors'
import { ModalItem } from './Modal.style'
import { useAddWalletType } from '../../state/walletType/hooks'

const WalletModal = (props) => {
  const addWalletType = useAddWalletType()
  const { open, hide } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  return (
    <Modal open={open} hide={hide} title="Connect Wallet">
      {Object.keys(connectorsByName).map((name) => {
        return (
          <ModalItem
            key={name}
            onClick={() => {
              localStorage.setItem('isWalletConnected', name)
              // addWalletType(name)
              try{
                activate(connectorsByName[name])
              }
              catch{
                console.log('wallet modal error')
                localStorage.setItem('walletConnectedFlag', 'false')
              }
              hide()
            }}
          >
            <Flex padding="0 20px" justifyContent="space-between" width="100%" alignItems="center" color={'#D3DBE3'}>
              {name}
              <Image width="24px" height="24px" paddingRight="0" src={`/media/common/${name}.svg`} />
            </Flex>
          </ModalItem>
        )
      })}
    </Modal>
  )
}

export default WalletModal

import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { useBridge } from '../../state/bridge/hooks'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'
import { Container, Wrapper } from '../container/Container'
import { Flex } from 'rebass'
import { Box } from '../MintCitizenNFT/Container';
import { GradientTitle } from '../text/Title';
import {  TriangleDown } from '../common/FormControlls';
import { UnsupportedChainIdError } from '@web3-react/core'

const ConnectWallet = (props) => {
    const {name} = props
    const [open, setOpen] = useState(false)
    const { account, chainId, error } = useWeb3React()
    const bridge = useBridge()
    const wrongNetwork = !validChains.includes(chainId)
    let message;

    let validChainId = null

    if (bridge.fromChain) {
        if (bridge.fromChain.id !== chainId) validChainId = bridge.fromChain.id
      }

    const handleConnectWallet = () => {
        setOpen(true)
    }

    let contentBtn = ''
    if (!account && !(error instanceof UnsupportedChainIdError)){
    message = 'Wallet is not connect'
    contentBtn = (
      <Button  background="#76568e" border="2px solid #9682a5" fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif" margin="25px 0 0" color="#fff" onClick={handleConnectWallet}>
          Connect Wallet
      </Button>
    )
    }
    else if (wrongNetwork || validChainId || error instanceof UnsupportedChainIdError) {
        message = 'Wrong Network'
        console.log(wrongNetwork)
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

                {wrongNetwork
                  ? ` Switch to ${NameChainMap[bridge.fromChain ? bridge.fromChain.id : validChains[0]]}`
                  : ` Switch to ${NameChainMap[validChainId]}`}

            </Button>
          )
    }

  return (
    <>
        <Container>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
            <Wrapper maxWidth="470px" width="100%">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
                <GradientTitle margin="0 0 10px">{name}</GradientTitle>
                    <Box background="linear-gradient(0deg,#D3DBE3 0%,rgba(231,235,243,0) 106.95%);">
                        {message}
                    </Box>
                    <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
                        <TriangleDown />
                    </Box>
                    <div style={{width:"100%", background:"linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%"}}>
                    <Box marginTop="10" background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
                        {contentBtn}
                        <WalletModal
                            open={open}
                            hide={() => {
                            setOpen(!open)
                            }}
                        />
                    </Box>
                    </div>
                </Flex>
            </Wrapper>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
        </Container>
    </>
  )
    

}

export default ConnectWallet
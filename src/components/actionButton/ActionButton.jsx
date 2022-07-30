import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, ActionText } from '../button/Button'
import WalletModal from '../modal/WalletModal'


const ActionButtonComponent = (props) => {
  const { handleMint, status, } = props
  const [open, setOpen] = useState(false)
  const { account, chainId, error } = useWeb3React()

  let contentBtn;
  if(status == 'Mint' || status == 'Minting ...') {

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
        Already has a citizenID
      </Button>
    )

  }


  return (
    <>
      {contentBtn}
    </>
  )
}

export default ActionButtonComponent

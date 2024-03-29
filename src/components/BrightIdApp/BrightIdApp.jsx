
import { generateDeeplink, putTestingBlock, removeTestingBlock, sponsor, verifyContextId, availableSponsorships } from 'brightid_sdk';
import QRCode from 'qrcode.react';
import React from 'react';
import { v4 } from 'uuid';
import { GradientTitle, } from '../text/Title';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import useSetBrightIdQrCode from '../../hooks/useSetBrightIdQrCode';
import { useState } from 'react';
import {LinkBox, Box} from './style'
import { toCheckSumAddress } from '../../utils/toCheckSumAddress';


function BrightIdApp(props) {
  const { account } = useWeb3React()
  const { checkNFT, NFTs, updateBrightID} = props
  const [verified, setVerified] = React.useState()
  const [privateKey, setPrivateKey] = React.useState(process.env.NEXT_PUBLIC_PRIVATE_KEY)
  const [testingKey, setTestingKey] = React.useState()
  const appName = 'Utopia42'
  const [context, setContext] = React.useState('Utopia42')
  const [contextId, setContextId] = React.useState()
  const [deeplink, setDeeplink] = React.useState()
  const [btnName, setBtnName] = useState('Connect')
  const [sponsorships, setSponsorships] = React.useState(0)
  const [res, setRes] = React.useState()
  const setBrightId = useSetBrightIdQrCode(NFTs, checkNFT, setBtnName)
  const [width, setWidth] = useState(window.innerWidth)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 782;

  const handleSetBrightID = async () => {
      setBtnName('Connect ...')
      await setBrightId(contextId, isMobile)
      setBtnName('Connect')
      checkNFT()
  }



  // const generateContextId = () => {
  //   setContextId(v4())
  // }

  // const verify = async () => {
  //   let res = await verifyContextId(context, contextId)
  //   setVerified(res)
  //   setRes(JSON.stringify(res, null, 2))
  //   console.log(res)
  // }

  // verify()

  const trySponsor = async () => {
    let res = await sponsor(privateKey, context, contextId)
    setRes(JSON.stringify(res, null, 2))
    // console.log(res)
  }

  // const testBlocks = async (op) => {
  //   let res = await putTestingBlock(op, testingKey, context, contextId)
  //   setRes(JSON.stringify(res, null, 2))
  //   console.log(res)

  // }

  // const deleteTestBlocks = async (op) => {
  //   let res = await removeTestingBlock(op, testingKey, context, contextId)
  //   setRes(JSON.stringify(res, null, 2))
  //   console.log(res)
  // }

  useEffect(() => {
    if(contextId){
    try{
      toCheckSumAddress(contextId)
      trySponsor()
    }
    catch{
      return
    }
  }
  }, [contextId])

  useEffect(() => {
    setContext('Utopia42')
    if(!updateBrightID){
      setContextId(account)
    }
    else{
      setContextId('')
    }
  }, [account])

  React.useEffect(() => {
    if (context && contextId) {
      setDeeplink(generateDeeplink(context, contextId))
    }
    else setDeeplink('')
  }, [context, contextId])

  React.useEffect(() => {
    if (context) {
      availableSponsorships(context).then((res) => {
        if (typeof res === 'number')
          setSponsorships(res)
      })
    }
  }, [context])
  return (
    <div style={{marginBottom:"30px", marginTop:"20px"}}>
      <div>
      {
        updateBrightID ?
        <GradientTitle margin="0 0 10px">Connect new wallet to BrightID</GradientTitle>
        :
        <GradientTitle margin="0 0 10px">Please scan the QR code and then click on the Connect button.</GradientTitle>
      }
        {/* <header style={{marginBottom:"5px"}}>BrightID App</header> */}
        <div>
        <div style={{border:"1px solid #ccc", padding:"10px", borderRadius:"5px"}} >
          {/* <header>Application Context</header> */}
          <div style={{display:"flex"}}>
            <div style={{ width:"100%"}}>
              <div>
                {/* <input style={{width:"100%", height:"30px", marginBottom:"5px", borderRadius:"5px",  border:"1px solid #ccc", padding:"5px", backgroundColor:"#eee"}}  placeholder="Context" value={context} onChange={(evt) => setContext(evt.target.value)} readOnly/> */}
              </div>
              <div>
                {updateBrightID ?
                
              <input style={{width:"100%", height:"30px",  borderRadius:"5px", border:"1px solid #ccc", padding:"5px",backgroundColor:"#eee"}} placeholder="Enter new wallet address" value={contextId ?? ''} onChange={(evt) => setContextId(evt.target.value)}/>
              :
              ''
            }
              </div>
                {/* <button onClick={generateContextId}>Generate ContextId</button> */}
            </div>
          </div>
            <Box>
              <header style={{marginBottom:"10px", color:"#999"}}>Linking QR Code</header>
                <QRCode style={{width:'70%', height:'50%'}} value={deeplink ? deeplink : ''} />
                {/* {!updateBrightID ? */}
                <button className='setBrightIDbuttonQR' onClick={handleSetBrightID} style={{fontSize:'18px',marginTop:'10px',backgroundColor:"#76568e", border:'none', padding:'10px 20px', color:'white', fontWeight:"bold", borderRadius:'5px', cursor:'pointer'}}>{btnName}</button>
                {/* :
                '' */}
              
            </Box>
            <LinkBox>
              <div style={{marginTop:'30px'}}>
                <a style={{color:'#814f8c'}} href={deeplink}>Link you'r BrightID to Utopia42</a>
              </div>
            </LinkBox>
        </div>
          {/* <div>
            <header <button>Connect</button> >Application Keys</header>
            <input type="password" placeholder="Sponsor Private Key" value={privateKey} onChange={(evt) => setPrivateKey(evt.target.value)} />
            <input type="password" placeholder="Testing Key" value={testingKey} onChange={(evt) => setTestingKey(evt.target.value)} />
          </div> */}
          </div>

        <div>
          <div>
          {/* <div>
            <header >ContextID Status</header>
            <div>
              <div>
                <div >
                  <button onClick={verify} isDisabled={!context || !contextId}>Check status</button>
                  <div >Status verified: {verified && verified.hasOwnProperty('unique') ? verified.unique.toString() : 'unknown '}</div>
                </div>
                <div>
                  <button onClick={trySponsor} isDisabled={!privateKey || !context || !contextId}>Sponsor</button>
                  <div>Available sponsorships: {sponsorships}</div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div>
            <header>ContextID Status Testing Tools</header>
            <div />
            <div>Remove contextID status in current context</div>
            <div >
              <button onClick={() => testBlocks('verification')} isDisabled={!testingKey || !context || !contextId}>Unverify</button>
              <button onClick={() => testBlocks('sponsorship')} isDisabled={!testingKey || !context || !contextId}>Unsponsor</button>
              <button onClick={() => testBlocks('link')} isDisabled={!testingKey || !context || !contextId}>Unlink</button>
            </div>
            <div>Note: Updates to a contextId's status should reflect immediately in node responses</div>
            <div/>
            <div align="center">Reset contextID status in current context</div>
            <div>
              <button onClick={() => deleteTestBlocks('verification')} isDisabled={!testingKey || !context || !contextId}>Delete Unverify</button>
              <button onClick={() => deleteTestBlocks('sponsorship')} isDisabled={!testingKey || !context || !contextId}>Delete Unsponsor</button>
              <button onClick={() => deleteTestBlocks('link')} isDisabled={!testingKey || !context || !contextId}>Delete Unlink</button>
            </div>
            <div>Note: Removing contextId status updates takes 1-2 minutes to reflect in node responses</div>
          </div> */}
          </div>
          {/* <div>
            <header>Node Response</header>
            <Code>
              <textarea/>
            </Code>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BrightIdApp;
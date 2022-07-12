
import { generateDeeplink, putTestingBlock, removeTestingBlock, sponsor, verifyContextId, availableSponsorships } from 'brightid_sdk';
import QRCode from 'qrcode.react';
import React from 'react';
import { v4 } from 'uuid';
import { GradientTitle, } from '../text/Title';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import styled from 'styled-components'

function BrightIdApp(props) {
  const { account } = useWeb3React()
  const [verified, setVerified] = React.useState()
  const [privateKey, setPrivateKey] = React.useState()
  const [testingKey, setTestingKey] = React.useState()
  const [context, setContext] = React.useState('UNBC')
  const [contextId, setContextId] = React.useState(account)
  const [deeplink, setDeeplink] = React.useState()
  const [sponsorships, setSponsorships] = React.useState(0)
  const [res, setRes] = React.useState()

  const Box = styled.div`{
    margin-top:20px;
    @media screen and (max-width: 780px) {
      display: none;
    }
  }`

  const LinkBox = styled.div`{
    display:none;
    @media screen and (max-width: 780px) {
      display: block;
    }
  }`

  const generateContextId = () => {
    setContextId(v4())
  }

  const verify = async () => {
    let res = await verifyContextId(context, contextId)
    setVerified(res)
    setRes(JSON.stringify(res, null, 2))
    console.log(res)
  }

  const trySponsor = async () => {
    let res = await sponsor(privateKey, context, contextId)
    setRes(JSON.stringify(res, null, 2))
    console.log(res)
  }

  const testBlocks = async (op) => {
    let res = await putTestingBlock(op, testingKey, context, contextId)
    setRes(JSON.stringify(res, null, 2))
    console.log(res)

  }

  const deleteTestBlocks = async (op) => {
    let res = await removeTestingBlock(op, testingKey, context, contextId)
    setRes(JSON.stringify(res, null, 2))
    console.log(res)
  }

  useEffect(() => {
    setContext('UNBC')
    setContextId(account)
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
      <GradientTitle margin="0 0 10px">Connect your wallet to BrightID</GradientTitle>
        {/* <header style={{marginBottom:"5px"}}>BrightID App</header> */}
        <div>
        <div style={{border:"1px solid #ccc", padding:"20px", borderRadius:"5px"}} >
          {/* <header>Application Context</header> */}
          <div style={{display:"flex"}}>
            <div style={{marginTop:"23px", width:"100%"}}>
              <div>
                <input style={{width:"100%", height:"30px", marginBottom:"5px", borderRadius:"5px",  border:"1px solid #ccc", padding:"5px", backgroundColor:"#eee"}}  placeholder="Context" value={context} onChange={(evt) => setContext(evt.target.value)} readOnly/>
              </div>
              <div>
                <input style={{width:"100%", height:"30px",  borderRadius:"5px", border:"1px solid #ccc", padding:"5px",backgroundColor:"#eee"}} placeholder="ContextId" value={account} onChange={(evt) => setContextId(account)} readOnly/>
              </div>
                {/* <button onClick={generateContextId}>Generate ContextId</button> */}
            </div>
          </div>
            <Box>
              <header style={{marginBottom:"10px", color:"#999"}}>Linking QR Code</header>
                <QRCode style={{width:'50%', height:'50%'}} value={deeplink ? deeplink : ''} />
            </Box>
            <LinkBox>
              <div style={{marginTop:'30px'}}>
                <a style={{color:'#814f8c'}} href={deeplink}>Clickable link</a>
              </div>
            </LinkBox>
        </div>
          {/* <div>
            <header >Application Keys</header>
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
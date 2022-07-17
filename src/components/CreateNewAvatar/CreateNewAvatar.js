import { useEffect, useRef, useState } from "react";
import { Container, Wrapper, Box } from '../container/Container'
import { Input, TriangleDown } from '../common/FormControlls';
import { Flex } from "rebass";
import AvatarForm from "../avatarForm/AvatarForm.jsx";
import useCitizenId from "../../hooks/useCitizenId";
import { useWeb3React } from "@web3-react/core";
import MintComponent from "../MintComponent/MintComponent";

const CreateNewAvatar = () => {
  const subdomain = 'utopia42club';
  const {account, chainId} = useWeb3React()
  const getCitizenId = useCitizenId()
  const [show, setShow] = useState()
  const [avatarLink, setAvatarLink] = useState()
  const iFrameRef = useRef()
  const [citizenID, setCitizenId] = useState()

  let json;

  function subscribe(event) {
    json = parse(event);

    if (json?.source !== 'readyplayerme') {
      return;
    }

      // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready' && iFrameRef.current != undefined) {
        iFrameRef.current.contentWindow.postMessage(
        JSON.stringify({
        target: 'readyplayerme',
        type: 'subscribe',
        eventName: 'v1.**',
        }),
        '*'
      );
    }

      // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
      setShow(false)
      setAvatarLink(json.data.url)
    }

    if (json.eventName === 'v1.user.set') {
      // console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
  }

  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }
  window.addEventListener('message', subscribe);
  document.addEventListener('message', subscribe);

  function displayIframe() {
    setAvatarLink('')
    setShow(true)
  }

  const checkCitizenId = async () => {
    setCitizenId(await getCitizenId(account))
  }

  useEffect(() => {
    if(account && chainId == 80001){
      checkCitizenId()
    }
  }, [account])


  return (
    <>
    {chainId == 80001 &&  citizenID != 0? 
      <Container>
        <Wrapper maxWidth="100%" width="100%">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
            <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
                    <iframe 
                    ref={iFrameRef} 
                    style={{'width': '100%',
                            'height': '750px',
                            'marginTop': '30px',
                            'fontSize': '14px',
                            'border': 'none',
                          }} 
                    id="frame" 
                    className="frame" 
                    allow="camera *; microphone *" 
                    src={`https://${subdomain}.readyplayer.me/avatar?frameApi`} >  
                    </iframe> 
            </Box>
            <Box background="#f2f4fb" padding="0" borderRadius="0" border="none" width="100%">
                  <TriangleDown />
            </Box>
            <Box color='#fff' background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 110.95%)">
                <AvatarForm avatarLink={avatarLink} citizenID={citizenID}/>
            </Box>

          </Flex>


        </Wrapper>
       </Container>
       : <MintComponent checkCitizenId={checkCitizenId}/>}
    </>
  )

}

export default CreateNewAvatar


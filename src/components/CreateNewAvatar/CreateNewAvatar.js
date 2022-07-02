import { useRef, useState } from "react";
import {  Button } from "./CreateNewAvatar.style.jsx";
import useUpdateSetting from "../../hooks/useUpdateSetting.js";
import { useWeb3React } from '@web3-react/core'
import { Container, Wrapper, Box } from '../container/Container'
import { Flex } from "rebass";
import Swal from "sweetalert2";

const CreateNewAvatar = () => {
    const subdomain = 'utopia42club';
    const { account } = useWeb3React()
    const [show, setShow] = useState()
    const [avatarLink, setAvatarLink] = useState()
    const iFrameRef = useRef()
    const  updateSetting = useUpdateSetting()
    const valuesList = []
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
            valuesList.push(json.data.url)
        }

        if (json.eventName === 'v1.user.set') {
            console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
        }
    }

    function parse(event) {
    try {
        return JSON.parse(event.data);
    } catch (error) {
        return null;
    }
    }

    function displayIframe() {
    setAvatarLink('')
    setShow(true)
    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);
    }

    const handleUpdate = () => {
        if(!account){
            Swal.fire({
                text:'Wallet is not connect',
                icon: 'error',
                confirmButtonText: false,
                timer: 1500
            })
        }
        valuesList.push(avatarLink)
        updateSetting(account,['avatar'], valuesList)
    }

    return(
        <>

        <Container>


                <>
                <Wrapper maxWidth="300px" width="100%"></Wrapper>
                <Wrapper maxWidth="100%" width="100%">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
                {/* <GradientTitle margin="0 0 10px">Mint Citizen NFTs</GradientTitle> */}
                <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
                <div>
                {avatarLink ?  <div style={{display:"flex", marginTop:'30px'}}>
                    <p id="avatarUrl">Avatar URL : {avatarLink} </p>  
                </div> : '' }

                </div>
                {avatarLink ? <Button onClick={handleUpdate} background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">Update Avatar</Button> :  <Button onClick={() => displayIframe()} background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">Create Your Avatar</Button>}
                { show ? <iframe ref={iFrameRef} 
                                style={{ 'width': '100%',
                                'height': '700px',
                                'marginTop': '30px',
                                'fontSize': '14px',
                                'border': 'none',
                            }} 
                            id="frame" 
                            className="frame" 
                            allow="camera *; microphone *" 
                            src={`https://${subdomain}.readyplayer.me/avatar?frameApi`} >  
                </iframe> : '' 
                }
                </Box>
                </Flex>
                <div style={{alignItem:"center"}}>
             </div>
                </Wrapper>
                <Wrapper maxWidth="300px" width="100%">

                </Wrapper>
                </>

            </Container>

        </>
    )

}

export default CreateNewAvatar


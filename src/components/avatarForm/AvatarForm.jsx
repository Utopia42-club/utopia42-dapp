import { useState } from 'react'
import styled from 'styled-components'
import useUpdateSetting from "../../hooks/useUpdateSetting.js";
import { useWeb3React } from '@web3-react/core'
import Swal from "sweetalert2";

export const Input = styled.input`
max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '400px')};
width: 100%;
background: ${({ background }) => (background ? background : 'transparent')};
height: ${({ height }) => (height ? height : '45px')};
border: ${({ border }) => (border ? border : '1px solid #5F5CFE')};
border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
box-sizing: border-box;
font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'Montserrat')};
font-style: normal;
font-weight: normal;
font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
color: ${({ color }) => (color ? color : '#313144')};
&:focus {
  outline: none;
}
padding: 0 17px;
@media screen and (max-width: 576px) {
  font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '13px')};
  // max-width: 150px;
}
@media screen and (max-width: 460px) {
  // max-width: 120px;
  /* font-size: 10px; */
}
::placeholder {
  color: #909090;
  opacity: 1; /* Firefox */
  font-size: 13px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #909090;
  font-size: 13px;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #909090;
  font-size: 13px;
}
`

export const Link = styled.a`
text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
cursor: pointer;
font-weight: 400;
:hover {
  text-decoration: underline;
}
:focus {
  outline: none;
  text-decoration: underline;
}
:active {
  text-decoration: none;
}
`

export const Button = styled.button`
font-size: ${({ fontSize }) => fontSize};
margin-top:20px;
display: flex;
justify-content: center;
align-items: center;
max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
width: 200px;
min-height: ${({ height }) => (height ? height : '45px')};
background: ${({ background }) => (background ? background : '#D7D7D7')};
border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
border: ${({ border }) => (border ? border : 'transparent')};
margin: ${({ margin }) => margin};
box-sizing: border-box;
cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
&:focus {
  outline: none;
};
color:${({color}) => (color ? color: "#000")}
`

export const Textarea = styled.textarea`
font-size: ${({ fontSize }) => fontSize};
display: flex;
justify-content: center;
align-items: center;
max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
width: 100%;
min-height: ${({ height }) => (height ? height : '80px')};
background: ${({ background }) => (background ? background : '#D7D7D7')};
border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
border: ${({ border }) => (border ? border : '1px solid #5F5CFE')};
margin: ${({ margin }) => margin};
padding:5px;
box-sizing: border-box;
&:focus {
  outline: none;
};
color:${({color}) => (color ? color: "#000")}
`

const AvatarForm = (props) => {
  const {avatarLink} = props;
  const [telegram, setTelegram] = useState('')
  const [name, setName] = useState('')
  const [instagram, setInstagram] = useState('')
  const [discord, setDiscord] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const  updateSetting = useUpdateSetting()
  const { account } = useWeb3React()

  let valuesList = [];
  let keyList = [];

  const handleUpdate = () => {
    // if(telegram.trim()){
    //   valuesList.push(telegram)
    //   keyList.push('telegram')
    // }
    // if(instagram.trim()){
    //   valuesList.push(instagram)
    //   keyList.push('instagram')
    // }
    // if(discord.trim()){
    //   valuesList.push(discord)
    //   keyList.push('discord') 
    // }
    // if(facebook.trim()){
    //   valuesList.push(facebook)
    //   keyList.push('facebook')  
    // }
    // if(twitter.trim()){
    //   valuesList.push(twitter)
    //   keyList.push('twitter') 
    // }
    // if(bio.trim()){
    //   valuesList.push(bio)
    //   keyList.push('bio') 
    // }
    // if(name.trim()){
    //   valuesList.push(name)
    //   keyList.push('name') 
    // }
    // if(image.trim()){
    //   valuesList.push(image)
    //   keyList.push('image') 
    // }

    if(!account) {
      return Swal.fire({
          text:'Wallet is not connect',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
      })
    }
    if(avatarLink){
      console.log(valuesList)
      valuesList.push(avatarLink)
      keyList.push('avatar')
    }
    if(valuesList.length == 0){
      return Swal.fire({
        text:'No data for update',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    })
    }
    updateSetting(account, keyList, valuesList)
  }

  return (
    <>
      <div style={{marginTop:'50px'}}>
        {/* <div  style={{ marginTop:'20px', display:'flex',}}>
          <div style={{ marginRight:'20px'}}>
            <label>Avatar Link</label>
            <div>
              <Input value={avatarLink} readOnly/>
            </div>
          </div>
          <div>
            <label style={{ marginRight:'20px'}}>Name</label>
            <div>
              <Input value={name ?? ''} onChange={(item) => {setName(item.target.value)}}/>
            </div>
          </div>
        </div> */}
        {/* <div style={{display:'flex', marginTop:'20px'}}>
          <div style={{ marginRight:'20px'}}>
            <label>Image</label>
            <div>
              <Input readOnly value={image ?? ''} onChange={(item) => {setImage(item.target.value)}}/>
              <div>
              </div>
            </div>
          </div>
          <div>
            <label>Instagram</label>
            <div>
            <div>
              <Input value={instagram ?? ''} onChange={(item) => {setInstagram(item.target.value)}}/>
            </div>
            </div>
          </div>
        </div> */}
        {/* <div style={{display:'flex', marginTop:'20px'}}>
          <div style={{ marginRight:'20px'}}>
            <label>Telegram</label>
            <div>
              <Input value={telegram ?? ''} onChange={(item) => {setTelegram(item.target.value)}}/>
            </div>
          </div>
          <div>
            <label>Facebook</label>
            <div>
              <Input value={facebook ?? ''} onChange={(item) => {setFacebook(item.target.value)}}/>
            </div>
          </div>
        </div> */}
        {/* <div style={{display:'flex', marginTop:'20px'}}>
          <div style={{ marginRight:'20px'}}>
            <label>Twitter</label>
            <div>
              <Input value={twitter ?? ''} onChange={(item) => {setTwitter(item.target.value)}}/>
            </div>
          </div>
          <div>
            <label>Discord</label>
            <div>
              <Input value={discord ?? ''} onChange={(item) => {setDiscord(item.target.value)}}/>
            </div>
          </div>
        </div> */}

        {/* <div style={{marginTop:'20px'}}>
          <label>Bio</label>
          <Textarea value={bio ?? ''} onChange={(item) => {setBio(item.target.value)}} background="none"/>
        </div> */}

        <Button 
          onClick={handleUpdate} 
          background="linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);">Update Avatar</Button> 
      </div>
    </>
  )
}

export default AvatarForm
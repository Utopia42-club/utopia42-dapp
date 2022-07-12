import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'


const DropdownPointing = () => {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

        const [show, setShow] = useState(false)
        const menuItem = [{name: 'Home', link:'/'}, 
        {name: 'Citizen ID', subMenu:[{name:'Mint', link:'/Mint'}, {name:'NFTs', link:'/NFTs'}]},
        {name: 'Setting', subMenu:[{name:'Create Avatar', link:'/CreateAvatar'}]}, 
        {name:'Verses', subMenu:[{name:'Create Verses', link:'/CreateVerse'}, {name:'My Verses', link:'/Verses'}]}
      ]
      const wrapperRef = useRef(null)

      useOutsideAlerter(wrapperRef)

      function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setShow(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }


      

      const Button = styled.button`
        padding: ${({ padding }) => (padding ? padding : '0 15px')};
        cursor: ${({ active }) => (active ? 'pointer' : 'default')};
        border: ${({ active, border }) => (border ? border : active ? '1px solid #76568e' : '1px solid #d2d2d2')};
        height: 35px;
        background: #f8faff;
        border-radius: 5px;
        box-sizing: border-box;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #919191;
        margin-top:-10px;
      `

        return(
          <div  style={{ marginLeft:'10px', marginTop:'-5px'}}>
          <img src='/media/common/menu.png' onClick={() => setShow(!show)} height="30px"/>
            {/* menu */}
          {/* </Button> */}
          {show ? 
          <div style={{position:'relative'}}>
          <div ref={wrapperRef} style={{position:"absolute"}}>
          <Menu  vertical>
                {menuItem.map((item) => {

                if(item.subMenu){
                    return (<Dropdown text={item.name} pointing='left' className='link item'>
                    <Dropdown.Menu>
                    {item.subMenu.map((subName) => {
                        return (<Dropdown.Item>
                            <Link href={subName.link} ><p>{subName.name}</p></Link>
                        </Dropdown.Item>)
                    })}
                    </Dropdown.Menu>
                    </Dropdown>)
                }
                else{
                    return <Menu.Item><Link href={item.link} ><p>{item.name}</p></Link></Menu.Item>
                }
                })}
        </Menu> 
        </div>
        </div>
        :
        ''
          }
        </div>


            /*   <Menu vertical>
    <Menu.Item>Home</Menu.Item>
    <Dropdown text='Messages' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>Inbox</Dropdown.Item>
        <Dropdown.Item>Starred</Dropdown.Item>
        <Dropdown.Item>Sent Mail</Dropdown.Item>
        <Dropdown.Item>Drafts (143)</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item>Browse</Menu.Item>
    <Menu.Item>Help</Menu.Item>
  </Menu> */

        )

    

        }

export default DropdownPointing


import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'


const DropdownPointing = () => {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

        const [show, setShow] = useState(false)
        const menuItem = [ 
        {name: 'Citizen ID', subMenu:[{name:'Mint', link:'/Mint'}, {name:'Profile', link:'/Profile'}]}, 
        {name:'Verses', subMenu:[{name:'Create Verse', link:'/CreateVerse'}, {name:'My Verses', link:'/Verses'}, {name:'Explore Verses', link:'/ExploreVerses'}]},
        // {name: 'Communities', subMenu:[{name:'Communities ', link:'/Communities '},{name:'My communities', link:'MyCommunities'},{name:'Create a new community', link:'/CreateNewCommunity'}]}
        {name:'Support', subMenu:[{name:'CitizenID tutorial', link: 'https://utopia42club.gitbook.io/docs/how-to-mint-utopia42-citizenid', target:'_blank'},
        {name:'BrightID tutorial', link:'https://brightid.gitbook.io/brightid/', target:'_blank'},
        {name:'ReadyPlayer.Me tutorial', link:'https://support.readyplayer.me/hc/en-us/articles/360020887418-How-to-create-a-3D-avatar-with-Ready-Player-Me-', target:'_blank'},
        {name:'Have more questions?', link:'https://discord.gg/TphaKUZzHx', target:'_blank'}
        ]}
      ]
      const wrapperRef = useRef(null)

      useOutsideAlerter(wrapperRef)

      function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if(event.toElement.id != 'img'){
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(show)
              
            }
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


        return(
          <div  style={{ marginLeft:'10px', marginTop:'-5px'}}>
          <img style={{cursor:"pointer"}} id='img' src='/media/common/menu.png' onClick={() => setShow(!show)} height="30px"/>
          {show ? 
          <div style={{position:'relative'}}>
          <div ref={wrapperRef} style={{position:"absolute"}}>
          <Menu size='mini' vertical>
                {menuItem.map((item , index) => {

                if(item.subMenu){
                    return (<Dropdown text={item.name} pointing='left' className='link item'>
                    <Dropdown.Menu>
                    {item.subMenu.map((subName) => {
                        return (<Dropdown.Item>
                            <Link href={subName.link}><a href={subName.link} target={subName.target}><p>{subName.name}</p></a></Link>
                        </Dropdown.Item>)
                    })}
                    </Dropdown.Menu>
                    </Dropdown>)
                }
                else{
                    return <Menu.Item>
                      <a href={item.link}><p>{item.name}</p></a>
                    </Menu.Item>
                }
                })}
        </Menu> 
        </div>
        </div>
        :
        ''
        }
        </div>
        )
        }

export default DropdownPointing


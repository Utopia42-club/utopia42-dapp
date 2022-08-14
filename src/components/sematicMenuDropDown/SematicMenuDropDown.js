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
        {name:'Verses', subMenu:[{name:'Create Verse', link:'/CreateVerse'}, {name:'My Verses', link:'/Verses'}, {name:'Explore Verses', link:'/ExploreVerses'}]}
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
                            <Link href={subName.link} ><p>{subName.name}</p></Link>
                        </Dropdown.Item>)
                    })}
                    </Dropdown.Menu>
                    </Dropdown>)
                }
                else{
                    return <Menu.Item>
                      <a href={item.link} ><p>{item.name}</p></a>
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


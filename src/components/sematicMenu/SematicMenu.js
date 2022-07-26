import React, { useState } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Link from 'next/link'


const DropdownExamplePointing = (props) => {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);
        const {menuItem} = props
        return(
            <div className='homeMenu' style={{marginTop:"-10px"}}>
            <Menu borderless compact> 
              {menuItem.map((item, index) => {
                  if(item.subMenu){
                      return (
                      <Dropdown index={index} text={item.name} pointing className='link item'>
                        <Dropdown.Menu>
                          {item.subMenu.map((subName) => {
                              return (<Dropdown.Item
                              >
                                  <Link href={subName.link} ><p>{subName.name}</p></Link>
                              </Dropdown.Item>)
                          })}
                        </Dropdown.Menu>
                      </Dropdown>)
                  }
                  else{
                      return <Menu.Item 
                      name={item.name}
                      href={item.link}
                      ></Menu.Item>
                  }
              })}
          </Menu>
          </div>

        )

    

        }

export default DropdownExamplePointing
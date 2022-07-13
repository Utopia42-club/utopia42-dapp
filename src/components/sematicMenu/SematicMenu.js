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
          // <div style={{position:'relative'}}>
            <div className='homeMenu' style={{marginTop:"-10px"}}>
            <Menu borderless compact> 
                {menuItem.map((item) => {

                    if(item.subMenu){
                        return (
                        <Dropdown text={item.name} pointing className='link item'>
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
                          
            {/* 

            {/* <Menu.Item>Home</Menu.Item>
            <Dropdown text='Shopping' pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Dropdown text='Clothing'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Mens</Dropdown.Header>
                      <Dropdown.Item>Shirts</Dropdown.Item>
                      <Dropdown.Item>Pants</Dropdown.Item>
                      <Dropdown.Item>Jeans</Dropdown.Item>
                      <Dropdown.Item>Shoes</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Womens</Dropdown.Header>
                      <Dropdown.Item>Dresses</Dropdown.Item>
                      <Dropdown.Item>Shoes</Dropdown.Item>
                      <Dropdown.Item>Bags</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.Item>
                <Dropdown.Item>Home Goods</Dropdown.Item>
                <Dropdown.Item>Bedroom</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Order</Dropdown.Header>
                <Dropdown.Item>Status</Dropdown.Item>
                <Dropdown.Item>Cancellations</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>Forums</Menu.Item>
            <Menu.Item>Contact Us</Menu.Item> */}
          </Menu>
          </div>

        )

    

        }

export default DropdownExamplePointing
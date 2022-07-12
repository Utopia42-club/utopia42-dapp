import React from "react";
import Link from 'next/link'
import {  Div } from './Container'
import { Flex } from 'rebass'
import MuonToolbox from "../muonToolbix/Muontoolbox";
import DropdownExamplePointingTwo from '../sematicMenu/SematicMenu'
import { Container, Header, List } from "semantic-ui-react";

const PageMenu = () => {
    const menuItem = [{name: 'Home', link:'/'}, 
                      {name: 'Citizen ID', subMenu:[{name:'Mint', link:'/Mint'}, {name:'NFTs', link:'/NFTs'}]},
                      {name: 'Setting', subMenu:[{name:'Create Avatar', link:'/CreateAvatar'}]}, 
                      {name:'Verses', subMenu:[{name:'Create Verses', link:'/CreateVerse'}, {name:'My Verses', link:'/Verses'}]}
                    ]
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
    return(
        <div style={{marginTop:"25px", marginLeft:"20px", paddingBottom:"10px"}}>
            <Flex>
            <DropdownExamplePointingTwo menuItem={menuItem}/>
            {/* <Link href="/">
            <Div>
                <a>Home</a>
            </Div>
            </Link>
            <MuonToolbox name={'Citizen ID'}  
                links={[
                    { 
                        projectName:'Mint',
                        href:'/Mint'
                    },
                    { 
                        projectName:'MyIDs',
                        href:'/NFTs'
                    },]}
            />
            <MuonToolbox name={'Setting'}  
                links={[
                    { 
                        projectName:'CreateAvatar',
                        href:'/CreateAvatar'
                    }]}
            />
            <MuonToolbox name={'Verses'}  
                links={[
                    { 
                        projectName:'CreateVerses',
                        href:'/CreateVerse'
                    },
                    { 
                        projectName:'MyVerses',
                        href:'/Verses'
                    }]}
            /> */}
 
            </Flex>
        </div>
    )
}

export default PageMenu

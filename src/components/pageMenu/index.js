import React from "react";
import Link from 'next/link'
import {  Div } from './Container'
import { Flex } from 'rebass'
import MuonToolbox from "../muonToolbix/Muontoolbox";
import DropdownExamplePointingTwo from '../sematicMenu/SematicMenu'
import { Container, Header, List } from "semantic-ui-react";
import { useState } from "react";

const PageMenu = () => {
    const menuItem = [ 
                      {name: 'Citizen ID', subMenu:[{name:'Mint', link:'/Mint'}, {name:'Profile', link:'/Profile'}]}, 
                      {name:'Verses', subMenu:[{name:'Create Verse', link:'/CreateVerse'}, {name:'My Verses', link:'/Verses'}
                    ,{name:'Explore Verses', link:'/ExploreVerses'}]},
                    // {name: 'Communities', subMenu:[{name:'Communities ', link:'/Communities '},{name:'My communities', link:'MyCommunities'},{name:'Create a new community', link:'/CreateNewCommunity'}]}
                    {name:'Support', subMenu:[{name:'CitizenID tutorial', link: 'https://utopia42club.gitbook.io/docs/how-to-mint-utopia42-citizenid', target:'_blank'},
                    {name:'BrightID tutorial', link:'https://brightid.gitbook.io/brightid/', target:'_blank'},
                    {name:'ReadyPlayer.Me tutorial', link:'https://support.readyplayer.me/hc/en-us/articles/360020887418-How-to-create-a-3D-avatar-with-Ready-Player-Me-', target:'_blank'},
                    {name:'Have more questions?', link:'https://discord.gg/TphaKUZzHx', target:'_blank'}
                    ]}
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

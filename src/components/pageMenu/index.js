import React from "react";
import Link from 'next/link'
import {  Div } from './Container'
import { Flex } from 'rebass'
import MuonToolbox from "../muonToolbix/Muontoolbox";

const PageMenu = () => {
    return(
        <div style={{marginTop:"25px", marginLeft:"20px", paddingBottom:"10px"}}>
            <Flex>
            <Link href="/">
            <Div>
                <a>Home</a>
            </Div>
            </Link>
            <MuonToolbox name={'Citizen Id'}  
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
            <Link href="/CreateAvatar">
            <Div>
                <a>Create Avatar</a>
            </Div>
            </Link>
            <Link href="/Verses">
            <Div>
                <a>Verses</a>
            </Div>
            </Link>  
            </Flex>
        </div>
    )
}

export default PageMenu

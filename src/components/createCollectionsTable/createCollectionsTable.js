import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import { Td, Th, Table, Thead, Tr, Tbody }  from './table.style'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useGetCollections from '../../hooks/useGetCollections';

const CreateCollectionsTable = () => {
    const { account, chainId }  = useWeb3React()
    const getCollections = useGetCollections()
    const [verses, setVerses] = useState([])
    const [names, setNames] = useState([])
    
    let data;


    const collections = async () => {
        data = await getCollections(account, 'user')

        data = data.data.data.verses
        data.map( async (item) => {
            setVerses(oldName => [...oldName, item.id])
            setNames(oldName => [...oldName, item.name])
        })
    }

    useEffect(() => {
        setNames([])
        setVerses([])
        collections()
    }, [account])
    
    return (
        <>
            <div style={{marginBottom:"10px"}}>
                <GradientTitle >Verses</GradientTitle>
            </div>

            <Table id="table">
                <Thead>
                <Tr>
                    <Th style={{width:'5%'}}>#</Th>
                    <Th style={{width:'20%'}}>Name</Th>
                    {/* <Th style={{width:'50%'}}>Verses</Th> */}

                    <Th style={{width:'5%'}}>Browse</Th>
                </Tr>
                </Thead>
                <Tbody>
                   {
                        verses.map((item, index) => (
                            <Tr key={index} id={index}>
                                <Td style={{width:'5%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{index+1}</a></Td>
                                <Td style={{width:'20%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{names[index]}</a></Td>
                                {/* <Td style={{width:'50%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{item}</a></Td> */}
                                <Td style={{width:'5%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}><img src='media/common/openLink.png' width="20px"/></a></Td>
                            </Tr>
                        ))
                    } 
                </Tbody>
            </Table> 
        </>
    );
}

export default CreateCollectionsTable

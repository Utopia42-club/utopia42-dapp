import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'
import useGetVerseName from '../../hooks/useGetVerseName';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

const CreateCollectionsTable = (props) => {
    const {data} = props
    const [verses, setVerses] = useState([])
    const getName = useGetVerseName()
    const [collections, setCollections] = useState([])
    const [names, setNames] = useState([])
    const { account, chainId } = useWeb3React()
    console.log(account)

    useEffect(() => {
        setNames([])
        setCollections([])
        setVerses([])
        console.log('effect')
        data.map(async (item) => {
            console.log(item)
            setVerses(oldName => [...oldName, item.verse[0].id])
            setCollections(oldName => [...oldName, item.collection[0].id])
            let newName = await getName(item.verse[0].id, names)
            setNames(oldName => [...oldName, newName])
        })
    }, [data])

    return (
        <>
            <div style={{marginBottom:"10px"}}>
                <GradientTitle >Collections</GradientTitle>
            </div>

            <Table id="table">
                <Thead>
                <Tr>
                    <Th>Number</Th>
                    <Th>Name</Th>
                    <Th>Verses</Th>
                    <Th>Collections</Th>
                </Tr>
                </Thead>
                <Tbody>
                   {
                        verses.map((item, index) => (
                            <Tr key={index} id={index}>
                                <Td>{index+1}</Td>
                                <Td>{names[index]}</Td>
                                <Td><a target="_blank" href={'https://app.utopia42.club/game?network=80001&contract=' + item}><img src='media/common/openLink.png' width="15px" style={{marginRight:'15px'}}/></a>{item}</Td>
                                <Td>{collections[index]}</Td>
                            </Tr>
                        ))
                    } 
                </Tbody>
            </Table>

        </>
    );
}

export default CreateCollectionsTable

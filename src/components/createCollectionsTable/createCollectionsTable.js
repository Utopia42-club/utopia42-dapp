import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'

const CreateCollectionsTable = (props) => {
    const {data} = props
    let verses = []
    let collections = []
    let names = []
    data.map((item) => {
        console.log(item.verse[0].id)
        // names.push(item.name)
        verses.push(item.verse[0].id)
        collections.push(item.collection[0].id)
    })
    return (
        <>
            <div style={{marginBottom:"10px"}}>
                <GradientTitle >Collections</GradientTitle>
            </div>
            <Table id="table">
                <Thead>
                <Tr>
                    <Th  style={{width:'8.2%', padding:'5px'}}>Number</Th>
                    {/* <Th>Name</Th> */}
                    <Th>Verses</Th>
                    <Th>Collections</Th>
                </Tr>
                </Thead>
                <Tbody>
                   {
                        verses.map((item, index) => (
                            <Tr key={index} id={index}>
                                <Td style={{width:'12%',padding:'5px' }}>{index+1}</Td>
                                {/* <Td>{names[index]}</Td> */}
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

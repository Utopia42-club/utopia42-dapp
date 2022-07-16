import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'

const CreateCollectionsTable = (props) => {
    const {data} = props
    let verses = []
    let collections = []
    data.map((item) => {
        verses.push(item.utopiaAddress)
        collections.push(item.collectionAddress)
    })
    return (
        <>
            {/* <Container> */}
            {/* <Wrapper> */}
            <div style={{marginBottom:"10px"}}>
                <GradientTitle >Collections</GradientTitle>
            </div>
            {/* </Wrapper> */}
            {/* </Container> */}
            <Table id="table">
                <Thead>
                <Tr>
                    <Th  style={{width:'8.2%', padding:'5px'}}>Number</Th>
                    <Th>Verses</Th>
                    <Th>Collections</Th>
                </Tr>
                </Thead>
                <Tbody>
                   {
                        verses.map((item, index) => (
                            <Tr key={index} id={index}>
                                <Td style={{width:'12%',padding:'5px' }}>{index+1}</Td>
                                <Td><a target="_blank" href={'https://app.utopia42.club/game?network=80001&contract=' + item}>{item}</a></Td>
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

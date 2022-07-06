import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'

const CreateCollectionsTable = (props) => {
    const {data} = props
    console.log(data._collections)
    return (
        <>
            <Container>
            <Wrapper>
            <GradientTitle >Collections</GradientTitle>
            </Wrapper>
            </Container>
            <Table id="table">
                <Thead>
                <Tr>
                    <Th  style={{width:'12%', padding:'5px'}}>Number</Th>
                    <Th>Verses</Th>
                    <Th>Collections</Th>
                </Tr>
                </Thead>
                <Tbody>
                   {
                        data._verses.map((item, index) => (
                            <Tr key={item.id} id={item.id}>
                                <Td style={{width:'12%',padding:'5px' }}>{index+1}</Td>
                                <Td>{item}</Td>
                                <Td>{data._collections[index]}</Td>
                            </Tr>
                        ))
                    } 
                </Tbody>
            </Table>
        </>
    );

}

export default CreateCollectionsTable
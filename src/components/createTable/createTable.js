import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'

const CreateTable = (props) => {
    const {data, registeredWallet, registeredNFT, setBrightIdModal, handleSelectToken, handleRegister, setTransferModal} = props
    let nftListConfig = []
    let res = {}
    const [color, setColor] = useState('#300c4b')

    const handleTransfer = (item) => {
        setColor('#300c4b')
        handleSelectToken(item)
        setBrightIdModal(false)
        setTransferModal(true)
    }

    const prepareToRegister = (item) => {
        // handleSelectToken(item)
        handleRegister(item)
    }

    const handleBrightID = () => {
        setBrightIdModal(true)
    }

    data.map((item) => {
        res.id = item
        res.registered = 'No'
        if(registeredWallet && registeredNFT != '0'){
            res.action = <Button  onClick={() => handleTransfer(item)}>Transfer</Button>
        }
        else if(registeredWallet && registeredNFT == '0'){
            res.action = <div>
                            <Button color={color} onClick={() => prepareToRegister(item)}>Register NFT</Button>
                            <Button color={color}  onClick={() => handleTransfer(item)}>Transfer</Button>
                        </div>       
        }
        else{
            res.action = <div>
                            <Button color={color} onClick={handleBrightID}>Connect to BrightID</Button>
                            <Button color={color} onClick={() => handleTransfer(item)}>Transfer</Button>
                        </div>
        }
        nftListConfig.push({...res})
    })
    
    if (registeredNFT !=  '0'){
        res.id = registeredNFT
        res.registered = 'Yes'
        res.action = ''
        nftListConfig.push({...res})
    }

    return (
        <>
            <Container>
            <Wrapper>
            <GradientTitle >Your NFTs</GradientTitle>
            </Wrapper>
            </Container>
            <Table id="table">
                <Thead>
                <Tr>
                    <Th  style={{width:'10%'}}>Number</Th>
                    <Th>Citizen ID</Th>
                    <Th>Registered</Th>
                    <Th>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        nftListConfig.map((item, index) => (
                            <Tr key={item.id} id={item.id}>
                                <Td style={{width:'10%'}}>{index+1}</Td>
                                <Td>#{item.id}</Td>
                                <Td>{item.registered}</Td>
                                <Td>{item.action}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </>
    );

}

export default CreateTable
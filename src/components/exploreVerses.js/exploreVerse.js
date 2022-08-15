import { useState } from 'react';
import { GradientTitle } from '../text/Title';
import {Td, Th, Table, Thead, Tr, Tbody, WrapTable }  from './table.style'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useGetCollections from '../../hooks/useGetCollections';
import CollectionsPagInation from '../collectionPagInation/CollectionsPagInation';

const ExploreVerses = () => {
    const { account, chainId } = useWeb3React()
    const getCollections = useGetCollections()
    const [verses, setVerses] = useState([])
    const [names, setNames] = useState([])
    const [totalVerse, setTotalVerse] = useState()
    const [lastCreateTime, setLastCreateTime] = useState()
    const [firstCreateTime, setFirstCreateTime] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [scroll, setScroll] = useState(false)
    let data;

    const collections = async() => {
        data = await getCollections(account, 'all' , '0')
        setFirstCreateTime(data.data.data.verses[0].createdAt)
        setTotalVerse(data.data.data.factories[0].totalVerse)
        data = data.data.data.verses
        if(data.length >= 8) {
            setScroll(true)
        }
        data.map( async (item) => {
            setVerses(oldName => [...oldName, item.id])
            setNames(oldName => [...oldName, item.name])
            setLastCreateTime(item.createdAt)
        })
    }

    useEffect(() => {
        setNames([])
        setVerses([])
        collections()
    }, [account])

    const pagInationItems = async (createTime, order, pageNumber) => {
        setPageNumber(pageNumber)
        data = await getCollections(account, 'all' , createTime, order)
        setFirstCreateTime(data.data.data.verses[0].createdAt)
        setTotalVerse(data.data.data.factories[0].totalVerse)
        data = data.data.data.verses
        data.map( async (item) => {
            setVerses(oldName => [...oldName, item.id])
            setNames(oldName => [...oldName, item.name])
            setLastCreateTime(item.createdAt)
        })
    }

    return (
        <>
            <div style={{marginBottom:"50px"}}>
                <GradientTitle >All Utopia42 Verses</GradientTitle>
            </div>
            <WrapTable scroll = {scroll}>
                <Table id="table">
                    <Thead>
                    <Tr>
                        <Th style={{width:'5%'}}>#</Th>
                        <Th style={{width:'10%'}}>Name</Th>
                        {/* <Th style={{width:'25%'}}>Verses</Th> */}
                        {/* <Th>Collections</Th> */}
                        <Th style={{width:'5%'}}>Browse</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                            verses.map((item, index) => (
                                <Tr key={index} id={index}>
                                    <Td style={{width:'5%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{index+1}</a></Td>
                                    <Td  style={{width:'10%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{names[index]}</a></Td>
                                    {/* <Td style={{width:'25%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}>{item}</a></Td> */}
                                    {/* <Td>{collections[index]}</Td> */}
                                    <Td style={{width:'5%'}}><a target="_blank" href={'https://dev.utopia42.club/game?network=80001&contract=' + item}><img src='media/common/openLink.png' width="20px"/></a></Td>
                                </Tr>
                            ))
                        } 
                    </Tbody>
                </Table>
            </WrapTable>
            {/* <CollectionsPagInation 
                totalVerses= { totalVerse } 
                pagInationItems = { pagInationItems }
                lastCreateTime = { lastCreateTime }
                pageNumber = { pageNumber }
                firstCreateTime = { firstCreateTime }
            /> */}
        </>
    );
}

export default ExploreVerses

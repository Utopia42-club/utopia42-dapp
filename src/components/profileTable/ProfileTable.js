import {Td, Th, Table, Thead, Tr, Tbody, Button, Wrapper, Container}  from './table.style'


const ProfileTable = (props) => {
    const { citizenId, brightId, avatarLink } = props
    let citizenIDvalue;

    if (Number(citizenId) == 0 || !citizenId) {
        citizenIDvalue = 'Not have citizenID'
    }
    else{
        citizenIDvalue = '#'+ citizenId
    }
    let isBrightId;
    if(brightId){
        isBrightId = 'true'
    }
    else{
        isBrightId = 'false'
    }
    return (
        <>
            <Table id="table">
                <Tbody>
                <Tr>
                    <Th>CitizenID</Th>
                    <Td>{citizenIDvalue}</Td>
                    
                </Tr>
                <Tr>
                    <Th>BrightID</Th>
                    <Td>{isBrightId}</Td>
                </Tr>

                <Tr>
                    <Th>Avatar Link</Th>
                    {avatarLink ? <Td><a target="_blank" href={avatarLink}>You'r avatar link</a></Td> : <Td>Don't have avatar link</Td>}
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}

export default ProfileTable
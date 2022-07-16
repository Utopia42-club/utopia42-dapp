import styled from 'styled-components'

export const Td = styled.td`{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #9682a5;
    padding: 5px;
        @media screen and (max-width: 780px) {
        width:30%;
        font-size:13px;
      }
}`

export const Tr = styled.tr`{
  width: 100%;
  display: table;
  table-layout: fixed;
}`

export const Th = styled.th`{
  background:#76568e ;
    padding-top: 12px;
    width:30%;
    padding-bottom: 12px;
    text-align: center;
    color: white;
    border: 1px solid #9682a5;
    @media screen and (max-width: 780px) {
        width:20%;
        font-size:12px;
      }

  }`

export const Thead = styled.thead`{
  flex: 0 0 auto;
}`

export const Table = styled.table`{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  margin:20px;
  margin-top:5px;
  background: none;
  color:#683f87;
  display: flex;
  flex-flow: column;
  border-collapse: collapse;
  text-align: center;
  width: 90%;
    
}`

export const Tbody = styled.tbody`{
  border-radius: 5px;
  margin-top:-2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  // border: 1px solid #9682a5;
  flex: 1 1 auto;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
}`

export const Button = styled.button `{
  background: linear-gradient(0deg,#76568e 0%,rgba(231,235,243,0) 126.95%);
  margin:5px;
  padding:10px;
  color: ${({ color }) => color };
  border:none;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 890px) {
    font-size: 12px;
    padding:5px;
    margin:3px;
  }
  @media screen and (max-width: 760px) {
    font-size: 7px;
    padding:5px;
    margin:3px;
  }
}`

export const Wrapper = styled.div `{
  // margin-top:50px;
  // margin-left:70px;
}`


export const Container = styled.div`
  display: flex;
  padding:20px;
  margin-left:3.8%;
  justify-content: space-between;
  // @media screen and (max-width: 1200px) {
  //   flex-direction: column;
  //   padding: 20px 5px;
  // }

  // @media screen and (max-width: 780px) {
  //   flex-direction: column;
  //   padding: 0 20px;
  //   padding-top: 50px;
  // }
`
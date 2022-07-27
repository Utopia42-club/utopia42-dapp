import styled from 'styled-components'

export const Td = styled.td`{
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #e0e0e0;
    border-right:none;
    border-left:none;
    text-align: left;
    padding: 5px;
    padding-left:15px;
      @media screen and (max-width: 780px) {
        font-size:13px;
      }
      @media screen and (max-width: 413px) {
        font-size:12px !important;
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
    @media screen and (max-width: 1280px) {
      padding:15px;
    }
    @media screen and (max-width: 780px) {
        width:30%;
        font-size:12px;
        padding:5px;
      }
      @media screen and (max-width: 412px) {
        font-size:10px;
        padding:5px;
      }
      @media screen and (max-width: 375px) {
        font-size:10px;
        padding:5px;
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
  border-radius:10px;  
}`

export const Tbody = styled.tbody`{
  border-radius: 10px;
  margin-top:-2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  // border: 1px solid #9682a5;
  flex: 1 1 auto;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
}`

export const Button = styled.button `{
  background: #76568e;
  margin:4px;
  padding:8px;
  color: ${({ color }) => color };
  border-radius: 5px;
  cursor: pointer;
  border:2px solid #9682a5;
  font-size: 12px;
  font-weight:bold;
  // min-width:190px;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  @media screen and (max-width: 1280px) {
    min-width:130px;
    max-width:130px;
    line-height:18px;
  }
  @media screen and (max-width: 890px) {
    font-size: 12px;
    padding:5px;
    margin:3px;
  }
  @media screen and (max-width: 760px) {
    font-size: 9px;
    padding:5px;
    margin:3px;
    line-height:15px;
  }
  @media screen and (max-width: 540px) {
    font-size: 9px;
    padding:5px;
    min-width:100px;
    max-width:100px;
    margin:3px;
    line-height:15px;
  }
  @media screen and (max-width: 412px) {
    font-size: 9px !important;
    min-width:120px;
    margin-left:-30px;
    line-height:15px;
  }
  @media screen and (max-width: 375px) {
    font-size: 9px !important;
    min-width:100px;
    margin-left:-100px;
    line-height:15px;
  }
  @media screen and (max-width: 360px) {
    font-size: 9px !important;
    min-width:90px;
    max-width:90px;
    // max-width:60px
    // margin-left:-100px;
    // line-height:15px;
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
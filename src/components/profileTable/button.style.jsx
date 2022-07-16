import styled from 'styled-components'

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
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  }`
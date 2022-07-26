import styled from 'styled-components'

export const Box = styled.div`{
    margin-top:20px;
    @media screen and (max-width: 780px) {
      display: none;
    }
  }`

export const LinkBox = styled.div`{
    display:none;
    @media screen and (max-width: 780px) {
      display: block;
    }
  }`
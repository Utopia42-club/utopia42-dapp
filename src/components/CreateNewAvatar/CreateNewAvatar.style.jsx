import { Flex } from 'rebass'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 40px 20px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 20px 5px;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
    padding: 0 20px;
    padding-top: 50px;
  }`

  export const Input = styled.input`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '400px')};
  width: 100%;
  background: ${({ background }) => (background ? background : 'transparent')};
  height: ${({ height }) => (height ? height : '45px')};
  border: ${({ border }) => (border ? border : '1px solid #5F5CFE')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  box-sizing: border-box;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'Montserrat')};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  color: ${({ color }) => (color ? color : '#313144')};
  &:focus {
    outline: none;
  }
  padding: 0 17px;
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '13px')};
    // max-width: 150px;
  }
  @media screen and (max-width: 460px) {
    // max-width: 120px;
    /* font-size: 10px; */
  }
  ::placeholder {
    color: #909090;
    opacity: 1; /* Firefox */
    font-size: 13px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
    font-size: 13px;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
    font-size: 13px;
  }
`

export const Link = styled.a`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;
  font-weight: 400;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export const Button = styled.button`
  font-size: ${({ fontSize }) => fontSize};
  margin-top:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
  width: 100%;
  min-height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => (background ? background : '#D7D7D7')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : 'transparent')};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
  &:focus {
    outline: none;
  };
  color:${({color}) => (color ? color: "#000")}
`
import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  margin: 0 5px;
  margin-top:10px;
  width:45px;
  padding-bottom:10px
`
const UtopiaLogo = () => {
  return (
    <>
      <a href="https://utopia42.club/" target="_blank"><Image src="/media/common/Icon.png" alt="Utopia Logo" /></a>
    </>
  )
}

export default UtopiaLogo

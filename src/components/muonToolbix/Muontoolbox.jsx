import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { chunk } from 'lodash'
// import { MuonTools } from '../config/config'
import { Text } from 'rebass/styled-components'

const Type = styled(Text)`
  margin-top:-9px;
  font-size: 14px;
  color: ${({ color, theme }) => theme[color]};
  cursor: ${({ cursor }) => cursor || 'default'};
  position: ${({ position }) => position};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-transform: ${(textTransform) => textTransform};
`

const DropDownMenu = styled.div`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  background: ${({ background }) => background || '#313144'};
  opacity: 0.9;a
  border-radius: 5px;
  color: ${({ color }) => color || '#ffffff'};
  position: absolute;
  padding: 2px;
  z-index: 99999;
  border-radius:5px;
`
const DropDownMenuItem = styled.a`
  margin: 10px 5px;
  display: flex;
  align-items: center;
  color: ${({ color }) => color || '#ffffff'};
  text-decoration: none;
  width: 32%;
  padding: 10px;
`

const Image = styled.img`
  margin-right: 5px;
`
const Wrapper = styled.div``

const MuonToolbox = (props) => {
  const { name, links, mode, menuColor, menuBackground, itemColor } = props
  const [toolBoxOpen, setToolBoxOpen] = React.useState(false)
  const btnRef = React.useRef()
  

  React.useEffect(() => {
    const closeDropdown = (e) => {
      const path = e.path ? e.path : e.composedPath && e.composedPath()
      if (path[1] !== btnRef.current) setToolBoxOpen(false)
    }
    document.body.addEventListener('click', closeDropdown)

    return () => {
      document.body.removeEventListener('click', closeDropdown)
    }
  }, [])

  return (
    <Wrapper>
      <Flex ref={btnRef} alignItems='center'>
        <Type
          color={menuColor || '#313144'}
          padding='10px'
          onClick={() => setToolBoxOpen(!toolBoxOpen)}
          cursor='pointer'
        >
          {name}
        </Type>
      </Flex>

      <DropDownMenu
        active={toolBoxOpen}
        background={menuBackground}
        color={itemColor}
      >
        {chunk(links, 1).map((tools, index) => (
          <Flex key={index}>
            {tools.map((item) => (
              <DropDownMenuItem
                href={item.href}
                key={item.projectName}
                color={itemColor}
              >
                {/* <Image
                  src={`data:image/svg+xml;base64,${item.icon}`}
                  alt={item.projectName}
                /> */}
                <Type cursor='pointer'>{item.projectName}</Type>
              </DropDownMenuItem>
            ))}
          </Flex>
        ))}
      </DropDownMenu>
    </Wrapper>
  )
}

export default MuonToolbox
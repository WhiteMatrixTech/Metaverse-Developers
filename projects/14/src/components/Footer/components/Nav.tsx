import React from 'react'
import styled from 'styled-components'


const Nav: React.FC = () => {

  const pdf = require("../../../assets/white_paper.pdf")
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://twitter.com/TronMystery"
      >
        Twitter
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://t.me/TronMysteryBox"
      >
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/b2jC63SZpy">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href= {pdf}>
        White Paper
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav

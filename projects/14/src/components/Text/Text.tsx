import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string,
}

const Text: React.FC<LabelProps> = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
  font-size:24px;
`

export default Text

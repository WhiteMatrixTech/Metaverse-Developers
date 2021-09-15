import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
}

const BoldLabel: React.FC<LabelProps> = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight:bold;
`

export default BoldLabel

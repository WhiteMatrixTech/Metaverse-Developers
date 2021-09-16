import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from '../Input'

import { useTranslation} from 'react-i18next'

interface BuyInputProps extends InputProps {
  max: number | string,
  symbol: string,
  topSymbol:string,
  onSelectMax?: () => void,
}

const BuyInput: React.FC<BuyInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  topSymbol
}) => {
  
  let { t} = useTranslation()

  return (
    <StyledTokenInput>
      <StyledMaxText>{max?max.toLocaleString():0} {topSymbol} {t('available')}</StyledMaxText>
      <Input
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="sm" text="Max" onClick={onSelectMax} />
            </div>
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`

`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
`

export default BuyInput
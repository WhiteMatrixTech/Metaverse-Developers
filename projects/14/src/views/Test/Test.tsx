import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Spacer from '../../components/Spacer'
import DialogDodal from '../../components/DialogModal'
import useModal from '../../hooks/useModal'



const Test: React.FC = () => {

    const [username, setUsername] = useState('qianhui')

    useEffect(() => {
        console.log("useEffect------------------>2222")
    }, [])

    const markSeen = useCallback(() => {
        console.log('---------------> markseen')
        // onCancelSell()
        // localStorage.setItem('tronlink', 'seen')
      }, [])

    const onCancel = useCallback(() => {
    console.log('---------------> oncancel')
    // localStorage.setItem('tronlink', 'seen')
    }, [])


      const [onPresentDisclaimerModal] = useModal(
        <DialogDodal onConfirm={markSeen} onCancel={onCancel}/>,
      )

    const onBtnClick = useCallback(() => {
        console.log("onBtnClick----->")
        onPresentDisclaimerModal()
        setUsername("qianhuizhu")
    }, [])

    return (
        <Page>
            <StyledWrapper>
                <Text text="Add"></Text>
                <Spacer></Spacer>
                <Text text={username} />
                <Spacer></Spacer>
                <StyledWrapperA>
                    <Button text="点击" onClick={onBtnClick}>
                    </Button>
                </StyledWrapperA>
            </StyledWrapper>
        </Page>
    )
}


  


//css样式
const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`
const StyledWrapperA = styled.button`
  margin-top:30px;
  width:200px;
  display: flex;
`
export default Test


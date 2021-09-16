import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import BuyInput from '../../../components/BuyInput'
import Button from '../../../components/Button'
import BigNumber from 'bignumber.js'
import { getPrice, onExchange, getTotalSupply, numberOfNftsSold, getBKEYBalance } from '../../../sushi/utils'
import useAllowance from '../../../hooks/useAllowance'
import useDpc from '../../../hooks/useDpc'
import { useTranslation } from 'react-i18next'
import useApprove from '../../../hooks/useApprove'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { message } from 'antd'

declare var window: Window & { tronWeb: any };

interface BuyTmbProps {
    tokenName: string
}


const BuyTmb: React.FC<BuyTmbProps> = ({ tokenName }) => {

    const dpc = useDpc()

    const [val, setVal] = useState('')
    const [price, setPrice] = useState(Number)
    const [totalSupply, setTotalSupply] = useState(Number)
    const [requestedApproval, setRequestedApproval] = useState(false)
    const [soldNumber, setSoldNumber] = useState(Number)
    // const allowance = useAllowance()
    //可用bkey 余额
    const [balance, setBalance] = useState<BigNumber>()

    const { onApprove } = useApprove()
    //选择最大
    const handleSelectMax = useCallback(() => {
        setVal("10")
    }, [setVal])
    //输入框发生变化
    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setVal(e.currentTarget.value)
        },
        [setVal],
    )
    useEffect(() => {

        async function getNftPrice() {
            let price = await getPrice(dpc)
            if (price == undefined) {
                return
            }
            price = price.dividedBy(new BigNumber(10).pow(6))
            const pirceNumber = price.toNumber()
            setPrice(pirceNumber)
        }

        async function totalSupply() {
            let totalSupply = await getTotalSupply(dpc)
            const totalSupplyNumber = totalSupply.toNumber()
            console.log("totalSupply", totalSupplyNumber)
            setTotalSupply(totalSupplyNumber)
        }

        async function getNFTSoldNumber() {
            let number = await numberOfNftsSold(dpc)
            if (number == undefined) {
                return
            }
            const soldNumber = number.toNumber()
            console.log("getNFTSoldNumber--->", soldNumber)
            setSoldNumber(soldNumber)
        }

        async function fetchBkeyBalance() {
            const balance = await getBKEYBalance(dpc)
            setBalance(balance)
        }

        if (dpc) {
            getNftPrice()
            totalSupply()
            getNFTSoldNumber()
            fetchBkeyBalance()
        }

    }, [setPrice])


    //批准兑换val
    const exchange = useCallback(async (val) => {
        if (val === '') {
            let msg = t('min-num')
            message.info(msg)
            return
        }
        if (parseInt(val) > 10) {
            let msg = t('max-num')
            message.info(msg)
            return
        }
        setRequestedApproval(true)
        const txHash = await onApprove(100, val * 36)
        if (txHash) {
            const amount = new BigNumber(val).toNumber()
            const tx = await onExchange(dpc, amount)
            if (tx) {
                console.log("tx", tx)
                message.info("success")
            }
        }
    }, [dpc, val])

    let { t } = useTranslation()


    console.log("totalSupply", totalSupply)
    console.log("soldNumber", soldNumber)
    const availableNum = 7000 - totalSupply + soldNumber
    const tmbkey="1 TMB = 36 BKEY"
    return (
        <Card>
            <CardContent>
                <StyledCardContentInner>
                    <StyledCardHeader>
                        <Value value={availableNum ? availableNum.toString() : 0} />
                        <Label text={t('current-TMB-exchangeable')} />
                    </StyledCardHeader>
                    <Label text={tmbkey}></Label>
                    <BuyInput
                        value={val}
                        onSelectMax={handleSelectMax}
                        onChange={handleChange}
                        max={getBalanceNumber(balance)}
                        topSymbol="Bkey"
                        symbol="TMB"
                    />

                    <StyledCardActions>
                        {/* {allowance.toNumber() == 0 ? (
                            <Button
                                disabled={requestedApproval}
                                onClick={handleApprove}
                                text={t('approve') + ` ${tokenName}`}
                            />
                        ) : (
                            <> */}
                        <Button
                            text={t("exchange")}
                            onClick={() => exchange(val)}
                        />
                        {/* </> */}

                        {/* )} */}

                    </StyledCardActions>
                </StyledCardContentInner>

            </CardContent>
        </Card>

    )


}



const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`
export default BuyTmb
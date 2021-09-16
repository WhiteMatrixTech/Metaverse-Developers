import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import BuyInput from '../../../components/BuyInput'
import Button from '../../../components/Button'
import BigNumber from 'bignumber.js'
import { getPrice, buy, numberOfNftsSold,getTMBBalance,getTrxBalance } from '../../../sushi/utils'
import useDpc from '../../../hooks/useDpc'
import { useTranslation} from 'react-i18next'
import {message} from 'antd'

declare var window: Window & { tronWeb: any };

interface BuyNftProps {

}

const BuyNft: React.FC<BuyNftProps> = () => {

    const [val, setVal] = useState('')
    const [price, setPrice] = useState(Number)
    const [soldNumber, setSoldNumber] = useState(Number)
    const [balance, setBalance] = useState<BigNumber>()
    const [trxBalance, setTrxBalance] = useState<BigNumber>()
    const dpc = useDpc()

    const handleSelectMax = useCallback(() => {
        setVal("10")
    }, [setVal])

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setVal(e.currentTarget.value)
        },
        [setVal],
    )

    useEffect(() => {
        async function getTrxPrice() {
            let price = await getPrice(dpc)
            if(price===undefined){
                return
            }
            price = price.dividedBy(new BigNumber(10).pow(6))
            const pirceNumber = price.toNumber()
            setPrice(pirceNumber)
        }
       
        async function getNFTSoldNumber() {
            let number = await numberOfNftsSold(dpc)
            if(number==undefined){
                return
            }
            const soldNumber = number.toNumber()
            const total = new BigNumber(3000).minus(soldNumber).toNumber()
            setSoldNumber(total)
        }
        async function fetchBalance() {
            const balance = await getTMBBalance(dpc)
            console.log("fetchBalance----------->",balance)
            setBalance(balance)
        }

        async function fetchTrxBalance() {
            const trxBalance = await getTrxBalance(dpc)
            console.log("trxBalance----------->",trxBalance)
            setTrxBalance(new BigNumber(trxBalance))
        }

        if(dpc){
            getNFTSoldNumber()
            getTrxPrice()
            fetchBalance()
            fetchTrxBalance()
        }
    }, [setPrice, dpc,setBalance,setSoldNumber])


    //购买函数
    const onBuy = useCallback(async () => {
        console.log("onbuy--->",val)
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
        const amount = new BigNumber(val).toNumber()
        console.log("onBuy------", amount)
        const tx = await buy(dpc, amount, amount * price)
        console.log("onBuy----result--->", tx)
        if(tx){
            message.info("buy success")
        }
    }, [dpc,price, val])

    let { t} = useTranslation()
    const priceText=price+" TRX/TMB"

    return (
        <Card>
            <CardContent>
                <StyledCardContentInner>
                    <StyledCardHeader>
                        <Value value={soldNumber ? soldNumber.toString() : 0} />
                        <Label text={t('current-TMB-buyable')}/>
                    </StyledCardHeader>
                    <Label text={t('current-TMB-price') + ` ${priceText}`}>
                    </Label>

                    <BuyInput
                        value={val}
                        onSelectMax={handleSelectMax}
                        onChange={handleChange}
                        max={trxBalance?trxBalance.toNumber():0}
                        topSymbol="Trx"
                        symbol="TMB"
                    />
                    <StyledCardActions>
                        <Button
                            text={t('buy')}
                            onClick={onBuy}
                        />
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
export default BuyNft

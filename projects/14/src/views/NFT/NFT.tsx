
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Label from '../../components/Label'
import Text from '../../components/Text'

import { useParams } from 'react-router-dom'

import nftData from '../../config/tronNFT_data.json'
import DialogDodal from '../../components/DialogModal'
import useModal from '../../hooks/useModal'

import {
    tokenNameByIndex,
    ownerAddress,
    nftsOfferedForSale,
    offerNFTForSale,
    approveChangeName,
    changeName
} from '../../sushi/utils'

import useDpc from '../../hooks/useDpc'
declare var window: Window & { tronWeb: any };

const NFT: React.FC = () => {
    // tslint:disable-next-line
    const { nftId } = useParams() //nftid
    const [pendingTx, setPendingTx] = useState(false)
    const [pendingTxName, setPendingTxName] = useState(false)
  
    const dpc = useDpc()
    const [nftName, setNftName] = useState('')
    const [address, setAddress] = useState('')
    const [sellAddress, setSellAddress] = useState('')
    const [isForSale, setIsForSale] = useState(false)
    const [price, setPrice] = useState(Number)


    useEffect(() => {
        async function getOwnerAddress() {
            const address = await ownerAddress(dpc, nftId)
            console.log("address", address)
            setAddress(address)
        }
        if (dpc) {
            getNftName()
            getOwnerAddress()
            getIsOnSale()
        }
    }, [dpc])

    /**
     * 获取nft的名字
     */
    const getNftName = useCallback(async () => {
        console.log("getNftName---->")
        const name = await tokenNameByIndex(dpc, nftId)
        console.log("name", name)
        setNftName(name)
    },[dpc,setNftName])

    /**
     * 是否被出售
     */
    const getIsOnSale = useCallback(async () => {
        let tronWeb = window.tronWeb
        const item = await nftsOfferedForSale(dpc, nftId)
        if (item == undefined) {
            return
        }
        console.log("isForSale", item.isForSale)
        let price = tronWeb.fromSun(tronWeb.toBigNumber(item.price._hex))
        console.log("price", price.toNumber())
        console.log("address", tronWeb.address.fromHex(item.seller))
        setIsForSale(item.isForSale)
        setPrice(price.toNumber())
        setSellAddress(tronWeb.address.fromHex(item.seller))
    }, [dpc])

    //nft名称
    let name = "#" + nftId + "-"
    let ownerAdd = "Owner By：" + address
    let type = "Type: " + nftData[" type"][nftId]
    let rarity = "Rarity: " + nftData[" rarity"][nftId]
    let accessories = "Accessories: " + nftData[" accessories"][nftId]
    let description = "Description: " + nftData[" description"][nftId]

    const approve = useCallback(async () => {
        const result = await approveChangeName(dpc)
        console.log("result", result)
        return result
    }, [dpc])
    return (<Page>
        <img  src={`http://tronmysterybox.vip/static/tronNFT-${nftId}.png`}></img>
        <Text text={name + nftName}></Text>
        <Label text={ownerAdd}></Label>
        <Label text={type}></Label>
        <Label text={rarity}></Label>
        <Label text={accessories}></Label>
        <Label text={description}></Label>
    </Page>)
}



export default NFT
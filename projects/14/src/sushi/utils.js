import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Dpc } from '../sushi/Dpc'
import { supportedPools } from '../sushi/lib/constants'
import Web3 from 'web3'

const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;
const ADDRESS_PREFIX = "41";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

/**
 * 获得trx余额
 * @param {*} dpc 
 * @returns 
 */
export const getTrxBalance = async (dpc) => {
  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  const balance = await tronWeb.trx.getBalance(dpc.currentAddress)
  console.log("getTrxBalance", balance)
  return tronWeb.fromSun(balance)
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (dpc) => {
  return supportedPools.map(
    ({
      pid,
      name,
      symbol,
      symbolId,
      icon,
      tokenAddress,
      tokenSymbol,
      tokenContract,
      poolAddress,
      lpContract,
    }) => ({
      pid,
      id: symbol,
      symbolId,
      name,
      lpToken: symbol,
      poolAddress,
      lpContract,
      tokenAddress,
      tokenSymbol,
      tokenContract,
      earnToken: 'BKEY',
      earnTokenAddress: 'TNCupmRJVVAkT4paC5QUT7NTTqHDsPfv6g',
      icon,
    }))
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}



export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

/**
 * 获取总供应量（我的余额 TMB）
 * @param {*} tronweb 
 * @returns 
 */
export const getBKEYBalance = async (dpc) => {
  let tronWeb = dpc.tronWeb
  if (dpc == undefined) {
    return
  }
  // let parameter = []
  let parameter = [{ type: 'address', value: dpc.currentAddress }]
  let contractAddress = tronWeb.address.toHex(dpc.bkeyAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    "balanceOf(address)", {}, parameter, issuerAddress)
  const balance = hex2int(res.constant_result[0]);
  return new BigNumber(balance)
}

export const getPoolBalance = async (dpc, pid) => {
  console.log("getPoolBalance---->", pid)
  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  const bkeyAddress = dpc.supportedPools[pid].tokenAddress
  let parameter = [{ type: 'address', value: dpc.currentAddress }]
  let contractAddress = tronWeb.address.toHex(bkeyAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let options = {
    shouldPollResponse: true,
    feeLimit: 1000000000 //1Trx
  };
  let res = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress,
    "balanceOf(address)", options, parameter, issuerAddress)
  const balance = hex2int(res.constant_result[0]);
  console.log("getPoolBalance----result--->", balance)
  return new BigNumber(balance)
}

/**
 * 获取dcp额度（收藏品数量BKEY ）
 * @param {*} tronweb 
 * @returns 
 */
export const getTMBBalance = async (dpc) => {
  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let parameter = [{ type: 'address', value: dpc.currentAddress }]
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    "balanceOf(address)", {}, parameter, issuerAddress)
  const balance = hex2int(res.constant_result[0]);
  return new BigNumber(balance)
}


/**
 * 获取已经出售数量
 * @param {} dpc 
 */
export const numberOfNftsSold = async (dpc) => {

  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let functionSelector = "numberOfNftsSold()";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, [], issuerAddress)
  const balance = hex2int(res.constant_result[0]);

  return new BigNumber(balance)
}


/**
 * 批准代币
 * @param {*} lpContract 
 * @param {*} masterChefContract 
 * @param {*} account 
 * @returns 
 */
export const approveNew = async (dpc, pid, num) => {
  console.log("approveNew------->", pid)
  if (dpc == undefined) {
    return
  }
  let tokenAddress;
  let paramAddress;
  if (pid >= 100) {
    tokenAddress = dpc.bkeyAddress
    paramAddress = dpc.tmbAddress
  } else {  //矿池的approve 
    //USDT-TRX-Pool合约地址
    tokenAddress = dpc.supportedPools[pid].tokenAddress
    paramAddress = dpc.supportedPools[pid].poolAddress
  }

  //获得tronWeb对象
  let tronWeb = dpc.tronWeb
  //选择合约方法
  let functionSelector = "approve(address,uint256)";
  let contractAddress = tronWeb.address.toHex(tokenAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let decimal = new BigNumber(10).pow(6)
  let amount = num * decimal.toNumber()
  console.log("amount", amount)
  //根据方法构造参数
  let parameter = [
    { type: 'address', value: paramAddress },
    { type: 'uint256', value: amount }
  ]
  //额外参数
  let options = {
    shouldPollResponse: false,
    feeLimit: 1000000000 //1Trx
  };
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, options, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 质押方法
 * @param {*} tronWeb 
 * @returns 
 */
export const stakeNew = async (dpc, pid, num) => {

  if (dpc === undefined) {
    return
  }
  const tronWeb = dpc.tronWeb
  const bkeyPoolAddress = dpc.supportedPools[pid].poolAddress
  //选择合约方法
  let functionSelector = "stake(uint256)";
  let contractAddress = tronWeb.address.toHex(bkeyPoolAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let decimal = new BigNumber(10).pow(6)
  let amount = num * decimal.toNumber()
  //根据方法构造参数
  let parameter = [
    { type: 'uint256', value: amount }
  ]
  let options = {
    shouldPollResponse: true,
    feeLimit: 300000000
  }
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, options, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 允许调用的token
 */
export const getAllowance = async (dpc) => {

  // if (dpc === undefined) {
  //   return
  // }
  // const tronWeb = dpc.tronWeb
  // //选择合约方法
  // let functionSelector = "allowance(address,address)";
  // let parameter = [
  //   { type: 'address', value: dpc.currentAddress },
  //   { type: 'address', value: dpc.bkeyPoolAddress }]
  // let contractAddress = tronWeb.address.toHex(dpc.bkeyAddress)
  // let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  // let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
  //   functionSelector, {}, parameter, issuerAddress)
  // const allowance = hex2int(res.constant_result[0]);
  return new BigNumber(0)
}

/**
 * 获取盈利的数量
 * @param {}} masterChefContract 
 * @param {*} pid 
 * @param {*} account 
 * @returns 
 */
export const getEarned = async (dpc, pid) => {

  if (dpc === undefined) {
    return
  }
  const tronWeb = dpc.tronWeb
  const currentAddress = dpc.currentAddress
  const bkeyPoolAddress = dpc.supportedPools[pid].poolAddress
  try {
    //选择合约方法
    let functionSelector = "earned(address)";
    let parameter = [
      { type: 'address', value: currentAddress }
    ]
    let contractAddress = tronWeb.address.toHex(bkeyPoolAddress)
    let issuerAddress = tronWeb.address.toHex(currentAddress)
    let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
      functionSelector, {}, parameter, issuerAddress)
    const amount = hex2int(res.constant_result[0]);
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}


/**
 * 矿池 ---获取质押的数量
 * @param {*} tronWeb 
 * @returns 
 */
export const getStaked = async (dpc, pid) => {
  if (dpc === undefined) {
    return
  }
  const bkeyPoolAddress = dpc.supportedPools[pid].poolAddress
  console.log("poolAddress--->", bkeyPoolAddress)
  const tronWeb = dpc.tronWeb
  try {
    //选择合约方法
    let functionSelector = "balanceOf(address)";
    let parameter = [
      { type: 'address', value: dpc.currentAddress }
    ]
    let contractAddress = tronWeb.address.toHex(bkeyPoolAddress)
    let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
    let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
      functionSelector, {}, parameter, issuerAddress)
    const amount = hex2int(res.constant_result[0]);
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

/**
 * 收割
 * @param {*} tronWeb 
 * @returns 
 */
export const harvest = async (dpc, pid) => {

  if (dpc === undefined) {
    return
  }
  const bkeyPoolAddress = dpc.supportedPools[pid].poolAddress
  const tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(bkeyPoolAddress);
  let tx = await instance["getReward"]().send({
    feeLimit: 1000000000,
    callValue: 0,
    shouldPollResponse: false
  });
  return tx

}

/**
 * 收割并解押
 * @param {}} tronWeb 
 * @returns 
 */
export const harvestUnstake = async (dpc, pid) => {
  console.log("harvestUnstake---->")
  if (dpc === undefined) {
    return
  }
  const bkeyPoolAddress = dpc.supportedPools[pid].poolAddress
  const tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(bkeyPoolAddress);
  let tx = await instance["exit"]().send({
    feeLimit: 1000000000,
    callValue: 0,
    shouldPollResponse: false
  });
  console.log("harvestUnstake-----result-->", tx)
  return tx
}

/**
 * 获取价格
 * @param {}} tronWeb 
 */
export const getPrice = async (dpc) => {
  if (dpc === undefined) {
    return
  }
  const tronWeb = dpc.tronWeb
  let functionSelector = "getPrice()";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, [], issuerAddress)
  const amount = hex2int(res.constant_result[0]);
  return new BigNumber(amount)
}

/**
 * 总供应量方法
 * @param {*} dpc 
 * @returns 
 */
export const getTotalSupply = async (dpc) => {
  console.log("getTotalSupply--->", dpc)
  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let functionSelector = "totalSupply()";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, [], issuerAddress)
  const amount = hex2int(res.constant_result[0]);
  console.log("getTotalSupply-->2", amount)
  return new BigNumber(amount)
}


/**
 * 购买
 * @param {*} tronWeb 
 * @param {*} amount 
 * @param {*} trxValue price*amount 
 * @returns 
 */
export const buy = async (dpc, amount, trxValue) => {
  if (dpc === undefined) {
    return
  }
  const tronWeb = dpc.tronWeb
  const value = tronWeb.toBigNumber(amount)
  let instance = await tronWeb.contract().at(dpc.tmbAddress);
  let res = await instance["buy"](tronWeb.toHex(value.toNumber()));
  console.log("callValue", tronWeb.toSun(trxValue))
  let tx = res.send({
    feeLimit: 1000000000,
    callValue: tronWeb.toSun(trxValue),
    shouldPollResponse: true
  });
  return tx
}

/**
 * 个人拥有的资产
 * @param {} tronWeb 
 * @param {*} dpc 
 */
export const getFavs = async (dpc) => {
  if (dpc == undefined) {
    return
  }
  const web3 = new Web3()
  let tronWeb = dpc.tronWeb
  let functionSelector = "tokensOfOwner(address)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = [
    { type: 'address', value: issuerAddress }
  ]
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, parameter, issuerAddress)

  let webRes = web3.eth.abi.decodeParameters(['uint256[]'], res.constant_result[0]);
  return webRes[0]
}

/**
 * 获取在出售的NFT
 * @param {*} dpc 
 * @returns 
 */
export const getMarkets = async (dpc) => {

  if (dpc == undefined) {
    return
  }
  const web3 = new Web3()
  let tronWeb = dpc.tronWeb
  let functionSelector = "tokensOfMarket()";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = []
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, parameter, issuerAddress)
  let webRes = web3.eth.abi.decodeParameters(['uint256[]'], res.constant_result[0]);
  return webRes[0]
}

/**
 * 交易TMB
 * @param {*} dpc 
 */
export const onExchange = async (dpc, amount) => {
  if (dpc == undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let functionSelector = "exchange(uint256)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = [
    { type: 'uint256', value: amount }
  ]
  let options = {
    shouldPollResponse: true,
    feeLimit: 300000000
  }
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, options, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 获取名字
 * @param {*} dpc 
 * @param {*} index 
 * @returns 
 */
export const tokenNameByIndex = async (dpc, index) => {

  if (dpc === undefined) {
    return
  }
  const web3 = new Web3()
  let tronWeb = dpc.tronWeb
  let functionSelector = "tokenNameByIndex(uint256)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = [{ type: 'uint256', value: index }]
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, parameter, issuerAddress)
  let webRes = web3.eth.abi.decodeParameter('string', res.constant_result[0]);
  return webRes + ""
}

/**
 * 判断是否出售
 * @param {*} dpc 
 * @param {*} index 
 * @returns 
 */
export const nftsOfferedForSale = async (dpc, index) => {
  if (dpc === undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(dpc.tmbAddress);
  let res = await instance["nftsOfferedForSale"](tronWeb.toHex(index)).call();
  return res
}

/**
 * 获取在售的数量
 * @param {*} dpc 
 */
export const totalMarketSupply = async (dpc) => {
  if (dpc === undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(dpc.tmbAddress);
  let res = await instance["totalMarketSupply"]().call();
  console.log("totalMarketSupply", res)
  return tronWeb.toBigNumber(res)
}




/**
 * 出售nft
 * @param {*} dpc 
 * @param {*} index 
 * @returns 
 */
export const offerNFTForSale = async (dpc, index, trxValue) => {
  console.log("offerNFTForSale---index", index)
  console.log("offerNFTForSale-----value", trxValue)
  if (dpc === undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(dpc.tmbAddress);
  let res = await instance["offerNFTForSale"](tronWeb.toHex(index), tronWeb.toHex(tronWeb.toSun(trxValue)))
    .send({
      feeLimit: 1000000000,//调用合约方法消耗最大数量的SUN。
      callValue: 0, //本次调用往合约转账的SUN。
      shouldPollResponse: false //如果设置为 TRUE，则会等到在 Solidity 节点上确认事务之后再返回结果。
    });
  console.log("offerNFTForSale----result--->", res)
  return res
}


/**
 * 获取名字
 * @param {*} dpc 
 * @param {*} index 
 * @returns 
 */
export const ownerAddress = async (dpc, index) => {

  if (dpc === undefined) {
    return
  }
  const web3 = new Web3()
  let tronWeb = dpc.tronWeb
  let functionSelector = "ownerOf(uint256)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = [{ type: 'uint256', value: index }]
  let res = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress,
    functionSelector, {}, parameter, issuerAddress)
  console.log("ownerAddress", res)
  let length = "41" + res.constant_result[0].substr(24, 64)
  let address = tronWeb.address.fromHex(length)
  return address + ""
}

/**
 * 撤销出售
 * @param {*} dpc 
 * @param {*} index 
 */
export const withdrawNFTForSale = async (dpc, index) => {
  if (dpc === undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let functionSelector = "withdrawNFTForSale(uint256)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let parameter = [{ type: 'uint256', value: index }]
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, {}, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 授权修改名称
 * @param {*} dpc 
 * @returns 
 */
export const approveChangeName = async (dpc) => {

  if (dpc == undefined) {
    return
  }
  //获得tronWeb对象
  let tronWeb = dpc.tronWeb
  //选择合约方法
  let functionSelector = "approve(address,uint256)";
  let contractAddress = tronWeb.address.toHex(dpc.bkeyAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  let decimal = new BigNumber(10).pow(14)
  let amount = 9 * decimal.toNumber()
  console.log("amount", amount)
  //根据方法构造参数
  let parameter = [
    { type: 'address', value: dpc.tmbAddress },
    { type: 'uint256', value: amount }
  ]
  //额外参数
  let options = {
    shouldPollResponse: false,
    feeLimit: 1000000000 //1Trx
  };
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, options, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 授权修改名称
 * @param {*} dpc 
 * @returns 
 */
export const changeName = async (dpc, index, name) => {
  console.log("changeName-----", index)
  console.log("changeName-----", name)
  if (dpc == undefined) {
    return
  }
  //获得tronWeb对象
  let tronWeb = dpc.tronWeb
  //选择合约方法
  let functionSelector = "changeName(uint256,string)";
  let contractAddress = tronWeb.address.toHex(dpc.tmbAddress)
  let issuerAddress = tronWeb.address.toHex(dpc.currentAddress)
  //根据方法构造参数
  let parameter = [
    { type: 'uint256', value: index },
    { type: 'string', value: name }
  ]
  //额外参数
  let options = {
    shouldPollResponse: false,
    feeLimit: 1000000000 //1Trx
  };
  // 构造智能合约交易信息
  let res = await tronWeb.transactionBuilder
    .triggerSmartContract(contractAddress, functionSelector, options, parameter, issuerAddress)
    .catch(err1 => {
      // 构建交易信息失败
      console.log(err1)
      return false;
    });
  // 对已经添加备注的交易信息进行签名
  let sign = await tronWeb.trx.sign(res.transaction).catch(err2 => {
    //签名失败
    return false;
  });
  // 将签名交易广播上链
  return await tronWeb.trx.sendRawTransaction(sign).catch(outputErr => {
    //交易广播出错
    console.log(outputErr);
    return false;
  });
}

/**
 * 购买
 * @param {*} tronWeb 
 * @param {*} amount 
 * @param {*} trxValue price*amount 
 * @returns 
 */
export const buyMarketNFT = async (dpc, index, price) => {
  console.log("buyMarketNFT", price)
  if (dpc === undefined) {
    return
  }
  let tronWeb = dpc.tronWeb
  let instance = await tronWeb.contract().at(dpc.tmbAddress);
  let res = await instance["buyMarketNFT"](tronWeb.toHex(index));
  console.log("callValue", tronWeb.toSun(price))
  let tx = res.send({
    feeLimit: 1000000000,
    callValue: tronWeb.toSun(price),
    shouldPollResponse: true
  });
  return tx
}


async function decodeParams(types, output, ignoreMethodHash) {

  if (!output || typeof output === 'boolean') {
    ignoreMethodHash = output;
    output = types;
  }

  if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
    output = '0x' + output.replace(/^0x/, '').substring(8);

  const abiCoder = new AbiCoder();

  if (output.replace(/^0x/, '').length % 64)
    throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
  return abiCoder.decode(types, output).reduce((obj, arg, index) => {
    if (types[index] == 'address')
      arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
    obj.push(arg);
    return obj;
  }, []);
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}


export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}


export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const hextoString = (hex) => {
  var arr = hex.split("")
  var out = ""
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
    var charValue = String.fromCharCode(tmp);
    out += charValue
  }
  return out
}

// json字符串转hex
export const stringtoHex = (str) => {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    if (val == "")
      val = str.charCodeAt(i).toString(16);
    else
      val += str.charCodeAt(i).toString(16);
  }
  val += "0a"
  return val
}

export const hex2int = (hex) => {
  var len = hex.length, a = new Array(len), code;
  for (var i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (48 <= code && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}

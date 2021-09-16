package com.crypto.nftdreamwork.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * 资产合约对象
 * 说明：比如CryptoPunks
 */
@Data
public class AssetContractObject implements Serializable {

    private static final long serialVersionUID = -5430992362327054329L;

    //象征符号
    private String symbol;
    //资产合约地址
    private String address;
    //资产类型图片地址
    private String imageUrl;
    //资产名称
    private String name;
    //描述
    private String description;
    //资产合约类型
    private String assetContractType;
    //资产页面地址
    private String externalLink;
    //创建时间
    private String createdDate;

}

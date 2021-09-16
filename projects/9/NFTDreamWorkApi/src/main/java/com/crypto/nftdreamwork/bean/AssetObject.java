package com.crypto.nftdreamwork.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * 资产对象
 */
@Data
public class AssetObject implements Serializable {

    private static final long serialVersionUID = 9048083634388548079L;

    //ERC721 资产的代币 ID
    private String tokenId;
    //图片地址
    private String imageUrl;
    //名称
    private String name;
    //描述
    private String description;
    //原始网站链接
    private String externalLink;
    //openseaNFT页面地址
    private String permalink;
    //资产拥有者对象
    private AssetOwnerObject owner;
    //资产合约对象
    private AssetContractObject assetContract;

}

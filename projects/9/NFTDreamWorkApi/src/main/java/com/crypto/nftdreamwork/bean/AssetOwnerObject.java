package com.crypto.nftdreamwork.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * 资产拥有者对象
 */
@Data
public class AssetOwnerObject implements Serializable {

    private static final long serialVersionUID = 1819941160555546307L;

    //钱包地址
    private String address;
    //头像地址
    private String profileImgUrl;

}

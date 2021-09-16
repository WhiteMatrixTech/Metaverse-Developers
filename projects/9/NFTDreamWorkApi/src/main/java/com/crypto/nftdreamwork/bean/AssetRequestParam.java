package com.crypto.nftdreamwork.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * 资产接口请求参数对象
 */
@Data
public class AssetRequestParam implements Serializable {

    private static final long serialVersionUID = 1615334985087975107L;

    private Integer offset;
    private Integer limit;
    private String owner;
    private String orderDirection;

}

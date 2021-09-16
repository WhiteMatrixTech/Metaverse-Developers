package com.crypto.nftdreamwork.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.crypto.nftdreamwork.bean.AssetObject;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * 资产对象转换工具
 */
public class AssetConvertUtils {

    /**
     * 字符串转Asset对象
     * @param content
     * @return
     */
    public static AssetObject convertStringToAsset(String content) {
        if (StringUtils.hasText(content)) {
            return JSON.parseObject(content, AssetObject.class);
        }
        return null;
    }

    /**
     * 字符串转Asset数组
     * @param content
     * @return
     */
    public static List<AssetObject> convertStringToAssetList(String content) {
        if (StringUtils.hasText(content)) {
            JSONObject jsonObject = JSON.parseObject(content);
            JSONArray assetArray = jsonObject.getJSONArray("assets");
            return assetArray == null ? null : JSON.parseObject(assetArray.toJSONString(), new TypeReference<List<AssetObject>>(){});
        }
        return null;
    }

}

package com.crypto.nftdreamwork.controller;

import com.crypto.nftdreamwork.bean.ApiResult;
import com.crypto.nftdreamwork.bean.AssetObject;
import com.crypto.nftdreamwork.bean.AssetRequestParam;
import com.crypto.nftdreamwork.constant.ApiConstant;
import com.crypto.nftdreamwork.util.AssetConvertUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.util.List;

/**
 * Api接口
 * @date 2021-09-09
 */
@RestController()
public class NftController {

    /**
     * 查询单个NFT资产
     * @param assetContractAddress
     * @param tokenId
     * @return
     */
    @GetMapping("/api/asset/getNftInfo")
    @ResponseBody
    public ApiResult getNft(String assetContractAddress, String tokenId) {
        //参数校验
        if (!StringUtils.hasText(assetContractAddress)) {
            return ApiResult.getErrorMsg(ApiConstant.FAILED, "assetContractAddress参数不能为空");
        }
        if (!StringUtils.hasText(tokenId)) {
            return ApiResult.getErrorMsg(ApiConstant.FAILED, "tokenId参数不能为空");
        }

        // opensea查询单个资产url
        String url = "https://api.opensea.io/api/v1/asset/" + assetContractAddress + "/" + tokenId + "/";
        // 创建Httpclient对象
        CloseableHttpClient httpclient = HttpClients.createDefault();
        // 创建http GET请求
        HttpGet httpGet = new HttpGet(url);
        CloseableHttpResponse response = null;
        //也可以用RestTemplate实现
        try {
            // 执行请求
            response = httpclient.execute(httpGet);
            // 判断返回状态是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                //请求体内容
                String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                AssetObject assetObject = AssetConvertUtils.convertStringToAsset(content);
                return ApiResult.getData(assetObject);
            } else {
                return ApiResult.getErrorMsg(ApiConstant.ERROR, "查询不到数据");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResult.getErrorMsg(ApiConstant.ERROR, "第三方服务接口调用失败");
        } finally {
            //关闭连接
            try {
                if (response != null) {
                    response.close();
                }
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 查询NFT资产列表
     * @param assetRequestParam
     * @return
     */
    @GetMapping("/api/asset/getNftList")
    @ResponseBody
    public ApiResult getNftList(AssetRequestParam assetRequestParam) {
        ApiResult apiResult = checkAssetRequestParam(assetRequestParam);
        if (apiResult != null  ) {
            return apiResult;
        }

        String url = "https://api.opensea.io/api/v1/assets";
        // 创建Httpclient对象
        CloseableHttpClient httpclient = HttpClients.createDefault();
        //response 对象
        CloseableHttpResponse response = null;

        try {
            // 定义请求的参数
            URIBuilder uriBuilder = new URIBuilder(url);
            uriBuilder.setParameter("owner", assetRequestParam.getOwner());
            uriBuilder.setParameter("offset", assetRequestParam.getOffset().toString());
            uriBuilder.setParameter("limit", assetRequestParam.getLimit().toString());
            if (StringUtils.hasText(assetRequestParam.getOrderDirection())) {
                uriBuilder.setParameter("order_direction", assetRequestParam.getOrderDirection());
            }

            URI uri = uriBuilder.build();

            // 创建http GET请求
            HttpGet httpGet = new HttpGet(uri);

            // 执行http get请求
            response = httpclient.execute(httpGet);
            // 判断返回状态是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                List<AssetObject> assertList = AssetConvertUtils.convertStringToAssetList(content);
                apiResult = ApiResult.getData(assertList);
                apiResult.setCount(assertList.size());
                return apiResult;
            } else {
                return ApiResult.getErrorMsg(ApiConstant.ERROR, "查询不到数据");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResult.getErrorMsg(ApiConstant.ERROR, "第三方服务接口调用失败");
        } finally {
            //关闭连接
            try {
                if (response != null) {
                    response.close();
                }
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 校验资产请求参数
     * @param assetRequestParam
     * @return
     */
    private ApiResult checkAssetRequestParam(AssetRequestParam assetRequestParam) {
        if (assetRequestParam == null) {
            return ApiResult.getErrorMsg(ApiConstant.FAILED, "请求参数不能为空");
        }
        if (!StringUtils.hasText(assetRequestParam.getOwner())) {
            return ApiResult.getErrorMsg(ApiConstant.FAILED, "owner不能为空");
        }
        if (StringUtils.hasText(assetRequestParam.getOrderDirection())
                && (!ApiConstant.ORDER_DIRECTION_DESC.equals(assetRequestParam.getOrderDirection()) && !ApiConstant.ORDER_DIRECTION_ASC.equals(assetRequestParam.getOrderDirection()) )) {
            //订单方向参数如果不为空，必须为desc或asc
            return ApiResult.getErrorMsg(ApiConstant.FAILED, "orderDirection value is not a valid enumeration member; permitted: 'asc', 'desc'");
        }
        //设置默认查询页数
        if (assetRequestParam.getOffset() == null) {
            assetRequestParam.setOffset(ApiConstant.OFFSET);
        }
        if (assetRequestParam.getLimit() == null) {
            assetRequestParam.setLimit(ApiConstant.LIMIT);
        }
        return null;
    }

}

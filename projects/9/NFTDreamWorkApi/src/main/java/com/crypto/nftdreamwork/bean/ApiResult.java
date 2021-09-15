package com.crypto.nftdreamwork.bean;

import com.crypto.nftdreamwork.constant.ApiConstant;
import lombok.Data;

@Data
public class ApiResult {

    //标识：0-成功，1-失败
    private int code;
    //错误提示
    private String msg;
    //数据对象
    private Object data;
    //数量
    private Integer count;

    public static ApiResult getData(Object data) {
        ApiResult apiResut = new ApiResult();
        apiResut.setCode(ApiConstant.SUCCESS);
        apiResut.setData(data);
        return apiResut;
    }

    public static ApiResult ApiResut(String msg) {
        ApiResult apiResut = new ApiResult();
        apiResut.setCode(ApiConstant.FAILED);
        apiResut.setMsg(msg);
        return apiResut;
    }

    public static ApiResult getErrorMsg(int code, String msg) {
        ApiResult apiResut = new ApiResult();
        apiResut.setCode(code);
        apiResut.setMsg(msg);
        return apiResut;
    }

}

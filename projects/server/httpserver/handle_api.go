/**********************************************************************************************************************
 *
 * Copyright (c) 2010 babeltime.com, Inc. All Rights Reserved
 *
 **********************************************************************************************************************/

/**
 * @author chengliang
 * @date 2021/9/8 21:54
 * @brief
 *
 **/

package httpserver

import (
	"encoding/json"
	"fmt"
	"github.com/bright1208/opera/httpserver/log4go"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strconv"
)

const (
	DefFaceFileName         = "face.json"
	DefContractInfoFileName = "contract_info.json"
)

var gImgMetaMap = make(map[int]*TImgMeta, 10000)
var gContractInfo map[string]string

var gLogger log4go.ILog4go

func LoadConf() {
	gLogger = log4go.NewLog()
	// 先加载
	loadContractInfo()
	loadImgMetaInfos()
}

// 读取脸谱等信息
func loadImgMetaInfos() {
	des := gContractInfo["description"]
	config := GConfig
	filePath := path.Join(config.ConfPath, DefFaceFileName)
	jsonFile, err := os.Open(filePath)
	if err != nil {
		gLogger.Panic(err)
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		gLogger.Panic(err)
	}
	var res [][]interface{}
	err = json.Unmarshal(byteValue, &res)
	if err != nil {
		gLogger.Panic(err)
	}
	gLogger.Debug(res[9])
	for _, imgArr := range res {
		floatId := imgArr[0].(float64)
		id := int(floatId)
		meta := &TImgMeta{
			Name:  imgArr[1].(string),
			Image: fmt.Sprintf("%s/%s", config.ImgDomain, imgArr[2].(string)),
			Desc:  des,
			Attributes: []TMetaAttr{
				{TraitType: "minATK", Value: imgArr[4].(float64), MaxValue: 25},
				{TraitType: "maxATK", Value: imgArr[5].(float64), MaxValue: 35},
				{TraitType: "DEF", Value: imgArr[6].(float64), MaxValue: 15},
				{TraitType: "HP", Value: imgArr[7].(float64), MaxValue: 250},
			},
		}
		gImgMetaMap[id] = meta
	}
}

func loadContractInfo() {
	config := GConfig
	filePath := path.Join(config.ConfPath, DefContractInfoFileName)
	jsonFile, err := os.Open(filePath)
	if err != nil {
		gLogger.Panic(err)
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		gLogger.Panic(err)
	}

	err = json.Unmarshal(byteValue, &gContractInfo)
	if err != nil {
		gLogger.Panic(err)
	}
	fmt.Println(gLogger)
	gLogger.Info(gContractInfo)
}

// ApiHandler 返回单个face信息
func ApiHandler(w http.ResponseWriter, r *http.Request) {
	hLog := log4go.NewHttpLog(r)
	w.Header().Set("Content-Type", "application/json")
	hLog.Info(r)
	// 取id
	vars := mux.Vars(r)
	hLog.Info(vars)
	imgIdStr, ok := vars["imgid"]
	if !ok {
		err := fmt.Errorf("url error:%s", r.URL)
		hLog.Panic(err.Error())
	}
	imgId, err := strconv.Atoi(imgIdStr)
	if err != nil {
		hLog.Fatal(err)
		hLog.Panic(err)
	}
	meta := gImgMetaMap[imgId]
	hLog.Info(meta)
	metaByte, err := json.Marshal(meta)
	if err != nil {
		hLog.Panic(err)
	}
	w.Write(metaByte)
}

// ContractHandler 处理
func ContractHandler(w http.ResponseWriter, r *http.Request) {
	hLog := log4go.NewHttpLog(r)
	w.Header().Set("Content-Type", "text/json")
	metaByte, err := json.Marshal(gContractInfo)
	hLog.Info(metaByte)
	if err != nil {
		hLog.Panic(err)
	}
	w.Write(metaByte)
}

package httpserver

type TConfig struct {
	Host      string
	Port      int
	ConfPath  string //配置路径
	ImgDomain string
}

var GConfig TConfig

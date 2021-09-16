import i18n from 'i18next'; 
import { initReactI18next } from 'react-i18next';
import { languages } from './language.js'; //先引入多语言配置函数
const defaultLanguage = 'en'; //默认英语


console.log("languages",languages)

i18n
  .use(initReactI18next) //使用
  .init({ //初始化
    resources: languages,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(t => {
    console.log('18n ready');
  });

const changeLanguage = lng => { //定义多语言的change
  console.log("changeLanguage",lng) 
  i18n.changeLanguage(lng); //i18n会通过这个方法去改变它的语言
};

export { changeLanguage }; //导出

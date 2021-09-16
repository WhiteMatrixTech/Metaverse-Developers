package com.crypto.nftdreamwork.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 跨域配置
 * add by adu 2021-09-08
 */
@Configuration
public class WebCrossConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST")
//                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }

}

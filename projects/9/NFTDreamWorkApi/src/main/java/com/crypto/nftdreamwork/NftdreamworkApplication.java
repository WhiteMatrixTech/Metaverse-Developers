package com.crypto.nftdreamwork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="com.crypto.nftdreamwork")
public class NftdreamworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(NftdreamworkApplication.class, args);
        System.out.println("nftdreamwork start...");
    }

}

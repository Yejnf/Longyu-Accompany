package com.example.longyu_1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.longyu_1.mapper")
public class Longyu1Application {

    public static void main(String[] args) {
        SpringApplication.run(Longyu1Application.class, args);
    }

}

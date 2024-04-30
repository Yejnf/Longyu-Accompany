package com.example.longyu_1.controller;

import com.example.longyu_1.entity.MemoList;
import com.example.longyu_1.mapper.OrderMapper;
import com.example.longyu_1.service.FtpFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/upload")
public class FileUploadController {
    @Autowired
    private OrderMapper orderMapper;
    private final FtpFileUploadService ftpFileUploadService;

    public FileUploadController(FtpFileUploadService ftpFileUploadService) {
        this.ftpFileUploadService = ftpFileUploadService;
    }

    // 头像
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            byte[] fileData = file.getBytes();
            String fileName = file.getOriginalFilename();
            System.out.println(fileName);
            ftpFileUploadService.uploadFile(fileData, fileName, "/");
            return ResponseEntity.ok("File uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }


    }



    //获取数据并上传
    @PostMapping("/test")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,
                                         @RequestParam("orderNumber") String orderNumber,
                                         @RequestParam("textareaValue") String textareaValue) {
        // You need to convert MultipartFile to a byte array,
        // assuming the file contains binary data.
        byte[] fileData;
        try {
            fileData = file.getBytes();
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read file data");
        }

        try {
            ftpFileUploadService.uploadFileWithOrderFolder(fileData, file.getOriginalFilename(), orderNumber);
            String folderPath = orderNumber+"/";
            if(orderMapper.countMemoListByOrderNumber(orderNumber)==0){
                createMemoList(new MemoList(orderNumber,textareaValue,folderPath));
            }
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            // Handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }

    // 上传数据库
    @PostMapping("/MemoList")
    public ResponseEntity<String> createMemoList(@RequestBody MemoList memoList) {
        orderMapper.insertMemoList(memoList);
        System.out.println("上传数据库成功");
        return ResponseEntity.ok("备忘清单提交成功"); // 返回成功的响应
    }



}



package com.example.longyu_1.service;

import com.example.longyu_1.mapper.OrderMapper;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RestController
public class FtpFileUploadService {

    @Autowired
    private OrderMapper orderMapper;

    @Value("${ftp.server.host}")
    private String server;
    @Value("${ftp.server.port}")
    private int port;
    @Value("${ftp.server.username}")
    private String username;
    @Value("${ftp.server.password}")
    private String password;

    public void uploadFile(byte[] fileData, String remoteFileName, String remoteDirectory) throws Exception {
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(server, port);
            ftpClient.login(username, password);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            ftpClient.changeWorkingDirectory(remoteDirectory);
            ftpClient.storeFile(remoteFileName, new ByteArrayInputStream(fileData));
        } finally {
            ftpClient.logout();
        }
    }


    public void uploadFileWithOrderFolder(byte[] fileData, String remoteFileName, String orderNumber) throws Exception {
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(server, port);
            ftpClient.login(username, password);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // 创建订单文件夹
            String remoteDirectory = "/" + orderNumber;
            createRemoteDirectory(ftpClient, remoteDirectory);

            // 切换工作目录到订单文件夹
            ftpClient.changeWorkingDirectory(remoteDirectory);

            // 上传文件
            ftpClient.storeFile(remoteFileName, new ByteArrayInputStream(fileData));
        } finally {
            ftpClient.logout();
        }
    }

    private void createRemoteDirectory(FTPClient ftpClient, String directoryPath) throws IOException, IOException {
        String[] subDirectories = directoryPath.split("/");
        for (String subDirectory : subDirectories) {
            if (!ftpClient.changeWorkingDirectory(subDirectory)) {
                // 如果文件夹不存在，创建它
                if (!ftpClient.makeDirectory(subDirectory)) {
                    throw new IOException("无法创建远程文件夹: " + subDirectory);
                }
                // 进入创建的文件夹
                if (!ftpClient.changeWorkingDirectory(subDirectory)) {
                    throw new IOException("无法进入远程文件夹: " + subDirectory);
                }
            }
        }
    }

    @GetMapping("/getMemoList")
    public Map<String, Object> getImagePathByOrderNumber(@RequestParam("orderNumber") String orderNumber) {
        List<Map<String, Object>> result = orderMapper.getTextAndImageListByOrderNumber(orderNumber);

        // Create a response map to hold the result
        Map<String, Object> response = new HashMap<>();

        if (!result.isEmpty()) {
            Map<String, Object> firstRow = result.get(0);
            String textarea = (String) firstRow.get("textarea");
            String imageListPath = (String) firstRow.get("imageList");

            // Connect to the FTP server and list files in the imageListPath
            List<String> imagePaths = new ArrayList<>();
            FTPClient ftpClient = new FTPClient();
            try {
                ftpClient.connect(server, port);
                ftpClient.login(username, password);
                ftpClient.enterLocalPassiveMode();
                ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

                // Change working directory to the imageListPath
                if (ftpClient.changeWorkingDirectory(imageListPath)) {
                    FTPFile[] files = ftpClient.listFiles();
                    for (FTPFile file : files) {
                        if (file.isFile()) {
                            String imagePath = orderNumber + "/" + file.getName();
                            imagePaths.add(imagePath);
                            System.out.println(imagePath);
                        }
                    }
                    response.put("imagePaths", imagePaths);
                    response.put("textarea", textarea);
                } else {
                    System.out.println("11");
                    response.put("error", "Image directory not found at: " + imageListPath);
                }
            } catch (IOException e) {
                System.out.println("22");
                response.put("error", "Failed to connect to FTP server: " + e.getMessage());
            } finally {
                try {
                    ftpClient.logout();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } else {
            response.put("error", "No data found for orderNumber: " + orderNumber);
        }
        return response;
    }


}

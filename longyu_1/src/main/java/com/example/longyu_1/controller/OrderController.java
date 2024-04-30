package com.example.longyu_1.controller;

import com.example.longyu_1.entity.MemoList;
import com.example.longyu_1.entity.Order;
import com.example.longyu_1.entity.Receiver;
import com.example.longyu_1.mapper.OrderMapper;
import com.example.longyu_1.service.FtpFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {

    @Autowired
    private OrderMapper orderMapper;

    private final FtpFileUploadService ftpFileUploadService;

    public OrderController(FtpFileUploadService ftpFileUploadService) {
        this.ftpFileUploadService = ftpFileUploadService;
    }

    // 插入订单
    @PostMapping("/submitOrder")
    public ResponseEntity<String> submitOrder(@RequestBody Order order) throws MalformedURLException {
        String url = order.getAvatarUrl();
//        wxfile://       tmp_7bab8c9ca7446c4da1231e83476dbe79fbab5607acee9499.jpg
//        http://tmp/     *.jpeg
        if(url.contains("wxfile://")){
            url = url.replace("wxfile://","http://tmp/");
        }
        order.setAvatarUrl(url);
        System.out.println(url);
        URL urlObject = new URL(url);
        String filename = Paths.get(urlObject.getPath()).getFileName().toString();
        System.out.println(filename);

        // 插入环节
        order.setAvatarUrl(filename);
        orderMapper.insertOrder(order);
        return ResponseEntity.ok("插入成功");
    }



    @GetMapping("/getOrders")
    public List<Order> getOrdersByPhoneNumber(@RequestParam("phoneNumber") String phoneNumber) {
        List<Order> orders = orderMapper.getOrdersByPhoneNumber(phoneNumber);
        return orders;
    }


    @GetMapping("/getOrdersByStatus")
    public List<Order> getOrdersByPhoneNumberAndStatus(@RequestParam("phoneNumber") String phoneNumber,
                                                       @RequestParam("status") String status) {
        List<Order> orders = orderMapper.getOrdersByPhoneNumberAndStatus(phoneNumber,status);
        return orders;
    }

    @DeleteMapping("/deleteOrder")
    public ResponseEntity<String> cancelOrder(@RequestParam("orderNumber") String orderNumber) {
        orderMapper.deleteOrderByOrderNumber(orderNumber);
        return ResponseEntity.ok("订单删除成功"); // 返回成功的响应
    }


    @PutMapping("/updateOrderStatus/{orderNumber}/{orderStatus}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderNumber, @PathVariable String orderStatus) {
        orderMapper.updateStatusByOrderNumber(orderNumber,orderStatus);
        return ResponseEntity.ok("订单状态更改成功"); // 返回成功的响应
    }



//    @PostMapping("/MemoList")
//    public ResponseEntity<String> createMemoList(@RequestBody MemoList memoList) {
//        orderMapper.insertMemoList(memoList);
//        System.out.println("上传数据库成功");
//        return ResponseEntity.ok("备忘清单提交成功"); // 返回成功的响应
//    }


//    @PostMapping("/uploadImage")
//    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
//                                              @RequestParam("orderNumber") String orderNumber,
//                                              @RequestParam("textareaValue") String textareaValue) {
//        try {
//            // 构建上传路径
//            String uploadPath = "C:/Users/yjnf/WeChatProjects/miniprogram-7/pages/orders/";
//            // 根据订单号创建对应的文件夹
//            String folderPath = uploadPath + orderNumber + "/";
//            File folder = new File(folderPath);
//
//            // 如果文件夹不存在，则创建文件夹
//            if (!folder.exists()) {
//                folder.mkdirs();
//            }
//
//            // 获取文件名
//            String fileName = file.getOriginalFilename();
//
//            // 构建文件保存路径
//            String filePath = folderPath + fileName;
//            Path path = Paths.get(filePath);
//
//            // 保存文件到本地
//            Files.write(path, file.getBytes());
//
//            // 打印文件路径
//            System.out.println("Uploaded file path: " + path.toString());
//            System.out.println("orderNumber: " + orderNumber);
//            System.out.println("textareaValue: " + textareaValue);
//
//            // 在数据库中保存图片路径
//            if(orderMapper.countMemoListByOrderNumber(orderNumber)==0){
//                createMemoList(new MemoList(orderNumber,textareaValue,folderPath));
//            }
//
//
//            return ResponseEntity.ok("图片上传成功");
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("图片上传失败");
//        }
//    }


//    @GetMapping("/getMemoList")
//    public Map<String, Object> getImagePathByOrderNumber(@RequestParam("orderNumber") String orderNumber) {
//        List<Map<String, Object>> result = orderMapper.getTextAndImageListByOrderNumber(orderNumber);
//
//        // 创建一个包含textarea和imageList的Map
//        Map<String, Object> response = new HashMap<>();
//
//        if (!result.isEmpty()) {
//            Map<String, Object> firstRow = result.get(0);
//            response.put("textarea", firstRow.get("textarea"));
//            response.put("imageList", firstRow.get("imageList"));
//
//            String textarea = (String) firstRow.get("textarea");
//            String imageListPath = (String) firstRow.get("imageList");
//            File imageListDirectory = new File(imageListPath);
//
//            if (imageListDirectory.exists() && imageListDirectory.isDirectory()) {
//                File[] imageFiles = imageListDirectory.listFiles();
//                List<String> imagePaths = new ArrayList<>();
//
//                if (imageFiles != null) {
//                    for (File imageFile : imageFiles) {
//                        if (imageFile.isFile()) {
//                            System.out.println(imageFile.getAbsolutePath());
//                            String imagePath = "/" + imageFile.getAbsolutePath().replace("\\", "/").replaceAll("^.*/", "");
//                            int lastIndexOfSlash = imagePath.lastIndexOf("/");
//                            if (lastIndexOfSlash >= 0) {
//                                imagePath = imagePath.substring(lastIndexOfSlash + 1);
//                            }
//                            imagePaths.add(orderNumber+"/"+imagePath);
//                            System.out.println(orderNumber+"/"+imagePath);
//                        }
//                    }
//                }
//                response.put("imagePaths", imagePaths);
//                response.put("textarea", textarea);
//            } else {
//                response.put("error", "Image directory not found at: " + imageListPath);
//            }
//
//        } else {
//            response.put("error", "No data found for orderNumber: " + orderNumber);
//        }
//        return response;
//    }





    // 接单端
    @GetMapping("/getUnOrders")
    public List<Order> getUnOrders(@RequestParam("city") String city,
                                   @RequestParam("status") String status,
                                   @RequestParam("receiveStatus") int receiveStatus) {
        List<Order> orders = orderMapper.getUnOrders(city,status,receiveStatus);
        return orders;
    }

    //接单按钮
    @PutMapping("/updateReceiveStatus/{orderNumber}/{receiveStatus}/{receiveOrderTime}/{receiveNickName}/{deleteStatus}/{certificate}")
    public ResponseEntity<String> updateReceiveStatus(@PathVariable String orderNumber,
                                                      @PathVariable int receiveStatus,
                                                      @PathVariable String receiveOrderTime,
                                                      @PathVariable String receiveNickName,
                                                      @PathVariable int deleteStatus,
                                                      @PathVariable String certificate) {
        orderMapper.updateReceiveStatus(orderNumber,receiveStatus,receiveOrderTime,receiveNickName,deleteStatus,certificate);
        return ResponseEntity.ok("接单状态更改成功"); // 返回成功的响应
    }

    // 陪诊师已接单显示全部订单
    @GetMapping("/getHadOrders")
    public List<Order> getHadOrders(@RequestParam("receiveNickName") String receiveNickName,
                                    @RequestParam("deleteStatus") int deleteStatus,
                                    @RequestParam("certificate") String certificate) {
        List<Order> orders = orderMapper.getHadOrders(receiveNickName,deleteStatus,certificate);
        return orders;
    }

    // 陪诊师取消订单到未接单
    @PutMapping("/updateTo_UnOrder/{orderNumber}/{receiveStatus}")
    public ResponseEntity<String> updateTo_UnOrder(@PathVariable String orderNumber,
                                                   @PathVariable int receiveStatus) {
        orderMapper.updateTo_UnOrder(orderNumber,receiveStatus);
        return ResponseEntity.ok("订单状态更改为未接单"); // 返回成功的响应
    }

    // 插入随机编码
    @PutMapping("/updateRandomString/{orderNumber}/{randomString}")
    public ResponseEntity<String> updateRandomString(@PathVariable String orderNumber,
                                                     @PathVariable String randomString) {
        orderMapper.updateRandomString(orderNumber,randomString);
        return ResponseEntity.ok("插入随机码成功"); // 返回成功的响应
    }

    // 陪诊师输入随机码验证
    @GetMapping("/validateRandomString")
    public ResponseEntity<?> validateRandomString(@RequestParam("orderNumber") String orderNumber,
                                      @RequestParam("randomString") String randomString) {
        Order orders = orderMapper.validateRandomString(orderNumber,randomString);
        if(orders == null){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }

    // 陪诊师完成订单验证成功更改订单状态
    @PutMapping("/updateOrderStatus/{orderNumber}/{orderStatus}/{receiveStatus}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderNumber,
                                                    @PathVariable String orderStatus,
                                                    @PathVariable int receiveStatus) {
        orderMapper.updateOrderStatus(orderNumber,orderStatus,receiveStatus);
        return ResponseEntity.ok("订单状态更改成功"); // 返回成功的响应
    }

    // 陪诊师删除订单，但客户仍可见，数据库的删除订单决定权在用户手里
    @PutMapping("/deleteOrder/{orderNumber}/{deleteStatus}")
    public ResponseEntity<String> deleteOrder(@PathVariable String orderNumber,
                                                   @PathVariable int deleteStatus) {
        orderMapper.deleteOrder(orderNumber,deleteStatus);
        return ResponseEntity.ok("订单状态更改为未接单"); // 返回成功的响应
    }


    // 验证唯一凭证
    @GetMapping("/getReceiver")

    public ResponseEntity<?> getReceiver(@RequestParam("receiveName") String receiveName,
                                         @RequestParam("receiveIdCard") String receiveIdCard,
                                         @RequestParam("receivePhoneNumber") String receivePhoneNumber) {
        Receiver receiver = orderMapper.getReceiver(receiveName,receiveIdCard,receivePhoneNumber);
        if(receiver == null){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }

    // 获取全部receiver
    @GetMapping("/getReceiverAll")

    public Receiver getReceiverAll(@RequestParam("receiveName") String receiveName,
                                   @RequestParam("receiveIdCard") String receiveIdCard,
                                   @RequestParam("receivePhoneNumber") String receivePhoneNumber) {
        Receiver receiver = orderMapper.getReceiver(receiveName,receiveIdCard,receivePhoneNumber);
        return receiver;
    }



    // 获取订单数
    @GetMapping("/getOrderCount")

    public int getOrderCount(@RequestParam("receiveName") String receiveName,
                                   @RequestParam("receiveIdCard") String receiveIdCard,
                                   @RequestParam("receivePhoneNumber") String receivePhoneNumber) {
        Receiver receiver = orderMapper.getReceiver(receiveName,receiveIdCard,receivePhoneNumber);
        return receiver.getOrderCount();
    }


    // 更新订单数
    @PutMapping("/updateOrderCount/{receiveName}/{receiveIdCard}/{receivePhoneNumber}/{orderCount}")
    public ResponseEntity<String> updateOrderCount(@PathVariable String receiveName,
                                                   @PathVariable String receiveIdCard,
                                                   @PathVariable String receivePhoneNumber,
                                                   @PathVariable int orderCount) {
        orderMapper.updateOrderCount(receiveName,receiveIdCard,receivePhoneNumber,orderCount);
        return ResponseEntity.ok("更新订单数成功"); // 返回成功的响应
    }




}

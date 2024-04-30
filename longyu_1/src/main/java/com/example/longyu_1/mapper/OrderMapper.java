package com.example.longyu_1.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.longyu_1.entity.MemoList;
import com.example.longyu_1.entity.Order;
import com.example.longyu_1.entity.Receiver;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper extends BaseMapper<Order> {

    @Insert("INSERT INTO orders VALUES (#{order.phoneNumber},#{order.orderNumber},#{order.orderTime},#{order.status},#{order.name},#{order.idCard},#{order.department},#{order.selectedDate},#{order.selectedTime},#{order.city},#{order.selectedHospitalName},#{order.agreeChecked},#{order.requirement},#{order.price},#{order.receiveStatus},#{order.receiveOrderTime},#{order.nickName},#{order.receiveNickName},#{order.avatarUrl},#{order.randomString},#{order.deleteStatus},#{order.certificate})")
    void insertOrder(@Param("order") Order order);

    @Select("SELECT * FROM orders WHERE phoneNumber = #{phoneNumber}")
    List<Order> getOrdersByPhoneNumber(String phoneNumber);

    @Select("SELECT * FROM orders WHERE phoneNumber = #{phoneNumber} AND status = #{status}")
    List<Order> getOrdersByPhoneNumberAndStatus(@Param("phoneNumber") String phoneNumber, @Param("status") String status);



    @Delete("DELETE FROM orders WHERE orderNumber = #{orderNumber}")
    void deleteOrderByOrderNumber(String orderNumber);


    @Update("UPDATE orders SET status = #{orderStatus} WHERE orderNumber = #{orderNumber}")
    void updateStatusByOrderNumber(@Param("orderNumber") String orderNumber, String orderStatus);


    @Insert("INSERT INTO memoList (orderNumber, textarea, imageList) VALUES (#{memoList.orderNumber}, #{memoList.textarea}, #{memoList.imageList})")
    void insertMemoList(@Param("memoList") MemoList memoList);

    @Select("SELECT COUNT(*) FROM memoList WHERE orderNumber = #{orderNumber}")
    int countMemoListByOrderNumber(String orderNumber);


    @Select("SELECT DISTINCT M.textarea, M.imageList " +
            "FROM memoList AS M " +
            "WHERE M.orderNumber = #{orderNumber}")
    List<Map<String, Object>> getTextAndImageListByOrderNumber(String orderNumber);




    // 接单端
    @Select("SELECT * FROM orders WHERE city = #{city} AND status = #{status} AND receiveStatus = #{receiveStatus}")
    List<Order> getUnOrders(@Param("city") String city, @Param("status") String status, @Param("receiveStatus") int receiveStatus);


    // 接单按钮
    @Update("UPDATE orders SET receiveStatus = #{receiveStatus},receiveOrderTime = #{receiveOrderTime},receiveNickName = #{receiveNickName},deleteStatus = #{deleteStatus},certificate = #{certificate} WHERE orderNumber = #{orderNumber}")
    void updateReceiveStatus(@Param("orderNumber") String orderNumber, @Param("receiveStatus") int receiveStatus, @Param("receiveOrderTime") String receiveOrderTime, @Param("receiveNickName") String receiveNickName, @Param("deleteStatus") int deleteStatus,@Param("certificate") String certificate);


    // 陪诊师已接单显示全部订单
    @Select("SELECT * FROM orders WHERE receiveNickName = #{receiveNickName} AND deleteStatus = #{deleteStatus} AND certificate = #{certificate}")
    List<Order> getHadOrders(String receiveNickName, int deleteStatus,String certificate);

    // 陪诊师取消订单到未接单
    @Update("UPDATE orders SET receiveStatus = #{receiveStatus} WHERE orderNumber = #{orderNumber}")
    void updateTo_UnOrder(String orderNumber, int receiveStatus);

    // 插入随机编码
    @Update("UPDATE orders SET randomString = #{randomString} WHERE orderNumber = #{orderNumber}")
    void updateRandomString(@Param("orderNumber") String orderNumber,@Param("randomString") String randomString);


    // 陪诊师输入随机码验证
    @Select("SELECT * FROM orders WHERE orderNumber = #{orderNumber} AND randomString = #{randomString}")
    Order validateRandomString(@Param("orderNumber") String orderNumber, @Param("randomString") String randomString);


    // 陪诊师完成订单验证成功更改订单状态
    @Update("UPDATE orders SET status = #{orderStatus},receiveStatus = #{receiveStatus} WHERE orderNumber = #{orderNumber}")
    void updateOrderStatus(@Param("orderNumber") String orderNumber, @Param("orderStatus") String orderStatus, @Param("receiveStatus") int receiveStatus);

    // 陪诊师删除订单，但客户仍可见，数据库的删除订单决定权在用户手里
    @Update("UPDATE orders SET deleteStatus = #{deleteStatus} WHERE orderNumber = #{orderNumber}")
    void deleteOrder(String orderNumber, int deleteStatus);

    //陪诊师接单数
    //未操作
    @Insert("INSERT INTO receive VALUES (#{receive.phoneNumber},#{receive.phoneNumber},#{receive.phoneNumber},#{receive.phoneNumber})")
    void insertReceiveCount(@Param("order") Order order);


    // 验证唯一凭证  // 获取全部receiver // 获取订单数
    @Select("SELECT * FROM receiver WHERE receiveName = #{receiveName} AND  receiveIdCard= #{receiveIdCard} AND receivePhoneNumber= #{receivePhoneNumber}")
    Receiver getReceiver(@Param("receiveName") String receiveName,
                         @Param("receiveIdCard") String receiveIdCard,
                         @Param("receivePhoneNumber") String receivePhoneNumber);


    // 更新订单数
    @Update("UPDATE receiver SET orderCount = orderCount+1 WHERE receiveName = #{receiveName} AND receiveIdCard = #{receiveIdCard} AND receivePhoneNumber = #{receivePhoneNumber}")
    void updateOrderCount(String receiveName, String receiveIdCard, String receivePhoneNumber, int orderCount);


}

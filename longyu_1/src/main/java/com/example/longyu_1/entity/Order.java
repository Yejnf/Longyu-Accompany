package com.example.longyu_1.entity;


import com.baomidou.mybatisplus.annotation.TableName;

@TableName("orders")
public class Order {

    private String phoneNumber;

    private String orderNumber;

    private String status;

    private String orderTime;

    private String name;
    private String idCard;
    private String department;
    private String selectedDate;
    private String selectedTime;
    private String city;
    private String selectedHospitalName;
    private String agreeChecked;
    private String requirement;
    private String price;

    private int receiveStatus;
    private String receiveOrderTime;
    private String receiveNickName;

    private String nickName;
    private String avatarUrl;

    private String randomString;

    private int deleteStatus;
    private String certificate;
    public Order() {
    }

    public Order(String orderNumber, String status, String phoneNumber, String name, String idCard, String department, String selectedDate, String selectedTime, String city, String selectedHospitalName, String agreeChecked, String requirement, String orderTime, String price, int receiveStatus, String receiveOrderTime, String nickName, String receiveNickName, String avatarUrl, String randomString, int deleteStatus, String certificate) {
        this.phoneNumber = phoneNumber;
        this.orderNumber = orderNumber;
        this.status = status;
        this.orderTime = orderTime;
        this.name = name;
        this.idCard = idCard;
        this.department = department;
        this.selectedDate = selectedDate;
        this.selectedTime = selectedTime;
        this.city = city;
        this.selectedHospitalName = selectedHospitalName;
        this.agreeChecked = agreeChecked;
        this.requirement = requirement;
        this.price = price;

        this.receiveStatus = receiveStatus;
        this.receiveOrderTime = receiveOrderTime;
        this.receiveNickName = receiveNickName;

        this.nickName = nickName;
        this.avatarUrl = avatarUrl;

        this.randomString = randomString;

        this.deleteStatus = deleteStatus;
        this.certificate = certificate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSelectedDate() {
        return selectedDate;
    }

    public void setSelectedDate(String selectedDate) {
        this.selectedDate = selectedDate;
    }

    public String getSelectedTime() {
        return selectedTime;
    }

    public void setSelectedTime(String selectedTime) {
        this.selectedTime = selectedTime;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSelectedHospitalName() {
        return selectedHospitalName;
    }

    public void setSelectedHospitalName(String selectedHospitalName) {
        this.selectedHospitalName = selectedHospitalName;
    }

    public String getAgreeChecked() {
        return agreeChecked;
    }

    public void setAgreeChecked(String agreeChecked) {
        this.agreeChecked = agreeChecked;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public int getReceiveStatus() {
        return receiveStatus;
    }

    public void setReceiveStatus(int receiveStatus) {
        this.receiveStatus = receiveStatus;
    }

    public String getReceiveOrderTime() {
        return receiveOrderTime;
    }

    public void setReceiveOrderTime(String receiveOrderTime) {
        this.receiveOrderTime = receiveOrderTime;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getReceiveNickName() {
        return receiveNickName;
    }

    public void setReceiveNickName(String receiveNickName) {
        this.receiveNickName = receiveNickName;
    }


    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getRandomString() {
        return randomString;
    }

    public void setRandomString(String randomString) {
        this.randomString = randomString;
    }


    public int getDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(int deleteStatus) {
        this.deleteStatus = deleteStatus;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    @Override
    public String toString() {
        return "Order{" +
                "phoneNumber='" + phoneNumber + '\'' +
                ", orderNumber='" + orderNumber + '\'' +
                ", status='" + status + '\'' +
                ", orderTime='" + orderTime + '\'' +
                ", name='" + name + '\'' +
                ", idCard='" + idCard + '\'' +
                ", department='" + department + '\'' +
                ", selectedDate='" + selectedDate + '\'' +
                ", selectedTime='" + selectedTime + '\'' +
                ", city='" + city + '\'' +
                ", selectedHospitalName='" + selectedHospitalName + '\'' +
                ", agreeChecked='" + agreeChecked + '\'' +
                ", requirement='" + requirement + '\'' +
                ", price='" + price + '\'' +
                ", receiveStatus=" + receiveStatus +
                ", receiveOrderTime='" + receiveOrderTime + '\'' +
                ", receiveNickName='" + receiveNickName + '\'' +
                ", nickName='" + nickName + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", randomString='" + randomString + '\'' +
                ", deleteStatus=" + deleteStatus +
                ", certificate='" + certificate + '\'' +
                '}';
    }
}


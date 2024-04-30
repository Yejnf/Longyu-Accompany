package com.example.longyu_1.entity;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("receiver")
public class Receiver {

    private String receiveName;

    private String receiveIdCard;

    private String receivePhoneNumber;

    private int orderCount;

    private String certificate;

    public Receiver(String receiveName, String receiveIdCard, String receivePhoneNumber, int orderCount, String certificate) {
        this.receiveName = receiveName;
        this.receiveIdCard = receiveIdCard;
        this.receivePhoneNumber = receivePhoneNumber;
        this.orderCount = orderCount;
        this.certificate = certificate;
    }

    public Receiver() {
    }

    public String getReceiveName() {
        return receiveName;
    }

    public void setReceiveName(String receiveName) {
        this.receiveName = receiveName;
    }

    public String getReceiveIdCard() {
        return receiveIdCard;
    }

    public void setReceiveIdCard(String receiveIdCard) {
        this.receiveIdCard = receiveIdCard;
    }

    public String getReceivePhoneNumber() {
        return receivePhoneNumber;
    }

    public void setReceivePhoneNumber(String receivePhoneNumber) {
        this.receivePhoneNumber = receivePhoneNumber;
    }

    public int getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(int orderCount) {
        this.orderCount = orderCount;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    @Override
    public String toString() {
        return "Receiver{" +
                "receiveName='" + receiveName + '\'' +
                ", receiveIdCard='" + receiveIdCard + '\'' +
                ", receivePhoneNumber='" + receivePhoneNumber + '\'' +
                ", orderCount=" + orderCount +
                ", certificate='" + certificate + '\'' +
                '}';
    }
}

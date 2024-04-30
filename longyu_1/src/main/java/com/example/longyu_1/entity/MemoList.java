package com.example.longyu_1.entity;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("memoList")
public class MemoList {

    private String orderNumber;

    private String textarea;

    private String imageList;

    public MemoList() {
    }

    public MemoList(String orderNumber, String textarea, String imageList) {

        this.orderNumber = orderNumber;
        this.textarea = textarea;
        this.imageList = imageList;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getTextarea() {
        return textarea;
    }

    public void setTextarea(String textarea) {
        this.textarea = textarea;
    }

    public String getImageList() {
        return imageList;
    }

    public void setImageList(String imageList) {
        this.imageList = imageList;
    }
}

package com.young.model;

import com.young.entity.ArticleEntity;
import com.young.entity.CommentEntity;

import java.util.ArrayList;
import java.util.List;

public class Article {
    private ArticleEntity main;
    private String userName;
    private String userHeadUrl;
    private List<String> ups;
    private List<CommentEntity> comments = new ArrayList<>();


    public ArticleEntity getMain() {
        return main;
    }

    public void setMain(ArticleEntity main) {
        this.main = main;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserHeadUrl() {
        return userHeadUrl;
    }

    public void setUserHeadUrl(String userHeadUrl) {
        this.userHeadUrl = userHeadUrl;
    }

    public List<String> getUps() {
        return ups;
    }

    public void setUps(List<String> ups) {
        this.ups = ups;
    }

    public List<CommentEntity> getComments() {
        return comments;
    }

    public void setComments(List<CommentEntity> comments) {
        this.comments = comments;
    }
}

package com.young.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "article", schema = "wuya", catalog = "")
public class ArticleEntity {
    private int id;
    private String picUrl;
    private String text;
    private String upList;
    private String downList;
    private Timestamp createTime;
    private Integer uId;
    private String title;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "pic_url")
    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    @Basic
    @Column(name = "text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Basic
    @Column(name = "up_list")
    public String getUpList() {
        return upList;
    }

    public void setUpList(String upList) {
        this.upList = upList;
    }

    @Basic
    @Column(name = "down_list")
    public String getDownList() {
        return downList;
    }

    public void setDownList(String downList) {
        this.downList = downList;
    }

    @Basic
    @Column(name = "create_time")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "u_id")
    public Integer getuId() {
        return uId;
    }

    public void setuId(Integer uId) {
        this.uId = uId;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArticleEntity that = (ArticleEntity) o;
        return id == that.id &&
                Objects.equals(picUrl, that.picUrl) &&
                Objects.equals(text, that.text) &&
                Objects.equals(upList, that.upList) &&
                Objects.equals(downList, that.downList) &&
                Objects.equals(createTime, that.createTime) &&
                Objects.equals(uId, that.uId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, picUrl, text, upList, downList, createTime, uId);
    }
}

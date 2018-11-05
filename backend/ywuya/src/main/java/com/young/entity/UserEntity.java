package com.young.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "wuya", catalog = "")
public class UserEntity {
    private int id;
    private String name;
    private String metaData;
    private String linkId;
    private Integer type;
    private Integer score;
    private Integer share;
    private String job;

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
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "metaData")
    public String getMetaData() {
        return metaData;
    }

    public void setMetaData(String metaData) {
        this.metaData = metaData;
    }

    @Basic
    @Column(name = "link_id")
    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "score")
    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    @Basic
    @Column(name = "share")
    public Integer getShare() {
        return share;
    }

    public void setShare(Integer share) {
        this.share = share;
    }

    @Basic
    @Column(name = "job")
    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(metaData, that.metaData) &&
                Objects.equals(linkId, that.linkId) &&
                Objects.equals(type, that.type) &&
                Objects.equals(score, that.score) &&
                Objects.equals(share, that.share);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, metaData, linkId, type, score, share);
    }
}

package com.young.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.young.entity.UserEntity;

import java.util.HashMap;
import java.util.Map;

public class User {
    private static ObjectMapper mapper = new ObjectMapper();
    private int id;
    private String name;
    private Map<String , Object> metaData = new HashMap<>();
    private String linkId;
    private Integer type;
    private Integer score;
    private Integer share;

    public static UserEntity toEntity (User user) throws Exception {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(user.getName());
        userEntity.setLinkId(user.getLinkId());
        userEntity.setId(user.getId());
        userEntity.setMetaData(mapper.writeValueAsString(user.getMetaData()));
        userEntity.setScore(user.getScore());
        userEntity.setShare(user.getShare());
        userEntity.setType(user.getType());
        return userEntity;
    }
    public static User toModel (UserEntity entity) throws Exception {
        User user = new User();
        user.setId(entity.getId());
        user.setLinkId(entity.getLinkId());
        user.setMetaData(mapper.readValue(entity.getMetaData(), Map.class));
        user.setName(entity.getName());
        user.setScore(entity.getScore());
        user.setShare(entity.getShare());
        user.setType(entity.getType());
        return user;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Object> getMetaData() {
        return metaData;
    }

    public void setMetaData(Map<String, Object> metaData) {
        this.metaData = metaData;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getShare() {
        return share;
    }

    public void setShare(Integer share) {
        this.share = share;
    }
}

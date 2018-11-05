package com.young.daos;

import com.young.entity.UserEntity;

public interface UserDao {
    UserEntity getUserByLinkId(String linkId);
    UserEntity getUserById(int id);
    void save(UserEntity userEntity);
    void update(UserEntity userEntity);
}

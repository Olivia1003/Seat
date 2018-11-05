package com.young.daos.impl;

import com.young.daos.UserDao;
import com.young.entity.UserEntity;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository(value = "userDao")
public class UserDaoImpl extends BaseDAOImpl implements UserDao{

    @Override
    public UserEntity getUserByLinkId(String linkId) {
        ArrayList<UserEntity> userResults = (ArrayList<UserEntity>)super.findByProperty("linkId",linkId,UserEntity.class);
        if (CollectionUtils.isEmpty(userResults))
            return null;
        else
            return userResults.get(0);

    }

    @Override
    public UserEntity getUserById(int id) {
        return super.findById(id,UserEntity.class);
    }

    @Override
    public void save(UserEntity userEntity) {
        super.save(userEntity);
    }

    @Override
    public void update(UserEntity userEntity) {
        super.update(userEntity);
    }
}


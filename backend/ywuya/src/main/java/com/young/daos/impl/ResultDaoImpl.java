package com.young.daos.impl;

import com.young.daos.ResultDao;
import com.young.entity.ResultEntity;
import com.young.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("resultDao")
public class ResultDaoImpl extends BaseDAOImpl implements ResultDao{
    @Override
    public List<ResultEntity> getResultByUId(int uId) {
        return findByProperty("uId",uId, ResultEntity.class);
    }
}

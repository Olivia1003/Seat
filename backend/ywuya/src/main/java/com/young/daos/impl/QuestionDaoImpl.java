package com.young.daos.impl;

import com.young.daos.QuestionDao;
import com.young.entity.QuestionEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("questionDao")
public class QuestionDaoImpl extends BaseDAOImpl implements QuestionDao{
    @Override
    public List<QuestionEntity> list() {
        return findAll(QuestionEntity.class);
    }
}

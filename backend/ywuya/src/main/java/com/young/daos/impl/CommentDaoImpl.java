package com.young.daos.impl;

import com.young.daos.CommentDao;
import com.young.entity.CommentEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("commentDao")
public class CommentDaoImpl extends BaseDAOImpl implements CommentDao{
    @Override
    public List<CommentEntity> list() {
        return findAll(CommentEntity.class);
    }

    @Override
    public List<CommentEntity> getByArticleId(String id) {
        return findByProperty("aId",Integer.parseInt(id), CommentEntity.class);
    }


}

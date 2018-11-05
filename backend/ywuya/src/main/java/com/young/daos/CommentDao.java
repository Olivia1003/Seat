package com.young.daos;

import com.young.entity.CommentEntity;

import java.util.List;

public interface CommentDao {
    List<CommentEntity> list();
    List<CommentEntity> getByArticleId(String id);
}

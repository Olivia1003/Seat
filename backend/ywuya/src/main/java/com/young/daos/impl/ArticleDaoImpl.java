package com.young.daos.impl;

import com.young.daos.ArticleDao;
import com.young.entity.ArticleEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "articleDao")
public class ArticleDaoImpl extends BaseDAOImpl implements ArticleDao  {
    @Override
    public List<ArticleEntity> list(int currentTab,int uId) {
        if (currentTab == 0){
            return findAll(ArticleEntity.class);
        }else{
            return findByProperty("uId",uId,ArticleEntity.class);
        }

    }
}

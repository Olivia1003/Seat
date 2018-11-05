package com.young.daos;

import com.young.entity.ArticleEntity;

import java.util.List;

public interface ArticleDao {
    List<ArticleEntity> list(int currentTab,int uId);
}

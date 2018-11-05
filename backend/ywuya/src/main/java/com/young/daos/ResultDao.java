package com.young.daos;

import com.young.entity.ResultEntity;

import java.util.List;

public interface ResultDao {
    List<ResultEntity> getResultByUId(int uId);
}

package com.young.daos.impl;

import com.young.daos.MissionDao;
import com.young.entity.MissionEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "missionDao")
public class MissionDaoImpl extends BaseDAOImpl implements MissionDao {

    @Override
    public List<MissionEntity> getMissionByUId(String uId) {
        return findByProperty("uId",Integer.parseInt(uId),MissionEntity.class);
    }

    @Override
    public void addMissionByUId( MissionEntity missionEntity) {
        save(missionEntity);
    }

    @Override
    public void delMission(String mId) {
        delete(findById(Integer.parseInt(mId),MissionEntity.class));
    }

    @Override
    public void successMission(String mId) {
        MissionEntity missionEntity = findById(Integer.parseInt(mId),MissionEntity.class);
        missionEntity.setStatus("已打卡");
        update(missionEntity);
    }
}

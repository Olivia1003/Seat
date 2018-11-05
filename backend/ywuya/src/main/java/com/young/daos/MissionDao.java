package com.young.daos;

import com.young.entity.MissionEntity;

import java.util.List;

public interface MissionDao {
    List<MissionEntity> getMissionByUId(String uId);
    void addMissionByUId(MissionEntity missionEntity);
    void delMission(String mId);
    void successMission(String mId);
}

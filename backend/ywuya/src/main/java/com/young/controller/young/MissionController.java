package com.young.controller.young;

import com.young.daos.impl.MissionDaoImpl;
import com.young.daos.impl.UserDaoImpl;
import com.young.entity.MissionEntity;
import com.young.entity.UserEntity;
import com.young.json.BaseJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/mission")
public class MissionController {

    @Autowired
    @Qualifier("userDao")
    private UserDaoImpl userDao;

    @Autowired
    @Qualifier("missionDao")
    private MissionDaoImpl missionDao;

    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public BaseJson list(
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        List missions = missionDao.getMissionByUId(user.getId()+"");
        queryJson.setObj(missions);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public BaseJson add(
            @RequestParam(value = "code") String code,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "startTime") String startTime,
            @RequestParam(value = "endTime") String endTime
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        MissionEntity missionEntity = new MissionEntity();
        missionEntity.setuId(user.getId());
        missionEntity.setStatus("未打卡");
        missionEntity.setName(name);
        missionEntity.setDescription(description);
        missionEntity.setStartTime(startTime);
        missionEntity.setEndTime(endTime);
        missionDao.addMissionByUId(missionEntity);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/del", method = RequestMethod.GET)
    public BaseJson del(
            @RequestParam(value = "mId") String mId
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        missionDao.delMission(mId);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/suc", method = RequestMethod.GET)
    public BaseJson suc(
            @RequestParam(value = "mId") String mId
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        missionDao.successMission(mId);
        return queryJson;
    }


}

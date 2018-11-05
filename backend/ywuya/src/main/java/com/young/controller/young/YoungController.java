package com.young.controller.young;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.framework.util.HttpUtil;
import com.young.controller.base.BaseController;
import com.young.daos.impl.UserDaoImpl;
import com.young.entity.UserEntity;
import com.young.json.BaseJson;
import com.young.model.Share;
import com.young.model.User;
import com.young.model.WxAuthRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by young on 2017/9/7.
 */
@Controller
@RequestMapping(value = "/user")
public class YoungController extends BaseController {

    private final static String appId= "wxf5a51ffeb1f8aac9";

    private final static String appSecret= "7a1f334dea58fa2233ca5bc4769dfa20";

    private ObjectMapper mapper = new ObjectMapper();

    private BaseJson queryJson ;

    @Autowired
    @Qualifier("userDao")
    private UserDaoImpl userDao;

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public BaseJson get_team_list(
            @RequestParam(value = "code") String code
    ) throws Exception {
        queryJson = new BaseJson();
        String s = "https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code";
        WxAuthRes response = mapper.readValue(HttpUtil.sendGet(new URI(s)),WxAuthRes.class);

        if (response != null && response.getOpenid() != null ){
            queryJson.setErrno("0001");
            queryJson.setObj(response.getOpenid());
            UserEntity user = userDao.getUserByLinkId(response.getOpenid());
            if (user == null){
                UserEntity userEntity = new UserEntity();
                userEntity.setLinkId(response.getOpenid());
                userEntity.setName("a secret man");
                userEntity.setMetaData("{\"comm\":{\"realName\":\"secret\",\"name\":\"secret\",\"birthday\":\"2018-08-12\",\"sex\":\"男\",\"phone\":\"xxxxx\",\"email\":\"xxxx@xx.com\"},\"grade\":\"本科2017级\",\"degree\":\"教育管理\",\"school\":\"华东师范大学\",\"ruxuedate\":\"2016-09-01\",\"u_grade\":\"3\",\"u_degree\":\"5\",\"u_school\":\"0\",\"college\":\"教育学部\",\"u_college\":\"0\",\"resume\":\"3213123123131231231\"}");
                userDao.save(userEntity);
            }
        }else{
            queryJson.setErrno("0002");
            queryJson.setObj(response.getErrcode()+" : "+response.getErrmsg());
        }
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    public BaseJson get(
            @PathVariable(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity userEntity = userDao.getUserByLinkId(code);
        queryJson.setObj(User.toModel(userEntity));
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/{code}", method = RequestMethod.PUT)
    public BaseJson update(
            @PathVariable(value = "code") String code,
            @RequestBody User user
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        userDao.update(User.toEntity(user));
        queryJson.setObj(User.toModel(userDao.getUserByLinkId(code)));
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/job", method = RequestMethod.GET)
    public BaseJson update(
            @RequestParam(value = "code") String code,
            @RequestParam(value = "job") String job,
            @RequestParam(value = "index") int index
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity userEntity = userDao.getUserByLinkId(code);
        userEntity.setJob(job);
        userEntity.setShare(index);
        userDao.update(userEntity);
        queryJson.setObj(User.toModel(userDao.getUserByLinkId(code)));
        return queryJson;
    }


    @ResponseBody
    @RequestMapping(value = "/share", method = RequestMethod.GET)
    public BaseJson update(
            @RequestParam(value = "s") String s
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        List<UserEntity> users = userDao.findByProperty("job",s,UserEntity.class);
        List<Share>shares = users.stream().map(userEntity -> {
            Share share = new Share();
            share.setName(userEntity.getName());
            try {
                Map<String,String>map = mapper.readValue(userEntity.getMetaData(), Map.class);
                share.setText(map.get("resume"));
            } catch (IOException e) {
                e.printStackTrace();
            }

            return share;
        }).collect(Collectors.toList());
        queryJson.setObj(shares);
        return queryJson;
    }


}

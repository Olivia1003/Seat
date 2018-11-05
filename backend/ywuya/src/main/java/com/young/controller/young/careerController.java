package com.young.controller.young;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.young.daos.impl.CareerappDaoImpl;
import com.young.daos.impl.MissionDaoImpl;
import com.young.daos.impl.UserDaoImpl;
import com.young.entity.CareerappEntity;
import com.young.entity.UserEntity;
import com.young.json.BaseJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/career")
public class careerController {

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    @Qualifier("userDao")
    private UserDaoImpl userDao;

    @Autowired
    @Qualifier("careerDao")
    private CareerappDaoImpl careerDao;

    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public BaseJson get(
            @PathVariable(value = "id")String id,
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        CareerappEntity careerappEntity = careerDao.findById(id,CareerappEntity.class);
        queryJson.setObj(careerappEntity);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public BaseJson list(
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        List<CareerappEntity> careerappEntities = careerDao.findAll(CareerappEntity.class);
        queryJson.setObj(careerappEntities);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/list/simple", method = RequestMethod.GET)
    public BaseJson listSimple(
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        List<CareerappEntity> careerappEntities = careerDao.findAll(CareerappEntity.class);
        List<String> result = careerappEntities.stream()
                .map(careerappEntity -> careerappEntity.getOccupationName())
                .collect(Collectors.toList());
        queryJson.setObj(result);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public BaseJson search(
            @RequestParam(value = "sequence") String sequence
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        sequence = "%" + sequence +"%" ;
        String sql = "select * from careerapp where careerNum like ? or occupationName like ? ";
        List careerappEntities = (List<CareerappEntity>)careerDao.findBySQL(sql,new Object[]{sequence,sequence});
        queryJson.setObj(careerappEntities);
        return queryJson;
    }
}

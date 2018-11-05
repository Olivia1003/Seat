package com.young.controller.young;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.young.controller.base.BaseController;
import com.young.daos.impl.QuestionDaoImpl;
import com.young.daos.impl.ResultDaoImpl;
import com.young.daos.impl.UserDaoImpl;
import com.young.entity.ResultEntity;
import com.young.entity.UserEntity;
import com.young.json.BaseJson;
import com.young.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/question")
public class QuestionController extends BaseController {

    @Autowired
    @Qualifier("questionDao")
    private QuestionDaoImpl questionDao;

    @Autowired
    @Qualifier("userDao")
    private UserDaoImpl userDao;

    @Autowired
    @Qualifier("resultDao")
    private ResultDaoImpl resultDao;

    private ObjectMapper mapper = new ObjectMapper();

    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public BaseJson list(
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        queryJson.setObj(questionDao.list());
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/result/mbti", method = RequestMethod.GET)
    public BaseJson mbti(
            @RequestParam(value = "answer") String answer,
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        String result = Mbti.go(answer);
        ResultEntity resultEntity = new ResultEntity();
        resultEntity.setResult(result);
        resultEntity.setType(1);
        resultEntity.setuId(user.getId());
        resultDao.save(resultEntity);
        queryJson.setObj(resultEntity);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/result/hld", method = RequestMethod.GET)
    public BaseJson hld(
            @RequestParam(value = "answer") String answer,
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        String result = HLD.go(answer);
        ResultEntity resultEntity = new ResultEntity();
        resultEntity.setResult(result);
        resultEntity.setType(2);
        resultEntity.setuId(user.getId());
        resultDao.save(resultEntity);
        queryJson.setObj(resultEntity);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/result/{resultId}", method = RequestMethod.DELETE)
    public BaseJson result_get(
            @PathVariable(value = "resultId")String resultId,
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        ResultEntity result = resultDao.findById(resultId,ResultEntity.class);

        if (result != null && result.getuId() == user.getId()){
            resultDao.delete(result);
            queryJson.setErrno("0001");
        }

        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/result/list", method = RequestMethod.GET)
    public BaseJson result(
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        List<ResultEntity> resultEntityList = resultDao.getResultByUId(user.getId());

        ArrayList<Result>list = new ArrayList();
        for (ResultEntity r:resultEntityList
             ) {
            String text = "";
            if (r.getType() == 1){
                text += "MBTI : ";
            }else{
                text += "霍兰德 : ";
            }
            text += r.getResult();
            Result result = new Result();
            result.setText(text);
            result.setResult(r.getResult());
            list.add(result);
        }
        queryJson.setObj(list);
        return queryJson;
    }

}

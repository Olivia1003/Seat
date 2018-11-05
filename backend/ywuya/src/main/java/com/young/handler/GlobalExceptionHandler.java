package com.young.handler;

import com.framework.exceptions.NotLoginException;
import com.young.json.BaseJson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.TypeMismatchException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by deru on 2017/1/22.
 */

@ControllerAdvice
public class GlobalExceptionHandler {

    private BaseJson queryJson = new BaseJson();

    private Logger log = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(NotLoginException.class)
    public String NotLoginExceptionHandler(){
        return "redirect:/young/formlogin";
    }

    @ExceptionHandler({NumberFormatException.class,MissingServletRequestParameterException.class, TypeMismatchException.class})
    @ResponseBody
    public BaseJson ParameterExceptionHandler(Exception e){
        queryJson = new BaseJson();
        queryJson.setErrno("1009");
        queryJson.setErrmsg("请求参数错误或缺少必须参数！");
        log.error(e.getMessage());
        e.printStackTrace();
        return queryJson;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public BaseJson ExceptionHandler(Exception e){
        queryJson = new BaseJson();
        queryJson.setErrno("1001");
        queryJson.setErrmsg("服务器出现异常！");
        log.error(e.getMessage());
        e.printStackTrace();
        return queryJson;
    }
}

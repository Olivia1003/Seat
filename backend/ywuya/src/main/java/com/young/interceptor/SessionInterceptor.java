package com.young.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by deru on 2017/1/23.
 */
public class SessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
       /* if (!HttpUtil.isAjaxRequest(httpServletRequest) && !httpServletRequest.getRequestURI().contains("web") && !httpServletRequest.getRequestURI().contains("index.js.map")) {
            if (!httpServletRequest.getRequestURI().contains("login") && !httpServletRequest.getRequestURI().contains("redirect")) {
                System.out.println(httpServletRequest.getRequestURI());
                httpServletRequest.getSession().setAttribute("preUrl", httpServletRequest.getRequestURI());
            }
        }*/
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }


}

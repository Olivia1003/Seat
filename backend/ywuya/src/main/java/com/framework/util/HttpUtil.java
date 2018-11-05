package com.framework.util;


import java.net.URI;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServletRequest;

public class HttpUtil {

    private static CloseableHttpClient httpclient;
    static {
        httpclient = HttpClients.createDefault();
    }

    /**
     * httpClient的get请求方式
     *
     * @param uri
     * @return
     * @throws Exception
     */
    public static String sendGet(URI uri) throws Exception {

        HttpGet httpGet = new HttpGet(uri);
        HttpResponse response = httpclient.execute(httpGet);
        String jsonStr = EntityUtils.toString(response.getEntity(), "UTF-8");
        httpGet.abort();
        System.out.println(jsonStr);
        return jsonStr;
    }

    public static String sendPost(String url,String xml) throws Exception {
        HttpPost httpPost = new HttpPost(url); // 设置响应头信息
        httpPost.addHeader("Connection", "keep-alive");
        httpPost.addHeader("Accept", "*/*");

        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpPost.addHeader("Host", "api.mch.weixin.qq.com");
        httpPost.addHeader("X-Requested-With", "XMLHttpRequest");
        httpPost.addHeader("Cache-Control", "max-age=0");
        httpPost.addHeader("UserVo-Agent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) ");
        httpPost.setEntity(new StringEntity(xml, "UTF-8"));
        HttpResponse response = httpclient.execute(httpPost);
        String jsonStr = EntityUtils.toString(response.getEntity(), "UTF-8");
        return jsonStr;
    }

    public static boolean isAjaxRequest(HttpServletRequest request) {
        String header = request.getHeader("X-Requested-With");
        if (header != null && "XMLHttpRequest".equals(header))
            return true;
        else
            return false;
    }

}
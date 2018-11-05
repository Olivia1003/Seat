package com.framework.util;

import java.util.Random;

/**
 * Created by young on 2017/9/12.
 */
public class MessageUtil {

    /**
     *
     * @param phone_num 不验证格式了 前端验证手机号的合法性
     * @return 返回6位数字的验证码   发送失败则返回null
     */
    public static String sendMessage(String phone_num) {
        String verify_code=getRandNum(6);
        System.out.println(verify_code);
        return verify_code;
    }
    public static String get_new_pw(){
        return getRandNum(8);
    }
    public static int sendMessageForgetPW(String phone_num,String new_pw) {
        String pw=new_pw;
        System.out.println("已经重置密码  新密码是:"+pw+"请使用新密码登录并计时修改密码");
        return 1;
    }

    private static String getRandNum(int charCount) {
        String charValue = "";
        for (int i = 0; i < charCount; i++) {
            char c = (char) (randomInt(0, 10) + '0');
            charValue += String.valueOf(c);
        }
        return charValue;
    }

    private static int randomInt(int from, int to) {
        Random r = new Random();
        return from + r.nextInt(to - from);
    }

}
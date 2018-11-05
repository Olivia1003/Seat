package com.framework.util;

import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.model.PutObjectResult;
import com.qcloud.cos.region.Region;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.UUID;

/**
 * Created by deru on 2017/1/26.
 */
public class FileUtil {

    // 1 初始化用户身份信息(secretId, secretKey)
    private static COSCredentials cred = new BasicCOSCredentials("AKIDtgalrmMBev46wefTbVK1ZvdJsJZhIdKo", "S2ax99yd6NSOAmDSUKyQfigS4Ys0ylkZ");
    // 2 设置bucket的区域, COS地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
    private static ClientConfig clientConfig = new ClientConfig(new Region("ap-shanghai"));
    // 3 生成cos客户端
    private static COSClient cosclient = new COSClient(cred, clientConfig);
    // bucket的命名规则为{name}-{appid} ，此处填写的存储桶名称必须为此格式
    private static String bucketName = "xue-1253296836";


    public static String up_file(HttpServletRequest request,MultipartFile file,String path){
        String fileName=generateFileName(file.getOriginalFilename());
        try {
            String realPath = request.getSession().getServletContext().getRealPath(path);

            File new_file=new File(realPath,fileName);
            if (new_file==null){
                new_file.mkdirs();
            }
            //通过CommonsMultipartFile的方法直接写文件（注意这个时候）
            file.transferTo(new_file);

            // 指定要上传到 COS 上的路径
            String key = "/"+fileName;
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, new_file);
            PutObjectResult putObjectResult = cosclient.putObject(putObjectRequest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "https://xue-1253296836.cos.ap-shanghai.myqcloud.com/"+fileName;
    }

    static public String fileUpload(HttpServletRequest request,String path) throws IOException {
        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        String realPath = request.getSession().getServletContext().getRealPath(path);
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
                request.getSession().getServletContext());
        //检查form中是否有enctype="multipart/form-data"
        if(multipartResolver.isMultipart(request))
        {
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
            //获取multiRequest 中所有的文件名
            Iterator iter=multiRequest.getFileNames();
            while(iter.hasNext())
            {
                //一次遍历所有文件
                MultipartFile file=multiRequest.getFile(iter.next().toString());
                if(file!=null)
                {
                    String fileName=generateFileName(file.getOriginalFilename());
                    File new_file=new File(realPath,fileName);
                    //上传
                    file.transferTo(new_file);
                    return path + "/" +fileName;
                }
            }
        }
        return "";
    }

    static public String saveFile(HttpServletRequest request,MultipartFile  file,String path) throws IOException {
        String realPath = request.getSession().getServletContext().getRealPath(path);
        String fileName=generateFileName(file.getOriginalFilename());
        File new_file=new File(realPath,fileName);
        if (new_file==null){
            new_file.mkdirs();
        }
        //通过CommonsMultipartFile的方法直接写文件（注意这个时候）
        file.transferTo(new_file);
        return path + "/" +fileName;
    }
    /**
     * new文件名= 时间 + 全球唯一编号
     * @param fileName old文件名
     * @return new文件名
     */
    static public String generateFileName(String fileName) {
        //时间
        DateFormat df = new SimpleDateFormat("yy_MM_dd_HH_mm_ss");
        String formatDate = df.format(new Date());
        //全球唯一编号
        String uuid= UUID.randomUUID().toString();
        int position = fileName.lastIndexOf(".");
        String extension = fileName.substring(position);
        return formatDate + uuid + extension;
    }
}

package com.young.controller.young;

import com.young.controller.base.BaseController;
import com.young.daos.impl.ArticleDaoImpl;
import com.young.daos.impl.CommentDaoImpl;
import com.young.daos.impl.UserDaoImpl;
import com.young.entity.ArticleEntity;
import com.young.entity.CommentEntity;
import com.young.entity.UserEntity;
import com.young.json.BaseJson;
import com.young.model.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/article")
public class ArticleController extends BaseController {

    @Autowired
    @Qualifier("articleDao")
    private ArticleDaoImpl articleDao;

    @Autowired
    @Qualifier("userDao")
    private UserDaoImpl userDao;

    @Autowired
    @Qualifier("commentDao")
    private CommentDaoImpl commentDao;

    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public BaseJson list(
            @RequestParam(value = "code") String code,
            @RequestParam(value = "currentTab") int currentTab
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity u = userDao.getUserByLinkId(code);
        List<Article>articles = articleDao.list(currentTab,u.getId()).stream().map(articleEntity -> {
                Article a = new Article();
                a.setMain(articleEntity);
                UserEntity user = userDao.getUserById(articleEntity.getuId());
                a.setUserName(user.getName());
                a.setUps(Arrays.asList(articleEntity.getUpList().split("_")));
                a.setComments(commentDao.getByArticleId(articleEntity.getId()+""));
                return a;
        }).collect(Collectors.toList());

        List results = new ArrayList();
        for (int i = articles.size()-1; i >=0 ; i--) {
            results.add(articles.get(i));
        }
        queryJson.setObj(results);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/comment", method = RequestMethod.GET)
    public BaseJson comment(
            @RequestParam(value = "text") String text,
            @RequestParam(value = "articleId") String articleId,
            @RequestParam(value = "code") String code
    ) throws Exception {
        UserEntity user = userDao.getUserByLinkId(code);
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setaId(Integer.parseInt(articleId));
        commentEntity.setCreateTime(new Timestamp(new Date().getTime()));
        commentEntity.setText(text);
        commentEntity.setuId(user.getId());
        commentEntity.setuName(user.getName());
        commentDao.save(commentEntity);
        BaseJson queryJson = new BaseJson();
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public BaseJson add(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "content") String content,
            @RequestParam(value = "img") String img,
            @RequestParam(value = "code") String code
    ) throws Exception {
        UserEntity user = userDao.getUserByLinkId(code);
        img = img.replace("\"","");
        BaseJson queryJson = new BaseJson();
        ArticleEntity articleEntity = new ArticleEntity();
        articleEntity.setUpList(2+"");
        articleEntity.setCreateTime(new Timestamp(new Date().getTime()));
        articleEntity.setPicUrl(img);
        articleEntity.setText(content);
        articleEntity.setuId(user.getId());
        articleEntity.setTitle(title);
        articleDao.save(articleEntity);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/comment/list", method = RequestMethod.GET)
    public BaseJson comment_list(
            @RequestParam(value = "aId") int aId
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        List comments = commentDao.findByProperty("aId",aId,CommentEntity.class);
        queryJson.setObj(comments);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/up", method = RequestMethod.GET)
    public BaseJson comment_list(
            @RequestParam(value = "aId") int aId,
            @RequestParam(value = "code") String code
    ) throws Exception {
        BaseJson queryJson = new BaseJson();
        UserEntity user = userDao.getUserByLinkId(code);
        ArticleEntity entity = articleDao.findById(aId,ArticleEntity.class);
        Boolean flag = false ;

        for (String s:entity.getUpList().split("_")
             ) {
            if (user.getId() == Integer.parseInt(s)){
                flag = true;
                break;
            }
        }
        if (flag){
            queryJson.setErrno("0002");
            return queryJson;
        }else{
            entity.setUpList(entity.getUpList()+"_"+user.getId());
            articleDao.save(entity);
        }
        return queryJson;
    }



}

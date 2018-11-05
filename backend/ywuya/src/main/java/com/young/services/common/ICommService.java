package com.young.services.common;



/**
 * 公共服务类 文件名稱：ICommService 描述：
 * 
 * @author Zhang Xiaofeng
 * @create 2012-4-11 汇环
 */
public interface ICommService {
	
	public <T> T getEntity(String id, Class<T> cls) throws Exception;
	
}

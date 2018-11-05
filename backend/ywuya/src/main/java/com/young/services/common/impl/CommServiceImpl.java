package com.young.services.common.impl;
import javax.annotation.Resource;

import com.young.daos.impl.BaseDAOImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


import com.young.daos.BaseDAO;
import com.young.services.common.ICommService;

@Service(value="commService")
public class CommServiceImpl   implements ICommService {

	protected Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	@Qualifier("BaseDAO")
	protected BaseDAOImpl baseDAO;

	@Override
	public <T> T getEntity(String id, Class<T> cls) throws Exception {
		// TODO Auto-generated method stub
		T t=baseDAO.findById(Long.parseLong(id), cls);
		return t;
	}
}

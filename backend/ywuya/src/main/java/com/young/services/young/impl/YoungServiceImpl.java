package com.young.services.young.impl;

import com.young.services.common.impl.CommServiceImpl;
import com.young.services.young.IYoungService;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * Created by young on 2017/9/7.
 */
@Service(value = "youngService")
public class YoungServiceImpl extends CommServiceImpl implements IYoungService {
    private Random random = new Random();
}

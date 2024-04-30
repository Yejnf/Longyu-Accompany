package com.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dao.MemolistDao;
import com.entity.Memolist;
import com.service.MemolistService;
import org.springframework.stereotype.Service;

/**
 * (Memolist)表服务实现类
 *
 * @author makejava
 * @since 2023-12-11 18:03:30
 */
@Service("memolistService")
public class MemolistServiceImpl extends ServiceImpl<MemolistDao, Memolist> implements MemolistService {

}


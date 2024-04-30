package com.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.api.ApiController;
import com.baomidou.mybatisplus.extension.api.R;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.entity.Memolist;
import com.service.MemolistService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

/**
 * (Memolist)表控制层
 *
 * @author makejava
 * @since 2023-12-11 18:03:30
 */
@RestController
@RequestMapping("memolist")
public class MemolistController extends ApiController {
    /**
     * 服务对象
     */
    @Resource
    private MemolistService memolistService;

    /**
     * 分页查询所有数据
     *
     * @param page     分页对象
     * @param memolist 查询实体
     * @return 所有数据
     */
    @GetMapping
    public R selectAll(Page<Memolist> page, Memolist memolist) {
        return success(this.memolistService.page(page, new QueryWrapper<>(memolist)));
    }

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("{id}")
    public R selectOne(@PathVariable Serializable id) {
        return success(this.memolistService.getById(id));
    }

    /**
     * 新增数据
     *
     * @param memolist 实体对象
     * @return 新增结果
     */
    @PostMapping
    public R insert(@RequestBody Memolist memolist) {
        return success(this.memolistService.save(memolist));
    }

    /**
     * 修改数据
     *
     * @param memolist 实体对象
     * @return 修改结果
     */
    @PutMapping
    public R update(@RequestBody Memolist memolist) {
        return success(this.memolistService.updateById(memolist));
    }

    /**
     * 删除数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping
    public R delete(@RequestParam("idList") List<Long> idList) {
        return success(this.memolistService.removeByIds(idList));
    }
}


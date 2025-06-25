package com.ruoyi.project.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ruoyi.project.system.service.IDataService;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private IDataService dataService;

    @GetMapping("/list")
    public List<String> list() {
        return dataService.list();
    }

    @GetMapping(value = "/stream", produces = "text/event-stream")
    @Scheduled(fixedRate = 1000)
    public SseEmitter streamData() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // 在后台线程中处理数据推送
        try {
            // 获取串口数据
            String data = "hahaha";
            if (data != null) {
                // 发送数据到前端
                emitter.send(SseEmitter.event().name("data").data(data));
            }

        } catch (Exception e) {
            emitter.completeWithError(e);
        }

        return emitter;
    }

}

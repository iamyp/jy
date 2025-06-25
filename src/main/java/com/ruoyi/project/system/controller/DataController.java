package com.ruoyi.project.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ruoyi.project.system.service.IDataService;
import com.ruoyi.project.system.service.SseClient;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private IDataService dataService;
    @Autowired
    private SseClient sseClient;

    @GetMapping("/list")
    public List<String> list() {
        return dataService.list();
    }

    // @CrossOrigin
    // @GetMapping(value = "/stream", produces = "text/event-stream;charset=UTF-8")
    // public SseEmitter streamData() {
    // // 创建SSE连接，使用固定的uid"123"，这样定时任务就能找到这个连接
    // return sseClient.createSse("123");
    // }

    @CrossOrigin
    @GetMapping(value = "/sse", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter createConnect(String uid) {
        return sseClient.createSse(uid);
    }

    @CrossOrigin
    @GetMapping(value = "/sendMessage", produces = "text/event-stream;charset=UTF-8")
    public boolean sendMessage(String uid, String messageId, String message) {
        return sseClient.sendMessage(uid, messageId, message);
    }

}

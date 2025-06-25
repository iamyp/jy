package com.ruoyi.project.system.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fazecast.jSerialComm.SerialPort;
import com.ruoyi.project.system.domain.DataPacket;
import com.ruoyi.project.system.service.IDataService;
import com.ruoyi.project.system.service.SseClient;

@Service
public class DataServiceImpl implements IDataService {

    private static final Logger logger = LoggerFactory.getLogger(DataServiceImpl.class);

    @Autowired
    private SseClient sseClient;

    @Override
    public List<String> list() {
        return Arrays.asList("1", "2", "3");
    }

    @Scheduled(fixedDelay = 1000)
    public void sendData() {
        try {
            logger.info("定时任务执行中...");

            // 生成模拟数据
            String simulatedData = String.format(
                    "{\"device\":\"sensor1\",\"id\":%d,\"temperature\":%.2f,\"humidity\":%.2f}",
                    System.currentTimeMillis() % 1000,
                    20 + Math.random() * 10,
                    40 + Math.random() * 20);

            boolean success = sseClient.sendMessage("123", String.valueOf(System.currentTimeMillis()), simulatedData);

            if (success) {
                logger.info("定时任务执行完成，数据发送成功: {}", simulatedData);
            } else {
                logger.warn("定时任务执行完成，但数据发送失败 - 可能没有活跃的SSE连接");
            }
        } catch (Exception e) {
            logger.error("定时任务执行失败: {}", e.getMessage(), e);
        }
    }

    private void getDeviceData() {

        // 1. 获取并选择串口
        SerialPort[] ports = SerialPort.getCommPorts();
        if (ports.length == 0) {
            System.out.println("未找到任何可用串口!");
            return;
        }

        System.out.println("请选择一个串口:");
        for (int i = 0; i < ports.length; i++) {
            System.out.printf("  [%d] %s - %s\n", i, ports[i].getSystemPortName(), ports[i].getDescriptivePortName());
        }

        // 这里为了演示，我们硬编码选择第一个串口
        // 在实际应用中，您应该让用户输入或从配置文件读取
        SerialPort chosenPort = ports[0];

        // 2. 配置并打开串口
        chosenPort.setBaudRate(115200);
        chosenPort.setNumDataBits(8);
        chosenPort.setParity(SerialPort.NO_PARITY);
        chosenPort.setNumStopBits(SerialPort.ONE_STOP_BIT);

        if (!chosenPort.openPort()) {
            System.err.println("打开串口 " + chosenPort.getSystemPortName() + " 失败!");
            return;
        }

        System.out.println("成功连接到串口 " + chosenPort.getSystemPortName() + "，等待接收数据...");

        // 3. 使用 BufferedReader 逐行读取串口数据
        // 这是处理以换行符分隔的数据流的最佳方式
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(chosenPort.getInputStream()))) {
            // 创建 Jackson 的 ObjectMapper 用于解析JSON
            ObjectMapper objectMapper = new ObjectMapper();

            String line;
            // reader.readLine() 是一个阻塞操作，它会一直等待直到读到一行完整的文本（以换行符结尾）
            while ((line = reader.readLine()) != null) {
                System.out.println("收到原始数据行: " + line);

                try {
                    // 4. 将读到的行解析为我们的 DataPacket 对象
                    DataPacket packet = objectMapper.readValue(line, DataPacket.class);
                    System.out.println("成功解析数据 -> " + packet);
                } catch (Exception e) {
                    System.err.println("JSON 解析失败: " + e.getMessage() + ", 原始数据: " + line);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            chosenPort.closePort();
            System.out.println("串口已关闭。");
        }
    }
}
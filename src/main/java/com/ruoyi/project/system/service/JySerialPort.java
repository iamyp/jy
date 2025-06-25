package com.ruoyi.project.system.service;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fazecast.jSerialComm.SerialPort;

@Component
public class JySerialPort {
    private Logger log = LoggerFactory.getLogger(JySerialPort.class);
    private volatile SerialPort serialPort;
    private final Object lock = new Object();
    private volatile boolean isInitialized = false;

    @PostConstruct
    public void init() {
        try {
            serialPort = SerialPort.getCommPort("/tmp/vportB");
            serialPort.setBaudRate(9600);
            serialPort.setNumDataBits(8);
            serialPort.setParity(SerialPort.NO_PARITY);
            serialPort.setNumStopBits(SerialPort.ONE_STOP_BIT);
            
            if (serialPort.openPort()) {
                isInitialized = true;
                log.info("串口初始化成功: " + serialPort.getSystemPortName());
            } else {
                log.error("串口打开失败: " + serialPort.getSystemPortName());
                isInitialized = false;
            }
        } catch (Exception e) {
            log.error("串口初始化异常: " + e.getMessage());
            isInitialized = false;
        }
    }

    /**
     * 获取串口连接实例（线程安全）
     * 
     * @return SerialPort实例
     */
    public SerialPort getSerialPort() {
        if (!isInitialized) {
            synchronized (lock) {
                if (!isInitialized) {
                    throw new IllegalStateException("串口尚未初始化完成");
                }
            }
        }
        return serialPort;
    }

    /**
     * 检查串口是否已连接
     * 
     * @return true表示已连接，false表示未连接
     */
    public boolean isConnected() {
        return isInitialized && serialPort != null && serialPort.isOpen();
    }

    /**
     * 关闭串口连接
     */
    public void closePort() {
        synchronized (lock) {
            if (serialPort != null && serialPort.isOpen()) {
                serialPort.closePort();
                isInitialized = false;
            }
        }
    }

}

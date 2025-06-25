package com.ruoyi.project.system.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DataPacket {
    @JsonProperty("device")
    private String device;

    @JsonProperty("id")
    private int id;

    @JsonProperty("temperature")
    private double temperature;

    @JsonProperty("humidity")
    private double humidity;

    // Getters and Setters
    // ...

    @Override
    public String toString() {
        return "DataPacket{" +
                "id=" + id +
                ", temperature=" + temperature +
                ", humidity=" + humidity +
                '}';
    }
}
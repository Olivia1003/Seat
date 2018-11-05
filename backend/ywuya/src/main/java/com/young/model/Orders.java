package com.young.model;

import java.util.List;

public class Orders {
    List<OrderRecord> historyOrders;
    List<OrderRecord> currentOrders;

    public List<OrderRecord> getHistoryOrders() {
        return historyOrders;
    }

    public void setHistoryOrders(List<OrderRecord> historyOrders) {
        this.historyOrders = historyOrders;
    }

    public List<OrderRecord> getCurrentOrders() {
        return currentOrders;
    }

    public void setCurrentOrders(List<OrderRecord> currentOrders) {
        this.currentOrders = currentOrders;
    }
}

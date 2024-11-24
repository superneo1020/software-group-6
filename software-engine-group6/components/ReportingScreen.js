import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScreen = () => {
  const [reportData, setReportData] = useState({ totalSales: 0, popularItems: [] });

  useEffect(() => {
    const generateReport = async () => {
      const storedOrderHistory = await AsyncStorage.getItem('@orderHistory');
      if (storedOrderHistory) {
        const orderHistory = JSON.parse(storedOrderHistory);
        const totalSales = orderHistory.reduce((sum, order) => sum + order.amount, 0);
        const itemFrequency = {};
        orderHistory.forEach(order => {
          order.items.forEach(item => {
            if (itemFrequency[item.name]) {
              itemFrequency[item.name] += 1;
            } else {
              itemFrequency[item.name] = 1;
            }
          });
        });
        const popularItems = Object.entries(itemFrequency).sort((a, b) => b[1] - a[1]);
        setReportData({ totalSales, popularItems });
      }
    };

    generateReport();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <Text style={styles.reportItem}>Total Sales: ${reportData.totalSales.toFixed(2)}</Text>
      <Text style={styles.reportItem}>Popular Items:</Text>
      {reportData.popularItems.map(([item, count]) => (
        <Text key={item} style={styles.reportItem}>
          {item}: {count} orders
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  reportItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ReportScreen;

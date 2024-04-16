import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios, { AxiosResponse } from 'axios';

interface SensorData {
  fecha: string; // Cambiar a tipo Date si es posible
  humedad: number;
}

const HumidityChartScreen = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<SensorData[]> = await axios.get('http://192.168.9.102:3000/obtener_datos?limit=10');
        setSensorData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); // Llama a fetchData una vez al inicio
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Gráfico de Humedad</Text>
      <LineChart
        data={{
          labels: sensorData.map(data => new Date(data.fecha).toLocaleDateString()), // Formatear la fecha
          datasets: [{ data: sensorData.map(data => data.humedad) }]
        }}
        width={600}
        height={200}
        yAxisLabel="%"
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export default HumidityChartScreen;

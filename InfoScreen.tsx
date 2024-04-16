import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios, { AxiosResponse } from 'axios';

interface SensorData {
  fecha: string;
  temperatura: number;
  humedad: number;
  humedad_del_suelo: number;
}

const InfoScreen = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<SensorData[]> = await axios.get('https://apisapp-1.onrender.com/getSensorData?limit=10');
        setSensorData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); // Llama a fetchData una vez al inicio

    const interval = setInterval(fetchData, 60000); // Actualiza los datos cada minuto

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  // Función para formatear las fechas y obtener solo el mes y el día
  const formatDates = (dates: string[]): string[] => {
    return dates.map(date => {
      const parts = date.split('-'); // Separar la fecha por guiones
      const year = parts[0];
      const month = parts[1];
      const day = parts[2].split('T')[0]; // Obtener solo el día
      return `${month}-${day}`; // Devolver mes y día en formato MM-DD
    });
  };

  // Función para determinar la condición de humedad del suelo
  const getHumedadSueloCondition = (valor: number): string => {
    return valor < 400 ? 'húmedo' : 'seco';
  };

  return (
    <View>
      <Text >Gráfico de Barras de Temperatura</Text>
      <BarChart
        data={{
          labels: formatDates(sensorData.map(data => data.fecha)), // Formatear las fechas
          datasets: [
            {
              data: sensorData.map(data => data.temperatura),
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            },
          ],
        }}
        width={400}
        height={200}
        yAxisLabel="°C"
        yAxisSuffix="°C"
        chartConfig={chartConfig}
        style={chartStyle}
      />
      <Text>Gráfico de Barras de Humedad</Text>
      <BarChart
        data={{
          labels: formatDates(sensorData.map(data => data.fecha)), // Formatear las fechas
          datasets: [
            {
              data: sensorData.map(data => data.humedad),
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            },
          ],
        }}
        width={400}
        height={200}
        yAxisLabel="%"
        yAxisSuffix="%"
        chartConfig={chartConfig}
        style={chartStyle}
      />
      <Text>Gráfico de Barras de Humedad del Suelo</Text>
      <BarChart
        data={{
          labels: formatDates(sensorData.map(data => data.fecha)), // Formatear las fechas
          datasets: [
            {
              data: sensorData.map(data => data.humedad_del_suelo),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            },
          ],
        }}
        width={400}
        height={200}
        yAxisLabel="%"
        yAxisSuffix="%"
        chartConfig={chartConfig}
        style={chartStyle}
      />
      <Text>
        El mapeo que utilizamos 400 es {getHumedadSueloCondition(sensorData[0]?.humedad_del_suelo)}
      </Text>
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

const chartStyle = {
  marginVertical: 8,
  borderRadius: 16,
};

export default InfoScreen;

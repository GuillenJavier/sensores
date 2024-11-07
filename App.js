import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [accelerometerData, setAccelerometerData] = useState({});
  const [gyroscopeData, setGyroscopeData] = useState({});

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener(data => {
      setAccelerometerData(data);
    });

    const gyroscopeSubscription = Gyroscope.addListener(data => {
      setGyroscopeData(data);
    });

    Accelerometer.setUpdateInterval(500); // Actualización más frecuente
    Gyroscope.setUpdateInterval(500);

    return () => {
      accelerometerSubscription && accelerometerSubscription.remove();
      gyroscopeSubscription && gyroscopeSubscription.remove();
    };
  }, []);

  const round = (n) => (!n ? 0 : Math.floor(n * 100) / 100);

  const { x: ax, y: ay, z: az } = accelerometerData;
  const { x: gx, y: gy, z: gz } = gyroscopeData;

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Datos de Sensores</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acelerómetro</Text>
          <Text style={styles.dataText}>X: {round(ax)}</Text>
          <Text style={styles.dataText}>Y: {round(ay)}</Text>
          <Text style={styles.dataText}>Z: {round(az)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Giroscopio</Text>
          <Text style={styles.dataText}>X: {round(gx)}</Text>
          <Text style={styles.dataText}>Y: {round(gy)}</Text>
          <Text style={styles.dataText}>Z: {round(gz)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 18,
    color: '#555',
  },
});

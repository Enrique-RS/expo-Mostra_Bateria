import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';

export default function App() {

  const [battery, setBattery] = useState<number>(0);

  useEffect(() => {
    Battery.getBatteryLevelAsync().then(b => setBattery(b));
  }, []);

  const [lowPoweredState, setLowPoweredState] = useState<boolean | null>(null);
  
  useEffect(() => {
    Battery.getPowerStateAsync().then(bs => setLowPoweredState(bs.lowPowerMode));
  }, [])

  const batteryModeSubscriber = Battery.addLowPowerModeListener(b => setLowPoweredState(b.lowPowerMode))
  return () => batteryModeSubscriber.remove();

  if (lowPoweredState === null) return <Text>Getting info from your phone...</Text>;
  return (
    <Text>Battery state: {lowPoweredState ? 
        "I am static text replacement" :
        "I AM A POWER HUNGRY ANIMATION"}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text>Battery {(battery * 100).toFixed(0)}%</Text>
      <StatusBar style="auto" backgroundColor={"black"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

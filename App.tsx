import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createWorkletRuntime, scheduleOnRuntime } from 'react-native-worklets';

function testWorkletFetch() {
  const fetchRuntime = createWorkletRuntime({ name: 'fetchRuntime' });
  scheduleOnRuntime(fetchRuntime, () => {
    'worklet';

    console.log('[Worklet Fetch] Starting fetch test...');

    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET',
    })
      .then((data) => {
        console.log('[Worklet Fetch] Success:', data);
      })
      .catch((error) => {
        console.error('[Worklet Fetch] Error:', error.message);
      });
  });
}

export default function App() {
  useEffect(() => {
    testWorkletFetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Testing Worklet Fetch</Text>
      <Text style={styles.subtitle}>Check console for logs (or crash)</Text>
      <StatusBar style="auto" />
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
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});

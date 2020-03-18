import React from 'react';
import { Text, View, Button } from 'react-native';

export default function({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HistoryScreen</Text>
      <Button
        title='Go to Details Screen'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

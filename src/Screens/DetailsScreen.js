import React from 'react';
import { Text, View, Button } from 'react-native';

export default function({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DetailsScreen</Text>
      <Button title='Go to Home Screen' onPress={() => navigation.goBack()} />
    </View>
  );
}

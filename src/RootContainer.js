import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HistoryScreen from './Screens/HistoryScreen';
import SettingsScreen from './Screens/SettingsScreen';
import DetailsScreen from './Screens/DetailsScreen';
import HomeScreen from './Screens/HomeScreen';
import AuthScreen from './Screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    });
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={({ route }) => ({
          title: getHeaderTitle(route)
        })}
        name='Home'
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

const HistoryStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    });
  }
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        options={({ route }) => ({
          title: getHeaderTitle(route)
        })}
        name='History'
        component={HistoryScreen}
      />
      <HistoryStack.Screen name='Details' component={DetailsScreen} />
    </HistoryStack.Navigator>
  );
};

const SettingsStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    });
  }
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={({ route }) => ({
          title: getHeaderTitle(route)
        })}
        name='Settings'
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName = route.name;
  switch (routeName) {
    case 'History':
      return 'My Travel Records';
    case 'Settings':
      return 'My Settings';
    default:
      return 'Welcome';
  }
}

function shouldHeaderBeShown(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'HomeTab';

  switch (routeName) {
    case 'HomeTab':
    case 'HistoryTab':
    case 'SettingsTab':
      return false;
    default:
      return true;
  }
}

const HomeTabNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == 'HomeTab') iconName = 'ios-home';
          else if (route.name == 'HistoryTab') iconName = 'ios-globe';
          else if (route.name == 'SettingsTab') iconName = 'ios-settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen
        options={() => ({
          title: 'Home'
        })}
        name='HomeTab'
        component={HomeStackNavigator}
      />
      <Tab.Screen
        options={() => ({
          title: 'History'
        })}
        name='HistoryTab'
        component={HistoryStackNavigator}
      />
      <Tab.Screen
        options={() => ({
          title: 'Settings'
        })}
        name='SettingsTab'
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default function RootContainer({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal' }}
        headerMode='float'
        mode='modal'
      >
        <Stack.Screen
          options={({ route }) => ({
            headerShown: shouldHeaderBeShown(route)
          })}
          name='HomeTabNavigator'
          component={HomeTabNavigator}
        />
        <Stack.Screen
          options={({ route }) => ({
            headerShown: false
          })}
          name='Auth'
          component={AuthScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

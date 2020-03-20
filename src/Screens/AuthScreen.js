import React from 'react';
import { Text, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import Auth from '@aws-amplify/auth';
import credentials from '../../secrets';

export default function({ navigation }) {
  async function googleLogin() {
    try {
      const result = await Google.logInAsync({
        androidClientId: credentials.googleAndroidClientId,
        iosClientId: credentials.googleIosClientId,
        scopes: ['profile', 'email']
      });
      console.log(result);
      if (result.type === 'success') {
        amplifyAuth(
          'google',
          result.idToken,
          60 * 1000 + new Date().getTime(),
          result.user.givenName,
          result.user.familyName,
          result.user.email
        );
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  async function facebookLogin() {
    await Facebook.initializeAsync(credentials.facebookAppId);
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email']
    });
    console.log(result);
    const { type, token, expires } = result;
    if (type === 'success') {
      // need to get other info before calling Auth
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&locale=en_US&fields=name,email,picture,first_name,last_name`
      );
      const fbData = await response.json();
      console.log(fbData);
      console.log('Logged in!', `Hi ${fbData.name}!`);
      amplifyAuth(
        'facebook',
        token,
        expires,
        fbData.first_name,
        fbData.last_name,
        fbData.email
      );
    } else {
      console.log('something is wrong');
    }
  }

  async function amplifyAuth(
    loginType,
    token,
    expires,
    first_name,
    last_name,
    email
  ) {
    // sign in with federated identity
    await Auth.federatedSignIn(
      loginType,
      { token, expires_at: expires },
      { name: first_name + ' ' + last_name }
    )
      .then(() => {
        console.log('successful login with cognito');
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });

    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(() => console.log('Not signed in'));
  }

  async function logout() {
    console.log('logout');
    Auth.signOut();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => facebookLogin()} title='Facebook' />
      <Button onPress={() => googleLogin()} title='Google' />
      <Button onPress={() => logout()} title='Sign out' />
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
    </View>
  );
}

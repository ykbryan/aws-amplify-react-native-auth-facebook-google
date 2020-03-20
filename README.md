# How to setup Facebook Login natively in your React Native app

![Facebook Login](./docs/fb/add-facebook-login.png 'Add FB login')

## Start a new project

```
git clone https://github.com/ykbryan/react-native-navigation-starter-app YOUR-PROJECT-NAME
rm -Rf .git
```

Note that you have to setup your own git repo and push it elsewhere remotely.

## Use Expo the required social media integrations

We are going to use Expo to integrate [Facebook](https://docs.expo.io/versions/v36.0.0/sdk/facebook/) and [Google](https://docs.expo.io/versions/v36.0.0/sdk/google/) login in our React Native app as Expo already provides the necessary steps and packages for each social media platofm. According to the Expo documentations, Expo exposes a minimum native API since you can directly access, for example, [Facebook Graph API](https://developers.facebook.com/docs/graph-api), directly via HTTP.

#### Facebook

```
expo install expo-facebook
```

#### Google

```
expo install expo-google-app-auth
```

## Check if you can run the project

```
yarn && yarn start
```

note: if you see the screenshot below, select the correct version as shown in the screenshot. At this point, there is a bug in native-base that prevents

![native-base version](./docs/fb/select-native-base-version.png 'Select nativebase version')

## Setup Facebook App

Go to https://developers.facebook.com/ and create your app

![FB App](./docs/fb/create-fb-app.png 'Sample FB App')

![FB Credentials](./docs/fb/app-id-secret.png 'FB App Credentials')

## Setup AWS via Amplify CLI

```
amplify init

```

Enter your App information:

```
? Enter a name for the project amplifyauthdemo
? Enter a name for the environment prod
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react-native
? Source Directory Path:  /
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

## Add FB Auth

```
amplify add auth
```

```
Using service: Cognito, provided by: awscloudformation

 The current configured provider is Amazon Cognito.

 Do you want to use the default authentication and security configuration?
 Default configuration with Social Provider (Federation)
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
 What domain name prefix you want us to create for you? amplifyauthdemo
 Enter your redirect signin URI: http://localhost/
? Do you want to add another redirect signin URI No
 Enter your redirect signout URI: http://localhost/
? Do you want to add another redirect signout URI No
 Select the social providers you want to configure for your user pool: Fac
ebook

 You've opted to allow users to authenticate via Facebook.  If you haven't
 already, you'll need to go to https://developers.facebook.com and create
an App ID.

 Enter your Facebook App ID for your OAuth flow:  xxxxx
 Enter your Facebook App Secret for your OAuth flow:  xxxxx
d416afc55a6f
Successfully added resource amplifyauthdemo00e40f7e locally
```

```
amplify push
```

## Go to Facebook and update the URLs

Copy your cognito hosted endpoints
It should look something like this https://amplifyauthdemo-prod.auth.us-east-1.amazoncognito.com/

Go back to your Facebook dashboard and update the basic Settings

![Update FB Settings](./docs/fb/update-basic-settings.png 'Update FB Settings')

Scroll down and `Add Platform` button

![Add Platform](./docs/fb/add-platform-facebook-settings.png 'Add Platform')

Add `iOS` and `Android` platforms to the setting

![Add iOS and Android](./docs/fb/add-ios-android-facebook.png 'Add iOS and Android')

Add `host.exp.Exponent` as an iOS Bundle ID

![Update iOS bundle ID](./docs/fb/update-ios-bundle-id-facebook.png 'Update iOS bundle ID')

Add `rRW++LUjmZZ+58EbN5DVhGAnkX4=` as an Android key hash.

![Update Android Key Hashes](./docs/fb/update-android-key-hash-facebook.png 'Update Android Key Hashes')

Scroll all the way down, select `Update` button to save the changes

![Update more info below](./docs/fb/update-data-protection.png 'Update more info below')

## Add Facebook Login

Select Facebook Login

![Select FB Login](./docs/fb/select-facebook-login.png 'Select Facebook Login')

Select WWW/Web

![Select web](./docs/fb/select-web.png 'Select WWW')

input the OAuth Endpoint URL with /oauth2/idpresponse appended into Site URL:

```
https://amplifyauthdemo-prod.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
```

![Enter Info](./docs/fb/enter-website-info.png 'Enter more information')
![Enter Oauth](./docs/fb/enter-valid-oauth.png 'Enter Valid Oauth')

Go "Live" and press "Switch" on the popup.

Press **SAVE** and **NEXT** all the way

![Go live](./docs/fb/facebook-go-live.png 'Go Live')

## Go to AWS Console and update info in Federated Identity

Go to https://us-west-2.console.aws.amazon.com/cognito/federated/

Select the right region

Select the correct identity pool

Select **Edit identity pool**

![Cognito Identity Pool](./docs/fb/cognito-identity-pool.png 'Cognito Identity Pool')

Go to Authentication providers
Select **Facebook** in the tabs
Press UNLOCK and add your Facebook App ID

![Update FB App ID](./docs/fb/update-federated-app-id.png 'Update FB App ID')

Scroll down and press SAVE

## Go back to your app

```
yarn start
```

# How to setup Google Login in your React Native app

Login to the [Google API Console](https://console.developers.google.com/)

## Create a new project in Google API Console

(Optional) If you do not have an existing project, create a new one

![Google New Project](./docs/google/new-project.png 'Google New Project')

## OAuth Consent Screen

First, check your oauth consent

![Google oAuth Consent](./docs/google/oauth-consent-screen.png 'Google oAuth Consent')

And update the details regarding your Application, especially your app name

![Google Application Details](./docs/google/application-details.png 'Google Application Details')

## Create an OAuth Client ID for Android

![Android Client ID](./docs/google/android-oauth-client.png 'Android Client ID')

Now, open your Terminal and enter the following command to generate `Signing-certificate fingerprint` required from your laptop

```
openssl rand -base64 32 | openssl sha1 -c
```

![Android Signing Certificate Fingerprint](./docs/google/android-signing-certificate-fingerprint.png 'Android Signing Certificate Fingerprint')

Key in your package name and press `Save` to continue

![Android Package Name](./docs/google/android-package-name.png 'Android Package Name')

You should be able to see your Client ID for Android now

![Android Client ID](./docs/google/android-client-id.png 'Android Client ID')
android-client-id

## Create an OAuth Client ID for iOS

Similar to steps creating Android Client ID, go and add an iOS Client ID in the console

Once done, you should see 2 client IDs as shown below

![iOS OAuth Client ID](./docs/google/ios-oauth-client-id.png 'iOS OAuth ID')

## Create an OAuth Client ID for Web Application

This is going to be used by Amazon Cognito and later, we are going to use Amplify to provide Google Login capability with this Client ID.

![Web Application OAuth Client ID](./docs/google/web-oauth-client-id.png 'Web Application OAuth ID')

## Update Amplify Auth to include Google

## Add IAM Identity Provider

Since the mobile is going to use its respective Client ID to authenticate at Google API and Amazon Cognito is going to use a different Client ID for web application, we are going to enable IAM provider for account.google.com to recognise and use iOS and Android Client IDs too.

Go to the [IAM Console](https://console.aws.amazon.com/iam/home?#/providers) to begin

![Create IAM Identity Provider](./docs/google/create-iam-provider.png 'Create IAM Identity Provider')

Select `OpenID Provider`

![Select IAM OpenID Provider](./docs/google/select-openid-provider.png 'Select IAM OpenID Provider')

Enter `https://accounts.google.com` as your Provider URL and put your Android OAuth Client ID to begin. Click `Next Steps` button to proceed.

![Configure OpenID Provider](./docs/google/iam-configure-provider.png 'Configure OpenID Provider')

Verify your Provider Information and make sure the information is correct, especially the _Provider URL_. Click `Create` button to proceed

![Verify OpenID Provider](./docs/google/iam-verify-provider-info.png 'Verify OpenID Provider Information')

Now, you should be able to see the new Provider in the IAM Identity Providers

![IAM Identity Provider for Google](./docs/google/created-provider-google.png 'IAM Identity Provider for Google')

Remember that you have the iOS OAuth Client ID. Now, you have to add that to your existing identity provider for Google. Click on the `account.google.com` to proceed.

Click `Add an Audience` to see a new _Textfield_ for your iOS OAuth Client ID. Once you have both iOS and Android OAuth Client IDs, click `Save Changes` to proceed.

![Update Identity Provider](./docs/google/add-ios-oauth-google-provider.png 'Update Identity Provider')

You have now configured all the required authentications for Google to talk to your AWS resources. Now, you have to configure the selected Identity Pool in your Amazon Cognito to allow permissions for this Identity Provider and Google OAuth Client ID for web.

## Update your Amazon Cognito

Go back to the Identity Pool in your Amazon Cognito and enter the Web OAuth Client ID

![Update Google ID in Cognito](./docs/google/google-authentication-providers.png 'Update Google ID in Cognito')

Select the **OpenID** tab and select **accounts.google.com**

![Allow Google in Cognito](./docs/google/allows-cognito-openid-google.png 'Allow Google in Cognito')

Scroll all the way down and click `Save Changes` to complete the Cognito configuration

## Launch and test your app

Once all of the above have been configured, you can now launch the app and test both Facebook & Google Login. After that, go back to your Cognito and now, you should be able to see that you have users in both Google and Facebook Login.

![Check Cognito Users](./docs/google/check-cognito-users.png 'Check Cognito Users')

## FAQ

##### Token is not from a supported provider of this identity pool.

You have not added the Facebook App Id in the identity pool at Federated Identities

##### Why are you not using google-sign-in instead

Show screenshots. URLSchemas problem.

##### How to remove Facebook App from my Facebook account

Go to [Facebook settings in Application tab](https://facebook.com/settings?tab=applications)

![Facebook Settings](./docs/fb/remove-facebook-app.png 'Facebook Settings')

## References

https://aws-amplify.github.io/docs/js/authentication
https://docs.expo.io/versions/latest/sdk/facebook/
https://dev.to/dabit3/the-complete-guide-to-user-authentication-with-the-amplify-framework-2inh

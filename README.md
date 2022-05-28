![The first thing you will see upon opening the app!](/assets/start.js.jpeg "First/Start Screen")

# CHAT APP

## Built with React Native

**The goal of this project was to learn and put react native skills to practise, building a chat app. The app provides users with a simple interface that enables users to send and receive texts messages, images and share their location within a chat room.**

---
### User Stories

1. As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my chatting partners.
2. As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
3. As a user, I want to send images to my friends to show them what I’m currently doing.
4. As a user, I want to share my location with my friends to show them where I am.
5. As a user, I want to be able to read my messages offline so I can reread conversations at any time.
6. As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

---
### Key Features

1. ***-  screen:***
This is the page the user lands on (the first page the user will see) when they open the app. The user would have to enter their Name and pick a background colour of their choice. The users name will be display on the top of the next screen.

2. ***Chat screen***
Once the user clicks start chatting on the start screen, they will be navigated to the chat screen. This is the chat room, where they would be able to send texts, pictures, and location.

3. ***Access to previous chats while offline***
The app stores your messages and files (images/location) both online and offline. This means users would be able to access their chat history (previous chats) without being connected to the internet. However, they wouldn't see and text input field since the app doesn't allow users to text while in offline mode.

---
### Why React Native? 
- With react native, I could Develop and maintain the same codebase across both the Android and iOS operatiing systems
- In contrast to PWAs, react native offers the possibility to access device's hardware camera, microphone, GPS etc 
- React is based off of javascript, so I just had to learn react native nt a whole new language
- React Native offer a lot of support since it has a large and active developer community 
- Easy to test with the use of Simulators and Emulators or physical devices. 

### Other tools:

- Expo as development environment for development and testing

- React Navigation third party library to navigate between screens.

- React Native Gifted Chat library to create the UI. It already provides predefined components for integral parts of the chat app:
*(Message bubbles, a message input field, a send button, Options for displaying user names and avatars)*

- WebSocket as a real-time application technology as it fulfills the following requirements of my chat application:

- Cloud Firestore as data storage platform for the App (real time data)

---
### Challenges I faced:
There is a new Firestore version v9 available which differs greatly from v7 used in the course examples. I used v9 for this Application.

- I also had to deal with a lot of deprecated packages due to the version or expo, react and firebase being pretty new.

---
### Development Process for the chat application

- Set up Expo as Development Environment<br>
**Install Expo Command Line Interface**
```
npm install expo-cli --global
```

- Create new Expo project in projects directory
```
expo init [project-name]
```

- Start expo by navigating to project folder & running
```
npm start
```

- Install React Navigation library to navigate between screens
**Navigate to project folder and run**
```
npm install react-navigation
```

**Install necessary dependencies***
```
npm install @react-navigation/native @react-navigation/stack
```
```
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

---
- Set up Android Studio as Android Emulator
- Download Android Studio
- Make sure 'Android Virtual Device' is installed
- Add Android SDK Location to ~/.zshrc file
```
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
````
- Create virtual device (via more actions > Virtual Device Manager) and click play to start
- Select 'Run app on Android' in Expo to run app on virtual device
- Press Command + Shift + R to start a screen recording.

---
- Integrate Gifted Chat library to create chat UI
```
//Install Gifted Chat
npm install react-native-gifted-chat
```
```
//Integrate Gifted Chat into application
import { GiftedChat } from 'react-native-gifted-chat';
```

---

**Follow instructions to set up chat** 

```
https://github.com/jessinmacdon/chat-app
```
- Set up Cloud Firestore as data storage platform
- Install Firestore via Firebase
```
npm install firebase
````

```
//Import Firestore in application (e.g, in config/firebase.js or directly in your chat.js file)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
```

- Register App in Firebase settings
- Copy config code to application from Firebase
- Initialize app

```
//Initialize Firebase*
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
```
- Set up anonymous authentication in firebase console


---
- To set up Async Storage for offline functionalities
- Install package
```
expo install @react-native-community/async-storage
```
---

```
//Import AsyncStorage into app
import AsyncStorage from '@react-native-community/async-storage';
```

Store and retrieve state from Async Storage

---

![How your chat room will look like!](/assets/chat.js.jpeg "Chat Screen")
---

![How your chat room will look like!](/assets/chat.js1.jpeg "Chat Screen")
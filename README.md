# Ad Service - Ethiopian Craigslist-Style Marketplace

![QuickPost Demo](assets/demo.gif)

A React Native app for local buying/selling with real-time messaging. Supports **iOS, Android, and Web**.

## **🚀 Features**
- User authentication (email/password)
- Create/delete posts with images
- Real-time messaging
- Location-based filtering
- Responsive design (mobile + web)

## **🛠 Setup**

### **Prerequisites**
- Node.js v16+
- Expo CLI (`npm install -g expo-cli`)
- Firebase account (for backend)

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/quickpost.git
cd quickpost

2. Install Dependencies
   
    npm install
    # OR
    yarn

3. Firebase Configuration

    Create a Firebase project at console.firebase.google.com

    Enable Authentication (Email/Password) and Firestore Database

    Copy your Firebase config into config/firebase.js:

    javascript
    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
    };


📱 Mobile Testing (Expo Go)

    iOS/Android
    Install Expo Go on your phone:

    iOS App Store

    Android Play Store

    Start the dev server:

    expo start
    Scan the QR code with your phone's camera.

Web Browser
    
    expo start --web
    Open http://localhost:19006 in Chrome and use Device Toolbar (Ctrl+Shift+M).

🌐 Web-Only Setup (React Native Web)
*If you only want to test in a browser:

Add React Native Web:

    npm install react-native-web
    Update App.js:

    javascript
    import { AppRegistry } from 'react-native';
    AppRegistry.registerComponent('App', () => App);
    Run:

    npm run web
    Open http://localhost:3000.

🔧 Troubleshooting
Issue	                    Solution
Firebase auth errors	    Double-check firebase.js config
Images not uploading	    Ensure Firebase Storage rules allow writes
Expo QR code not working	Manually type the URL from expo start into Expo Go
Web build fails	            Ensure react-native-web is installed
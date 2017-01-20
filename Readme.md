# Asset Tracker

It is a product to analyse our assests. Features provided by this product are as below:
- Dashboard of all assets
- Adding new asset into total assets


# Prerequisite

- NodeJS ( version 5+ )
- [Android Studio](https://developer.android.com/studio/index.html) - for making Android build 
- Updated Android SDK tools - Make sure your Android SDK is updated. You can check it in "Android Studio".

# Usage


- Install latest version of the Ionic CLI and Cordova
  
  ```sh
    $   npm install -g ionic cordova
    ```
    
- Install node dependencies.
    
  ```sh
    $   npm install
    ```
  
- Start dev server
  ```sh
    $   ionic serve
    ```
    
- Verify the deployment by navigating to your server address in your preferred browser.
    ```sh
    http://localhost:8100
    ```    

# Deploying on Android Devices
- Setup Gradle ( If your proxy has file download limit )

    - Set CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL

        Add an environment variable (system) as below: 
        
        ```sh
        Variable Name: CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL
        
        Variable Value: ../../../../resources/gradle-2.14.1-all.zip
        ```
        
   - Download ["gradle-2.14.1-all.zip"](https://services.gradle.org/distributions/gradle-2.14.1-all.zip) file and keep it inside of "resources" folder
        
        
- Add Android as a platform.

    ```sh
    $   cordova platform add android
    ```
    
- Make Android Build

    ```sh
    $   ionic run android --device
    ```
    
   It will create APK at "platforms\android\build\outputs\apk".  
   
   If you have enabled USB debugging and Developer Mode on your Android device, this APK should be installed on connected android device.
    
     

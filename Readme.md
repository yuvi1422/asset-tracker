# Asset Tracker

![alt text](https://user-images.githubusercontent.com/5191208/27481891-b91361fe-583c-11e7-8ec2-741f43a909a0.png)

It is a product to analyse our assests. Features provided by this product are as below:
- Dashboard of all assets.
- Adding new asset into asset list.
- Updating existing asset details.
- Deleting existing asset details.


# Prerequisite

- NodeJS ( version 5+ )
- [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - For Android Studio 
- [Android Studio](https://developer.android.com/studio/index.html) - for making Android build 
- Setup ANDROID_HOME. In Linux, use following commands:
  ```sh
    $   export ANDROID_HOME=/home/yuvraj/Android/Sdk
    
    $   export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    ```
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


# Auto-generate API documentation

-  Run following command which will automatically generate API documentation for us.
  
  ```sh
    $   npm run compodoc
  ```

- Start documentation server
  ```sh
    $   compodoc -s --port 8686
  ```

- Verify the API document by navigating to your server address in your preferred browser.
  ```sh
    $   http://localhost:8686
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
    $   ionic cordova build --prod android
    ```
     
   It will create APK at "platforms\android\build\outputs\apk". "prod" flag will create a production apk which will be smaller. App will load faster beacuse of this flag.
   
    Use this APK to install this app. 
     

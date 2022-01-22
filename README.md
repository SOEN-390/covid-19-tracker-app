# COVID-19 Tracker App
COVID-19 Tracker application frontend in Ionic

# Pre-requisite

- NEVER USE `SUDO` COMMAND. IT IS A BAD PRACTICE. It can cause serious damages to the system.
- NodeJS / NPM
  - 
    - Latest v8.1.2
    - Check with `npm -v`
    - Installation guide [nodejs](https://nodejs.org/en/download/)
- Ionic
  - 
    - Latest v6.18.1
    - Check with `ionic -v`
    - Installation: `npm install -g ionic`
- Simulator Setup
  - 
    - ### Install iOS Simulator (Mac Users Only)
      - Open Mac App Store
      - Download [XCode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
    - ### Install Android Simulator
      - Download Android Studio
      - On the Welcome page, go to More Actions > SDK Manager
        - Download SDK Build-Tools
        - Download SDK Command Line
        - Download Android Emulator
        - Download Android 12.0
      - On the Welcome page, go to More Actions > AVD Manager
        - Create Virtual Device

# Running
- Run the code on web:
  - 
    - Open the Environment's terminal or Terminal
    - `cd` to the project's root folder
    - Run the code with `ionic serve`
    - Open `http://localhost:8100` to see the web app
- Run the code on emulator:
  - 
    - Open the emulator iOS or Android emulator
    - Run `ionic capacitor run ios -l`
    - Check [doc](https://ionicframework.com/docs/cli/commands/capacitor-run) for more options
  
# Develop
*** This part will be updated later, when the project is ready
- Creating iOS app:
  - 
    - iOS is already added to the project
    - Run `ionic capacitor open ios`
    - Run `ionic capacitor copy ios` to sync the projects everytime there is a change to test/build
    - Check [this](https://ionicframework.com/docs/developing/ios) to generate the XCode project
- Creating Android app:
  - 
    - Android is already added to the project
    - Run `ionic capacitor open android` for the first time
    - Run `ionic capacitor copy android` to sync the projects everytime there is a change to test/build
    - Check [this](https://ionicframework.com/docs/developing/android) to generate the XCode project

# Optional: Docker Setup
Note: Build/compile time is much longer when running this project on docker compared to running directly on your machine.
- [Download](https://docs.docker.com/get-docker) docker
- Open the Environment's terminal or Terminal
- `cd` to the project's root folder
- Build: `docker-compose build`
- Run: `docker-compose up`
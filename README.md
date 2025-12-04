## Installation
 
1) Download and install VS Code from https://code.visualstudio.com/download
2) Download and install Git from https://git-scm.com/downloads, while installing select VS Code as Git's default editor and "Git and optinal Unix tools from Command Prompt"
3) Download and install NodeJS from https://nodejs.org/en/download/
4) Download and install Java JDK from https://www.oracle.com/java/technologies/javase-jdk14-downloads.html
5) Create the environment variable `JAVA_HOME` and set it as `"C:\Program Files\Java\jdk-14.0.1"` (or the path that Java was installed) and add to the `PATH` the following: `"%JAVA_HOME%\bin"`
6) Download and install Android Studio from https://developer.android.com/studio. Make sure that you open Android Studio so that it will download the necessary updates. 
7) In Android Studio go to Tools -> SDK Manager. Go to SDK Tools tab. Select the Android SDK Command-line Tools (latest) and download by pressing Apply.
8) Create the environment variable `ANDROID_SDK_ROOT` and set it as `"C:\Users\{myPCUser}\AppData\Local\Android\Sdk"` or as `"C:\Android\Sdk"` depending on where Android Studio was installed and add to the `PATH` the following: `"%ANDROID_SDK_ROOT%\platform-tools"`
9) In order to install React Native: Open VS Code. Terminal -> New Terminal. Enter the command: `npm install -g react-native`
10) To download the code of the project, run the following command in the terminal: `git clone https://github.com/gmanolia/GeitoniaMobile.git`
11) `cd GeitoniaMobile`
12) `npm install`
13) Connect your Android phone to your computer with a cable
14) `npm run android`
$ cd android
$ ./gradlew clean 
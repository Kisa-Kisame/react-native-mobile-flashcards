# Mobile-Flashcards App

- What is this?

  - This a simple flashcard app using React Native
  - A user can add decks and delete decks. He can also populate them with cards and take quizes.
  - A notification to take a quiz will pop up daily if the user has not taker a quiz that day.
  - Used both local storage and the Redux store

- Testing

  - Was done only on Android device and simulator because the access to an iOS device/simulator was limited.
  - Device used Samsung Galaxy S6 Edge, API 24
  - Simulator used Android Studio's Emulator, Pixel 2 API 29

- How to run on a simulator
  - `npm install -g expo-cli` (skip if expo is already installed)`
  - `yarn install`
  - launch emulator (for example by Android Studio) or connect to a device
  - `yarn start`
  - go to localhost:19002 - Expo would be running
  - click 'Run on Android device/emulator' button shown in left side of the browser

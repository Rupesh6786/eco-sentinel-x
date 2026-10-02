import { createServerFn } from "@tanstack/react-start";

// Firebase web config. The API key is stored as a project secret and served to the browser
// (Firebase web keys are designed to be public; access is governed by Firestore rules).
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    apiKey: "AIzaSyDTeORCY_Yglneqcwv2OObH3M9D-eR6qe4",
    authDomain: "studio-1142491547-98533.firebaseapp.com",
    projectId: "studio-1142491547-98533",
    storageBucket: "studio-1142491547-98533.firebasestorage.app",
    messagingSenderId: "153917479951",
    appId: "1:153917479951:web:c21215f0a3edbd6664d77a",
  };
});

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase - substitua com suas credenciais
const firebaseConfig = {
  apiKey: "AIzaSyAGxjQsW2BbmctRrxhfm7EvycAfMPeaLcc",
  authDomain: "react-firebase3-566ce.firebaseapp.com",
  projectId: "react-firebase3-566ce",
  storageBucket: "react-firebase3-566ce.firebasestorage.app",
  messagingSenderId: "1046573438331",
  appId: "1:1046573438331:web:f2d423e47b0c485a5499de",
  measurementId: "G-TMS0ERP249",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
export default app;

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar mensagens em tempo real
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Criar mensagem
  const createMessage = async (messageData) => {
    try {
      await addDoc(collection(db, "messages"), {
        ...messageData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao criar mensagem:", error);
      throw error;
    }
  };

  // Editar mensagem
  const updateMessage = async (id, messageData) => {
    try {
      const messageRef = doc(db, "messages", id);
      await updateDoc(messageRef, {
        ...messageData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao editar mensagem:", error);
      throw error;
    }
  };

  // Excluir mensagem
  const deleteMessage = async (id) => {
    try {
      const messageRef = doc(db, "messages", id);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error);
      throw error;
    }
  };

  return {
    messages,
    loading,
    createMessage,
    updateMessage,
    deleteMessage,
  };
};

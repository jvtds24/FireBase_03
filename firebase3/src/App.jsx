import { useState } from "react";
import { useMessages } from "./hooks/useMessages";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import "./App.css";

function App() {
  const { messages, loading, createMessage, updateMessage, deleteMessage } =
    useMessages();
  const [editingMessage, setEditingMessage] = useState(null);

  const handleSubmit = async (messageData) => {
    if (editingMessage) {
      await updateMessage(editingMessage.id, messageData);
      setEditingMessage(null);
    } else {
      await createMessage(messageData);
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    // Scroll para o formulário
    document
      .querySelector(".message-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      alert("Erro ao excluir mensagem. Tente novamente.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 MuralBoard</h1>
        <p>Mural de Recados Públicos - Deixe sua mensagem para a comunidade!</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="content-grid">
            <section className="form-section">
              <MessageForm
                onSubmit={handleSubmit}
                editingMessage={editingMessage}
                onCancelEdit={handleCancelEdit}
              />
            </section>

            <section className="list-section">
              <MessageList
                messages={messages}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Projeto MuralBoard - Desenvolvido com React + Vite + Firebase</p>
      </footer>
    </div>
  );
}

export default App;

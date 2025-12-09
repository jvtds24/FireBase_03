import { useState } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, loading, onEdit, onDelete }) => {
  const [filter, setFilter] = useState("todos");

  const categories = [
    { value: "todos", label: "Todos" },
    { value: "geral", label: "Geral" },
    { value: "aviso", label: "Avisos" },
    { value: "agradecimento", label: "Agradecimentos" },
    { value: "sugestao", label: "Sugestões" },
    { value: "apoio", label: "Apoio" },
  ];

  const filteredMessages =
    filter === "todos"
      ? messages
      : messages.filter((message) => message.category === filter);

  if (loading) {
    return (
      <div className="loading">
        <p>Carregando recados...</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="filter-section">
        <label htmlFor="category-filter">Filtrar por categoria:</label>
        <select
          id="category-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="messages-count">
        {filteredMessages.length} recado(s){" "}
        {filter !== "todos" &&
          `na categoria ${categories.find((c) => c.value === filter)?.label}`}
      </div>

      <div className="messages-grid">
        {filteredMessages.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum recado encontrado.</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;

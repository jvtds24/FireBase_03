const MessageItem = ({ message, onEdit, onDelete }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "Data não disponível";

    const date = timestamp.toDate();
    return date.toLocaleString("pt-BR");
  };

  const getCategoryColor = (category) => {
    const colors = {
      geral: "#3498db",
      aviso: "#e74c3c",
      agradecimento: "#2ecc71",
      sugestao: "#f39c12",
      apoio: "#9b59b6",
    };
    return colors[category] || colors.geral;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      geral: "Geral",
      aviso: "Aviso",
      agradecimento: "Agradecimento",
      sugestao: "Sugestão",
      apoio: "Apoio",
    };
    return labels[category] || labels.geral;
  };

  return (
    <div className="message-item">
      <div
        className="category-badge"
        style={{ backgroundColor: getCategoryColor(message.category) }}
      >
        {getCategoryLabel(message.category)}
      </div>

      <div className="message-content">
        <p className="message-text">{message.content}</p>
      </div>

      <div className="message-footer">
        <div className="message-author">
          <strong>Por: {message.author}</strong>
        </div>
        <div className="message-date">
          {formatDate(message.createdAt)}
          {message.updatedAt && message.updatedAt !== message.createdAt && (
            <span className="edited"> (editado)</span>
          )}
        </div>
      </div>

      <div className="message-actions">
        <button
          onClick={() => onEdit(message)}
          className="btn btn-edit"
          title="Editar mensagem"
        >
          ✏️
        </button>
        <button
          onClick={() => {
            if (window.confirm("Tem certeza que deseja excluir este recado?")) {
              onDelete(message.id);
            }
          }}
          className="btn btn-delete"
          title="Excluir mensagem"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default MessageItem;

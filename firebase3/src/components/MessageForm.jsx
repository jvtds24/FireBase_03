import { useState } from "react";

const MessageForm = ({ onSubmit, editingMessage, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    author: "",
    content: "",
    category: "geral",
  });

  // Preencher formulário quando estiver editando
  useState(() => {
    if (editingMessage) {
      setFormData({
        author: editingMessage.author || "",
        content: editingMessage.content || "",
        category: editingMessage.category || "geral",
      });
    }
  }, [editingMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.author.trim() || !formData.content.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({
        author: "",
        content: "",
        category: "geral",
      });
    } catch (error) {
      alert("Erro ao salvar mensagem. Tente novamente.");
    }
  };

  const categories = [
    { value: "geral", label: "Geral" },
    { value: "aviso", label: "Aviso" },
    { value: "agradecimento", label: "Agradecimento" },
    { value: "sugestao", label: "Sugestão" },
    { value: "apoio", label: "Apoio" },
  ];

  return (
    <div className="message-form">
      <h2>{editingMessage ? "Editar Recado" : "Deixar um Recado"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Seu Nome *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Mensagem *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Digite sua mensagem..."
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          {editingMessage && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingMessage ? "Atualizar" : "Publicar"} Recado
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;

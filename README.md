# 📋 MuralBoard - Mural de Recados Públicos

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange)

Um mural digital colaborativo onde usuários podem deixar recados públicos sem necessidade de autenticação. Ideal para escolas, eventos, feiras ou ambientes educacionais.

## 🚀 Funcionalidades

- **📝 Criar Recados** - Formulário simples para publicação de mensagens
- **✏️ Editar Recados** - Edição direta dos recados existentes
- **🗑️ Excluir Recados** - Remoção com confirmação
- **📂 Categorização** - Organização por categorias (Geral, Aviso, Agradecimento, etc.)
- **⏱️ Tempo Real** - Atualização automática com Firebase Firestore
- **📱 Responsivo** - Interface adaptável para desktop e mobile
- **🎨 Interface Moderna** - Design clean e intuitivo

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + Vite
- **Backend:** Firebase Firestore
- **Estilização:** CSS3 puro
- **Hospedagem:** Firebase Hosting (opcional)
- **Controle de Versão:** Git

## 📦 Estrutura do Projeto

```
muralboard/
├── public/
├── src/
│   ├── components/
│   │   ├── MessageForm.jsx      # Formulário de criação/edição
│   │   ├── MessageList.jsx      # Lista de mensagens com filtros
│   │   └── MessageItem.jsx      # Item individual da mensagem
│   ├── hooks/
│   │   └── useMessages.js       # Hook personalizado para gerenciar mensagens
│   ├── services/
│   │   └── firebase.js          # Configuração e inicialização do Firebase
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Ponto de entrada da aplicação
│   └── App.css                  # Estilos principais
├── package.json
└── vite.config.js
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 16+ instalado
- Conta no Firebase
- Git

### 1. Clonar e Instalar Dependências

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd muralboard

# Instalar dependências
npm install
```

### 2. Configurar Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative o **Firestore Database**
4. Vá em "Configurações do Projeto" > "Apps" > "Adicionar App" (Web)
5. Copie as credenciais

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

Atualize o arquivo `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

### 4. Configurar Regras de Segurança do Firestore

No Firebase Console, vá para **Firestore Database** > **Regras** e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read, create, update, delete: if true;
      // Para produção, considere restrições adicionais
    }
  }
}
```

## 🎯 Como Usar

### Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run dev

# A aplicação estará disponível em:
# http://localhost:3000
```

### Build para Produção

```bash
# Criar build de produção
npm run build

# Visualizar build localmente
npm run preview
```

### Deploy no Firebase Hosting (Opcional)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Fazer login
firebase login

# Inicializar hosting
firebase init hosting

# Deploy
firebase deploy
```

## 📋 Scripts Disponíveis

| Comando           | Descrição                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia servidor de desenvolvimento         |
| `npm run build`   | Cria build de produção                     |
| `npm run preview` | Visualiza build localmente                 |
| `npm run lint`    | Executa análise de código (se configurado) |

## 🎨 Categorias de Mensagens

- **🔵 Geral** - Mensagens gerais e diversificadas
- **🔴 Aviso** - Alertas e informações importantes
- **🟢 Agradecimento** - Mensagens de gratidão
- **🟡 Sugestão** - Ideias e recomendações
- **🟣 Apoio** - Mensagens de incentivo e suporte

## 🔧 Personalização

### Adicionar Nova Categoria

1. Edite `src/components/MessageForm.jsx`:

```javascript
const categories = [
  // ... categorias existentes
  { value: "nova-categoria", label: "Nova Categoria" },
];
```

2. Atualize `src/components/MessageItem.jsx`:

```javascript
const getCategoryColor = (category) => ({
  // ... cores existentes
  "nova-categoria": "#cor-hexadecimal",
});

const getCategoryLabel = (category) => ({
  // ... labels existentes
  "nova-categoria": "Nova Categoria",
});
```

### Modificar Estilos

Os estilos principais estão em `src/App.css`. As variáveis CSS podem ser customizadas para alterar cores e temas.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **João Vitor Pinheiro** - _Desenvolvimento Inicial_ - [SeuGitHub](https://github.com/jvpinheiro1)

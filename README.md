# 💬 Fullstack Chat App

A full-stack real-time chat application built with **React, Node.js, Express, MongoDB, Socket.IO, and Redux Toolkit**.

The application allows users to create an account, securely log in, discover other registered users, and exchange messages in real time. Online user presence is tracked using Socket.IO, while conversations and messages are persisted in MongoDB.

---

## ✨ Features

* 🔐 **User Authentication**

  * User registration and login
  * JWT-based authentication
  * HTTP-only authentication cookies
  * Protected routes
  * Secure password hashing with bcrypt

* 💬 **Real-Time Messaging**

  * One-to-one messaging
  * Instant message delivery using Socket.IO
  * Messages persisted in MongoDB
  * Conversation history

* 🟢 **Online User Presence**

  * Real-time online user tracking
  * Socket connection mapped to authenticated users
  * Online user list updates automatically

* 👤 **User Profiles**

  * Full name and username
  * Gender selection during registration
  * Automatically generated avatars using DiceBear
  * Persistent avatar URL stored with the user

* 🔔 **User Feedback**

  * Success and error notifications using React Hot Toast

* 🛡️ **Protected Frontend Routes**

  * Authenticated users can access the chat interface
  * Login and signup pages for unauthenticated users

* 📱 **Responsive UI**

  * Tailwind CSS
  * DaisyUI components
  * Responsive chat layout

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| React 19         | UI development                          |
| Vite             | Frontend tooling and development server |
| React Router     | Client-side routing                     |
| Redux Toolkit    | Global state management                 |
| React Redux      | Redux integration                       |
| Socket.IO Client | Real-time communication                 |
| Axios            | HTTP requests                           |
| Tailwind CSS     | Styling                                 |
| DaisyUI          | UI components                           |
| React Hot Toast  | Notifications                           |
| React Icons      | Icons                                   |

### Backend

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Node.js       | JavaScript runtime             |
| Express 5     | REST API server                |
| MongoDB       | Database                       |
| Mongoose      | MongoDB ODM                    |
| Socket.IO     | Real-time communication        |
| JWT           | Authentication                 |
| bcryptjs      | Password hashing               |
| Cookie Parser | Authentication cookie handling |
| CORS          | Cross-origin communication     |
| Nodemon       | Development server             |

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │      Vite + React    │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
               REST API              Socket.IO
                    │                      │
                    ▼                      ▼
          ┌─────────────────┐    ┌─────────────────┐
          │ Express Server  │    │ Socket.IO Server│
          │                 │    │                 │
          │ Authentication  │    │ Online Users    │
          │ Users           │    │ New Messages    │
          │ Messages        │    │ User Sockets    │
          └────────┬────────┘    └────────┬────────┘
                   │                      │
                   └──────────┬───────────┘
                              ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │                  │
                    │ Users            │
                    │ Conversations    │
                    │ Messages         │
                    └──────────────────┘
```

---

## 📁 Project Structure

```text
fullstack-chat-app/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── utlities/
│   │   │
│   │   ├── Pages/
│   │   │   ├── Authentication/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   │
│   │   │   └── Home/
│   │   │       ├── Home.jsx
│   │   │       ├── UserSidebar.jsx
│   │   │       └── MessageContainer.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── slice/
│   │   │   │   ├── user/
│   │   │   │   ├── message/
│   │   │   │   └── socket/
│   │   │   │
│   │   │   └── store.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── message.controller.js
│   │
│   ├── db/
│   │   └── connection1.db.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── message.model.js
│   │   └── conversation.model.js
│   │
│   ├── routes/
│   │   ├── user.route.js
│   │   └── message.route.js
│   │
│   ├── socket/
│   │   └── socket.js
│   │
│   ├── utilities/
│   │
│   ├── server.js
│   └── package.json
│
└── .gitignore
```

---

## 🔄 How Messaging Works

The application uses a combination of REST APIs and Socket.IO.

### Sending a message

```text
User A
  │
  │ POST /api/v1/message/send/:receiverId
  ▼
Express API
  │
  ├── Authenticate user
  │
  ├── Find/Create conversation
  │
  ├── Save message to MongoDB
  │
  └── Find receiver's socket
           │
           ▼
      Socket.IO
           │
           ▼
       User B
```

When a message is sent:

1. The sender is authenticated using JWT.
2. The server finds or creates a conversation between the two users.
3. The message is stored in MongoDB.
4. Socket.IO identifies the receiver's active socket.
5. The server emits a `newMessage` event.
6. The receiver's React application updates immediately without refreshing the page.

---

## 🔐 Authentication Flow

Authentication is handled using JWT.

### Registration

```text
Signup
  ↓
Validate user input
  ↓
Check existing username
  ↓
Hash password with bcrypt
  ↓
Generate DiceBear avatar
  ↓
Create user in MongoDB
  ↓
Generate JWT
  ↓
Store JWT in HTTP-only cookie
```

### Login

```text
Login
  ↓
Find user
  ↓
Compare password with bcrypt
  ↓
Generate JWT
  ↓
Set authentication cookie
  ↓
Authenticated user
```

Protected backend routes retrieve the token from either the authentication cookie or an `Authorization: Bearer <token>` header.

---

## 🗄️ Database Models

### User

```text
User
├── fullName
├── username
├── password
├── gender
├── avatar
└── timestamps
```

### Conversation

```text
Conversation
├── participants[]
├── messages[]
└── timestamps
```

### Message

```text
Message
├── senderId
├── recieverId
├── message
└── timestamps
```

---

## 🔌 API Endpoints

### Authentication & Users

| Method | Endpoint                     | Description                | Auth |
| ------ | ---------------------------- | -------------------------- | ---- |
| `POST` | `/api/v1/user/register`      | Register a new user        | ❌    |
| `POST` | `/api/v1/user/login`         | Login user                 | ❌    |
| `POST` | `/api/v1/user/logout`        | Logout user                | ✅    |
| `GET`  | `/api/v1/user/getprofile`    | Get current user's profile | ✅    |
| `GET`  | `/api/v1/user/getOtherUsers` | Get other registered users | ✅    |

### Messages

| Method | Endpoint                                          | Description              | Auth |
| ------ | ------------------------------------------------- | ------------------------ | ---- |
| `POST` | `/api/v1/message/send/:recieverId`                | Send a message           | ✅    |
| `GET`  | `/api/v1/message/getmessages/:otherParticipantId` | Get conversation history | ✅    |

---

## ⚡ Socket.IO Events

### Client → Server

The client establishes a Socket.IO connection with the user's ID:

```text
connection
    ↓
userId
    ↓
userSocketMap[userId] = socketId
```

### Server → Client

#### `onlineUsers`

Emitted whenever users connect or disconnect.

```javascript
socket.on("onlineUsers", (onlineUsers) => {
  // Update online users
});
```

#### `newMessage`

Emitted when another user sends a message.

```javascript
socket.on("newMessage", (newMessage) => {
  // Update chat
});
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB or a MongoDB Atlas database
* Git

---

## 📥 Clone the Repository

```bash
git clone https://github.com/PrateekBanwari712/fullstack-chat-app.git

cd fullstack-chat-app
```

---

## ⚙️ Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRATION=7d

COOKIE_EXPIRES=7

CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 🎨 Frontend Setup

Open another terminal and navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_DB_URI=http://localhost:5000/api/v1
VITE_DB_ORIGIN=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🧪 Available Scripts

### Client

```bash
npm run dev
```

Start Vite development server.

```bash
npm run build
```

Create a production build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run preview
```

Preview the production build locally.

### Server

```bash
npm run dev
```

Start the backend with Nodemon.

---

## 🔑 Environment Variables

### Server

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `PORT`           | Backend server port                    |
| `MONGODB_URI`    | MongoDB connection string              |
| `JWT_SECRET`     | Secret used to sign JWTs               |
| `JWT_EXPIRATION` | JWT expiration duration                |
| `COOKIE_EXPIRES` | Cookie expiration period               |
| `CLIENT_URL`     | Frontend origin used by Socket.IO/CORS |

### Client

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `VITE_DB_URI`    | Base URL for REST API requests    |
| `VITE_DB_ORIGIN` | Backend origin used for Socket.IO |

> Never commit your `.env` files or expose secrets such as `JWT_SECRET` and database credentials.

---

## 🔒 Security

The application includes several security mechanisms:

* Password hashing using `bcryptjs`
* JWT-based authentication
* HTTP-only authentication cookies
* Protected API endpoints
* Authentication middleware
* CORS configuration
* Environment-based secret management

---

## 🖥️ Application Flow

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
             Signup/Login          Chat
                │                     │
                ▼                     ▼
          Authentication        Socket.IO
                │                     │
                ▼                     ▼
             JWT Cookie          Online Status
                                      │
                                      ▼
                                New Messages
                                      │
                                      ▼
                                  MongoDB
```

---

## 📚 What This Project Demonstrates

This project was built to practice and demonstrate full-stack development concepts including:

* Building REST APIs with Express
* MongoDB database design with Mongoose
* JWT authentication
* Password hashing
* HTTP-only cookies
* Protected routes
* React application architecture
* Redux Toolkit state management
* Async Redux thunks
* Socket.IO real-time communication
* Online presence tracking
* Client/server communication
* Environment variable configuration
* Responsive UI development with Tailwind CSS

---

## 🚧 Future Improvements

Potential features that can be added in future versions:

* 📷 Image messaging
* 😀 Emoji support
* ✍️ Typing indicators
* ✓✓ Message read receipts
* 🗑️ Delete messages
* ✏️ Edit messages
* 🔔 Push notifications
* 👥 Group conversations
* 🟢 Better online/offline presence handling
* 🔍 User search
* 📱 Improved mobile chat experience
* 🌙 More UI themes
* 📎 File sharing
* 🎙️ Voice messages
* 📞 Audio/video calling
* 🔒 Improved production security and validation

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 👨‍💻 Author

**Prateek Banwari**

GitHub: `PrateekBanwari712`

---

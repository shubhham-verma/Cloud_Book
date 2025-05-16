# Cloud Book

Cloud Book is a modern, full-stack note-taking application built with React (frontend) and Node.js/Express (backend), using MongoDB Atlas for persistent cloud storage. It allows users to securely create, edit, and delete notes from anywhere, with a clean and responsive interface.

---

## ✨ Features

- 📝 **Create, Edit, Delete Notes**: Manage your notes easily with a user-friendly interface.
- 🔍 **Search & Filter**: Quickly find notes with built-in search and filter functionality.
- ☁️ **Cloud Storage**: Notes are stored securely in MongoDB Atlas, accessible from any device.
- 🔒 **Authentication**: Secure login and registration for user privacy.
- ⚡ **Responsive UI**: Built with React and Tailwind CSS for a seamless experience.
- 🚀 **Easy Deployment**: Ready to deploy on Render, Netlify, Vercel, or Heroku.

---

## 🏗️ Project Structure

```
cloud_book/
  ├── src/
  │   ├── components/
  │   ├── context/
  │   └── App.js
  ├── cloudbook_backend/
  │   ├── index.js
  │   ├── db.js
  │   └── ... (backend files)
  ├── package.json
  ├── .env
  └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cloud_book.git
cd cloud_book
```

---

### 2. Backend Setup

1. Go to the backend directory:
    ```bash
    cd cloudbook_backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your MongoDB Atlas connection string:
    ```
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cloudbook?retryWrites=true&w=majority
    ```
4. Start the backend server:
    ```bash
    npm start
    ```
   The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

### 3. Frontend Setup

1. Go to the frontend directory:
    ```bash
    cd ../
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your backend URL:
    ```
    REACT_APP_BACKEND_URL=http://localhost:5000/
    ```
4. Start the React app:
    ```bash
    npm start
    ```
   The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment

- **Backend:** Deploy to [Render](https://render.com/), [Heroku](https://heroku.com/), or [Railway](https://railway.app/).
- **Frontend:** Deploy to [Netlify](https://netlify.com/) or [Vercel](https://vercel.com/).
- Update your frontend `.env` to use your deployed backend URL.

---

## 🔑 Environment Variables

**Backend (`cloudbook_backend/.env`):**
```
MONGO_URI=your_mongodb_atlas_connection_string
```

**Frontend (`cloud_book/.env`):**
```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com/
```

---

## 📚 API Endpoints

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/notes/fetch_notes`| Get all notes (auth needed)|
| POST   | `/api/notes/add_notes`  | Create a new note          |
| PUT    | `/api/notes/update_notes/:id` | Update a note        |
| DELETE | `/api/notes/delete_notes/:id` | Delete a note        |
| POST   | `/api/auth/login`       | User login                 |
| POST   | `/api/auth/register`    | User registration          |

---

## 🛡️ License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/)
- [Netlify](https://netlify.com/)
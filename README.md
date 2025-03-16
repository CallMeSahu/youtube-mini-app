# YouTube Mini-App

A simple YouTube Mini-App built with **Express.js, MongoDB, and EJS**, allowing users to:
- View video details fetched via YouTube API
- Change the video title dynamically
- Add and delete comments
- Log all events in a MongoDB database

## 📌 API Endpoints

### 🔹 Get Video and Comments
**`GET /`**
- Fetches video details from YouTube API and displays them on the home page.
- Retrieves all comments stored in the database.

### 🔹 Add a Comment
**`POST /comment`**
- Adds a new comment to the video.
- Request Body:
```json
{
  "username": "JohnDoe",
  "text": "This is a great video!"
}
```

### 🔹 Delete a Comment
**`DELETE /comment/:id`**
- Deletes a comment based on its unique ID.

### 🔹 Change Video Title
**`POST /video/title`**
- Updates the displayed title of the video dynamically.
- Request Body:
```json
{
  "newTitle": "My Updated Video Title"
}
```

---

## 🗄️ Database Schema

### 📍 Comment Schema (`Comment`)
```json
{
  "videoId": "string",
  "username": "string",
  "text": "string",
  "timestamp": "Date (default: now)"
}
```

### 📍 Log Schema (`Log`)
```json
{
  "action": "string",
  "details": "string",
  "timestamp": "Date (default: now)"
}
```

---
# Amethyst

**Amethyst** is a scalable and secure File Storage API with CDN integration, designed to make file management efficient and developer-friendly.

---

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Authenticate and retrieve a JWT.

### File Operations
- `POST /files/upload`
  - Upload a file.
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: Multipart file upload.
- `GET /files/{fileId}`
  - Retrieve file metadata and the CDN URL.
- `DELETE /files/{fileId}`
  - Delete a file.

### Analytics
- `GET /analytics/files/{fileId}` - Retrieve analytics for a specific file.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/amethys.git
   cd amethys
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   OVH_ACCESS_KEY=your_ovh_access_key
   OVH_SECRET_KEY=your_ovh_secret_key
   OVH_ENDPOINT=https://s3.your-region.ovh.net
   CDN_BASE_URL=https://cdn.yourdomain.com
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request and describe your changes in detail.

---




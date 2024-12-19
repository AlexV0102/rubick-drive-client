# Rubick drive client

### Overview

The frontend is built using React and Vite. Users can upload files, view their files, and manage file settings.

### Features

- File upload and management.
- Display file details.
- Search files by name.
- Serve/download files.

### Prerequisites

- Node.js (v20 or later)
- yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Create a `.env` file in the root directory with the following:

   ```env
   VITE_GOOGLE_CLIENT_ID=<your-client-id>
   VITE_API_BASE_URL=<https://example.com>
   ```

4. Start the application:
   ```bash
   yarn dev
   ```

### In progress

- Optimizations ( until react compiler comes in )
- Secure work with refresh/access tokens
- Hosting

### Notes

Ensure the backend is running and accessible via the URL specified in the `.env` file.

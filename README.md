# **Spotify API Album Finder**

A React-based web application that integrates with the Spotify API to fetch and display music data. The app allows users to log in with their Spotify account, browse playlists, search for songs, and interact with Spotify features.

## **Features**
Search bar: Search by Artist name to find their albums
Async and Await functions. 
UseState and UseEffect hooks.
GET and POST HTTP Request

## **Setup**
1. Clone the repository
```bash
git clone https://github.com/madelinegtj/Spotify-Album-Finder.git
cd spotify-api-react
```
2. Make sure Node is installed
```bash
node -v
```

3. Install bootstrap and other dependencies (node_modules)
```bash
npm install

npm install react-bootstrap bootstrap
```

[Create Spotify Developer Account: https://developer.spotify.com/
To interact with the Spotify API, you’ll need to obtain a Client ID and Client Secret by creating a Spotify Developer App. 
Once logged in, head over to "Dashboard" and accept the terms.
In Dashboard, click "Create App", and obtain Client ID and Client secret.]

4. Set up environment variables to connect to Spotify API:
Create a .env file in the root directory.
```bash
VITE_CLIENT_ID=YOUR CLIENT ID HERE
VITE_CLIENT_SECRET=YOUR CLIENT SECRET HERE
```

5.Run the development server:
```bash
npm run dev
```

## **Ideas for extending the project/ More ideas with Spotify API:**
- Data Visualization on Spotify Data
- Authentication to your personal Spotify account
- Playlist creator
- CSS Redesign
- If decide to deploy, need to set up a backend server to manage Spotify API auth (client ID and secret) and handle API requests. This way, your credentials are kept secure on the server, and users only interact with your frontend, which makes calls to your backend.

## **Resources**
- Code.dex tutorial source code: https://github.com/exrlla/codedex-api-template/blob/version-final/src/App.jsx
- Spotify for Developer API doc: https://developer.spotify.com/documentation/web-api
- Understanding the Spotify API by Spotify Engineering: https://engineering.atspotify.com/2015/03/understanding-spotify-web-api/
- React doc: https://react.dev/
- React bootstrap doc: https://react-bootstrap.netlify.app/

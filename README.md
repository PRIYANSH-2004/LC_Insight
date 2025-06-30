# LC-INSIGHT  🚀

A modern web application that allows you to analyze and compare LeetCode profiles with detailed statistics and insights.

## 🌟 Live Demo

**[Try it now!](https://lc-insight-git-main-priyansh2004s-projects.vercel.app/)**

## 📋 Features

- **Profile Analysis**: Get detailed statistics of any LeetCode user
- **User Comparison**: Compare multiple users side by side
- **Interactive Dashboard**: Clean and intuitive interface
- **Real-time Data**: Fetches latest data from LeetCode
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Modern CSS** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing

## 🏗️ Project Structure

```
leetcode-profile-analyzer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   └── utils/          # Helper functions and API calls
│   └── package.json
├── backend/                # Backend Express server
│   ├── index.js           # Main server file
│   ├── .env               # Environment variables
│   └── package.json
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/leetcode-profile-analyzer.git
   cd leetcode-profile-analyzer
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend folder:
   ```env
   VITE_PROXY_URL=your_proxy_url
   PROXY_PORT=5000
   ```
   
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
VITE_PROXY_URL=your_leetcode_proxy_url
PROXY_PORT=5000
```


## 🎯 Usage

1. **Analyze a Profile**: Enter a LeetCode username to view detailed statistics
2. **Compare Users**: Add multiple users to compare their performance
3. **View Insights**: Get comprehensive data about problem-solving patterns

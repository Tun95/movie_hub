# MovieHub - Movie Discovery Dashboard

A modern movie discovery dashboard built with React.js, TypeScript, and Vite. Browse popular movies, search with filters, view detailed information, and discover your next favorite film.

---

## 📋 Project Overview

This project fulfills the Phase 1 take-home assessment requirements:

- ✅ Modern movie discovery dashboard using React.js, TypeScript, and Vite
- ✅ TMDB API integration for movie data
- ✅ Home page with popular, top rated, and upcoming movies
- ✅ Search page with debounced search and filtering (genre, year, rating)
- ✅ Movie details page with comprehensive information and similar movies
- ✅ Responsive design matching the provided mockup
- ✅ Clean architecture with reusable components
- ✅ Type safety throughout

---

## 🚀 Live Demo

**Deployed URL:**  
https://moviehub.vercel.app

---

## 🛠️ Tech Stack

| Technology     | Purpose       |
| -------------- | ------------- |
| React.js 18    | UI Framework  |
| TypeScript     | Type Safety   |
| Vite           | Build Tool    |
| Tailwind CSS   | Styling       |
| TanStack Query | Data Fetching |
| React Router   | Routing       |
| Framer Motion  | Animations    |
| TMDB API       | Movie Data    |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/moviehub.git
cd moviehub
```

### 2. Install Dependencies

```bash
npm install

# or

yarn install
```

### 3. Get TMDB API Credentials

1. Create a free account at TMDB.
2. Navigate to **Settings → API**.
3. Request a Developer API Key.
4. Copy your API Key and Access Token.

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### 5. Start the Development Server

```bash
npm run dev

# or

yarn dev
```

Open:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build

# or

yarn build
```

The production build output will be generated in the `dist/` directory.

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub.
2. Create an account on Vercel.
3. Import your repository.
4. Add the required environment variables:

```env
VITE_TMDB_API_KEY
VITE_TMDB_ACCESS_TOKEN
```

5. Deploy.

---

## 📁 Project Structure

```text
src/
├── api/              # TMDB API integration
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── types/            # TypeScript definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

---

## ✨ Features Implemented

### 1. Home Page

- Hero section with discover call-to-action
- Now Playing movies section
- Popular movies section
- Top Rated movies section
- Upcoming movies section
- Responsive movie grid
- Loading states
- Error handling

### 2. Search & Filters

- Debounced search input (500ms delay)
- Genre filtering
- Year filtering
- Rating filtering
- Sorting options:
  - Popularity
  - Rating
  - Release Date
  - Title
- Clear filters functionality
- Infinite scroll pagination

### 3. Movie Details Page

- Backdrop hero section
- Movie poster and title
- Rating and vote count
- Overview and tagline
- Genre badges
- Director information
- Cast information
- Release date
- Runtime
- Budget and revenue (when available)
- Similar movie recommendations

---

## 🎯 Design Compliance

The implementation follows the provided mockup requirements:

- ✅ Sidebar navigation with Home and Search
- ✅ Discover section (Popular, Top Rated, Upcoming)
- ✅ Movie card grid layout
- ✅ Movie details layout with overview, genres, and metadata
- ✅ Search results with filters
- ✅ Similar movies section

---

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 📝 Environment Variables

| Variable                 | Required | Description       |
| ------------------------ | -------- | ----------------- |
| `VITE_TMDB_API_KEY`      | Yes      | TMDB API Key      |
| `VITE_TMDB_ACCESS_TOKEN` | Yes      | TMDB Access Token |

---

## 🐛 Troubleshooting

### Invalid API Key Error

Ensure your `.env` file contains valid TMDB API credentials:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### Build Fails

Remove dependencies and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

Run the application on a different port:

```bash
npm run dev -- --port 3000
```

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- TMDB for providing the movie database API
- Vercel for hosting and deployment

---

## 📧 Submission Notes

**Repository:**  
https://github.com/yourusername/moviehub

**Live Demo:**  
https://moviehub.vercel.app

### Assessment Status

- ✅ All required features implemented
- ✅ Responsive design completed
- ✅ TMDB integration completed
- ✅ Ready for review
- ✅ Built with React.js, TypeScript, and Tailwind CSS

---

Built with ❤️ using React.js, TypeScript, Vite, and Tailwind CSS.

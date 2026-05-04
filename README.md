# ATS Checker - AI-Powered Resume Optimizer

![ATS Checker Hero](client/src/assets/hero.png)

ATS Checker is a professional, full-stack web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). It uses advanced Natural Language Processing (NLP) and AI to analyze resume text against job descriptions, providing detailed scoring, keyword analysis, and strategic improvement suggestions.

## 🚀 Features

- **AI-Powered Analysis**: Deep-dive analysis of resumes using OpenAI's GPT-4o-mini (with deterministic fallback).
- **Match Scoring**: Comprehensive ATS score (0-100%) based on skills, keywords, experience, and formatting.
- **Visual Breakdown**: Interactive Radar Charts showing score distribution across key performance areas.
- **Skill Mapping**: Side-by-side comparison of found vs. missing skills from the job description.
- **Strategic Insights**: AI-generated "Before & After" rewrite suggestions for high-impact resume improvements.
- **Compliance Audit**: Automatic detection of common ATS formatting issues (e.g., bullet points, length, contact info).
- **PDF Export**: Generate high-quality, professional PDF reports to save or share.
- **History Dashboard**: Track your optimization progress over multiple applications.
- **Secure & Private**: Data is encrypted and managed with JWT authentication.

## 🛠 Tech Stack

### Frontend
- **React 19** (TypeScript)
- **Tailwind CSS 4** (Modern UI/UX)
- **Recharts** (Data Visualization)
- **Lucide React** (Iconography)
- **jsPDF & html2canvas** (PDF Generation)
- **Axios** (API Client)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JWT** (Authentication)
- **OpenAI API** (Strategic Insights)
- **Multer** (File Handling)
- **pdf-parse & mammoth** (Resume Text Extraction)

## 📂 Project Structure

```text
ats-checker/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # Axios instance & interceptors
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context provider
│   │   ├── pages/          # Full page views
│   │   └── utils/          # Helper functions
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/         # DB & other configs
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, Error, Upload handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routes
│   │   └── services/       # Business logic & AI integration
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- OpenAI API Key (Optional, for advanced insights)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ats-checker.git
cd ats-checker
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env from .env.example and add your values
cp .env.example .env
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
# Create .env from .env.example
cp .env.example .env
npm run dev
```

## 🔑 Environment Variables

### Server (`/server/.env`)
- `PORT`: Port number (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for token signing
- `CLIENT_URL`: URL of the frontend (for CORS)
- `OPENAI_API_KEY`: Your OpenAI API key

### Client (`/client/.env`)
- `VITE_API_URL`: Backend API base URL (e.g., `http://localhost:5000/api`)

## 📡 API Documentation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/checks/analyze` | Analyze resume vs JD | Yes |
| GET | `/api/checks` | Get all reports | Yes |
| GET | `/api/checks/:id` | Get specific report | Yes |
| DELETE | `/api/checks/:id` | Delete a report | Yes |

## 🚀 Deployment

### Backend (Render / Railway)
1. Connect your repo to Render/Railway.
2. Set Environment Variables in the dashboard.
3. Build Command: `npm install`
4. Start Command: `npm start`

### Frontend (Vercel / Netlify)
1. Connect your repo to Vercel/Netlify.
2. Set `VITE_API_URL` to your deployed backend URL.
3. Build Command: `npm run build`
4. Output Directory: `dist`

## 🔮 Future Improvements
- [ ] Multi-resume comparison.
- [ ] LinkedIn profile scraping.
- [ ] Job board integration (find jobs matching your resume).
- [ ] Dark mode support.
- [ ] More export formats (DOCX, JSON).

---
Built with ❤️ for job seekers everywhere.

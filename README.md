
# ✨ Review Summarizer AI (Next.js Version)

An intelligent web application that leverages the Google Gemini API to scrape the web, analyze public opinion, and generate a comprehensive overview of any movie, album, song, artist, book, or series.

This app goes beyond simple summaries, providing a rich, multi-faceted analysis in a clean and responsive interface. It is built with Next.js for optimal performance and a professional development workflow.

---

## 🚀 Key Features

-   🤖 **AI-Powered Summaries**: Get a concise summary of the overall sentiment, including both positive and negative points, scraped from reviews across the web.
-   🗺️ **Interactive Influence Map**: A unique, visual flowchart that lets you explore the artistic lineage of any work. Click on an influence to continue your journey of discovery!
-   📚 **Multi-Type Analysis**: Intelligently identifies the type of media you search for (movies, albums, books, artists, etc.) and provides tailored "Technical Details" for each.
-   🔍 **Persistent Search History**: Your searches are automatically saved to a sleek sidebar, allowing you to revisit past analyses with a single click.
-   ⚡ **Optimized with Next.js**: Built for performance, SEO, and a modern developer experience.
-   🎨 **Modern & Responsive UI**: Built with React, TypeScript, and Tailwind CSS for a seamless experience on any device.
-   🌐 **Ground-Truthed Answers**: Uses Google Search grounding to provide up-to-date and factual information in its analysis.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI**: [Google Gemini API](https://ai.google.dev/)

## ⚙️ Getting Started

This project is now a standard Next.js application.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Set up your environment variables:**
    -   Create a file named `.env.local` in the root of your project.
    -   Add your API key to this file:
        ```
        API_KEY=Your_Google_Gemini_API_Key
        ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Deployment (Vercel)

Deploying to Vercel is now incredibly simple:
1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and import your GitHub repository.
3.  Vercel will automatically detect that it is a Next.js project.
4.  Go to the project **Settings -> Environment Variables** and add your API key:
    -   **Key**: `API_KEY`
    -   **Value**: `Your_Google_Gemini_API_Key`
5.  Click **Deploy**. Done!

---

## 🔮 Future Features

-   **Deeper Content Analysis**: Analyze lyrical themes or character development.
-   **Comparison Tool**: Compare two topics side-by-side.
-   **Enhanced User Experience**: User accounts, a "Discover" mode, and theme customization.
-   **Expanded Data & Localization**: Integrate with other APIs (Spotify, TMDB) and translate the UI.
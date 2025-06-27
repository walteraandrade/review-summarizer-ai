# ✨ Review Summarizer AI

An intelligent web application that leverages the Google Gemini API to scrape the web, analyze public opinion, and generate a comprehensive overview of any movie, album, song, artist, book, or series.

This app goes beyond simple summaries, providing a rich, multi-faceted analysis in a clean and responsive interface.

<!-- Optional: Add a screenshot of the application here -->
<!-- ![App Screenshot](path/to/screenshot.png) -->

---

## 🚀 Key Features

-   🤖 **AI-Powered Summaries**: Get a concise summary of the overall sentiment, including both positive and negative points, scraped from reviews across the web.
-   🗺️ **Interactive Influence Map**: A unique, visual flowchart that lets you explore the artistic lineage of any work. Click on an influence to continue your journey of discovery!
-   📚 **Multi-Type Analysis**: Intelligently identifies the type of media you search for (movies, albums, books, artists, etc.) and provides tailored "Technical Details" for each.
-   🔍 **Persistent Search History**: Your searches are automatically saved to a sleek sidebar, allowing you to revisit past analyses with a single click.
-   🎨 **Modern & Responsive UI**: Built with React, TypeScript, and Tailwind CSS for a seamless experience on any device.
-   🌐 **Ground-Truthed Answers**: Uses Google Search grounding to provide up-to-date and factual information in its analysis.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI**: [Google Gemini API](https://ai.google.dev/)
-   **Dependencies**: Served via ESM (`esm.sh`) with no build step.

## ⚙️ Getting Started

This project is designed to be run in an environment that provides the Google Gemini API key as an environment variable.

### Prerequisites

-   [Git](https://git-scm.com/)
-   A modern web browser
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Deployment (Recommended)

The easiest way to run this application is to deploy it to a platform that supports environment variables, like Vercel or Netlify.

1.  **Fork/Clone this repository.**
2.  **Deploy to Vercel or Netlify:**
    -   Import your repository.
    -   The platform should detect it as a static site (no build command needed).
    -   **Crucially**, add an environment variable:
        -   **Key**: `API_KEY`
        -   **Value**: `Your_Google_Gemini_API_Key`
3.  Deploy and enjoy your live application!

---

## 🔮 Future Features

This project has a lot of potential for growth. Here are some ideas for future development:

-   **Deeper Content Analysis**:
    -   Analyze lyrical themes in music or character development in movies/books.
    -   Identify recurring motifs or symbols in an artist's body of work.

-   **Comparison Tool**:
    -   Allow users to compare two topics side-by-side (e.g., "The Beatles vs. The Rolling Stones" or "Star Wars vs. Star Trek").

-   **Enhanced User Experience**:
    -   **User Accounts**: Allow users to sign in to save their favorite analyses and create custom lists.
    -   **"Discover" Mode**: A feature that suggests interesting or trending works to explore.
    -   **Theme Customization**: Add a light mode and other theme options for users to choose from.

-   **Expanded Data & Localization**:
    -   Integrate with other APIs (e.g., Spotify for song previews, TMDB for movie posters).
    -   **Localization**: Translate the UI into different languages to make it accessible to a global audience.

import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk, Source, AnalysisResult } from '../../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set on the server");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { topic } = req.body;
    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ error: 'Topic is required and must be a string.' });
    }

        const prompt = `      Analyze the topic "${topic}". First, determine if it is a 'movie', 'album', 'song', 'artist', 'series', or 'book'.      Scrape the web to find reviews, public opinion, and factual data. Also, research its artistic lineage.      Then, provide a response in a single JSON object with the following structure. Do not include any text, markdown, formatting, or source citations like [1] or [2, 3] outside of this single JSON object.      The 'details' object MUST be tailored to the determined 'type'. Here are the structures for each type:      - For "movie": { "director": [{"name": "Name", "role": "Director"}], "cinematographer": [...], "cast": [...], "composer": [...] }      - For "album": { "musicians": [{"name": "Name", "role": "Instrument"}], "producers": [...], "composers": [...], "tracklist": [{"title": "Song Title"}] }      - For "song": { "artist": [{"name": "Artist Name"}], "album": "Album Name", "releaseYear": 1969, "genres": ["Genre1", "Genre2"] }      - For "artist": { "birthDate": "Month Day, Year", "deathDate": "Month Day, Year", "genres": ["Genre1", "Genre2"], "origin": "City, Country", "activeYears": "YYYY-YYYY", "zodiacSign": "Sign" }      - For "series": { "creators": [{"name": "Creator Name"}], "mainCast": [{"name": "Actor Name", "role": "Character Name"}], "seasons": 5, "network": "HBO", "status": "Ended" }      - For "book": { "author": [{"name": "Author Name"}], "publisher": "Publisher Name", "publicationYear": 1949, "genre": "Dystopian fiction" }            Example of the final JSON object:      {        "type": "...", // must be one of the specified types        "summary": "A concise but comprehensive summary of the overall sentiment and key points from the reviews. Mention both positive and negative aspects. Begin the summary directly without any introductory phrases.",        "details": {          // ... structure from above based on 'type'        },        "influenceMap": {          "influencedBy": [            { "name": "Specific Artist/Work Name", "description": "Briefly explain the influence. The 'name' field MUST be a precise, searchable name." }          ],          "hasInfluenced": [            { "name": "Specific Artist/Work Name", "description": "Briefly explain how it was influential. The 'name' field MUST be a precise, searchable name." }          ]        }      }      If you cannot determine the type or find enough information, return a JSON object with type 'unknown' and a null summary.    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                temperature: 0,
            },
        });

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
                let sources: Source[] = [];
        if (groundingMetadata && groundingMetadata.groundingChunks) {
            sources = (groundingMetadata.groundingChunks as GroundingChunk[])
                .map(chunk => chunk.web)
                .filter(source => source && source.uri && source.title);
        }
                const responseText = response.text;
        if (!responseText || responseText.trim() === '') {
            throw new Error("The AI returned an empty response.");
        }
                let jsonStr = responseText.trim().replace(/\d+(,\s*\d+)*\]/g, '');
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
          jsonStr = match[2].trim();
        }
        const parsedData = JSON.parse(jsonStr) as Omit<AnalysisResult, 'sources'>;
        const finalResult = { ...parsedData, sources };
                return res.status(200).json(finalResult);
    } catch (error) {
        console.error("Server-side error in /api/analyze:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return res.status(500).json({ error: `Failed to communicate with the AI service. ${errorMessage}` });
    }
}
import type { AnalysisResult } from '../types';

export async function analyzeTopic(topic: string): Promise<AnalysisResult | null> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data: AnalysisResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling our backend API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to communicate with the analysis service. ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the analysis service.");
  }
}
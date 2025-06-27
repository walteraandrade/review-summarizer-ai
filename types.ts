export interface Source {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: Source;
}

export interface PersonDetail {
  name: string;
  role?: string;
}

export interface MovieDetails {
  director?: PersonDetail[];
  cinematographer?: PersonDetail[];
  cast?: PersonDetail[];
  composer?: PersonDetail[];
}

export interface Song {
  title: string;
}

export interface AlbumDetails {
  musicians?: PersonDetail[];
  producers?: PersonDetail[];
  composers?: PersonDetail[];
  tracklist?: Song[];
}

export interface SongDetails {
  artist?: PersonDetail[];
  album?: string;
  releaseYear?: number;
  genres?: string[];
}

export interface SeriesDetails {
  creators?: PersonDetail[];
  mainCast?: PersonDetail[];
  seasons?: number;
  network?: string;
  status?: string;
}

export interface BookDetails {
  author?: PersonDetail[];
  publisher?: string;
  publicationYear?: number;
  genre?: string;
}

export interface ArtistDetails {
  birthDate?: string;
  deathDate?: string;
  genres?: string[];
  origin?: string;
  activeYears?: string;
  zodiacSign?: string;
}

export interface Influence {
  name: string;
  description?: string;
}

export interface InfluenceMapData {
  influencedBy: Influence[];
  hasInfluenced: Influence[];
}

export interface AnalysisResult {
  type: 'movie' | 'album' | 'song' | 'artist' | 'series' | 'book' | 'unknown';
  summary: string;
  sources: Source[];
  details: MovieDetails | AlbumDetails | SongDetails | SeriesDetails | BookDetails | ArtistDetails;
  influenceMap?: InfluenceMapData;
};
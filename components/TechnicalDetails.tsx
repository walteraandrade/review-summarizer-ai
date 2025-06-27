import React from 'react';
import type { MovieDetails, AlbumDetails, Song, PersonDetail, SongDetails, SeriesDetails, BookDetails, ArtistDetails, AnalysisResult } from '../types';

interface TechnicalDetailsProps {
  details: AnalysisResult['details'];
  type: AnalysisResult['type'];
}

const DetailRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  if (!children) return null;
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-lg font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg text-foreground sm:mt-0 sm:col-span-2">{children}</dd>
    </div>
  );
};

const PersonList: React.FC<{ people: PersonDetail[] | undefined }> = ({ people }) => {
    if (!people || people.length === 0) return null;
    return <>{people.map(p => `${p.name}${p.role ? ` (${p.role})` : ''}`).join(', ')}</>;
};

const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({ details, type }) => {
  if (type === 'unknown' || !details || Object.keys(details).length === 0) return null;
  
  const renderDetails = () => {
    switch(type) {
      case 'movie': {
        const d = details as MovieDetails;
        return <>
          <DetailRow label="Director"><PersonList people={d.director} /></DetailRow>
          <DetailRow label="Cinematographer"><PersonList people={d.cinematographer} /></DetailRow>
          <DetailRow label="Cast"><PersonList people={d.cast} /></DetailRow>
          <DetailRow label="Composer"><PersonList people={d.composer} /></DetailRow>
        </>;
      }
      case 'album': {
        const d = details as AlbumDetails;
        return <>
          <DetailRow label="Musicians"><PersonList people={d.musicians} /></DetailRow>
          <DetailRow label="Producers"><PersonList people={d.producers} /></DetailRow>
          <DetailRow label="Composers"><PersonList people={d.composers} /></DetailRow>
          {d.tracklist && d.tracklist.length > 0 && (
            <DetailRow label="Tracklist">
              <ol className="list-decimal list-inside space-y-1">
                {d.tracklist.map((song: Song, index: number) => <li key={index}>{song.title}</li>)}
              </ol>
            </DetailRow>
          )}
        </>;
      }
      case 'song': {
        const d = details as SongDetails;
        return <>
          <DetailRow label="Artist"><PersonList people={d.artist} /></DetailRow>
          <DetailRow label="Album">{d.album}</DetailRow>
          <DetailRow label="Release Year">{d.releaseYear}</DetailRow>
          <DetailRow label="Genres">{d.genres?.join(', ')}</DetailRow>
        </>;
      }
      case 'artist': {
        const d = details as ArtistDetails;
        return <>
          <DetailRow label="Born">{d.birthDate}</DetailRow>
          <DetailRow label="Died">{d.deathDate}</DetailRow>
          <DetailRow label="Zodiac Sign">{d.zodiacSign}</DetailRow>
          <DetailRow label="Genres">{d.genres?.join(', ')}</DetailRow>
          <DetailRow label="Origin">{d.origin}</DetailRow>
          <DetailRow label="Active Years">{d.activeYears}</DetailRow>
        </>;
      }
      case 'series': {
        const d = details as SeriesDetails;
        return <>
          <DetailRow label="Creators"><PersonList people={d.creators} /></DetailRow>
          <DetailRow label="Main Cast"><PersonList people={d.mainCast} /></DetailRow>
          <DetailRow label="Seasons">{d.seasons}</DetailRow>
          <DetailRow label="Network">{d.network}</DetailRow>
          <DetailRow label="Status">{d.status}</DetailRow>
        </>;
      }
      case 'book': {
        const d = details as BookDetails;
        return <>
          <DetailRow label="Author"><PersonList people={d.author} /></DetailRow>
          <DetailRow label="Publisher">{d.publisher}</DetailRow>
          <DetailRow label="Publication Year">{d.publicationYear}</DetailRow>
          <DetailRow label="Genre">{d.genre}</DetailRow>
        </>;
      }
      default:
        return null;
    }
  };

  const rendered = renderDetails();
  
  // Don't render the section if there are no details to show
  if (!React.Children.toArray(rendered).some(child => child !== null)) {
    return null;
  }
  
  return (
    <div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">Technical Details</h3>
      <div className="bg-muted/60 rounded-lg p-4 divide-y divide-border">
        {rendered}
      </div>
    </div>
  );
};

export default TechnicalDetails;
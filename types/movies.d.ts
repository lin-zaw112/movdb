interface genre {
  id: number;
  name: string;
}
interface productionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface productionCountry {
  iso_3166_1: string;
  name: string;
}
interface spokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface collection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}
interface movie {
  adult: false;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  belongs_to_collection: collection | null;
  budget: number;
  genres: genre[];
  homepage: string;
  imdb_id: string;
  production_companies: productionCompany[];
  production_countries: productionCountry[];
  revenue: string;
  runtime: number;
  spoken_languages: spokenLanguage;
  status: string;
  tagline: string;
  // Modified IMG_URL
  image_url: string;
}

interface moviesObj {
  page: number;
  results: movie[];
  total_pages: number;
}
interface video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: Date;
  id: string;
}

interface videos {
  id: number;
  results: video[];
}
interface star {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
  cast_id: number;
  character: string;
}

interface starList {
  id: number;
  cast: star[];
  crew: star[];
}
interface image {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
interface imageObj {
  backdrops: image[];
}

interface guestSessionToken {
  success: boolean;
  guest_session_id: string;
  expires_at: Date;
}

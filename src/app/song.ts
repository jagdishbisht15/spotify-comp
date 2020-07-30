export interface Song {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id : string;
    instrumentalness : number;
    key : number;
    liveness : number;
    loudness : number;
    mode : number;
    speechiness : number;
    tempo : number;
    time_signature : number;
    track_href : string;
    type : string;
    uri : string;
    valence : number;
    album: [];
    artists: [];
    available_markets: [];
    disc_number: number;
    explicit: boolean;
    external_ids: [];
    external_urls: [];
    href : string;
    is_local : boolean;
    name :  string;
    popularity : number;
    preview_url: string;




  }
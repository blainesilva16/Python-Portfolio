import { useState, useRef, useEffect } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './timeless-playlist.css'

interface Song {
  idcard: number
  name: string;
  artist: string;
  link: string;
}

const mockSongs: Song[] = [
  { 
    idcard: 1,
    name: 'Song 1',
    artist: 'Artist 1',
    link: 'Link 1'
  },
  { 
    idcard: 2,
    name: 'Song 2',
    artist: 'Artist 2',
    link: 'Link 2'
  },
]

const TimelessPlaylist = () => {
  const [date, setDate] = useState("")
  const [noSongsFound, setNoSongsFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [progressText, setProgressText] = useState<string>("")

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const evtSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (evtSourceRef.current) {
        evtSourceRef.current.close();
        evtSourceRef.current = null;
      }
    }
  }, []);

  const fetchSongs = async () => {
    if (!date) return
    setLoading(true);
    setSongs([]);
    setNoSongsFound(false);
    setProgressText("Starting...");

    const streamUrl = `${apiUrl}/api/get-top-songs-stream?date=${encodeURIComponent(date)}`;
    if (evtSourceRef.current) {
      try { evtSourceRef.current.close(); } catch {}
      evtSourceRef.current = null;
    }
    const evtSource = new EventSource(streamUrl);
    evtSourceRef.current = evtSource;

    evtSource.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        switch (payload.phase) {
          case 'fetching_titles':
            setProgressText(payload.message || 'Fetching the top 100 songs...');
            break;
          case 'titles_fetched':
            setProgressText(payload.message || `Fetched ${payload.count} titles`);
            break;
          case 'found_increment':
            setProgressText(payload.message || `Found ${payload.count} songs on Spotify`);
            break;
          case 'done':
            setSongs(payload.songs || []);
            setProgressText('Done');
            evtSource.close();
            setLoading(false);
            break;
          case 'error':
            setProgressText(payload.message || 'An error occurred');
            evtSource.close();
            setLoading(false);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Failed to parse stream message', err);
      }
    };

    evtSource.onerror = (err) => {
      console.error('EventSource error', err);
      setProgressText('Connection error');
      evtSource.close();
      setLoading(false);
    };
  }

  const dataHoje = () => {
    const data = new Date()
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const formatDate = (date: string) => {
    return `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`
  }

  const billboardAdress = (date: string) => {
    return `https://www.billboard.com/charts/hot-100/${date}/`
  }

  return (
    <div className="tp-demo">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="title">Timeless Playlist</h1>
          <h4 className="subtitle">Enter a date to check its top 100 songs:</h4>
          <div className="input" style={{ position: "relative" }}>
            <input 
              type="date" 
              max={dataHoje()} 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  fetchSongs();
                }
              }}
            />  
            <button
              aria-label="Search songs"
              className="search-btn"
              onClick={() => fetchSongs()}
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
  
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="content">
        <div className="content-header">
          {!noSongsFound && !loading && songs.length == 0 && (<h2 className="info">Your songs will be listed here.</h2>)}
          {!noSongsFound && !loading && songs.length > 0 && (
            <div>
              <h2 className="info">Top 100 songs of {formatDate(date)}:</h2>
              <p className="info-p">Check the top 100 songs here: <a href={billboardAdress(date)} className="btn-primary" target="_blank" rel="noreferrer">Billboard Top 100 songs of {formatDate(date)}</a></p>
            </div>)}
          {!noSongsFound && loading && (<h2 className="info">{progressText || `Loading top 100 songs of ${formatDate(date)}...`}</h2>)}
        </div>

        <div className="results">
          {noSongsFound && (
            <h2 className="info">No songs were found for the given date.</h2>
          )}
          {!noSongsFound && songs && songs.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {songs.map((s, index) => (
                <div key={s.idcard} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden", background: "rgb(1, 102, 55)" }}>
                  {/* <div style={{ padding: 12 }}> */}
                    <div className='card'>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 25, fontWeight: 700 }}><span className="text-accent font-bold mr-2">{index + 1}.</span>{s.name}</h3>
                        <p style={{ margin: "6px 0 0" }}><b>Artist:</b> {s.artist}</p>
                      </div>
                      <div>
                        <p><a href={s.link} className="btn-secondary" target="_blank" rel="noreferrer">Open on Spotify</a></p>                   
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
          ) : (
            !loading && (<div className="empty" />)
          )}
        </div>
      </div>
    </div>
  )
}

export default TimelessPlaylist
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'

import { usePlayer } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);
    const {
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      isLooping,
      isShuffling,
      togglePlay,
      toggleShuffle,
      toggleLoop,
      setPlayngState,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      clearPlayerState
    } = usePlayer();
    const episode = episodeList[currentEpisodeIndex];

    useEffect( () => {
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying])

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleSeek(amount:number){
        audioRef.current.currentTime= amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        if(hasNext){
            playNext()
        }else {
            clearPlayerState()
        }
    }
  return (
    <div className={styles.playerContainer}>
        <header>
            <img src="/playing.svg" alt="" />
            <strong>Tocando agora</strong>
       </header>

        { episode ? ( 
            <div className={styles.currentEpisode}>
                <Image 
                    width={592}
                    height={592}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <strong>{episode.title}</strong>
                <strong>{episode.members}</strong>
            </div>
        ) 
        : 
        (
            <div className={styles.emptyPlayer}>
                <strong>Selecionar um podcast para ouvir</strong>
            </div>
        )

        }

        <footer className={ !episode ? styles.empty : ''}>
            <div className={styles.progress}>
                <span>{convertDurationToTimeString(progress)}</span>
                <div className={styles.slider}>
                    { episode ? (
                        <Slider 
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                            trackStyle={ { backgroundColor: '#04d361' }}
                            railStyle={ { backgroundColor: '#9f75ff' }}
                            handleStyle={ { backgroundColor: '#04d361', borderWidth:4 }}
                        />
                    ) : (
                        <div className={styles.emptySlider} />
                    )}
                    
                </div>
                <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            { episode && (
                <audio 
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onEnded={handleEpisodeEnded}
                    loop={isLooping}
                    onPlay= { () => setPlayngState(true) }
                    onPause= { () => setPlayngState(false) }
                    onLoadedMetadata={setupProgressListener}
                />
            )}

            <div className={styles.buttons} >
                <button 
                    type="button" 
                    disabled={!episode || episodeList.length ==1}
                    onClick={toggleShuffle}
                    className= {isShuffling ? styles.isActive : ''}
                    >
                    <img src="/shuffle.svg" alt="Embaralhar" />
                </button>
                <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious }>
                    <img src="/play-previous.svg" alt="Toc Ant" />
                </button>
                <button 
                type="button" 
                className={styles.playButton} 
                disabled={!episode}
                onClick={togglePlay}
                >
                    { isPlaying 
                    ? <img src="/pause.svg" alt="Pause" /> 
                    : <img src="/play.svg" alt="Tocar" />}
                </button>
                <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                    <img src="/play-next.svg" alt="TocarProxima" />
                </button>
                <button 
                type="button" 
                disabled={!episode}
                onClick={toggleLoop}
                className= {isLooping ? styles.isActive : ''}
                >
                    <img src="/repeat.svg" alt="repetir" />
                </button>

            </div>
        </footer>
    </div>
  )
}

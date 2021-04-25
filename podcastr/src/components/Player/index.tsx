import Image from "next/image";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)
    const episode = episodeList[currentEpisodeIndex];

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

        <footer className={styles.empty}>
            <div className={styles.progress}>
                <span>00:00</span>
                <div className={styles.slider}>
                    <div className={styles.emptySlider} />
                </div>
                <span>00:00</span>
            </div>

            <div className={styles.buttons} >
                <button type="button" >
                    <img src="/shuffle.svg" alt="Embaralhar" />
                </button>
                <button type="button" >
                    <img src="/play-previous.svg" alt="Toc Ant" />
                </button>
                <button type="button" className={styles.playButton} >
                    <img src="/play.svg" alt="Toc" />
                </button>
                <button type="button" >
                    <img src="/play-next.svg" alt="TocarProxima" />
                </button>
                <button type="button" >
                    <img src="/repeat.svg" alt="repetir" />
                </button>

            </div>
        </footer>
    </div>
  )
}

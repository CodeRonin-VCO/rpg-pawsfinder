import styles from "./avatars.module.css";
// Import des avatars
import fourmi from "/public/avatars/fourmi.png";
import grenouille from "/public/avatars/grenouille.png";
import pigeon from "/public/avatars/pigeon.png";
import poisson from "/public/avatars/poisson.png";
import poule from "/public/avatars/poule.png";
import serpent from "/public/avatars/serpent.png";
import taureau from "/public/avatars/taureau.png";
import chouette from "/public/avatars/chouette.png";
import crabe from "/public/avatars/crabe.png";
import paresseux from "/public/avatars/paresseux.png";

export default function AvatarsCards({ onAvatarsCard, selectedAvatar }) {
    const avatars = [fourmi, grenouille, pigeon, poisson, poule, serpent, taureau, chouette, crabe, paresseux];


    return (
        <div className={styles.container_avatars}>
            {avatars.map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}
                    alt={`Avatar à l'apparence de ${avatar}`}
                    className={`${styles.avatars_choice} ${ selectedAvatar === avatar ? styles.selected_avatar : ''}`}
                    onClick={() => onAvatarsCard(avatar)}
                />
            ))}
        </div>
    )
}
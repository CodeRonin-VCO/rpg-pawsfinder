import styles from "./avatars.module.css";
// Import des avatars
import fourmi from "./../../../../assets/avatars/fourmi.png";
import grenouille from "./../../../../assets/avatars/grenouille.png";
import pigeon from "./../../../../assets/avatars/pigeon.png";
import poisson from "./../../../../assets/avatars/poisson.png";
import poule from "./../../../../assets/avatars/poule.png";
import serpent from "./../../../../assets/avatars/serpent.png";
import taureau from "./../../../../assets/avatars/taureau.png";
import chouette from "./../../../../assets/avatars/chouette.png";
import crabe from "./../../../../assets/avatars/crabe.png";
import paresseux from "./../../../../assets/avatars/paresseux.png";

export default function AvatarsCards({ onAvatarsCard, selectedAvatar }) {
    const avatars = [fourmi, grenouille, pigeon, poisson, poule, serpent, taureau, chouette, crabe, paresseux];

    // fixme: changer les images du dosser public vers le dossier assets (pas d'import depuis public)

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
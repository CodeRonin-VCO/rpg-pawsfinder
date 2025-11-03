import { useAtom } from "jotai";
import styles from "./bonus.module.css";
import { playerAtom } from "../../../../../atom/atom.js";
import { extractImageName } from "../../../../../utils/extractImageName.js";

export default function BonusComponent() {
    const [player, setPlayer] = useAtom(playerAtom);


    return (
        <div className={styles.wrapper}>
            <section className={`${styles.section} ${styles.intro}`}>
                <h3 className={styles.big_title}>Fin de la première arène</h3>
                <article className={styles.bonus}>
                    <h4>Bonus ✨</h4>
                    <ul>
                        <li>Soin +10</li>
                        <li>Mana +20</li>
                        <li>Force : + 5</li>
                        <li>Magie : + 5</li>
                        <li>Dextérité: +2</li>
                    </ul>
                </article>
            </section>
            <section className={`${styles.section}`}>
                <h6 className={styles.title}>Votre héro fraichement reposé !</h6>
                <div className={styles.chosen_avatar}>
                    <img src={player.avatar} alt={`avatar de ${extractImageName(player.avatar)}`} />
                </div>
                <div className={styles.stat_info}>
                    <p><strong>{player.nom || "Nom"}</strong></p>
                    <p><span>Classe:</span><span></span><span>{player.logo} {player.valueFr}</span></p>
                    <p><span>Force:</span><span>{player.force}</span></p>
                    <p><span>Magie:</span><span>{player.magie}</span></p>
                    <p><span>Vie:</span><span>{player.maxVie}</span></p>
                    <div className={styles.vie_container}><div className={styles.vie_bar}></div></div>
                    <p><span>Mana:</span><span>{player.maxMana}</span></p>
                    <div className={styles.mana_container}><div className={styles.mana_bar}></div></div>
                    <p><span>Potions:</span><span>{player.potions}</span></p>
                </div>
            </section>
        </div>
    )
}
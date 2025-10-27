import { useAtom } from "jotai";
import styles from "./arena-pre.module.css";
import { playerAtom } from "../../../../atom/atom.js";
import dataEnnemy from "./../../../../data/data-ennemy.json";
import { useState } from "react";

export default function ArenaPreCard() {
    const [player, setPlayer] = useAtom(playerAtom);
    // Obtenir les ennemis du fichier json
    const getEnnemyById = (id) => dataEnnemy.ennemies.find(en => en.id === id);
    const [ennemy, setEnnemy] = useState(getEnnemyById(2));

    
    return (
        <article className={styles.arene}>
            <div className={`${styles.mobile}`}>
                <div className={styles.dialog}>
                    Hello Bourrator
                    <div className={styles.color_en}>Hello player !</div>
                </div>
                <div className={styles.animation_zone}>
                    <div className={styles.player}>
                        <img src={player.avatar} alt={`Avatar de ${player.nom}`} />
                    </div>
                    <div className={styles.ennemy}>
                        <img src={ennemy.avatar} alt={`Avatar de ${ennemy.nom}`} />
                    </div>
                </div>
                <div className={styles.control_panel}>
                    <button>Attaque</button>
                    <button>Att. magique</button>
                    <button>Att. spe.</button>
                    <button>Potions</button>
                </div>
            </div>
            <div className={`${styles.desktop}`}>

            </div>
        </article>
    )
}
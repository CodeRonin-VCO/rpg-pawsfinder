import { useAtom } from "jotai";
import HeaderLayout from "../../../layout/header/header.jsx";
import styles from "./level1.route.module.css";
import { playerAtom } from "../../../atom/atom.js";
import { Link } from "react-router";
import { useState } from "react";
import { extractImageName } from "../../../utils/extractImageName.js";

export default function Level1Route() {
    const [playerCharacter, setPlayerCharacter] = useAtom(playerAtom);
    const [count, setCount] = useState(0);


    return (
        <div className="page">
            <HeaderLayout />
            <h4 className={styles.page_title}>La Quête de {playerCharacter.nom} - L'Eveil du Héro</h4>
            <main>
                {count < 3 &&
                    <article className={styles.intro}>
                        <section className={`${styles.section}`}>
                            <h6 className={styles.title}>Prologue: l'appel de la gloire</h6>

                            {/* Para 1 */}
                            {count === 0 &&
                                (<p>Dans la paisible vallée de Brumelune, où les prés verdoyants s’étendent à perte de vue, un.e jeune {extractImageName(playerCharacter.avatar)} nommé.e <span className={styles.highlight}>{playerCharacter.nom}</span> rêve de gloire. </p>)
                            }

                            {/* Para2 */}
                            {count === 1 &&
                                <p>Alors que les anciens racontent des légendes autour du feu, il/elle écoute, fasciné, l’histoire de <span className={styles.highlight}>l’Éclat de Nyx</span> – un artefact mystérieux capable d’exaucer le vœu le plus cher de celui qui le possède. Personne ne sait où il se trouve, mais une rumeur persiste : il serait caché dans les terres les plus dangereuses du royaume.</p>
                            }

                            {/* Para3 */}
                            {count === 2 &&
                                <p>Un soir, après une dispute avec son mentor (un vieux bouc sage mais pessimiste), <span className={styles.highlight}>{playerCharacter.nom}</span> clame haut et fort : « Je partirai demain à l’aube ! Je rapporterai l’Éclat de Nyx, et mon nom résonnera dans toutes les tavernes ! » Le lendemain, équipé d’une arme rouillée et d’un sac trop léger, il/elle s’engage sur la Route des Prés, premier pas vers l’inconnu...</p>
                            }


                            <div className={styles.container_btn}>
                                {count > 0 && <button onClick={() => setCount(prev => prev - 1)}>Précédent</button>}
                                <button onClick={() => setCount(prev => prev + 1)}>Suivant</button>
                            </div>
                        </section>
                    </article>
                }

                {count > 2 &&
                    <article className={styles.valider}>
                        <section className={`${styles.section}`}>
                            <h6 className={styles.title}>Valider le héro et partir à l'aventure !</h6>
                            <div className={styles.chosen_avatar}>
                                <img src={playerCharacter.avatar} alt={`avatar de ${extractImageName(playerCharacter.avatar)}`} />
                            </div>
                            <div className={styles.stat_info}>
                                <p><strong>{playerCharacter.nom || "Nom"}</strong></p>
                                <p><span>Classe:</span><span></span><span>{playerCharacter.logo} {playerCharacter.valueFr}</span></p>
                                <p><span>Force:</span><span>{playerCharacter.force}</span></p>
                                <p><span>Magie:</span><span>{playerCharacter.magie}</span></p>
                                <p><span>Vie:</span><span>{playerCharacter.maxVie}</span></p>
                                <div className={styles.vie_container}><div className={styles.vie_bar}></div></div>
                                <p><span>Mana:</span><span>{playerCharacter.maxMana}</span></p>
                                <div className={styles.mana_container}><div className={styles.mana_bar}></div></div>
                            </div>
                        </section>
                        <div className={styles.container_link}>
                            <Link to={"/"}>Choisir un autre personnage</Link>
                            <Link to={"/level1"}>Partir à l'aventure</Link>
                        </div>
                    </article>
                }

            </main>
        </div>
    )
}
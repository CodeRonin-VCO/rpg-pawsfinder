import { useAtom } from "jotai";
import styles from "./arena-pre.module.css";
import { playerAtom } from "../../../../atom/atom.js";
import dataEnnemy from "./../../../../data/data-ennemy.json";
import { useState } from "react";
import { executeEnnemyAttack, executePlayerAttack } from "../../../../engine/combat.engine.js";
import { useNavigate } from "react-router";



export default function ArenaPreCard() {
    // ==== States ====
    const [player, setPlayer] = useAtom(playerAtom);
    // Obtenir les ennemis du fichier json
    const getEnnemyById = (id) => dataEnnemy.ennemies.find(en => en.id === id);
    const [ennemy, setEnnemy] = useState(getEnnemyById(2));

    // Animation combat
    const [animating, setAnimating] = useState("");
    const [ennemyAnimating, setEnnemyAnimating] = useState("");

    // Dialogues management
    const [playerMessage, setPlayerMessage] = useState("Mécréant ! C'est ton dernier jour !");
    const [ennemyMessage, setEnnemyMessage] = useState("Oink oink... Tu vas morfler, imbécile !");

    // Fin de match
    const [stopMatch, setStopMatch] = useState(false);
    const [matchResult, setMatchResult] = useState("");

    // Navigate
    const navigate = useNavigate();

    // ==== Animations className ====
    const playerAnimationClassName = {
        force: styles.attack,
        critical: styles.criticalAttack,
        attackSpe: styles.attackSpe,
        escaped: styles.escape,
        heal: styles.healAnimation,
        magie: styles.magicAttack
    }[animating] || "";
    const ennemyAnimationClassName = {
        force: styles.counter,
        critical: styles.countCrit,
        attackSpe: styles.countSpe,
        escaped: styles.escape,
        heal: styles.healAnimation,
        magie: styles.countMag
    }[ennemyAnimating] || "";

    // ==== Fonctions animations ====
    function triggerAnimation(type = "normal") {
        setAnimating("");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setAnimating(type);
            });
        });
    }

    function triggerEnnemyAnimation(type = "force") {
        setEnnemyAnimating("");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setEnnemyAnimating(type);
            });
        });
    }


    // ==== Calculer le % de vie et mana ====
    const playerViePercent = (player.vie / player.maxVie) * 100;
    const playerManaPercent = (player.mana / player.maxMana) * 100;
    const ennemyViePercent = (ennemy.vie / ennemy.maxVie) * 100;
    const ennemyManaPercent = (ennemy.mana / ennemy.maxMana) * 100;

    // ==== Fonction événment: gestion action ====
    function handlePlayerAction(type) {
        const result = executePlayerAttack({
            attacker: player,
            defender: ennemy,
            type,
            onDialog: setPlayerMessage,
            onEnnemyDialog: setEnnemyMessage,
            onAnimation: triggerAnimation,
            onEnnemyAnimation: triggerEnnemyAnimation,
            onEndMatch: setMatchResult
        });

        // Met à jour l'état du joueur et de l'ennemi
        setPlayer(result.attacker);
        setEnnemy(result.defender);

        // Gestion des interruptions (ex: potion)
        if (result.interrupt) {
            if (type === "heal") {
                setEnnemyMessage("Tu es à sec, plus de potions pour toi !");
                setTimeout(() => setEnnemyMessage(""), 3000);
            }
            return;
        }

        // Gestion des messages et de la fin de match
        if (type === "heal") {
            setPlayerMessage("Je reprends des forces !");
            setTimeout(() => setPlayerMessage(""), 3000);
        }

        // Fin de match ou contre-attaque
        if (result.matchEnded) {
            setTimeout(() => {
                setStopMatch(true);
            }, 300);
        } else {
            setTimeout(() => {
                triggerEnnemyCounterAttack(result.defender, result.attacker);
            }, 1500);
        }
    }

    function triggerEnnemyCounterAttack(updatedEnnemy, updatedPlayer) {
        // Si l'ennemi est déjà mort, inutile de contre-attaquer
        if (updatedEnnemy.vie <= 0) {
            console.warn("Contre-attaque annulée : ennemi déjà vaincu.");
            return;
        }

        const enemyResult = executeEnnemyAttack({
            attacker: updatedEnnemy,
            defender: updatedPlayer,
            onDialog: setEnnemyMessage,
            onEnnemyDialog: setPlayerMessage,
            onAnimation: triggerAnimation,
            onEnnemyAnimation: triggerEnnemyAnimation,
            onEndMatch: setMatchResult
        });

        if (!enemyResult) {
            console.warn("Contre-attaque interrompue ou match terminé.");
            return;
        }

        // Met à jour l'état après la contre-attaque
        setPlayer(enemyResult.defender);
        setEnnemy(enemyResult.attacker);

        // Gestion de la fin de match
        if (enemyResult.matchEnded) {
            setTimeout(() => setStopMatch(true), 100);
        }
    }

    // ==== Gérer adversaire suivant ====
    function handleNextOpponent() {
        switch (ennemy.id) {
            case 2:
                setEnnemy(getEnnemyById(3))
                setStopMatch(false);
                setMatchResult("");
                setPlayer(prev => ({ ...prev, potions: prev.potions + 2 }));
                player.potions += 2;
                setPlayerMessage("");
                setEnnemyMessage("");

                break;
            case 3:
                setEnnemy(getEnnemyById(1))
                setStopMatch(false);
                setMatchResult("");
                setPlayer(prev => ({ ...prev, potions: prev.potions + 2 }));
                setPlayerMessage("");
                setEnnemyMessage("");

                break;

            default:
                setPlayer(prev => {
                    const newMaxVie = prev.maxVie + 10;
                    const newMaxMana = prev.maxMana + 20;

                    return {
                        ...prev,
                        maxVie: newMaxVie,
                        maxMana: newMaxMana,
                        vie: newMaxVie,
                        mana: newMaxMana,
                        force: prev.force + 5,
                        magie: prev.magie + 5,
                        dexterite: prev.dexterite + 2,
                    };
                })
                navigate("/versLevel2")
                break;
        }
    }


    return (
        <article className={styles.arene}>
            <div className={`${styles.mobile}`}>
                <div className={styles.dialog}>
                    <div className={styles.log_pl}>{playerMessage}</div>
                    <div className={styles.log_en}>{ennemyMessage}</div>
                </div>
                <div className={styles.animation_zone}>
                    {/* // ____Player___ */}
                    <div className={`${styles.player} ${playerAnimationClassName}`}>
                        <img src={player.avatar} alt={`Avatar de ${player.nom}`} />
                        {animating === "magie" && <span className={styles.magicRay}></span>}
                        {animating === "attackSpe" && (
                            <span className={styles.attackSpeGlow}></span>
                        )}
                    </div>
                    {/* // ____Ennemy____ */}
                    <div className={`${styles.ennemy} ${ennemyAnimationClassName}`}>
                        <img src={ennemy.avatar} alt={`Avatar de ${ennemy.nom}`} />
                        {ennemyAnimating === "magie" && <span className={styles.magicRayEnnemy}></span>}
                        {ennemyAnimating === "attackSpe" && (
                            <span className={styles.attackSpeGlowEnnemy}></span>
                        )}
                    </div>
                </div>
                <div className={styles.control_panel}>
                    <div className={styles.stat_container}>
                        <p><strong>{player.nom}</strong></p>
                        <p><span>Vie:</span><span>{player.vie} / {player.maxVie}</span></p>
                        <div className={styles.vie_container}><div className={styles.vie_bar} style={{ width: `${playerViePercent}%` }}></div></div>
                        <p><span>Mana:</span><span>{player.mana} / {player.maxMana}</span></p>
                        <div className={styles.mana_container}><div className={styles.mana_bar} style={{ width: `${playerManaPercent}%` }}></div></div>
                    </div>
                    <div className={styles.stat_container}>
                        <p><strong>{ennemy.nom}</strong></p>
                        <p><span>Vie:</span><span>{ennemy.vie} / {ennemy.maxVie}</span></p>
                        <div className={styles.vie_container}><div className={styles.vie_bar} style={{ width: `${ennemyViePercent}%` }}></div></div>
                        <p><span>Mana:</span><span>{ennemy.mana} / {ennemy.maxMana}</span></p>
                        <div className={styles.mana_container}><div className={styles.mana_bar} style={{ width: `${ennemyManaPercent}%` }}></div></div>
                    </div>
                    <button onClick={() => handlePlayerAction("force")} disabled={stopMatch}>Attaque</button>
                    <button onClick={() => handlePlayerAction("magie")} disabled={stopMatch}>Att. magique</button>
                    <button onClick={() => handlePlayerAction("attackSpe")} disabled={stopMatch}>Att. spe. [{player.attackSpeNb}]</button>
                    <button onClick={() => handlePlayerAction("heal")}>Potions</button>
                </div>
                {stopMatch && (
                    <div className={styles.popup}>
                        <div className={styles.popup_content}>
                            <h2>{matchResult === "Victoire"
                                ? "🎉 Victoire !"
                                : matchResult === "Défaite"
                                    ? "💀 Défaite..."
                                    : "⏳ Résultat inconnu"}</h2>
                            <p>Le combat est terminé.</p>
                            <h4>+ 2 potions ✨</h4>
                            <button onClick={handleNextOpponent}>
                                {ennemy.id === 1 ? "Suite" : "Adversaire suivant"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className={`${styles.desktop}`}>

            </div>
        </article>
    )
}
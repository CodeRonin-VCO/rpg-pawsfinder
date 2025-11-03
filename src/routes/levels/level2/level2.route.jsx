import { useAtom } from "jotai";
import HeaderLayout from "../../../layout/header/header.jsx";
import styles from "./level2.route.module.css";
import { playerAtom } from "../../../atom/atom.js";
import { extractImageName } from "../../../utils/extractImageName.js";
import { useState } from "react";
import ArenaPreCard from "./components/arena-pre.jsx";

export default function Level2Route() {
    const [player, setPlayer] = useAtom(playerAtom);
    const [count, setCount] = useState(0);
    const [answerClick, setAnswerClick] = useState(null);

    function handleAnswer(answer) {
        setAnswerClick(prev => (prev === answer ? null : answer));
    }


    return (
        <div className="page">
            <HeaderLayout />

            <main>
                {count === 0 && (
                    <article className={styles.intro}>
                        <div className={styles.player}>
                            <img src={player.avatar} alt={`${extractImageName(player.avatar)}`} />
                        </div>
                        <h3 className={styles.title}>Level 1 : La route des Prés</h3>
                    </article>
                )}

                {count > 0 && count < 9 && (
                    <article className={styles.discussion}>
                        {count === 1 && (
                            <p className={styles.dialog}>(Les brigands surgissent des fourrés, encerclant {player.nom}. Bourrator crache par terre.)</p>
                        )}
                        {count === 2 && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator:</strong></p>
                                <p> « Eh ben, qu’est-ce qu’on a là ? Un.e {extractImageName(player.avatar)} égaré.e qui croit être un héros ? »</p>
                                <p className={styles.coms}>(Rires gras des sous-fifres.)</p>
                                <p>« T’as de l’or, {extractImageName(player.avatar)} ? Ou juste des rêves trop grands pour ta carcasse ? »</p>
                            </div>
                        )}
                        {count === 3 && (
                            <div className={`${styles.dialog} ${styles.dial_player}`}>
                                <p><strong className={styles.color}>{player.nom}:</strong></p>
                                <p> « Je ne cherche pas la bagarre. Laissez-moi passer, et je ne vous causerai aucun ennui. »</p>
                            </div>
                        )}
                        {count === 4 && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Sous-fifre 1</strong> (ricanant) :</p>
                                <p> « Ohhh, il “ne cherche pas la bagarre” ! Bourrator, t’as entendu ? Il veut jouer au gentil ! »</p>
                            </div>
                        )}
                        {count === 5 && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p> « Écoute-moi bien, {extractImageName(player.avatar)}. Ici, c’est MA route. Et pour passer, y’a deux options : » </p>
                                <p className={styles.coms}>(Il lève une patte, comptant sur ses sabots crasseux.)</p>
                                <p>« Un : tu nous donnes tout ce que t’as. Deux : tu réponds à mon énigme. Si t’échoues… »</p>
                                <p className={styles.coms}>(Il sort une masse cloutée de son dos.)</p>
                                <p>« Ben, on va bien rigoler. »</p>
                            </div>
                        )}
                        {count === 6 && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p> « Écoute-moi bien, {extractImageName(player.avatar)}. Ici, c’est MA route. Et pour passer, y’a deux options : » </p>
                                <p className={styles.coms}>(Il lève une patte, comptant sur ses sabots crasseux.)</p>
                                <p>« Un : tu nous donnes tout ce que t’as. Deux : tu réponds à mon énigme. Si t’échoues… »</p>
                                <p className={styles.coms}>(Il sort une masse cloutée de son dos.)</p>
                                <p>« Ben, on va bien rigoler. »</p>
                            </div>
                        )}
                        {count === 7 && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> (souriant de toutes ses dents jaunes) :</p>
                                <p> « Voici l’énigme, {extractImageName(player.avatar)} : »</p>
                                <p>« Je suis léger comme une plume, mais le plus fort des guerriers ne peut me tenir plus de quelques instants. Les rois me craignent, les mendiants m’ignorent. Qu’est-ce que je suis ? »</p>
                                <p className={styles.coms}>(Silence. Les sous-fifres gloussent.)</p>
                                <div className={styles.container_answers}>
                                    <button onClick={() => handleAnswer("Le souffle.")} className={answerClick === "Le souffle." ? styles.selected_answer : ""}>Le souffle.</button>
                                    <button onClick={() => handleAnswer("La gloire.")} className={answerClick === "La gloire." ? styles.selected_answer : ""}>La gloire.</button>
                                    <button onClick={() => handleAnswer("Rien.")} className={answerClick === "Rien." ? styles.selected_answer : ""}>Rien.</button>
                                    <button onClick={() => handleAnswer("Le temps.")} className={answerClick === "Le temps." ? styles.selected_answer : ""}>Le temps.</button>
                                </div>
                            </div>
                        )}
                        {count === 8 && answerClick === "Le souffle." && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p>« Le souffle ? HA ! T’es aussi bête que tu en as l’air ! Le souffle, on peut le tenir, idiot ! »</p>
                                <p className={styles.coms}>(Il frappe le sol avec sa masse.)</p>
                                <p>« À L'ATTAQUE ! »</p>
                            </div>
                        )}
                        {count === 8 && answerClick === "La gloire." && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p>« La gloire ?! »</p>
                                <p className={styles.coms}>(Éclate de rire.)</p>
                                <p>« La gloire, c’est pour les morts, {extractImageName(player.avatar)} ! Et t’es pas encore mort… mais ça va venir ! »</p>
                                <p className={styles.coms}>(Les cochons chargent.)</p>
                            </div>
                        )}
                        {count === 8 && answerClick === "Rien." && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p>« RIEN ?! »</p>
                                <p className={styles.coms}>(Il se tape les cuisses.)</p>
                                <p>« Bien sûr que t’es rien, {extractImageName(player.avatar)} ! Et c’est pour ça qu’on va t’écraser ! »</p>
                            </div>
                        )}
                        {count === 8 && answerClick === "Le temps." && (
                            <div className={styles.dialog}>
                                <p className={styles.color_ennemy}><strong>Bourrator</strong> :</p>
                                <p>« Le temps ?! »</p>
                                <p className={styles.coms}>(Sourit méchamment.)</p>
                                <p>« Le temps, c’est ce qu’t’as plus, {extractImageName(player.avatar)}. </p>
                                <p className={styles.coms}>(Il siffle, et les sous-fifres sortent des couteaux.)</p>
                            </div>
                        )}
                    </article>
                )}

                {count === 9 && (
                    <ArenaPreCard />
                )}


                <div className={styles.container_btn}>
                    {count < 8 && (
                        <button key={count} onClick={() => { setCount(prev => prev + 1) }} disabled={count === 7 && answerClick === null}>Continuer</button>
                    )}
                    {count === 8 && (
                        <button onClick={() => { setCount(prev => prev + 1) }}>Combattre</button>
                    )}
                </div>
            </main>
        </div>
    )
}
import styles from "./classes.module.css";

export default function ClassesCards({ onClassCard, selectedClassId }) {
    const dialogues = {
        "base": [
            "Euh... je crois que je vais t’attaquer maintenant !",
            "Attention, je suis... presque prêt !",
            "Tu vas voir ce que... enfin, je crois que tu vas voir !"
        ],
        "esquive": [
            "Oups ! J’ai bougé sans faire exprès !",
            "Oh ? Tu visais moi ? Zut alors.",
            "J’ai esquivé ? Trop bien !"
        ],
        "blessure": [
            "Aïe ! C’était pas censé faire mal ?",
            "Ouille... je crois que j’ai un bleu.",
            "Je vais... je vais peut-être m’asseoir un moment."
        ],
        "mort": [
            "Mais... j’avais pourtant bien mangé ce matin...",
            "Je crois que j’ai perdu... ou pas ?",
            "C’est pas grave, je recommencerai... après une sieste."
        ]
    }

    const classes = [
        { id: 1, valueFr: "Guerrier", value: "warrior", info: "Force brute et endurance.", logo: "⚔️", force: 15, magie: 10, dexterite: 1, vie: 100, maxVie: 100, mana: 20, maxMana: 20, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 5, potions: 2, isPlayer: true, dialogues: dialogues },
        { id: 2, valueFr: "Mage", value: "mage", info: "Magie puissante et contrôle.", logo: "🧙‍♂️", force: 10, magie: 15, dexterite: 3, vie: 80, maxVie: 80, mana: 70, maxMana: 70, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 5, potions: 2, isPlayer: true, dialogues: dialogues },
        { id: 3, valueFr: "Assassin", value: "assassin", info: "Dextérité et vitesse.", logo: "🥷", force: 13, magie: 11, dexterite: 6, vie: 90, maxVie: 90, mana: 50, maxMana: 50, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 5, potions: 2, isPlayer: true, dialogues: dialogues }
    ];

    return (
        <div className={styles.container_classes}>
            {
                classes.map(cl => (
                    <div key={cl.id} className={`${styles.class_card} ${selectedClassId === cl.id ? styles.selected_card : ''}`} onClick={() => onClassCard(cl)}>
                        <div className={styles.logo}>
                            {cl.logo}
                        </div>
                        <div className={styles.info}>
                            <p>{cl.valueFr}</p>
                            <p><small>{cl.info}</small></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
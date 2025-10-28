import styles from "./classes.module.css";

export default function ClassesCards({ onClassCard, selectedClassId }) {
    const classes = [
        { id: 1, valueFr: "Guerrier", value: "warrior", info: "Force brute et endurance.", logo: "⚔️", force: 15, magie: 10, dexterite: 1, vie: 100, maxVie: 100, mana: 20, maxMana: 20, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 2, potions: 2, isPlayer: true},
        { id: 2, valueFr: "Mage", value: "mage", info: "Magie puissante et contrôle.", logo: "🧙‍♂️", force: 10, magie: 15, dexterite: 3, vie: 80, maxVie: 80, mana: 70, maxMana: 70, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 2, potions: 2, isPlayer: true },
        { id: 3, valueFr: "Assassin", value: "assassin", info: "Dextérité et vitesse.", logo: "🥷", force: 13, magie: 11, dexterite: 6, vie: 90, maxVie: 90, mana: 50, maxMana: 50, attaqueSpeName: "Attaque spéciale", attackSpe: 18, attackSpeNb: 2, potions: 2, isPlayer: true }
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
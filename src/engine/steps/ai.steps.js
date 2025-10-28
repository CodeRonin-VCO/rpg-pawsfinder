import { getRandom } from "../../utils/random.js";


// ==== Profiles AI ennemy ====
const aiProfiles = {
    boss: {
        healThreshold: 0.5,
        preferedAttack: ["attackSpe", "magie", "force"]
    },
    minion: {
        healThreshold: 0.5,
        preferedAttack: ["force", "attackSpe"]
    }
};


// ==== Attack logic ====
export function aiActions(ennemy) {
    const actions = [];
    const profile = aiProfiles[ennemy.classe]

    // Soin?
    if ((ennemy.vie < (ennemy.maxVie * profile.healThreshold)) && ennemy.potions > 0) {
        actions.push({ type: "heal" });
    };

    // Attaque
    const attackOptions = profile.preferedAttack.filter(type => {
        if (type === "magie") return ennemy.magie > 0 && ennemy.mana >= 10;
        if (type === "attackSpe") return ennemy.attackSpe > 0 && ennemy.attackSpeNb > 0;
        return ennemy[type] > 0;
    });

    const randomAttack = getRandom(attackOptions.length ? attackOptions : ["force"]);

    actions.push({ type: "attack", methode: randomAttack });

    // todo: debug
    console.log("Action IA choisie :", actions[0]);

    return actions;
}
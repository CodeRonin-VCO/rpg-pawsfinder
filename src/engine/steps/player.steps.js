import { getRandom } from "../../utils/random.js";


// ====  Attaques ====
export function calculateDamage(ctx, type = "force") {
    const { attacker } = ctx;

    // Ajouter un log de debug automatique
    ctx.log.push(`Étape: calculateDamage (type: ${type})`);

    // Vérification mana pour les attaques magiques
    if (type === "magie") {
        if (attacker.mana < 10) {
            ctx.log.push("Interruption: mana insuffisant");

            return {
                ...ctx,
                interrupt: true,
                events: [
                    { type: "dialog", payload: "Ha ! Tu n'as plus de mana !", speaker: "attacker" }
                ]
            };
        }
    };

    // Vérification nb att. spé.
    if (type === "attackSpe") {
        if (attacker.attackSpeNb < 1) {
            ctx.log.push("Interruption: plus d'attaques spéciales");

            return {
                ...ctx,
                interrupt: true,
                events: [
                    { type: "dialog", payload: "Déjà à cours d'attaques spéciales?!", speaker: "attacker" }
                ]
            };
        }
    };

    // Calcul du dégât
    const statValue = attacker[type] || 0;
    const baseDamage = Math.max(
        Math.floor(statValue * 0.5),
        Math.floor(statValue * Math.random())
    );

    ctx.log.push(`Dégâts calculés: ${baseDamage}`);

    // Mise à jour du mana si nécessaire
    const updatedAttacker = { ...attacker };
    switch (type) {
        case "magie":
            updatedAttacker.mana = attacker.mana - 10;
            break;
        case "attackSpe":
            updatedAttacker.attackSpeNb = attacker.attackSpeNb - 1;
            break;

        default:
            break;
    };

    return {
        ...ctx,
        attacker: updatedAttacker,
        damage: baseDamage,
    };
}

// ==== Escaped ====
export function escapedCheck(ctx) {
    // Ajouter un log de debug automatique
    ctx.log.push("Étape: escapedCheck");

    const escaped = Math.random() < (ctx.defender.dexterite / 10);
    if (escaped) {
        ctx.log.push("Résultat: esquive réussie");

        return {
            ...ctx,
            escaped: true,
            interrupt: true,
            events: [
                { type: "animation", payload: "escaped", target: "defender" },
                { type: "dialog", payload: getRandom(ctx.defender.dialogues?.esquive), speaker: "defender" }
            ]
        };
    }

    ctx.log.push("Résultat: esquive échouée");

    return ctx;
}

// ==== Critical hit ====
export function criticalHit(ctx) {
    // Ajouter un log de debug automatique
    ctx.log.push("Étape: criticalHit");

    const isCritical = Math.random() < 0.15;
    const criticalIndex = isCritical ? 2 : 1;
    const newDamage = ctx.damage * criticalIndex;

    ctx.log.push(`Indice coup critique: ${criticalIndex}`);
    ctx.log.push(`Dégâts calculés (coup critique): ${newDamage}`);

    return { ...ctx, damage: newDamage, isCritical }
}

// ==== Appliquer les dégats ====
export function applyDamage(ctx) {
    // Ajouter un log de debug automatique
    ctx.log.push("Étape: applyDamage");

    const { attacker, defender, damage, isCritical } = ctx;
    const newVie = Math.max(0, defender.vie - damage);
    const updatedDefender = { ...defender, vie: newVie };

    ctx.log.push(`${attacker.nom} inflige ${damage} dégâts à ${defender.nom} (vie restante: ${newVie})`);

    const animationType = ctx.type === "heal"
        ? "heal"
        : ctx.type === "magie"
            ? "magie"
            : isCritical
                ? "critical"
                : ctx.type === "attackSpe"
                    ? "attaqueSpe"
                    : "force"

    // todo: debug
    console.log("Animation déclenchée :", animationType);

    return {
        ...ctx,
        defender: updatedDefender,
        events: [
            ...(ctx.events || []),
            { type: "dialog", payload: `${attacker.nom} fait ${damage} dégâts à ${defender.nom}`, speaker: "attacker" },
            { type: "animation", payload: animationType, target: "defender", delay: 0 },
            { type: "dialog", payload: (isCritical) ? getRandom(defender.dialogues?.blessure) : getRandom(defender.dialogues?.base), delay: 3000, speaker: "defender" },
        ]
    };
}

// ==== Soins ====
export function heal(ctx) {
    const { attacker } = ctx;

    if (attacker.potions < 1) {
        ctx.log.push("Interruption: aucune potion disponible");
        return {
            ...ctx,
            interrupt: true,
            events: [
                { type: "dialog", payload: "Plus de potions !", speaker: "attacker" }
            ]
        };
    }

    const healedAmount = 20;
    const newVie = Math.min(attacker.vie + healedAmount, attacker.maxVie);

    const updatedAttacker = {
        ...attacker,
        vie: newVie,
        potions: attacker.potions - 1
    };

    ctx.log.push(`Soin effectué: +${healedAmount} PV (vie actuelle: ${newVie})`);

    return {
        ...ctx,
        attacker: updatedAttacker,
        events: [
            { type: "dialog", payload: `${attacker.nom} utilise une potion !`, speaker: "attacker" },
            { type: "animation", payload: "heal" }
        ]
    };
}

// ==== dialogs ====
export function generateDialog(ctx, message, delay = 3000, speaker = "attacker") {
    const setter = speaker === "defender" ? ctx.onEnnemyDialog : ctx.onDialog;
    if (!setter) return;

    const textMessage = Array.isArray(message) ? getRandom(message) : message;
    setter(textMessage);

    setTimeout(() => {
        setter("");
    }, delay);
}


// ==== Animations ====
export function animateCharacter(ctx, type, target = "attacker") {
    const animationTarget = (target === "defender") ? ctx.onEnnemyAnimation : ctx.onAnimation;

    animationTarget?.(type);
}

// ==== Match end ====
export function endMatchCheck(ctx) {
    const player = ctx.attacker.isPlayer ? ctx.attacker : ctx.defender;
    const ennemy = ctx.attacker.isPlayer ? ctx.defender : ctx.attacker;

    const playerDead = player.vie <= 0;
    const ennemyDead = ennemy.vie <= 0;

    if (ennemyDead) {
        ctx.log.push("Fin du match: victoire du joueur");
        ctx.onEndMatch?.("Victoire");
        return { ...ctx, matchEnded: true, matchResult: "Victoire" };
    }
    if (playerDead) {
        ctx.log.push("Fin du match: défaite du joueur");
        ctx.onEndMatch?.("Défaite");
        return { ...ctx, matchEnded: true, matchResult: "Défaite" };
    }

    ctx.log.push(`Check fin de match → joueur: ${player.nom} (${player.vie}), ennemi: ${ennemy.nom} (${ennemy.vie})`);
    ctx.log.push(`Fin de match détectée → matchResult: ${ctx.matchResult}`);
    console.log("setMatchResult appelé avec :", ctx.matchResult);


    return ctx;
}
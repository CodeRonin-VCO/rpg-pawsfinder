import { applyDamage, calculateDamage, criticalHit, endMatchCheck, escapedCheck, heal } from "../steps/player.steps.js";


export function playerPipeline(ctx) {
    // 1. Calcul des dégâts ou soin
    if (ctx.type === "heal") {
        ctx = heal(ctx);
    } else {
        ctx = calculateDamage(ctx, ctx.type);
        if (ctx.interrupt) return ctx; // Interruption si pas de mana/attaques spéciales

        ctx = escapedCheck(ctx);
        ctx = criticalHit(ctx);
        ctx = applyDamage(ctx);
    }

    // 2. Vérification de fin de match
    ctx = endMatchCheck(ctx);

    return ctx;
}

export function handleEvents(ctx) {
    if (ctx.events) {
        ctx.events.forEach(event => {
            switch (event.type) {
                case "dialog":
                    if (event.speaker === "defender") {
                        ctx.onEnnemyDialog?.(event.payload);
                    } else {
                        ctx.onDialog?.(event.payload);
                    }
                    break;
                case "animation":
                    const targetCharacter =
                        event.target === "attacker" ? ctx.attacker : ctx.defender;

                    const targetIsPlayer = targetCharacter.isPlayer;
                    const targetName = targetCharacter.nom;

                    console.log(`[ANIMATION] ${event.payload} → ${targetIsPlayer ? "Joueur" : "Ennemi"} (${targetName})`);

                    if (targetIsPlayer) {
                        ctx.onAnimation?.(event.payload);
                    } else {
                        ctx.onEnnemyAnimation?.(event.payload);
                    }

                    break;

                default:
                    break;
            }
        });

        // Todo: debug
        // console.log("Événements déclenchés :", ctx.events);

    }

    return ctx;
};

export function ennemyPipeline(ctx) {
    const action = ctx.actions[0];

    if (action.type === "heal") {
        ctx = heal(ctx);
        ctx = endMatchCheck(ctx);
        return ctx;
    }

    ctx = calculateDamage(ctx, ctx.actions[0].methode);
    if (ctx.interrupt) return ctx;

    ctx = escapedCheck(ctx);
    ctx = criticalHit(ctx);
    ctx = applyDamage(ctx);
    ctx = endMatchCheck(ctx);

    return ctx;
};


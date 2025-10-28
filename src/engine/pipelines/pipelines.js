import { aiActions } from "../steps/ai.steps.js";
import { animateCharacter, applyDamage, calculateDamage, criticalHit, endMatchCheck, escapedCheck, generateDialog, heal } from "../steps/player.steps.js";


export function playerPipeline(ctx) {
    // 1. Calcul des dégâts ou soin
    if (ctx.type === "heal") {
        ctx = heal(ctx);
    } else {
        ctx = calculateDamage(ctx, ctx.type);
        if (ctx.interrupt) return ctx; // Interruption si pas de mana/attaques spéciales

        ctx = escapedCheck(ctx);
        if (ctx.escaped) return ctx; // Si esquive, on arrête ici

        ctx = criticalHit(ctx);
        ctx = applyDamage(ctx);

        ctx.events = [...(ctx.events || []), ...(ctx.events || [])]
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
                    if (event.target === "defender") {
                        ctx.onEnnemyAnimation?.(event.payload);
                    } else {
                        ctx.onAnimation?.(event.payload);
                    }
                    break;
                default:
                    break;
            }
        });

        // Todo: debug
        console.log("Événements déclenchés :", ctx.events);

    }

    return ctx;
};

export function ennemyPipeline(ctx) {
    // 1. Calcul des dégâts (l'ennemi n'utilise pas de soin dans cet exemple)
    ctx = calculateDamage(ctx, ctx.actions[0].methode);
    if (ctx.interrupt) return ctx;

    ctx = escapedCheck(ctx);
    if (ctx.escaped) return ctx;

    ctx = criticalHit(ctx);
    ctx = applyDamage(ctx);

    // 2. Vérification de fin de match
    ctx = endMatchCheck(ctx);

    return ctx;
};


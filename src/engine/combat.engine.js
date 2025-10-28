import { ennemyPipeline, handleEvents, playerPipeline } from "./pipelines/pipelines.js";
import { aiActions } from "./steps/ai.steps.js";


export function executePlayerAttack({ attacker, defender, type, onDialog, onEnnemyDialog, onAnimation, onEnnemyAnimation, onEndMatch }) {
    let ctx = {
        attacker: { ...attacker, isPlayer: true },
        defender: { ...defender, isPlayer: false },
        damage: 0,
        type,
        escaped: false,
        interrupt: false,
        onDialog,
        onEnnemyDialog,
        onAnimation,
        onEnnemyAnimation,
        onEndMatch,
        log: []
    };

    ctx = playerPipeline(ctx);

    if (ctx.interrupt) {
        handleEvents(ctx); // pour afficher les messages d’interruption
        return ctx;
    }

    handleEvents(ctx);
    console.log("Logs du tour du joueur :", ctx.log);


    return {
        attacker: ctx.attacker,
        defender: ctx.defender,
        interrupt: ctx.interrupt,
        matchEnded: ctx.matchEnded,
        matchResult: ctx.matchResult,
    };
};

export function executeEnnemyAttack({ attacker, defender, type, onDialog, onEnnemyDialog, onAnimation, onEnnemyAnimation, onEndMatch }) {
    let ctx = {
        attacker: { ...attacker, isPlayer: false },
        defender: { ...defender, isPlayer: true },
        damage: 0,
        type,
        escaped: false,
        interrupt: false,
        onDialog,
        onEnnemyDialog,
        onAnimation,
        onEnnemyAnimation,
        onEndMatch,
        log: []
    };

    ctx.actions = aiActions(attacker);
    const attackAction = ctx.actions.find(a => a.type === "attack");
    if (attackAction) {
        ctx.type = attackAction.methode;
    }

    ctx = ennemyPipeline(ctx);

    if (ctx.interrupt) {
        handleEvents(ctx); // pour afficher les messages d’interruption
        return ctx;
    }
    if (ctx.matchEnded) return;

    const finalCtx = handleEvents(ctx);
    console.log("Logs du tour de l'ennemi :", finalCtx.log);

    return {
        attacker: finalCtx.attacker,
        defender: finalCtx.defender,
        interrupt: finalCtx.interrupt,
        matchEnded: finalCtx.matchEnded,
        matchResult: finalCtx.matchResult,
    };
};


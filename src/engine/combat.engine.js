import { ennemyPipeline, handleEvents, playerPipeline } from "./pipelines/pipelines.js";
import { aiActions } from "./steps/ai.steps.js";
import { endMatchCheck } from "./steps/player.steps.js";


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
    ctx = endMatchCheck(ctx);

    if (ctx.escaped) {
        handleEvents(ctx);
        return ctx;
    }

    if (ctx.interrupt) {
        handleEvents(ctx); // pour afficher les messages d’interruption
        return ctx;
    }

    handleEvents(ctx);

    // TODO: Visualiser le tour du joueur
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

    ctx.actions = aiActions(ctx.attacker);
    const attackAction = ctx.actions.find(a => a.type === "attack");
    if (attackAction) {
        ctx.type = attackAction.methode;
    }

    ctx = ennemyPipeline(ctx);
    ctx = endMatchCheck(ctx);

    if (ctx.escaped) {
        handleEvents(ctx); // pour afficher l’animation et le dialogue d’esquive
        return {
            attacker: ctx.attacker,
            defender: ctx.defender,
            interrupt: ctx.interrupt,
            matchEnded: ctx.matchEnded,
            matchResult: ctx.matchResult,
        };
    }

    if (ctx.interrupt) {
        handleEvents(ctx); // pour afficher les messages d’interruption
        return ctx;
    }

    if (ctx.matchEnded) {
        handleEvents(ctx); // ✅ pour afficher la fin de match
        return {
            attacker: ctx.attacker,
            defender: ctx.defender,
            interrupt: ctx.interrupt,
            matchEnded: ctx.matchEnded,
            matchResult: ctx.matchResult,
        };
    }

    const finalCtx = handleEvents(ctx);

    // TODO: Visualiser le tour de l'ennemi
    console.log("Logs du tour de l'ennemi :", finalCtx.log);

    return {
        attacker: finalCtx.attacker,
        defender: finalCtx.defender,
        interrupt: finalCtx.interrupt,
        matchEnded: finalCtx.matchEnded,
        matchResult: finalCtx.matchResult,
    };
};


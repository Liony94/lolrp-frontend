import { useCallback } from "react";
import api from "../../../services/api";

export const useCombatActions = (
  combatState,
  setCombatId,
  setPlayerHealth,
  setOpponentHealth,
  setPlayerStats,
  setOpponentStats,
  setBattleLog,
  endBattle
) => {
  const {
    setPlayerAnimation,
    setOpponentAnimation,
    setIsArenaShaking,
    setShowDamage,
    setShowCriticalHit,
    setShowMissed,
    setPlayerTakingDamage,
    setOpponentTakingDamage,
    setCurrentDamage,
    setCurrentTurn,
    resetAnimations,
    setIsAutoFighting,
  } = combatState;

  const performAttack = useCallback(async (combatId) => {
    if (!combatId) return;

    try {
      const result = await api.post("/combat/process-turn", {
        combatId: combatId,
        isPlayerTurn: true,
      });

      const {
        damage,
        isCritical,
        isDodged,
        currentHealth,
        isFinished,
        winner,
      } = result.data;

      setCurrentDamage(damage);
      setPlayerAnimation("attacking");
      setIsArenaShaking(true);

      setTimeout(() => {
        if (isDodged) {
          setOpponentAnimation("missing");
          setShowMissed(true);
          setBattleLog((prev) => [
            ...prev,
            "L'adversaire esquive votre attaque !",
          ]);
        } else {
          setOpponentTakingDamage(true);
          setShowDamage(true);
          setShowCriticalHit(isCritical);
          setOpponentHealth(Math.max(0, currentHealth));

          let message = `Vous infligez ${damage} dégâts${
            isCritical ? " critiques" : ""
          } !`;
          setBattleLog((prev) => [...prev, message]);
        }
      }, 300);

      setTimeout(() => {
        resetAnimations();
        if (isFinished) {
          endBattle(winner);
        } else {
          setCurrentTurn("opponent");
        }
      }, 1000);
    } catch (err) {
      console.error("Erreur lors du traitement du tour:", err);
      setBattleLog((prev) => [...prev, "Erreur lors du traitement du tour"]);
      setIsAutoFighting(false);
    }
  }, []);

  const handleOpponentTurn = useCallback(async (combatId) => {
    if (!combatId) return;

    try {
      const result = await api.post("/combat/process-turn", {
        combatId: combatId,
        isPlayerTurn: false,
      });

      const {
        damage,
        isCritical,
        isDodged,
        currentHealth,
        isFinished,
        winner,
      } = result.data;

      setCurrentDamage(damage);
      setOpponentAnimation("attacking");
      setIsArenaShaking(true);

      setTimeout(() => {
        if (isDodged) {
          setPlayerAnimation("missing");
          setShowMissed(true);
          setBattleLog((prev) => [...prev, "Vous esquivez l'attaque !"]);
        } else {
          setPlayerTakingDamage(true);
          setShowDamage(true);
          setShowCriticalHit(isCritical);
          setPlayerHealth(Math.max(0, currentHealth));

          let message = `L'adversaire vous inflige ${damage} dégâts${
            isCritical ? " critiques" : ""
          } !`;
          setBattleLog((prev) => [...prev, message]);
        }
      }, 300);

      setTimeout(() => {
        resetAnimations();
        if (isFinished) {
          endBattle(winner);
        } else {
          setCurrentTurn("player");
        }
      }, 1000);
    } catch (err) {
      console.error("Erreur lors du tour de l'adversaire:", err);
      setBattleLog((prev) => [...prev, "Erreur lors du tour de l'adversaire"]);
      setIsAutoFighting(false);
    }
  }, []);

  const startAutoBattle = useCallback(async (selectedOpponent) => {
    if (!selectedOpponent) {
      setBattleLog((prev) => [...prev, "Veuillez sélectionner un adversaire"]);
      return;
    }

    try {
      const response = await api.post("/combat/start-combat", {
        opponentId: selectedOpponent.id,
      });

      const combat = response.data;
      setCombatId(combat.id);

      setPlayerStats({
        attaque: combat.user.attaque,
        defense: combat.user.defense,
        vitesse: combat.user.esquive,
        puissance: combat.user.puissance,
        vie: combat.user.vie,
        criticalChance: combat.user.criticalChance,
        criticalDmg: combat.user.criticalDmg,
        precision: combat.user.precision,
      });

      setOpponentStats({
        attaque: combat.opponent.attaque,
        defense: combat.opponent.defense,
        vitesse: combat.opponent.esquive,
        puissance: combat.opponent.puissance,
        vie: combat.opponent.vie,
        criticalChance: combat.opponent.criticalChance,
        criticalDmg: combat.opponent.criticalDmg,
        precision: combat.opponent.precision,
      });

      setPlayerHealth(combat.userCurrentHp);
      setOpponentHealth(combat.opponentCurrentHp);

      setIsAutoFighting(true);
      setBattleLog(["Le combat commence !"]);
      setCurrentTurn("player");
    } catch (err) {
      console.error("Erreur lors du démarrage du combat:", err);
      setBattleLog((prev) => [...prev, "Erreur lors du démarrage du combat"]);
    }
  }, []);

  return {
    performAttack,
    handleOpponentTurn,
    startAutoBattle,
  };
};

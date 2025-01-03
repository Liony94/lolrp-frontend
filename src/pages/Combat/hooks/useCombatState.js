import { useState } from "react";

export const useCombatState = () => {
  const [isFighting, setIsFighting] = useState(false);
  const [playerAnimation, setPlayerAnimation] = useState("");
  const [opponentAnimation, setOpponentAnimation] = useState("");
  const [showDamage, setShowDamage] = useState(false);
  const [isArenaShaking, setIsArenaShaking] = useState(false);
  const [showCriticalHit, setShowCriticalHit] = useState(false);
  const [companionAnimation, setCompanionAnimation] = useState("");
  const [specialEffect, setSpecialEffect] = useState(false);
  const [shieldEffect, setShieldEffect] = useState(false);
  const [isAutoFighting, setIsAutoFighting] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("player");
  const [showMissed, setShowMissed] = useState(false);
  const [currentDamage, setCurrentDamage] = useState(0);
  const [playerTakingDamage, setPlayerTakingDamage] = useState(false);
  const [opponentTakingDamage, setOpponentTakingDamage] = useState(false);

  const resetAnimations = () => {
    setPlayerAnimation("");
    setOpponentAnimation("");
    setIsArenaShaking(false);
    setShowDamage(false);
    setShowCriticalHit(false);
    setCompanionAnimation("running");
    setPlayerTakingDamage(false);
    setOpponentTakingDamage(false);
    setShowMissed(false);
  };

  return {
    isFighting,
    setIsFighting,
    playerAnimation,
    setPlayerAnimation,
    opponentAnimation,
    setOpponentAnimation,
    showDamage,
    setShowDamage,
    isArenaShaking,
    setIsArenaShaking,
    showCriticalHit,
    setShowCriticalHit,
    companionAnimation,
    setCompanionAnimation,
    specialEffect,
    setSpecialEffect,
    shieldEffect,
    setShieldEffect,
    isAutoFighting,
    setIsAutoFighting,
    currentTurn,
    setCurrentTurn,
    showMissed,
    setShowMissed,
    currentDamage,
    setCurrentDamage,
    playerTakingDamage,
    setPlayerTakingDamage,
    opponentTakingDamage,
    setOpponentTakingDamage,
    resetAnimations,
  };
};

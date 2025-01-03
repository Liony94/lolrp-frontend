import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import "./Combat.styles.css";

import OpponentSelection from "./components/OpponentSelection";
import BattleArena from "./components/BattleArena";
import { useCombatState } from "./hooks/useCombatState";
import { useCombatActions } from "./hooks/useCombatActions";

const Combat = () => {
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(authUser);
  const battleLogRef = useRef(null);
  
  // États de base
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [opponentStats, setOpponentStats] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(1000);
  const [opponentHealth, setOpponentHealth] = useState(1000);
  const [combatId, setCombatId] = useState(null);
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  // États d'animation et de combat
  const combatState = useCombatState();
  const { isFighting, setIsFighting } = combatState;

  // Actions de combat
  const combatActions = useCombatActions(
    combatState,
    setCombatId,
    setPlayerHealth,
    setOpponentHealth,
    setPlayerStats,
    setOpponentStats,
    setBattleLog,
    endBattle
  );

  // Récupération des adversaires
  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/combat/ops-with-same-level");
        
        const formattedOpponents = response.data.map(opponent => ({
          id: opponent.id,
          username: opponent.username,
          level: Math.floor((opponent.attaque + opponent.defense + opponent.puissance + opponent.esquive) / 40),
          region: opponent.region?.name || "Sans région",
          avatar: opponent.profileImage || "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
          stats: {
            attaque: opponent.attaque,
            defense: opponent.defense,
            puissance: opponent.puissance,
            esquive: opponent.esquive,
            vie: opponent.vie,
            criticalChance: opponent.criticalChance,
            criticalDmg: opponent.criticalDmg,
            precision: opponent.precision
          }
        }));

        setOpponents(formattedOpponents);
      } catch (err) {
        console.error("Erreur lors de la récupération des adversaires:", err);
        setError("Impossible de charger les adversaires");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpponents();
  }, []);

  // Gestion du combat automatique
  useEffect(() => {
    if (combatState.isAutoFighting && !winner) {
      const timer = setTimeout(() => {
        if (combatState.currentTurn === "player") {
          combatActions.performAttack(combatId);
        } else {
          combatActions.handleOpponentTurn(combatId);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [combatState.isAutoFighting, combatState.currentTurn, winner, combatId]);

  // Défilement automatique du journal de combat
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [battleLog]);

  // Mettre à jour currentUser quand authUser change
  useEffect(() => {
    if (authUser) {
      setCurrentUser(authUser);
    }
  }, [authUser]);

  const handleOpponentSelect = (opponent) => {
    setSelectedOpponent(opponent);
  };

  const startFight = () => {
    setIsFighting(true);
    setPlayerHealth(1000);
    setOpponentHealth(1000);
    setBattleLog([]);
    combatActions.startAutoBattle(selectedOpponent);
  };

  function endBattle(winner) {
    console.log('Winner object:', winner);
    console.log('Auth user:', authUser);
    console.log('Current user:', currentUser);
    
    combatState.setIsAutoFighting(false);
    setWinner(winner);
    
    const user = currentUser || authUser;
    
    if (!winner || !user) {
      console.log('Winner or user is null');
      setBattleLog(prev => [...prev, "Erreur lors de la détermination du vainqueur"]);
      return;
    }

    const isVictory = winner.username === user.username;
    console.log('Is victory?', isVictory, 'Winner username:', winner.username, 'User username:', user.username);

    const winMessage = isVictory
      ? "Victoire ! Vous avez gagné le combat !"
      : "Défaite ! Vous avez perdu le combat !";
    
    setBattleLog(prev => [...prev, winMessage]);
  }

  const handleReturnToSelect = () => {
    setIsFighting(false);
    setWinner(null);
    setSelectedOpponent(null);
    setBattleLog([]);
    combatState.setIsAutoFighting(false);
    // Réinitialiser d'autres états si nécessaire
  };

  return (
    <div className="combat-container">
      {!isFighting ? (
        <OpponentSelection
          opponents={opponents}
          selectedOpponent={selectedOpponent}
          onSelect={handleOpponentSelect}
          onStartFight={startFight}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <BattleArena
          player={{
            character: currentUser || authUser,
            health: playerHealth,
            stats: playerStats,
            isCurrentTurn: combatState.currentTurn === "player",
            isTakingDamage: combatState.playerTakingDamage,
            animation: combatState.playerAnimation,
            showDamage: combatState.showDamage,
            currentDamage: combatState.currentDamage,
            showCriticalHit: combatState.showCriticalHit,
            companionAnimation: combatState.companionAnimation
          }}
          opponent={{
            character: selectedOpponent,
            health: opponentHealth,
            stats: opponentStats,
            isCurrentTurn: combatState.currentTurn === "opponent",
            isTakingDamage: combatState.opponentTakingDamage,
            animation: combatState.opponentAnimation,
            showDamage: combatState.showDamage,
            currentDamage: combatState.currentDamage,
            showCriticalHit: combatState.showCriticalHit
          }}
          currentTurn={combatState.currentTurn}
          isArenaShaking={combatState.isArenaShaking}
          showCriticalHit={combatState.showCriticalHit}
          specialEffect={combatState.specialEffect}
          shieldEffect={combatState.shieldEffect}
          showMissed={combatState.showMissed}
          isAutoFighting={combatState.isAutoFighting}
          onStartBattle={() => combatActions.startAutoBattle(selectedOpponent)}
          winner={winner}
          onReturnToSelect={handleReturnToSelect}
          battleLog={battleLog}
          battleLogRef={battleLogRef}
        />
      )}
    </div>
  );
};

export default Combat; 
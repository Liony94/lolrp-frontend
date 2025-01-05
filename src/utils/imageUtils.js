const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const PUBLIC_URL = process.env.PUBLIC_URL || "";

export const getProfileImageUrl = (imageName) => {
  if (!imageName) return null;

  // Si l'URL est déjà complète
  if (imageName.startsWith("http")) {
    return imageName;
  }

  // Nettoyer le chemin de l'image
  const cleanImagePath = imageName.startsWith("/")
    ? imageName.slice(1)
    : imageName;
  return `${API_URL}/uploads/profiles/${cleanImagePath}?t=${Date.now()}`;
};

export const getDefaultAvatarUrl = () => {
  return `${PUBLIC_URL}/assets/images/default-avatar.png`;
};

export const handleImageError = (event, username) => {
  event.target.onerror = null; // Éviter les boucles infinies

  if (username) {
    const parent = event.target.parentElement;
    if (parent) {
      // Supprimer l'image qui a échoué
      event.target.remove();

      // Créer l'avatar par défaut avec les initiales
      const initialsDiv = document.createElement("div");
      initialsDiv.className = "champion-avatar default-avatar";
      initialsDiv.innerHTML = `<span>${username
        .charAt(0)
        .toUpperCase()}</span>`;
      parent.appendChild(initialsDiv);
    }
  } else {
    // Si pas de username, utiliser l'image par défaut
    event.target.src = getDefaultAvatarUrl();
  }
};

// Fonction utilitaire pour vérifier si une image existe
export const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

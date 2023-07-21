import React, { useState } from "react";

const ColorConverter = () => {
  // Les hooks d'état pour gérer les valeurs du formulaire et le résultat
  const [inputColor, setInputColor] = useState("");
  const [outputColor, setOutputColor] = useState("");

  // Fonction pour convertir une couleur en Hexadécimal vers RGB
  const hexToRgb = (hex) => {
    // Vérifier si l'entrée est un format de couleur hexadécimal valide
    const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexPattern.test(hex)) {
      return "Format de couleur hexadécimal invalide.";
    }

    // Supprimer le # au début de la chaîne, le cas échéant
    hex = hex.replace("#", "");

    // Convertir les valeurs hexadécimales en valeurs RGB décimales
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    return `RGB(${r}, ${g}, ${b})`;
  };

  // Fonction pour convertir une couleur en RGB vers Hexadécimal
  const rgbToHex = (rgb) => {
    // Vérifier si l'entrée est un format de couleur RGB valide
    const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const match = rgb.match(rgbPattern);
    if (!match) {
      return "Format de couleur RGB invalide.";
    }

    // Convertir les valeurs RGB en valeurs hexadécimales
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    return `#${hex.toUpperCase()}`;
  };

  // Gérer le changement de la valeur saisie
  const handleInputChange = (e) => {
    setInputColor(e.target.value);
  };

  // Gérer la conversion de couleur
  const handleConvert = () => {
    // Supprimer les espaces en début et fin de la chaîne, le cas échéant
    const color = inputColor.trim();

    // Vérifier le type d'entrée (Hexadécimal ou RGB) et effectuer la conversion appropriée
    if (color.startsWith("#")) {
      const convertedColor = hexToRgb(color);
      setOutputColor(convertedColor);
    } else if (color.startsWith("rgb(") && color.endsWith(")")) {
      const convertedColor = rgbToHex(color);
      setOutputColor(convertedColor);
    } else {
      setOutputColor("Format de couleur invalide.");
    }
  };

  return (
    <div>
      <h2>Convertisseur de couleurs</h2>
      <label>
        Couleur :
        <input type="text" value={inputColor} onChange={handleInputChange} />
      </label>
      <button onClick={handleConvert}>Convertir</button>
      <div>Résultat : {outputColor}</div>
    </div>
  );
};

export default ColorConverter;

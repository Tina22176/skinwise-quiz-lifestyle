
export const calculateSkinType = (answers: Record<string, string>) => {
  let points = {
    seche: 0,
    mixte: 0,
    grasse: 0,
    sensible: 0,
  };

  // Compter les points pour chaque type de peau
  Object.values(answers).forEach(answer => {
    if (answer === "seche") points.seche += 1;
    if (answer === "mixte") points.mixte += 1;
    if (answer === "grasse") points.grasse += 1;
    if (answer === "sensible") points.sensible += 1;
  });

  // Déterminer le type de peau dominant
  const maxPoints = Math.max(points.seche, points.mixte, points.grasse, points.sensible);
  
  // Vérification des types combinés
  const skinTypes = [];
  
  if (points.seche === maxPoints) skinTypes.push("dry");
  if (points.mixte === maxPoints) skinTypes.push("combination");
  if (points.grasse === maxPoints) skinTypes.push("oily");
  if (points.sensible === maxPoints) skinTypes.push("sensitive");
  
  // Retourner le premier type dominant, ou "normal" s'il y a une égalité
  return skinTypes[0] || "normal";
};

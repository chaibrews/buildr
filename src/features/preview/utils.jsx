// export function renderBullets(text, bulletClass) {
//   if (!text?.trim()) return null;
//   const lines = text
//     .split("\n")
//     .map((l) => l.trim())
//     .filter(Boolean);
//   if (lines.length === 0) return null;

//   return (
//     <ul className={bulletClass}>
//       {lines.map((line, i) => (
//         <li key={i}>{line}</li>
//       ))}
//     </ul>
//   );
// }

export function renderBullets(bullets, bulletClass) {
  if (!Array.isArray(bullets) || bullets.length === 0) return null;
  const filled = bullets.filter((b) => b?.trim());
  if (filled.length === 0) return null;

  return (
    <ul className={bulletClass}>
      {filled.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  );
}

export function hasAnyValue(obj) {
  return Object.values(obj).some((v) => v && v.toString().trim());
}

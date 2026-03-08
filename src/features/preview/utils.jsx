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

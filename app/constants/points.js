const points = {
  back: [13, 75],
  shapeshiftA: [533, 466],
  shapeshiftS: [602, 466],
  shapeshiftD: [704, 470],
}


module.exports = (name) => {
  const point = points[name];
  return point != null ? {
    x: point[0],
    y: point[1],
  } : null;
}



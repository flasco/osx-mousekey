const points = {
  back: [13, 75 - 22],
  shapeshiftA: [533, 466 - 22],
  shapeshiftS: [609, 462 - 22],
  shapeshiftD: [704, 470 - 22],
  inShapeshiftA: [522, 479 - 22],
  inShapeshiftS: [651, 479 - 22],
  inShapeshiftD: [],
  warEnd: [121, 83 - 22],

}


module.exports = (name) => {
  const point = points[name];
  return point != null ? {
    x: point[0],
    y: point[1],
  } : null;
}



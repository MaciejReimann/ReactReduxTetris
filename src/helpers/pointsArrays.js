import {
  addPoints,
  multiplyPoint,
  // translateToPolar,
  // translateToCartesian,
  rotateOnGlobalZero
} from "../helpers/pointsManipulation";

// scale distance from tetris square centers to the pivot
export const scalePoints = arrayOfPoints => scale =>
  arrayOfPoints.map(p => multiplyPoint(p)(scale));

// rotates as if pivot were on global zero
export const rotatePoints = arrayOfPoints => angle =>
  arrayOfPoints.map(p => rotateOnGlobalZero(p)(angle));

// move from global zero to where the pivot is
export const movePoints = arrayOfPoints => move =>
  arrayOfPoints.map(p => addPoints(p)(move));

// move from global zero to where the pivot is
export const getPointsInLine = arrayOfPoints => axis => value =>
  arrayOfPoints.filter(p => p[axis] === value);

export const sortPoints = arrayOfPoints =>
  arrayOfPoints.sort((a, b) => a.x - b.x).sort((a, b) => a.y - b.y);

export const sortPointsInMatrix = arrayOfPoints => res => height =>
  Array(height / res)
    .fill()
    .map((_, i) =>
      arrayOfPoints.filter(
        point => point.y > i * res && point.y <= (i + 1) * res
      )
    );

export const findHangingRows = matrix =>
  matrix.reduce(
    (acc, row, i, arr) =>
      !row.length && i < arr.length - 1 && arr.find((r, j) => r.length && j > i)
        ? Object.assign(acc, {
            toDrop: acc.toDrop.concat([arr.slice(i + 1)])
          })
        : row.length && arr.slice(0, i + 1).every(r => r.length)
          ? Object.assign(acc, {
              toSave: acc.toSave.concat(row)
            })
          : Object.assign(acc, {
              toSave: acc.toSave
            }),
    { toDrop: [], toSave: [] }
  );

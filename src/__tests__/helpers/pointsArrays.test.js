import {
  scalePoints,
  rotatePoints,
  movePoints,
  getPointsInLine,
  sortPoints,
  sortPointsInMatrix,
  findHangingRows
} from "../../helpers/pointsArrays";
import { getRandomTetris } from "../../logic/tetrisDefinition";

// scaleSquareCenters
test("Returns array of the same points when scaled up and down again", () => {
  let tetris = getRandomTetris();
  let scaledUp = scalePoints(tetris)(10);
  let scaledDown = scalePoints(scaledUp)(0.1);
  expect(
    scaledDown.every((p, i) => p.x === tetris[i].x && p.y === tetris[i].y)
  ).toBeTruthy();
});

test("Returns array of the same points when scaled with 1", () => {
  let tetris = getRandomTetris();
  let scaledWithOne = scalePoints(tetris)(1);
  expect(
    scaledWithOne.every((p, i) => p.x === tetris[i].x && p.y === tetris[i].y)
  ).toBeTruthy();
});

test("Returns all zeros when scaled with 0 ", () => {
  let zeros = scalePoints(getRandomTetris())(0);
  expect(zeros.every(p => p.x === 0 && p.y === 0)).toBeTruthy();
});

// rotateOnGlobalZero
test("Returns array of the same points when rotated by zero angle", () => {
  let tetris = getRandomTetris();
  let rotated = rotatePoints(tetris)(0);
  expect(
    rotated.every((p, i) => p.x === tetris[i].x && p.y === tetris[i].y)
  ).toBeTruthy();
});

test("Returns array of the same points when rotated by 360 angle", () => {
  let tetris = getRandomTetris();
  let rotated = rotatePoints(tetris)(360);
  expect(
    rotated.every((p, i) => p.x === tetris[i].x && p.y === tetris[i].y)
  ).toBeTruthy();
});

test("Returns array of different points when rotated by 30 angle", () => {
  let tetris = getRandomTetris();
  let rotated = rotatePoints(tetris)(30);
  expect(
    rotated.every((p, i) => p.x !== tetris[i].x && p.y !== tetris[i].y)
  ).toBeTruthy();
});

// movePoints
test("Returns array of the same points when moved by 0", () => {
  let tetris = getRandomTetris();
  let moved = movePoints(tetris)({ x: 0, y: 0 });
  expect(
    moved.every((p, i) => p.x === tetris[i].x && p.y === tetris[i].y)
  ).toBeTruthy();
});

test("Returns array of points + 1 when moved by 1", () => {
  let tetris = getRandomTetris();
  let moved = movePoints(tetris)({ x: 1, y: 1 });
  expect(
    moved.every((p, i) => p.x === tetris[i].x + 1 && p.y === tetris[i].y + 1)
  ).toBeTruthy();
});

test("Returns array of points -2 when moved by -2", () => {
  let tetris = getRandomTetris();
  let moved = movePoints(tetris)({ x: -2, y: -2 });
  expect(
    moved.every((p, i) => p.x === tetris[i].x - 2 && p.y === tetris[i].y - 2)
  ).toBeTruthy();
});

// getPointsInLine
test("Returns points specified", () => {
  const pointsIn = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 }
  ];
  let value = 0;
  let axis = "y";
  let pointsOut = [{ x: 0, y: 0 }];
  expect(getPointsInLine(pointsIn)(axis)(value)).toEqual(pointsOut);
});

test("Returns points specified", () => {
  const pointsIn = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 }
  ];
  let value = 0;
  let axis = "x";
  let pointsOut = [{ x: 0, y: 0 }];
  expect(getPointsInLine(pointsIn)(axis)(value)).toEqual(pointsIn);
});

test("Returns points specified", () => {
  const pointsIn = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 }
  ];
  let value = 10;
  let axis = "x";
  let pointsOut = [];
  expect(getPointsInLine(pointsIn)(axis)(value)).toEqual(pointsOut);
});

//sortPoints
test("Returns truthy", () => {
  const pointsIn = [
    { x: 0, y: 4 },
    { x: 0, y: 2 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 3 }
  ];
  const pointsOut = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 }
  ];
  expect(sortPoints(pointsIn)).toEqual(pointsOut);
});

//sortPoints
test("Puts { x: 2, y: 3 } before { x: 0, y: 4 }", () => {
  const pointsIn = [
    { x: 2, y: 3 },
    { x: 1, y: 4 },
    { x: 0, y: 4 },
    { x: 0, y: 2 },
    { x: 0, y: 0 },
    { x: 2, y: 4 },
    { x: 0, y: 1 },
    { x: 0, y: 3 }
  ];
  const pointsOut = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 }
  ];
  expect(sortPoints(pointsIn)).toEqual(pointsOut);
});

// sortPointsInMatrix
test("Truthy", () => {
  const pointsIn = [
    { x: 2, y: 3 },
    { x: 1, y: 4 },
    { x: 0, y: 4 },
    { x: 0, y: 2 }
  ];
  const pointsOut = [
    [],
    [{ x: 0, y: 2 }],
    [{ x: 2, y: 3 }],
    [{ x: 1, y: 4 }, { x: 0, y: 4 }],
    []
  ];
  expect(sortPointsInMatrix(pointsIn)(1)(5)).toEqual(pointsOut);
});

test("Truthy", () => {
  const pointsIn = [
    { x: 5, y: 4 },
    { x: 1, y: 4 },
    { x: 0, y: 4 },
    { x: -1, y: 4 }
  ];
  const pointsOut = [
    [],
    [],
    [],
    [{ x: 5, y: 4 }, { x: 1, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 4 }],
    [],
    []
  ];
  expect(sortPointsInMatrix(pointsIn)(1)(6)).toEqual(pointsOut);
});

test("Truthy", () => {
  const pointsIn = [
    { x: 2, y: 3 },
    { x: 1, y: 4 },
    { x: 0, y: 4 },
    { x: 0, y: 2 }
  ];
  const pointsOut = [
    [],
    [],
    [],
    [{ x: 0, y: 2 }],
    [],
    [{ x: 2, y: 3 }],
    [],
    [{ x: 1, y: 4 }, { x: 0, y: 4 }],
    [],
    []
  ];
  expect(sortPointsInMatrix(pointsIn)(0.5)(5)).toEqual(pointsOut);
});

// findHangingRows

test("Second to drop one time and third to drop two times, nothing to save", () => {
  const input = [[], [], [3]];
  const output = {
    toDrop: [[[], [3]], [[3]]],
    toSave: []
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Last two to drop, nothing to save", () => {
  const input = [[], [3], []];
  const output = {
    toDrop: [[[3], []]],
    toSave: []
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Last three to drop one time, last one to drop again, nothing to save", () => {
  const input = [[], [3], [], [1]];
  const output = {
    toDrop: [[[3], [], [1]], [[1]]],
    toSave: []
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Nothing to drop, first one to save", () => {
  const input = [[3], [], []];
  const output = {
    toDrop: [],
    toSave: [3]
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Last two to drop, first one to save", () => {
  const input = [[1], [], [3], [2]];
  const output = {
    toDrop: [[[3], [2]]],
    toSave: [1]
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Nothing to drop, two first to save", () => {
  const input = [[3], [3], [], []];
  const output = {
    toDrop: [],
    toSave: [3, 3]
  };
  expect(findHangingRows(input)).toEqual(output);
});

test("Nothing to drop, nothing to save", () => {
  const input = [[], [], []];
  const output = {
    toDrop: [],
    toSave: []
  };
  expect(findHangingRows(input)).toEqual(output);
});

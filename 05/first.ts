import fs from 'fs'
const values = fs.readFileSync('input', 'utf8')
function main() {
  let coordinates = values
    .split('\n')
    .map((x) => x.split(' -> '))
    .map((y) => y.map((z) => z.split(',')))
  doDiagonalLinesCalculation(coordinates)
  doStraightLinesCalculation(coordinates)
}

async function doDiagonalLinesCalculation(c: string[][][]): Promise<void> {
  let ventLocations = makeVentLocationList(c)
  let diagnoalLines = ventLocations.map(expandLines)
  buildOceanFloor(diagnoalLines, true)
}
async function doStraightLinesCalculation(c: string[][][]): Promise<void> {
  let ventLocations = makeVentLocationList(c)
  let straightVents = ventLocations.filter(filterVentLocForStraightLines)
  let straightLines = straightVents.map(expandLines)
  buildOceanFloor(straightLines)
}
function makeVentLocationList(coordinates: string[][][]): thermalVent[] {
  let vl: thermalVent[] = []
  for (const coord of coordinates) {
    if (coord.length == 1) continue
    let startLoc = {
      x: parseInt(coord[0][0]),
      y: parseInt(coord[0][1])
    }
    let endLoc = {
      x: parseInt(coord[1][0]),
      y: parseInt(coord[1][1])
    }
    vl.push({ start: startLoc, end: endLoc, body: [startLoc, endLoc] })
  }
  return vl
}
function filterVentLocForStraightLines(v: thermalVent): boolean {
  return v.start.x == v.end.x || v.start.y == v.end.y
}
function setKeyToMap(key: string, oceanFloor: Map<string, number>): void {
  if (oceanFloor.has(key)) {
    let cellValue = oceanFloor.get(key)
    if (cellValue) {
      oceanFloor.set(key, (cellValue += 1))
    }
  } else {
    oceanFloor.set(key, 1)
  }
}
function buildOceanFloor(straighLines: thermalVent[], diagonal?: boolean): void {
  let oceanFloor = new Map<string, number>()
  for (const vent of straighLines) {
    if (vent.body) {
      for (const location of vent.body) {
        setKeyToMap(`${location.x},${location.y}`, oceanFloor)
      }
    }
  }

  if (diagonal) console.log(`Diagonal crossings: ${getCrossings(oceanFloor)}`)
  else console.log(`Straight crossings: ${getCrossings(oceanFloor)}`)
}
function getCrossings(oceanFloor: Map<string, number>): number {
  let valid = 0
  oceanFloor.forEach((v, k, m) => {
    if (v >= 2) valid++
  })
  return valid
}

function expandLines(t: thermalVent): thermalVent {
  //   console.log(`Expanding: ${JSON.stringify(t)}`)
  if (t.start.x == t.end.x) {
    if (t.start.y < t.end.y) {
      for (let i = t.start.y + 1; i < t.end.y; i++) {
        const newSection = { x: t.start.x, y: i }
        t.body?.splice(t.body.length - 1, 0, newSection)
      }
      //   console.log(`\tDone Expanding Y Forward: ${JSON.stringify(t.body)}`)
    } else if (t.start.y > t.end.y) {
      for (let i = t.start.y - 1; i > t.end.y; i--) {
        const newSection = { x: t.start.x, y: i }
        t.body?.splice(t.body.length - 1, 0, newSection)
      }
      //   console.log(`\tDone Expanding Y Backward: ${JSON.stringify(t.body)}`)
    }
  }
  //forward
  if (t.start.y == t.end.y) {
    if (t.start.x < t.end.x) {
      for (let i = t.start.x + 1; i < t.end.x; i++) {
        const newSection = { x: i, y: t.start.y }
        t.body?.splice(t.body.length - 1, 0, newSection)
      }
      //   console.log(`\tDone Expanding X Forward: ${JSON.stringify(t.body)}`)
    } else if (t.start.x > t.end.x) {
      for (let i = t.start.x - 1; i > t.end.x; i--) {
        const newSection = { x: i, y: t.start.y }
        // console.log(JSON.stringify(newSection))
        t.body?.splice(t.body.length - 1, 0, newSection)
        // console.log(JSON.stringify(t.body))
      }
      //   console.log(`\tDone Expanding X Backward: ${JSON.stringify(t.body)}`)
    }
  }
  if (t.start.x != t.end.x && t.start.y != t.end.y) {
    if (t.start.x < t.end.x) {
      for (let i = t.start.x + 1; i < t.end.x; i++) {
        const newSection = { x: i, y: t.start.y }
        t.body?.splice(t.body.length - 1, 0, newSection)
      }
      //   console.log(`\tDone Expanding X Forward: ${JSON.stringify(t.body)}`)
    } else if (t.start.x > t.end.x) {
      for (let i = t.start.x - 1; i > t.end.x; i--) {
        const newSection = { x: i, y: t.start.y }
        t.body?.splice(t.body.length - 1, 0, newSection)
      }
      //   console.log(`\tDone Expanding X Backward: ${JSON.stringify(t.body)}`)
    }
    if (t.start.y < t.end.y) {
      for (let i = 1; i < t.body?.length - 1; i++) {
        t.body[i].y = t.body[i - 1].y + 1
      }
    } else if (t.start.y > t.end.y) {
      for (let i = 1; i < t.body?.length - 1; i++) {
        t.body[i].y = t.body[i - 1].y - 1
      }
    }
  }
  return t
}

interface thermalVent {
  end: ventLocation
  start: ventLocation
  body: ventLocation[]
}
interface ventLocation {
  x: number
  y: number
}

main()

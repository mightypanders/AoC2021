import fs from "fs"
import { exit } from "process"
const values = fs.readFileSync("input", "utf8")
function main() {
	let directions: string[] = values.split('\n')
	let coordinates = directions.map(x => x.split(' -> ')).map(y => y.map(z => z.split(',')))
	let ventLoc = makeVentLoc(coordinates)
	//straightVentLines(ventLoc)
	diagonalVentLines(ventLoc)
}
function diagonalVentLines(ventLoc: thermalVent[]): void {
	let diagnoalLines = ventLoc.map(expandLines)
	//buildOceanFloorForStraighLines(diagnoalLines)
}
function straightVentLines(ventLoc: thermalVent[]): void {
	let straightVents = ventLoc.filter(filterVentLocForStraightLines)
	let straightLines = straightVents.map(expandLines)
	buildOceanFloorForStraighLines(straightLines)
}
function makeVentLoc(coordinates: string[][][]): thermalVent[] {
	let vl: thermalVent[] = []
	for (const coord of coordinates) {
		if (coord.length == 1)
			continue
		const startx = Math.min(parseInt(coord[0][0]), parseInt(coord[1][0]))
		const endx = Math.max(parseInt(coord[0][0]), parseInt(coord[1][0]))
		const starty = Math.min(parseInt(coord[0][1]), parseInt(coord[1][1]))
		const endy = Math.max(parseInt(coord[0][1]), parseInt(coord[1][1]))
		let startLoc = {
			x: startx,
			y: starty
		}
		let endLoc = {
			x: endx,
			y: endy
		}
		vl.push({ start: startLoc, end: endLoc, body: [startLoc, endLoc] })
	}
	return vl
}
function filterVentLocForStraightLines(v: thermalVent): boolean {
	return (v.start.x == v.end.x || v.start.y == v.end.y)
}
//function filterForStraightLines(coordinates: string[][]): boolean {
//	if (coordinates.length == 1)
//		return false
//	//	console.log(`O:O ${coordinates[0][0]}\nO:1 ${coordinates[0][1]}\n1:O ${coordinates[1][0]}\n1:1 ${coordinates[1][1]}\n`)
//	if (coordinates[0][0] == coordinates[1][0] || coordinates[0][1] == coordinates[1][1])
//		return true
//	else return false
//}
function setKeyToMap(key: string, oceanFloor: Map<string, number>): void {
	if (oceanFloor.has(key)) {
		let cellValue = oceanFloor.get(key)
		if (cellValue) {
			oceanFloor.set(key, cellValue += 1)
		}
	} else {
		oceanFloor.set(key, 1)
	}
}
function buildOceanFloorForStraighLines(straighLines: thermalVent[]): void {
	let oceanFloor = new Map<string, number>()
	for (const vent of straighLines) {
		if (vent.body) {
			for (const location of vent.body) {
				setKeyToMap(`${location.x},${location.y}`, oceanFloor)
			}
		}
	}
	console.log(oceanFloor)
	console.log(`Number of crossings: ${getCrossings(oceanFloor)}`)
}
function getCrossings(oceanFlorr: Map<string, number>): number {
	let valid = 0
	oceanFlorr.forEach((v, k, m) => {
		if (v >= 2)
			valid++
	})

	return valid
}

function expandLines(t: thermalVent): thermalVent {
	console.log(`Expanding: ${JSON.stringify(t)}`)
	if (t.start.x == t.end.x) {
		// iterate y
		//const diff = difference(t.start.y, t.end.y)
		for (let i = t.start.y + 1; i < t.end.y; i++) {
			const newSection = { x: t.start.x, y: i }
			t.body?.splice(t.body.length - 1, 0, newSection)
		}
		console.log(`Done Expanding: ${JSON.stringify(t)}`)

	} else if (t.start.y == t.end.y) {
		// iterate x
		//forward
		for (let i = t.start.x + 1; i < t.end.x; i++) {
			const newSection = { x: i, y: t.start.y }
			t.body?.splice(t.body.length - 1, 0, newSection)
		}
		console.log(`Done Expanding: ${JSON.stringify(t)}`)
	} else {
		console.log(JSON.stringify(t, null, 2))
		exit()
	}
	return t
}

interface thermalVent {
	end: ventLocation
	start: ventLocation
	body?: ventLocation[]
}
interface ventLocation {
	x: number
	y: number
}
var difference = function(a: number, b: number) { return Math.abs(a - b) }

main()

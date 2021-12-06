import { readFileSync } from "fs"
import { argv, exit } from "process"

class LanternFish {
	days: number
	isNew: boolean = false
	justBirthed: boolean = false
	constructor(_days: number) {
		this.days = _days
		this.isNew = true
		this.justBirthed = false
	}
	eligibileForNewFish(): boolean {
		return this.days == 0
	}
	passDay() {
		if (this.isNew) {
			this.isNew = false
			return
		}
		if (this.justBirthed) {
			this.justBirthed = false
			return
		}
		this.days--
	}
	createNew(): LanternFish {
		this.days = 6
		this.justBirthed = true
		return new LanternFish(8)
	}
}

function createBaseFishPopulation(baseDays: number[]): LanternFish[] {
	const fish = baseDays.map(x => new LanternFish(x))
	fish.map(x => x.isNew = false)
	return fish
}
function simulateDay(fish: LanternFish[]): LanternFish[] {
	const newFish = fish.filter(x => x.eligibileForNewFish()).map(x => x.createNew())
	const fishesToHandle = [...fish, ...newFish]
	fishesToHandle.forEach(x => x.passDay())
	return fishesToHandle
}
function iterateOverGivenDaySpan(days: number, fish: LanternFish[]): LanternFish[] {
	for (let i = 0; i < days; i++) {
		fish = simulateDay(fish)
		//console.log(`Day ${i + 1}: ${fish.length}: ${fish.map(printAllFishDays)}`)
		console.log(`Day ${i + 1}|Fishes: ${fish.length}`)
	}
	return fish
}
function printAllFishDays(fish: LanternFish): string {
	return fish.days.toString()
}
function main(): void {
	console.log(JSON.stringify(argv))
	if (argv[2] && argv[2] != "") {
		const values = readFileSync(argv[2], "utf8")
		const inputs = values.replace('\n', '').split(',').map(x => parseInt(x))
		let fish = createBaseFishPopulation(inputs)
		//console.log(`Day 0,${JSON.stringify(fish)}`)
		fish = iterateOverGivenDaySpan(256, fish)
		console.log(`Fishes ${fish.length}`)
	} else {
		console.log("No filename")
		exit()
	}
}
main()

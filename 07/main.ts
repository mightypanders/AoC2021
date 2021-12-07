import { readFileSync } from "fs"
import { argv, exit } from "process"
// too low 92772307
//
// too high 92949057
function second(input: number[]): void {
	const average = (input.reduce((a, x) => a += x) / input.length)
	console.log(`Average: ${average}`)
	console.log(`Summed Distance Rounded: ${input.map(x => increasingDistanceToAverage(x, Math.floor(average))).reduce((a, x) => a += x)}`)
	console.log(`Summed Distance +1: ${input.map(x => increasingDistanceToAverage(x, Math.floor(average) + 1)).reduce((a, x) => a += x)}`)
	console.log(`Summed Distance -1: ${input.map(x => increasingDistanceToAverage(x, Math.floor(average) - 1)).reduce((a, x) => a += x)}`)

}

function first(input: number[]): void {
	const sorted = input.sort((a, b) => compareInt(a, b))
	//console.log(sorted)
	const med = findMedian(sorted)
	console.log(`Median: ${med}`)
	const distance = distanceToMedian(sorted, med)
	console.log(`Fuel: ${distance}`)
}
function increasingDistanceToAverage(input: number, average: number): number {
	const diff = difference(input, average)
	let output = 0
	for (let i = 1; i <= diff; i++) {
		output += i
	}


	//console.log(`From ${input} to ${average}: ${diff} = ${output}`)
	return output
}

function distanceToMedian(input: number[], median: number): number {
	let fuel = 0
	input.forEach(x => fuel += difference(x, median))
	return fuel
}
function findMedian(input: number[]): number {
	const length = input.length
	//console.log(length)
	let location = Math.floor(length / 2)
	//console.log(location)
	const value = input[location]
	return value
}

function difference(a: number, b: number): number {
	return Math.abs(a - b)
}
function compareInt(a: number, b: number): number {
	return a - b
}
function main(): void {
	console.log(JSON.stringify(argv))
	if (argv[2] && argv[2] != "") {
		const values = readFileSync(argv[2], "utf8")
		const inputs = values.replace('\n', '').split(',').map(x => parseInt(x))
		//console.log(JSON.stringify(inputs))
		first(inputs)
		second(inputs)
	} else {
		console.log("No filename")
		exit()
	}
}
main()

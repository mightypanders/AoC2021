import { readFileSync } from "fs"
import { argv, exit } from "process"


function main(): void {
	console.log(JSON.stringify(argv))
	if (argv[2] && argv[2] != "") {
		const values = readFileSync(argv[2], "utf8")
		const inputs = values.replace('\n', '').split(',')
		console.log(JSON.stringify(inputs))
	} else {
		console.log("No filename")
		exit()
	}
}
main()

import fs from 'fs'
let input = fs.readFileSync('numbers',{encoding:"utf8"}).split('\n').map(x=>Number(x))

let result = 0
let sums = []
for (let i = 0; i < input.length; i++) {
        sums.push(input[i] + input[i + 1] + input[i + 2])
        if (sums[sums.length-1] > sums[sums.length - 2])
            result++
}
console.log(result)

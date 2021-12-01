import fs from 'fs'
let input = fs.readFileSync('numbers',{encoding:"utf8"}).split('\n')
let result = 0
for (let i = 1; i < input.length; i++) {
    if (Number(input[i]) >= Number(input[i - 1]))
        result++
}
console.log(result)

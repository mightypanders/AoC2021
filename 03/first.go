package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

var gamma int64 = 0
var epsilon int64 = 0
var lines int = 0
var ones []int
var scannedLines []string
var e error

func checkErr(e error) {
	if e != nil {
		log.Fatal(e)
		panic(e)
	}
}
func main() {
	ones = readTextFile()
	gammaBinary, epsilonBinary := getMostAndLeast(ones, len(scannedLines), 1)
	calcPower(gammaBinary, epsilonBinary)

	oxygen := calcOxygen()
	scrubber := calcCO2ScrubberRating()

	rating := oxygen * scrubber
	fmt.Print("Support Rating ")
	fmt.Println(rating)
}
func calcCO2ScrubberRating() int64 {
	scrub := findCO2Scrubber(scannedLines, 0)
	scrubber, e := strconv.ParseInt(scrub, 2, 64)
	checkErr(e)
	return scrubber
}
func calcOxygen() int64 {
	oxy := findOxgenRating(scannedLines, 0)
	oxygen, e := strconv.ParseInt(oxy, 2, 64)
	checkErr(e)
	return oxygen
}

func findCO2Scrubber(lines []string, startingPoint int) string {
	least := getLeastCommonAtPos(lines, startingPoint, 0)
	resultLines := filterListByBitAtPos(lines, least, startingPoint)
	if len(resultLines) == 1 {
		return resultLines[0]
	} else {
		return findCO2Scrubber(resultLines, startingPoint+1)
	}
}

func filterListByBitAtPos(lines []string, bit string, pos int) []string {
	returnLines := make([]string, 0)
	for _, val := range lines {
		valueAtPos := val[pos : pos+1]
		if valueAtPos == bit {
			returnLines = append(returnLines, val)
		}
	}

	return returnLines
}
func findOxgenRating(lines []string, startingPoint int) string {
	most := getMostCommonAtPos(lines, startingPoint, 1)
	resultLines := filterListByBitAtPos(lines, most, startingPoint)
	if len(resultLines) == 1 {
		return resultLines[0]
	} else {
		return findOxgenRating(resultLines, startingPoint+1)
	}
}
func getLeastCommonAtPos(lines []string, pos int, onEqual int) string {
	ones, zeroes := 0, 0
	for _, val := range lines {
		bit := val[pos : pos+1]
		if bit == "1" {
			ones++
		} else {
			zeroes++
		}
	}
	if ones < zeroes {
		return "1"
	} else if ones > zeroes {
		return "0"
	} else {
		return fmt.Sprint(onEqual)
	}
}
func getMostCommonAtPos(lines []string, pos int, onEqual int) string {
	ones, zeroes := 0, 0
	for _, val := range lines {
		bit := val[pos : pos+1]
		if bit == "1" {
			ones++
		} else {
			zeroes++
		}
	}
	if ones > zeroes {
		return "1"
	} else if ones < zeroes {
		return "0"
	} else {
		return fmt.Sprint(onEqual)
	}
}

func calcPower(gammaBinary string, epsilonBinary string) {
	gamma, e = strconv.ParseInt(gammaBinary, 2, 64)
	checkErr(e)
	epsilon, e = strconv.ParseInt(epsilonBinary, 2, 64)
	checkErr(e)
	fmt.Print("Power Level ")
	fmt.Println(gamma * epsilon)
}

func getMostAndLeast(ones []int, lineNumber int, onEqual int) (string, string) {
	most := ""
	for _, value := range ones {
		if value > lineNumber/2 {
			most += "1"
		} else if value < lineNumber/2 {
			most += "0"
		} else {
			most += fmt.Sprint(onEqual)
		}
	}
	least := ""
	for _, value := range most {
		if value == '0' {
			least += "1"
		}
		if value == '1' {
			least += "0"
		}
	}
	return most, least
}
func readTextFile() []int {
	var onelist []int
	f, err := os.Open("input")
	checkErr(err)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		scannedText := scanner.Text()
		scannedLines = append(scannedLines, scannedText)
		lines++
	}
	onelist = getOnesList(scannedLines)
	return onelist
}
func getOnesList(text []string) []int {
	onelist := make([]int, len(text[0]))
	for _, scannedText := range text {

		for pos, char := range scannedText {
			if char == '1' {
				onelist[pos] = onelist[pos] + 1
			}
		}
	}
	return onelist
}

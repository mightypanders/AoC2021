package main

import (
	"04/BingoField"
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	inputLines := readTextFile()
	bingoNumbers := getBingoNumbers(inputLines)
	if bingoNumbers == nil {
		panic(1)
	}
	bingoFields := getBingoFields(inputLines)
	if bingoFields == nil {
		panic(1)
	}
	fmt.Println("First Part -------------------------------------")
	getFirstWinningBoard(bingoNumbers, bingoFields)
	fmt.Println("Second Part -------------------------------------")
	getLastWinningBoard(bingoNumbers, bingoFields)
}
func removeItemFromSlice(s []BingoField.BingoField, i int) []BingoField.BingoField{
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}
func filterList(s []BingoField.BingoField, positions []int)[]BingoField.BingoField{
	outputList := make([]BingoField.BingoField,0)
	for _,val := range positions{
		outputList = append(outputList,s[val])
	}
	return outputList
}
func getLastWinningBoard(bingoNumbers []string, bingoFields []BingoField.BingoField) {
	numbersToCheck := make([]string, 0)
	var winningField BingoField.BingoField
	for _, number := range bingoNumbers {
		numbersToCheck = append(numbersToCheck, number)
		matchedFields := make([]BingoField.BingoField, 0)
		positionsToRemove := make([]int,0)
		for pos, field := range bingoFields {
			if field.HasMatchInField(numbersToCheck) {
				matchedFields = append(matchedFields, field)
				positionsToRemove = append(positionsToRemove,pos)
			}
		}
			if(len(positionsToRemove)>0){
				bingoFields =filterList(bingoFields,positionsToRemove)
			}
			fmt.Println(bingoFields)
			if len(bingoFields) == 0{
			  winningField = matchedFields[len(matchedFields)-1]
				break
			}
		if len(bingoFields) ==  0 {
			break
		}
	}

	score := winningField.GetScore(numbersToCheck)
	fmt.Println("Field Score ",score)
}
func getFirstWinningBoard(bingoNumbers []string, bingoFields []BingoField.BingoField) {
	numbersToCheck := make([]string, 0)
	var winningField BingoField.BingoField
	for _, number := range bingoNumbers {
		numbersToCheck = append(numbersToCheck, number)
		matchedFields := make([]BingoField.BingoField, 0)
		for _, field := range bingoFields {
			if field.HasMatchInField(numbersToCheck) {
				matchedFields = append(matchedFields, field)
				break
			}
			if len(matchedFields) > 0 {
				break
			}
		}
		if len(matchedFields) > 0 {
			winningField = matchedFields[0]
			break
		}
	}
	score := winningField.GetScore(numbersToCheck)
	fmt.Println("Field Score ",score)
}

func getBingoNumbers(inputLines []string) []string {
	numbers := strings.Split(inputLines[0], ",")
	return numbers
}
func getBingoFields(inputLines []string) []BingoField.BingoField {
	var fields []BingoField.BingoField
	for startingPoint := 2; startingPoint < len(inputLines); startingPoint += 6 {
		fields = append(fields, BingoField.New(inputLines[startingPoint:startingPoint+5]))
	}
	return fields
}
func checkErr(e error) {
	if e != nil {
		panic(e)
	}
}
func readTextFile() []string {
	f, err := os.Open("testinput")
	checkErr(err)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	scannedLines := make([]string, 0)
	for scanner.Scan() {
		scannedText := scanner.Text()
		scannedLines = append(scannedLines, scannedText)
	}
	return scannedLines
}

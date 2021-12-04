package main

import (
	"04/BingoField"
	"bufio"
	"fmt"
	"os"
	"strings"
)
func main(){
	inputLines := readTextFile()
	bingoNumbers := getBingoNumbers(inputLines)
	if bingoNumbers == nil{
		panic(1)
	}
	bingoFields := getBingoFields(inputLines)
	if bingoFields == nil{
		panic(1)
	}
	numbersToCheck :=make([]string,0)
	var winningField BingoField.BingoField
	for _,number := range bingoNumbers{
		numbersToCheck = append(numbersToCheck,number)
		matchedFields := make([]BingoField.BingoField,0)
		for _,field := range bingoFields{
			if field.HasMatchInField(numbersToCheck){
				matchedFields = append(matchedFields,field)
				break
			}
			if len(matchedFields) > 0{
				break
			}
		}
			if len(matchedFields) > 0{
				winningField = matchedFields[0]
				break
			}
	}
	score := winningField.GetScore(numbersToCheck)
	fmt.Println(score)
}

func getBingoNumbers(inputLines []string) []string {
	numbers := strings.Split(inputLines[0],",")
	return numbers
}

func getBingoFields(inputLines []string) []BingoField.BingoField {
	var fields []BingoField.BingoField
	for startingPoint := 2; startingPoint < len(inputLines);startingPoint+=6{
		fields = append(fields, BingoField.New(inputLines[startingPoint:startingPoint+5]))
	}
	return fields
}

func checkErr(e error){
	if e != nil{
		panic(e)
	}
}

func readTextFile() []string {
	f, err := os.Open("input")
	checkErr(err)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	scannedLines := make([]string,0)
	for scanner.Scan() {
		scannedText := scanner.Text()
		scannedLines = append(scannedLines, scannedText)
	}
	return scannedLines
}

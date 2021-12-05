package BingoField

import (
	"fmt"
	"strconv"
	"strings"
)

type BingoField struct {
	rawData []string
	columns [][]string
	rows    [][]string
}

func checkErr(e error) {
	if e != nil {
		panic(e)
	}
}
func New(rawData []string) BingoField {
	e := BingoField{rawData, make([][]string, 0), make([][]string, 0)}
	e.rows = e.getRows()
	e.columns = e.getColumns()
	return e
}
func transpose(input [][]string) [][]string {
	xLen := len(input[0])
	yLen := len(input)
	result := make([][]string, xLen)
	for i := range result {
		result[i] = make([]string, yLen)
	}
	for i := 0; i < xLen; i++ {
		for j := 0; j < yLen; j++ {
			result[i][j] = input[j][i]
		}
	}
	return result
}
func (b BingoField) getColumns() [][]string {
	if len(b.columns) == 0 {
		if len(b.rows) == 0 {
			b.rows = b.getRows()
		}
		b.columns = transpose(b.rows)
	}
	//fmt.Println("cols ", b.columns)
	return b.columns
}
func (b BingoField) getRows() [][]string {
	if len(b.rows) == 0 {
		intermediateList := make([][]string, 0)
		for _, a := range b.rawData {
			lineContent := strings.Fields(a)
			intermediateList = append(intermediateList, lineContent)
		}
		b.rows = intermediateList
	}
	//fmt.Println("rows ", b.rows)
	return b.rows

}
func stringIsPresenInArray(input string, array []string) bool {
	for _, x := range array {
		if x == input {
			return true
		}
	}
	return false
}
func hasMatchInCollection(collection [][]string, numbers []string) bool {
	for _, subcol := range collection {
		matchcount := 0
		for _, number := range numbers {
			if stringIsPresenInArray(number, subcol) {
				matchcount++
			}
		}
		if matchcount >= 5 {
			//fmt.Println("Match is found in ",collection)
			return true
		}
	}
	return false
}
func (b BingoField) GetScore(numbers []string) int {
	lastNum, e := strconv.Atoi(numbers[len(numbers)-1])
	checkErr(e)
	notMatchedNumbers := make([]string, 0)
	for _, row := range b.rows {
		for _, val := range row {
			matched := false
			for _, number := range numbers {
				if val == number {
					matched = true
					break
				}
			}
			if !matched {
				notMatchedNumbers = append(notMatchedNumbers, val)
			}
		}
	}
	sum := sumOfList(notMatchedNumbers)
	fmt.Println("not Matched ",notMatchedNumbers)
	fmt.Println("called numbers ",numbers)
	fmt.Println("sum of not matched ",sum)
	product := sum * int(lastNum)
	return product
}
func sumOfList(numbers []string) int {
	acc := 0
	for _, val := range numbers {
		inc, e := strconv.Atoi(val)
		checkErr(e)
		//fmt.Println("Acc ", acc, "Inc ", inc)
		acc += inc
	}
	return acc
}
func (b BingoField) HasMatchInField(numbers []string) bool {
	return b.HasMatchInRows(numbers) || b.HasMatchInColumns(numbers)
}
func (b BingoField) HasMatchInRows(numbers []string) bool {
	return hasMatchInCollection(b.rows, numbers)
}
func (b BingoField) HasMatchInColumns(numbers []string) bool {
	return hasMatchInCollection(b.columns, numbers)
}

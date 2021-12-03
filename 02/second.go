package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"strconv"
)

var vertical int = 0
var horizontal int = 0
var aim int = 0

func checkErr(e error){
	if e != nil{
		panic(e)
	}
}
func main(){
	f,e:=os.Open("input")
	checkErr(e)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan(){
		evalCommand(scanner.Text())
	}
	defer fmt.Println(horizontal*vertical)
}
func evalCommand(c string){
	s := strings.Split(c," ")
	value,e:=	strconv.Atoi(s[1])
	checkErr(e)
	switch s[0]{
	case "forward":
		horizontal += value
		vertical += aim* value
	case "up":
		aim -= value
	case "down":
		aim += value
	}
}

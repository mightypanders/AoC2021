package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
	"strconv"
)

var vertical int = 0
var horizontal int = 0
func checkErr(e error){
	if e != nil{
		log.Fatal(e)
		panic(e)
	}
}
func main(){
	f, err:=os.Open("input")
	checkErr(err)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan(){
		evalCommand(scanner.Text())
	}

	fmt.Println(horizontal*vertical)

}
func evalCommand(c string){
	s := strings.Split(c," ")

	switch s[0]{
	case "forward":
		s,err :=	strconv.Atoi(s[1])
		checkErr(err)
		horizontal = horizontal+s
	case "backward":
		s,err :=	strconv.Atoi(s[1])
		checkErr(err)
		horizontal = horizontal-s
	case "up":
		s,err :=	strconv.Atoi(s[1])
		checkErr(err)
		vertical=vertical-s
	case "down":
		s,err :=	strconv.Atoi(s[1])
		checkErr(err)
		vertical=vertical+s
	}
}

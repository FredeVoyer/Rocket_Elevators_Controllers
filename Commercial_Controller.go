package main

import (
	"fmt"
	//"math"
	"sort"
)

// Define class Elevator
type Elevator struct {
	minFloor    int
	maxFloor    int
	id          int
	status      string
	direction   string
	floor       int
	destination int
	distance    int
	moving      string
	priority    int
	origin      int
	maxWeight   int
}

// Define class Column
type Column struct {
	minFloor                  int
	maxFloor                  int
	id                        int
	elevatorPerColAmount      int
	elevatorList              []Elevator
	priorityList              []int
	potentialElevatorsList    []Elevator
	nonPotentialElevatorsList []Elevator
}

// Define class Battery
type Battery struct {
	columnAmount         int
	elevatorPerColAmount int
	minFloorColumnList   []int
	maxFloorColumnList   []int
	columnList           []Column
}

//func (b *Battery) createObjects(columnAmount, elevatorPerColAmount int, minFloorColumnList, maxFloorColumnList []int, potentialElevatorsList []Elevator) {
func (b *Battery) createObjects(columnAmount int, elevatorPerColAmount int, minFloorColumnList []int, maxFloorColumnList []int) {
	// Create battery and initiate properties
	b.columnAmount = columnAmount
	b.elevatorPerColAmount = elevatorPerColAmount
	for i := 0; i < columnAmount; i++ {
		// Create columns and column list and initiate properties
		//b.columnList = append(b.columnList, Column{id:i+1, minFloor:minFloorColumnList[i], maxFloor:maxFloorColumnList[i], elevatorPerColAmount:elevatorPerColAmount, potentialElevatorsList:potentialElevatorsList []Elevator})
		b.columnList = append(b.columnList, Column{id: i + 1, minFloor: minFloorColumnList[i], maxFloor: maxFloorColumnList[i], elevatorPerColAmount: elevatorPerColAmount})
		b.minFloorColumnList = append(b.minFloorColumnList, minFloorColumnList[i])
		b.maxFloorColumnList = append(b.maxFloorColumnList, maxFloorColumnList[i])

		//b.columnList[i].potentialElevatorsList = []Elevator{}
		/*b.columnList[i].minFloor = minFloorColumnList[i]
		b.columnList[i].maxFloor = maxFloorColumnList[i]
		id int
		elevatorPerColAmount int
		elevatorList []Elevator
		priorityList []int*/

		for j := 0; j < elevatorPerColAmount; j++ {
			// Create elevators and elevator list and initiate properties
			b.columnList[i].elevatorList = append(b.columnList[i].elevatorList, Elevator{id: j + 1, priority: 99})
		}

	}
}

// add argument Elevator elevator for c.potentialElevatorsList nevermind it works now
func (c *Column) findElevator(requestedFloor int, direction string) int {
	// Set the priority for each elevator depending on the request floor and create list
	for i := 0; i < c.elevatorPerColAmount; i++ {
		if c.elevatorList[i].direction =="idle" {
			c.elevatorList[i].priority = 2
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="up" && requestedFloor >= c.elevatorList[i].floor && direction =="up" {
			c.elevatorList[i].priority = 1
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="down" && requestedFloor <= c.elevatorList[i].floor && direction =="down" {
			c.elevatorList[i].priority = 1
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="up" && requestedFloor >= c.elevatorList[i].floor && direction =="down" && c.elevatorList[i].destination == c.elevatorList[i].maxFloor {
			c.elevatorList[i].priority = 3
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="down" && requestedFloor <= c.elevatorList[i].floor && direction =="up" && c.elevatorList[i].destination == 1 {
			c.elevatorList[i].priority = 3
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else {
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		}
	}

	fmt.Println("c.priorityList0 is:", c.priorityList[0])
	fmt.Println("c.priorityList1 is:", c.priorityList[1])
	fmt.Println("c.priorityList2 is:", c.priorityList[2])
	fmt.Println("c.priorityList3 is:", c.priorityList[3])
	fmt.Println("c.priorityList4 is:", c.priorityList[4])

	// Identify the highest priority to identify the potential elevators
	//sort.Ints(ints)
	sort.Ints(c.priorityList)
	//c.priorityList.Sort()
	//int minPriority = math.Min(c.priorityList)
	minPriority := c.priorityList[0]
	fmt.Println("minPriority is:", minPriority)

	// Identify potential elevators depending on their priority request and create list
	//var c.potentialElevatorsList []Elevator
	//var potentialElevatorsList []Elevator
	for i := 0; i < c.elevatorPerColAmount; i++ {
		if c.elevatorList[i].priority == minPriority {
			c.potentialElevatorsList = append(c.potentialElevatorsList, c.elevatorList[i])
		} else {
			c.nonPotentialElevatorsList = append(c.nonPotentialElevatorsList, c.elevatorList[i])
		}
	}

	// Compute distance between each potential elevator floor and floor requested toto
	//elevatorDistanceList := make(int[],0)
	var elevatorDistanceList []int

	// int[] elevatorDistanceList
	/*for i := 0; i < c.potentialElevatorsList.length; i++ {
		elevatorDistanceList = append(elevatorDistanceList, math.Abs(c.potentialElevatorsList[i].floor - requestedFloor))
		//elevatorDistanceList.Add(math.Abs(c.potentialElevatorsList[i].floor - requestedFloor))
		c.potentialElevatorsList[i].distance = math.Abs(c.potentialElevatorsList[i].floor - requestedFloor)
	}*/
	for i := 0; i < c.elevatorPerColAmount; i++ {
		if c.elevatorList[i].priority == minPriority {
			//c.elevatorList[i].distance = math.Abs(c.elevatorList[i].floor - requestedFloor)
			c.elevatorList[i].distance = c.elevatorList[i].floor - requestedFloor
			if c.elevatorList[i].distance < 0 {
				c.elevatorList[i].distance = c.elevatorList[i].distance * -1
			}
			elevatorDistanceList = append(elevatorDistanceList, c.elevatorList[i].distance)
		}
	}

	// Identify the smallest distance
	//SORT ascending order distance
	sort.Ints(elevatorDistanceList)
	//elevatorDistanceList.Sort()
	minDistance := elevatorDistanceList[0]
	fmt.Println("minDistance is:", minDistance)

	// Identify closest elevator (only one))
	idElevatorSelected := 0
	//for i := 0; i < c.potentialElevatorsList.length; i++ {
	for i := 0; i < c.elevatorPerColAmount; i++ {
		//if (c.potentialElevatorsList[i].distance == minDistance) {
		if c.elevatorList[i].distance == minDistance {
			// ElevatorSelected = c.elevatorList[i]
			//idElevatorSelected = c.potentialElevatorsList[i].id
			idElevatorSelected = c.elevatorList[i].id
			return idElevatorSelected // c.potentialElevatorsList[i].id
			//break // select only one elevator
		}
	}
	return idElevatorSelected
}

//func (c *Column) updateFloorDirectionDestinationMoving(elevator Elevator, floor int, direction string, destination int, moving string) {
func (b *Battery) updateFloorDirectionDestinationMoving(elevator Elevator, floor int, direction string, destination int, moving string) {
	elevator.floor = floor
	elevator.direction = direction
	elevator.destination = destination
	elevator.moving = moving
	fmt.Println(elevator.floor)
	fmt.Println("fase")
}

func (c *Column) requestElevator(requestedFloor int, direction string) int {
	//upButtonPressed() call there or in scenarios (if direction)
	//downButtonPressed() call there or in scenarios (if direction)

	idElevatorSelected := c.findElevator(requestedFloor, direction) // c.elevatorList[0];
	//fmt.Println("idElevatorSelected:", idElevatorSelected)
	fmt.Println("Elevator selected is: elevator", c.elevatorList[idElevatorSelected-1].id)
	// Determine the elevator direction and move it accordingly
	if c.elevatorList[idElevatorSelected-1].floor < requestedFloor {
		c.elevatorList[idElevatorSelected-1].direction ="up"
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"direction is:", c.elevatorList[idElevatorSelected-1].direction)
		// Move the elevator to the requested floor
		//c.elevatorList[idElevatorSelected-1].destination = requestedFloor
		/*for (var i =c.elevatorList[idElevatorSelected-1].floor; i <= requestedFloor; i++) {
			fmt.Println("elevator",c.elevatorList[idElevatorSelected-1].id,"floor is:",c.elevatorList[idElevatorSelected-1].floor)
			c.elevatorList[idElevatorSelected-1].floor=i
		}*/
		for c.elevatorList[idElevatorSelected-1].floor <= requestedFloor {
			fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"floor is:", c.elevatorList[idElevatorSelected-1].floor)
			c.elevatorList[idElevatorSelected-1].moving ="yes"
			c.elevatorList[idElevatorSelected-1].floor++
			// floor 0 doesnt exist, transition from -1 to 1
			if c.elevatorList[idElevatorSelected-1].floor == 0 {
				c.elevatorList[idElevatorSelected-1].floor = 1
			}
		}
		c.elevatorList[idElevatorSelected-1].floor--
		c.elevatorList[idElevatorSelected-1].moving ="no"

	} else if c.elevatorList[idElevatorSelected-1].floor > requestedFloor {
		c.elevatorList[idElevatorSelected-1].direction ="down"
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"direction is:", c.elevatorList[idElevatorSelected-1].direction)
		// Move the elevator to the requested floor
		//c.elevatorList[idElevatorSelected-1].destination = requestedFloor;
		//for (var i =c.elevatorList[idElevatorSelected-1].floor; i >= requestedFloor; i--) {
		for c.elevatorList[idElevatorSelected-1].floor >= requestedFloor {
			fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"floor is:", c.elevatorList[idElevatorSelected-1].floor)
			c.elevatorList[idElevatorSelected-1].moving ="yes"
			c.elevatorList[idElevatorSelected-1].floor--
			// floor 0 doesnt exist, transition from 1 to -1
			if c.elevatorList[idElevatorSelected-1].floor == 0 {
				c.elevatorList[idElevatorSelected-1].floor = -1
			}
		}
		c.elevatorList[idElevatorSelected-1].floor++
		// adjust bug display 0 start of reuqest floor
		if c.elevatorList[idElevatorSelected-1].floor == 0 {
			c.elevatorList[idElevatorSelected-1].floor = 1
		}
		c.elevatorList[idElevatorSelected-1].moving ="no"
	}
	return c.elevatorList[idElevatorSelected-1].id //elevator";
}

func (e *Elevator) requestFloor(elevator int, requestedFloor int) {
	//fmt.Println("requestFloor method, elevator is: elevator", elevator)
	e.moving ="no"
	fmt.Println("elevator", elevator,"is stopped at floor:", e.floor)
	//upButtonNotPressed() call there or in requestElevator (if direction)
	//downButtonNotPressed() call there or in requestElevator (if direction)

	fmt.Println("elevator", elevator,"opens doors")
	//openDoor() call there
	//floorButtonPressed() call there or in scenario
	//closeDoor() call there
	fmt.Println("elevator", elevator,"closes doors")
	// Determine the elevator direction and move it accordingly
	if e.floor < requestedFloor {
		e.direction ="up"
		fmt.Println("elevator", elevator,"direction is:", e.direction)
		// Move the elevator to the requested floor
		e.destination = requestedFloor
		e.moving ="yes"
		for e.floor <= requestedFloor {
			fmt.Println("elevator", elevator,"floor is:", e.floor)
			e.floor++
			// floor 0 doesnt exist, transition from -1 to 1
			if e.floor == 0 {
				e.floor = 1
			}
		}
		e.floor--
		e.moving ="no"
	} else if e.floor > requestedFloor {
		e.direction ="down"
		fmt.Println("elevator", elevator,"direction is:", e.direction)
		// Move the elevator to the requested floor
		e.moving ="yes"
		e.destination = requestedFloor
		for e.floor >= requestedFloor {
			fmt.Println("elevator", elevator,"floor is:", e.floor)
			e.floor--
			// floor 0 doesnt exist, transition from 1 to -1
			if e.floor == 0 {
				e.floor = -1
			}
		}
		e.floor++
		// adjust bug display 0 end of reuqest floor
		if e.floor == 0 {
			e.floor = 1
		}
		e.moving ="no"
	}
	fmt.Println("elevator", elevator,"is stopped at floor:", e.floor)
	fmt.Println("elevator", elevator,"opens doors")
	//openDoor() call there
	//floorButtonNotPressed() call there
	//closeDoor() call there
	fmt.Println("elevator", elevator,"closes doors")

}

func (b *Battery) Scenario1() {
	/*Scenario 1:
	Elevator B1 at 20th floor going to the 5th floor
	Elevator B2 at 3rd floor going to the 15th floor
	Elevator B3 at 13th floor going to RC
	Elevator B4 at 15th floor going to the 2nd floor
	Elevator B5 at 6th floor going to RC
	*/

	// Create instance of battery
	//battery1 := new(Battery)
	// Create objects
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})
	//Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});

	b.columnList[1].elevatorList[0].floor =20
	b.columnList[1].elevatorList[0].direction ="down"
	b.columnList[1].elevatorList[0].destination = 5
	b.columnList[1].elevatorList[0].moving ="yes"

	b.columnList[1].elevatorList[1].floor =3
	b.columnList[1].elevatorList[1].direction ="up"
	b.columnList[1].elevatorList[1].destination = 15
	b.columnList[1].elevatorList[1].moving ="yes"

	b.columnList[1].elevatorList[2].floor =13
	b.columnList[1].elevatorList[2].direction ="down"
	b.columnList[1].elevatorList[2].destination = 1
	b.columnList[1].elevatorList[2].moving ="yes"

	b.columnList[1].elevatorList[3].floor =15
	b.columnList[1].elevatorList[3].direction ="down"
	b.columnList[1].elevatorList[3].destination = 2
	b.columnList[1].elevatorList[3].moving ="yes"

	b.columnList[1].elevatorList[4].floor =6
	b.columnList[1].elevatorList[4].direction ="down"
	b.columnList[1].elevatorList[4].destination = 1
	b.columnList[1].elevatorList[4].moving ="yes" 

	/*fmt.Println("b.columnList[0].elevatorList[0].id",b.columnList[0].elevatorList[0].id)
	fmt.Println("b.columnList[0].elevatorList[0].minFloor",b.columnList[0].elevatorList[0].minFloor)
	fmt.Println("b.columnList[0].elevatorList[0].maxFloor",b.columnList[0].elevatorList[0].maxFloor)
	*/

	fmt.Println("elevator1.floor is:", b.columnList[1].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:", b.columnList[1].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:", b.columnList[1].elevatorList[0].destination)
	fmt.Println("elevator1.id is:", b.columnList[1].elevatorList[0].id)
	fmt.Println("elevator2.floor is:", b.columnList[1].elevatorList[1].floor)
	fmt.Println("elevator2.direction is:", b.columnList[1].elevatorList[1].direction)
	fmt.Println("elevator2.destination is:", b.columnList[1].elevatorList[1].destination)
	fmt.Println("elevator2.id is:", b.columnList[1].elevatorList[1].id)
	fmt.Println("elevator3.floor is:", b.columnList[1].elevatorList[2].floor)
	fmt.Println("elevator3.direction is:", b.columnList[1].elevatorList[2].direction)
	fmt.Println("elevator3.destination is:", b.columnList[1].elevatorList[2].destination)
	fmt.Println("elevator3.id is:", b.columnList[1].elevatorList[2].id)
	fmt.Println("elevator4.floor is:", b.columnList[1].elevatorList[3].floor)
	fmt.Println("elevator4.direction is:", b.columnList[1].elevatorList[3].direction)
	fmt.Println("elevator4.destination is:", b.columnList[1].elevatorList[3].destination)
	fmt.Println("elevator4.id is:", b.columnList[1].elevatorList[3].id)
	fmt.Println("elevator5.floor is:", b.columnList[1].elevatorList[4].floor)
	fmt.Println("elevator5.direction is:", b.columnList[1].elevatorList[4].direction)
	fmt.Println("elevator5.destination is:", b.columnList[1].elevatorList[4].destination)
	fmt.Println("elevator5.id is:", b.columnList[1].elevatorList[4].id) 

	//fmt.Println("columnList[1].id is:", b.columnList[1].id)

	/* Someone at RC wants to go to the 20th floor. */
	idElevatorSelected := b.columnList[1].requestElevator(1,"up")

	fmt.Println("ElevatorSelected is:", idElevatorSelected)

	//upButtonPressed() call there or in requestElevator (if direction)
	b.columnList[1].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 20)
	//floorButtonPressed() call there or in requestFloor (if direction)

	/* fmt.Println("elevator5.floor is:", b.columnList[1].elevatorList[4].floor)
	fmt.Println("elevator5.direction is:", b.columnList[1].elevatorList[4].direction)
	fmt.Println("elevator5.destination is:", b.columnList[1].elevatorList[4].destination)
	fmt.Println("elevator5.id is:", b.columnList[1].elevatorList[4].id) */

	/* Elevator B5 is expected to be sent.*/
}

func (b *Battery) Scenario2() {
	/*Scenario 2:
	  Elevator C1 at RC going to the 21st floor (not yet departed)
	  Elevator C2 at 23rd floor going to the 28th floor
	  Elevator C3 at 33rd floor going to RC
	  Elevator C4 at 40th floor going to the 24th floor
	  Elevator C5 at 39th floor going to RC
	*/

	// Create instance of battery
	//battery1 := new(Battery)
	// Create objects
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})

	b.columnList[2].elevatorList[0].floor = 1
	b.columnList[2].elevatorList[0].direction ="up"
	b.columnList[2].elevatorList[0].destination = 21
	b.columnList[2].elevatorList[0].moving ="no"

	b.columnList[2].elevatorList[1].floor = 23
	b.columnList[2].elevatorList[1].direction ="up"
	b.columnList[2].elevatorList[1].destination = 28
	b.columnList[2].elevatorList[1].moving ="yes"

	b.columnList[2].elevatorList[2].floor = 33
	b.columnList[2].elevatorList[2].direction ="down"
	b.columnList[2].elevatorList[2].destination = 1
	b.columnList[2].elevatorList[2].moving ="yes"

	b.columnList[2].elevatorList[3].floor = 40
	b.columnList[2].elevatorList[3].direction ="down"
	b.columnList[2].elevatorList[3].destination = 24
	b.columnList[2].elevatorList[3].moving ="yes"

	b.columnList[2].elevatorList[4].floor = 39
	b.columnList[2].elevatorList[4].direction ="down"
	b.columnList[2].elevatorList[4].destination = 1
	b.columnList[2].elevatorList[4].moving ="yes"

	fmt.Println("elevator1.floor is:", b.columnList[2].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:", b.columnList[2].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:", b.columnList[2].elevatorList[0].destination)
	fmt.Println("elevator1.id is:", b.columnList[2].elevatorList[0].id)
	fmt.Println("elevator2.floor is:", b.columnList[2].elevatorList[1].floor)
	fmt.Println("elevator2.direction is:", b.columnList[2].elevatorList[1].direction)
	fmt.Println("elevator2.destination is:", b.columnList[2].elevatorList[1].destination)
	fmt.Println("elevator2.id is:", b.columnList[2].elevatorList[1].id)
	fmt.Println("elevator3.floor is:", b.columnList[2].elevatorList[2].floor)
	fmt.Println("elevator3.direction is:", b.columnList[2].elevatorList[2].direction)
	fmt.Println("elevator3.destination is:", b.columnList[2].elevatorList[2].destination)
	fmt.Println("elevator3.id is:", b.columnList[2].elevatorList[2].id)
	fmt.Println("elevator4.floor is:", b.columnList[2].elevatorList[3].floor)
	fmt.Println("elevator4.direction is:", b.columnList[2].elevatorList[3].direction)
	fmt.Println("elevator4.destination is:", b.columnList[2].elevatorList[3].destination)
	fmt.Println("elevator4.id is:", b.columnList[2].elevatorList[3].id)
	fmt.Println("elevator5.floor is:", b.columnList[2].elevatorList[4].floor)
	fmt.Println("elevator5.direction is:", b.columnList[2].elevatorList[4].direction)
	fmt.Println("elevator5.destination is:", b.columnList[2].elevatorList[4].destination)
	fmt.Println("elevator5.id is:", b.columnList[2].elevatorList[4].id)

	fmt.Println("columnList[2].id is:", b.columnList[2].id)

	/* Someone at RC wants to go to the 36th floor. */
	idElevatorSelected := b.columnList[2].requestElevator(1,"up")

	fmt.Println("ElevatorSelected is:", idElevatorSelected)

	//upButtonPressed() call there or in requestElevator (if direction)
	b.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 36)
	//floorButtonPressed() call there or in requestFloor (if direction)

	/*fmt.Println("elevator1.floor is:", b.columnList[2].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:", b.columnList[2].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:", b.columnList[2].elevatorList[0].destination)
	fmt.Println("elevator1.id is:", b.columnList[2].elevatorList[0].id)*/

	/* Elevator C1 is expected to be sent*/
}

func (b *Battery) Scenario3() {
	/*Scenario 3: 
		Elevator D1 at 58th going to RC
		Elevator D2 at 50th floor going to the 60th floor
		Elevator D3 at 46th floor going to the 58th floor
		Elevator D4 at RC going to the 54th floor
		Elevator D5 at 60th floor going to RC
		*/

	// Create instance of battery
	//battery1 := new(Battery)
	// Create objects
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})

	b.columnList[3].elevatorList[0].floor = 58
	b.columnList[3].elevatorList[0].direction ="down"
	b.columnList[3].elevatorList[0].destination = 1
	b.columnList[3].elevatorList[0].moving ="yes"

	b.columnList[3].elevatorList[1].floor = 50
	b.columnList[3].elevatorList[1].direction ="up"
	b.columnList[3].elevatorList[1].destination = 60
	b.columnList[3].elevatorList[1].moving ="yes"

	b.columnList[3].elevatorList[2].floor = 46
	b.columnList[3].elevatorList[2].direction ="up"
	b.columnList[3].elevatorList[2].destination = 58
	b.columnList[3].elevatorList[2].moving ="yes"

	b.columnList[3].elevatorList[3].floor = 1
	b.columnList[3].elevatorList[3].direction ="up"
	b.columnList[3].elevatorList[3].destination = 54
	b.columnList[3].elevatorList[3].moving ="yes"

	b.columnList[3].elevatorList[4].floor = 60
	b.columnList[3].elevatorList[4].direction ="down"
	b.columnList[3].elevatorList[4].destination = 1
	b.columnList[3].elevatorList[4].moving ="yes"

	fmt.Println("elevator1.floor is:",b.columnList[3].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:",b.columnList[3].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:",b.columnList[3].elevatorList[0].destination)
	fmt.Println("elevator1.id is:",b.columnList[3].elevatorList[0].id)
	fmt.Println("elevator2.floor is:",b.columnList[3].elevatorList[1].floor)
	fmt.Println("elevator2.direction is:",b.columnList[3].elevatorList[1].direction)
	fmt.Println("elevator2.destination is:",b.columnList[3].elevatorList[1].destination)
	fmt.Println("elevator2.id is:",b.columnList[3].elevatorList[1].id)
	fmt.Println("elevator3.floor is:",b.columnList[3].elevatorList[2].floor)
	fmt.Println("elevator3.direction is:",b.columnList[3].elevatorList[2].direction)
	fmt.Println("elevator3.destination is:",b.columnList[3].elevatorList[2].destination)
	fmt.Println("elevator3.id is:",b.columnList[3].elevatorList[2].id)
	fmt.Println("elevator4.floor is:",b.columnList[3].elevatorList[3].floor)
	fmt.Println("elevator4.direction is:",b.columnList[3].elevatorList[3].direction)
	fmt.Println("elevator4.destination is:",b.columnList[3].elevatorList[3].destination)
	fmt.Println("elevator4.id is:",b.columnList[3].elevatorList[3].id)
	fmt.Println("elevator5.floor is:",b.columnList[3].elevatorList[4].floor)
	fmt.Println("elevator5.direction is:",b.columnList[3].elevatorList[4].direction)
	fmt.Println("elevator5.destination is:",b.columnList[3].elevatorList[4].destination)
	fmt.Println("elevator5.id is:",b.columnList[3].elevatorList[4].id)

	fmt.Println("columnList[3].id is:",b.columnList[3].id)

	/* Someone at 54th floor wants to go to RC. */
	idElevatorSelected := b.columnList[3].requestElevator(54,"down")

	//fmt.Println("ElevatorSelected is:", idElevatorSelected)

	//upButtonPressed() call there or in requestElevator (if direction)
	b.columnList[3].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1)
	//floorButtonPressed() call there or in requestFloor (if direction)

	/*fmt.Println("elevator1.floor is:", b.columnList[3].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:", b.columnList[3].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:", b.columnList[3].elevatorList[0].destination)
	fmt.Println("elevator1.id is:", b.columnList[3].elevatorList[0].id)*/

	/* Elevator D1 is expected to be sent*/
}

func (b *Battery) Scenario4() {
	/*Scenario 4: 
		Elevator A1 “Idle” at SS4
		Elevator A2 “Idle” at RC
		Elevator A3 at SS3 going to SS5
		Elevator A4 at SS6 going to RC
		Elevator A5 at SS1 going to SS6
		*/

	// Create instance of battery
	//battery1 := new(Battery)
	// Create objects
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})

	b.columnList[0].elevatorList[0].floor = -4
	b.columnList[0].elevatorList[0].direction ="idle"
	b.columnList[0].elevatorList[0].destination = -4
	b.columnList[0].elevatorList[0].moving ="no"

	b.columnList[0].elevatorList[1].floor = 1
	b.columnList[0].elevatorList[1].direction ="idle"
	b.columnList[0].elevatorList[1].destination = 1
	b.columnList[0].elevatorList[1].moving ="no"

	b.columnList[0].elevatorList[2].floor = -3
	b.columnList[0].elevatorList[2].direction ="down"
	b.columnList[0].elevatorList[2].destination = -5
	b.columnList[0].elevatorList[2].moving ="yes"

	b.columnList[0].elevatorList[3].floor = -6
	b.columnList[0].elevatorList[3].direction ="up"
	b.columnList[0].elevatorList[3].destination = 1
	b.columnList[0].elevatorList[3].moving ="yes"

	b.columnList[0].elevatorList[4].floor = -1
	b.columnList[0].elevatorList[4].direction ="down"
	b.columnList[0].elevatorList[4].destination = -6
	b.columnList[0].elevatorList[4].moving ="yes"

	fmt.Println("elevator1.floor is:",b.columnList[0].elevatorList[0].floor)
	fmt.Println("elevator1.direction is:",b.columnList[0].elevatorList[0].direction)
	fmt.Println("elevator1.destination is:",b.columnList[0].elevatorList[0].destination)
	fmt.Println("elevator1.id is:",b.columnList[0].elevatorList[0].id)
	fmt.Println("elevator2.floor is:",b.columnList[0].elevatorList[1].floor)
	fmt.Println("elevator2.direction is:",b.columnList[0].elevatorList[1].direction)
	fmt.Println("elevator2.destination is:",b.columnList[0].elevatorList[1].destination)
	fmt.Println("elevator2.id is:",b.columnList[0].elevatorList[1].id)
	fmt.Println("elevator3.floor is:",b.columnList[0].elevatorList[2].floor)
	fmt.Println("elevator3.direction is:",b.columnList[0].elevatorList[2].direction)
	fmt.Println("elevator3.destination is:",b.columnList[0].elevatorList[2].destination)
	fmt.Println("elevator3.id is:",b.columnList[0].elevatorList[2].id)
	fmt.Println("elevator4.floor is:",b.columnList[0].elevatorList[3].floor)
	fmt.Println("elevator4.direction is:",b.columnList[0].elevatorList[3].direction)
	fmt.Println("elevator4.destination is:",b.columnList[0].elevatorList[3].destination)
	fmt.Println("elevator4.id is:",b.columnList[0].elevatorList[3].id)
	fmt.Println("elevator5.floor is:",b.columnList[0].elevatorList[4].floor)
	fmt.Println("elevator5.direction is:",b.columnList[0].elevatorList[4].direction)
	fmt.Println("elevator5.destination is:",b.columnList[0].elevatorList[4].destination)
	fmt.Println("elevator5.id is:",b.columnList[0].elevatorList[4].id)

	fmt.Println("columnList[0].id is:",b.columnList[0].id)

	/* Someone at SS3 wants to go to RC. */
	idElevatorSelected := b.columnList[0].requestElevator(-3,"up")

	//fmt.Println("ElevatorSelected is:", idElevatorSelected)

	//upButtonPressed() call there or in requestElevator (if direction)
	b.columnList[0].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1)
	//floorButtonPressed() call there or in requestFloor (if direction)

	/*fmt.Println("elevator4.floor is:", b.columnList[0].elevatorList[3].floor)
	fmt.Println("elevator4.direction is:", b.columnList[0].elevatorList[3].direction)
	fmt.Println("elevator4.destination is:", b.columnList[0].elevatorList[3].destination)
	fmt.Println("elevator4.id is:", b.columnList[0].elevatorList[3].id)/**/

	/* Elevator A4 is expected to be sent*/
}

func main() {
	//fmt.Println("Commercial Controller")
	// Create instance of battery
	battery1 := &Battery{}

	//battery1.Scenario1()
	//battery1.Scenario2()
	//battery1.Scenario3()
	battery1.Scenario4()

	// Create objects
	//battery1.createObjects(4, 5, []int{-6,2,21,41}, []int{-1,20,40,60}) //, []Elevator{})

	//fmt.Println("battery1.columnList[0].id",battery1.columnList[0].id)

}

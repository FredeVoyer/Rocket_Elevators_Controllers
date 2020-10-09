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
	destinationList []int
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

// Creating instances of battery, columns and elevators depending on the inputs given by the scenarios (4)
func (b *Battery) createObjects(columnAmount int, elevatorPerColAmount int, minFloorColumnList []int, maxFloorColumnList []int) {
	// Create battery and initiate properties
	b.columnAmount = columnAmount
	b.elevatorPerColAmount = elevatorPerColAmount
	for i := 0; i < columnAmount; i++ {
		// Create columns and column list and initiate properties
		b.columnList = append(b.columnList, Column{id: i + 1, minFloor: minFloorColumnList[i], maxFloor: maxFloorColumnList[i], elevatorPerColAmount: elevatorPerColAmount})
		b.minFloorColumnList = append(b.minFloorColumnList, minFloorColumnList[i])
		b.maxFloorColumnList = append(b.maxFloorColumnList, maxFloorColumnList[i])

		for j := 0; j < elevatorPerColAmount; j++ {
			// Create elevators and elevator list and initiate properties
			b.columnList[i].elevatorList = append(b.columnList[i].elevatorList, Elevator{id: j + 1, priority: 99})
		}
	}
}

// Choose an elevator depending on its movement (destination), direction and distance to the floor requested (and the direction requested)
func (c *Column) findElevator(requestedFloor int, direction string) int {
	// Identify real min and max floor by including the main floor (1) of the elevator (and column)
	var realMaxFloor = c.maxFloor
	var realMinFloor = 1
	if c.id == 1 {
		realMaxFloor = 1
	}
	if c.id == 1 {
		realMinFloor = c.minFloor
	} 
	// Set the priority for each elevator depending on the request floor and put it in a list
	for i := 0; i < c.elevatorPerColAmount; i++ {	
		// Set priority 2 to elevator not moving and without destination (idle)
		if c.elevatorList[i].direction =="idle" {
			c.elevatorList[i].priority = 2
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		// Set priority 1 to elevator moving in the same direction as requested and floor reuqested is in the way of his run
		} else if c.elevatorList[i].direction =="up" && requestedFloor >= c.elevatorList[i].floor && direction =="up" {
			c.elevatorList[i].priority = 1
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="down" && requestedFloor <= c.elevatorList[i].floor && direction =="down" {
			c.elevatorList[i].priority = 1
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		// Set priority 3 to elevator moving to the min or max floor so it can change direction then
		} else if c.elevatorList[i].direction =="up" && requestedFloor >= c.elevatorList[i].floor && direction =="down" && c.elevatorList[i].destination == realMaxFloor {
			c.elevatorList[i].priority = 3
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		} else if c.elevatorList[i].direction =="down" && requestedFloor <= c.elevatorList[i].floor && direction =="up" && c.elevatorList[i].destination == realMinFloor {
			c.elevatorList[i].priority = 3
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		// Default priority 99, remaining cases elevator going in different direction than requested
		} else {
			c.priorityList = append(c.priorityList, c.elevatorList[i].priority)
		}
	}

	// Identify the highest priority to identify the potential elevators
	sort.Ints(c.priorityList)
	minPriority := c.priorityList[0]

	// Compute distance between each potential (highest priority) elevator floor and floor requested 
	var elevatorDistanceList []int

	for i := 0; i < c.elevatorPerColAmount; i++ {
		if c.elevatorList[i].priority == minPriority {
			//c.elevatorList[i].distance = math.Abs(c.elevatorList[i].floor - requestedFloor) //change type int to float to make it work
			c.elevatorList[i].distance = c.elevatorList[i].floor - requestedFloor
			if c.elevatorList[i].distance < 0 {
				c.elevatorList[i].distance = c.elevatorList[i].distance * -1
			}
			elevatorDistanceList = append(elevatorDistanceList, c.elevatorList[i].distance)
		}
	}

	// Identify the smallest distance
	sort.Ints(elevatorDistanceList)
	minDistance := elevatorDistanceList[0]
	// Identify closest elevator with its id (only one if some have the same minimum distance)
	idElevatorSelected := 0
	for i := 0; i < c.elevatorPerColAmount; i++ {
		if c.elevatorList[i].distance == minDistance {
			// ElevatorSelected = c.elevatorList[i]
			idElevatorSelected = c.elevatorList[i].id
			return idElevatorSelected 
			//break // select only one elevator
		}
	}
	return idElevatorSelected
}

func (c *Column) requestElevator(requestedFloor int, direction string) int {
	//upButtonPressed() call there or in scenarios (if direction)
	//downButtonPressed() call there or in scenarios (if direction)

	idElevatorSelected := c.findElevator(requestedFloor, direction) 
	fmt.Println("Elevator selected is: elevator", c.elevatorList[idElevatorSelected-1].id)
	// Determine the elevator direction and move it accordingly
	if c.elevatorList[idElevatorSelected-1].floor < requestedFloor {// elevator is lower than floor requested
		c.elevatorList[idElevatorSelected-1].direction ="up"
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"direction is:", c.elevatorList[idElevatorSelected-1].direction)
		// Move the elevator to the requested floor (up)
		//c.elevatorList[idElevatorSelected-1].destination = requestedFloor (list sort depending on direction)
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
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"is stopped at floor:", c.elevatorList[idElevatorSelected-1].floor)
		//upButtonNotPressed() call there or in requestElevator (if direction)
		//downButtonNotPressed() call there or in requestElevator (if direction)
		fmt.Println("Call button light turns off")
	
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"opens doors")
		//openDoor() call there
		//floorButtonPressed() call there or in scenario
		//closeDoor() call there
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"closes doors")
	} else if c.elevatorList[idElevatorSelected-1].floor > requestedFloor { // elevator is higher than floor requested
		c.elevatorList[idElevatorSelected-1].direction ="down"
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"direction is:", c.elevatorList[idElevatorSelected-1].direction)
		// Move the elevator to the requested floor (down)
		//c.elevatorList[idElevatorSelected-1].destination = requestedFloor;
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
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"is stopped at floor:", c.elevatorList[idElevatorSelected-1].floor)
		//upButtonNotPressed() call there or in requestElevator (if direction)
		//downButtonNotPressed() call there or in requestElevator (if direction)
		fmt.Println("Call button light turns off")
	
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"opens doors")
		//openDoor() call there
		//floorButtonPressed() call there or in scenario
		//closeDoor() call there
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"closes doors")
	
	} else {// elevator is on floor requested
		fmt.Println("Call button light turns off")
	
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"opens doors")
		fmt.Println("elevator", c.elevatorList[idElevatorSelected-1].id,"closes doors")
	}
	return c.elevatorList[idElevatorSelected-1].id //elevator
}

func (e *Elevator) requestFloor(elevator int, requestedFloor int) {
	//destinationList append remove (if time to do it)
	e.moving ="no"
	// Determine the elevator direction and move it accordingly
	if e.floor < requestedFloor {
		e.direction ="up"
		fmt.Println("elevator", elevator,"direction is:", e.direction)
		// Move the elevator to the requested floor (up)
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
		// Move the elevator to the requested floor (down)
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
	fmt.Println("Floor button light turns off")

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
		// Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})
		// Set the elevator parameters: floor, direction, destination and moving)
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

	// Display the beginning of the sceanrio
	fmt.Println("column id is:", b.columnList[1].id)

	fmt.Println("elevator1 floor is", b.columnList[1].elevatorList[0].floor, ", direction is", b.columnList[1].elevatorList[0].direction, "and destination is", b.columnList[1].elevatorList[0].destination)
	fmt.Println("elevator2 floor is", b.columnList[1].elevatorList[1].floor, ", direction is", b.columnList[1].elevatorList[1].direction, "and destination is", b.columnList[1].elevatorList[1].destination)
	fmt.Println("elevator3 floor is", b.columnList[1].elevatorList[2].floor, ", direction is", b.columnList[1].elevatorList[2].direction, "and destination is", b.columnList[1].elevatorList[2].destination)
	fmt.Println("elevator4 floor is", b.columnList[1].elevatorList[3].floor, ", direction is", b.columnList[1].elevatorList[3].direction, "and destination is", b.columnList[1].elevatorList[3].destination)
	fmt.Println("elevator5 floor is", b.columnList[1].elevatorList[4].floor, ", direction is", b.columnList[1].elevatorList[4].direction, "and destination is", b.columnList[1].elevatorList[4].destination)

	/* Someone at RC wants to go to the 20th floor. */
	fmt.Println("Up button on floor 1 of column 2 is pressed and button light turns on")
	idElevatorSelected := b.columnList[1].requestElevator(1,"up")
	//upButtonPressed() call there or in requestElevator (if direction)

	fmt.Println("Floor 20 button light turns on")
	b.columnList[1].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 20)
	//floorButtonPressed() call there or in requestFloor (if direction)

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
		// Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})
		// Set the elevator parameters: floor, direction, destination and moving)
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

	// Display the beginning of the sceanrio
	fmt.Println("column id is:", b.columnList[2].id)

	fmt.Println("elevator1 floor is", b.columnList[2].elevatorList[0].floor, ", direction is", b.columnList[2].elevatorList[0].direction, "and destination is", b.columnList[2].elevatorList[0].destination)
	fmt.Println("elevator2 floor is", b.columnList[2].elevatorList[1].floor, ", direction is", b.columnList[2].elevatorList[1].direction, "and destination is", b.columnList[2].elevatorList[1].destination)
	fmt.Println("elevator3 floor is", b.columnList[2].elevatorList[2].floor, ", direction is", b.columnList[2].elevatorList[2].direction, "and destination is", b.columnList[2].elevatorList[2].destination)
	fmt.Println("elevator4 floor is", b.columnList[2].elevatorList[3].floor, ", direction is", b.columnList[2].elevatorList[3].direction, "and destination is", b.columnList[2].elevatorList[3].destination)
	fmt.Println("elevator5 floor is", b.columnList[2].elevatorList[4].floor, ", direction is", b.columnList[2].elevatorList[4].direction, "and destination is", b.columnList[2].elevatorList[4].destination)

	/* Someone at RC wants to go to the 36th floor. */
	fmt.Println("Up button on floor 1 of column 3 is pressed and button light turns on")
	idElevatorSelected := b.columnList[2].requestElevator(1,"up")
	//upButtonPressed() call there or in requestElevator (if direction)

	fmt.Println("Floor 36 button light turns on")
	b.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 21)
	b.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 36)
	//floorButtonPressed() call there or in requestFloor (if direction)

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
		// Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})
		// Set the elevator parameters: floor, direction, destination and moving)
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
	
	// Display the beginning of the sceanrio
	fmt.Println("column id is:", b.columnList[3].id)

	fmt.Println("elevator1 floor is", b.columnList[3].elevatorList[0].floor, ", direction is", b.columnList[3].elevatorList[0].direction, "and destination is", b.columnList[3].elevatorList[0].destination)
	fmt.Println("elevator2 floor is", b.columnList[3].elevatorList[1].floor, ", direction is", b.columnList[3].elevatorList[1].direction, "and destination is", b.columnList[3].elevatorList[1].destination)
	fmt.Println("elevator3 floor is", b.columnList[3].elevatorList[2].floor, ", direction is", b.columnList[3].elevatorList[2].direction, "and destination is", b.columnList[3].elevatorList[2].destination)
	fmt.Println("elevator4 floor is", b.columnList[3].elevatorList[3].floor, ", direction is", b.columnList[3].elevatorList[3].direction, "and destination is", b.columnList[3].elevatorList[3].destination)
	fmt.Println("elevator5 floor is", b.columnList[3].elevatorList[4].floor, ", direction is", b.columnList[3].elevatorList[4].direction, "and destination is", b.columnList[3].elevatorList[4].destination)

	/* Someone at 54th floor wants to go to RC. */
	fmt.Println("Down button on floor 54 of column 4 is pressed and button light turns on")
	idElevatorSelected := b.columnList[3].requestElevator(54,"down")
	//downButtonPressed() call there or in requestElevator (if direction)

	fmt.Println("Floor 1 (L) button light turns on")
	b.columnList[3].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1)
	//floorButtonPressed() call there or in requestFloor (if direction)

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
		// Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
	b.createObjects(4, 5, []int{-6, 2, 21, 41}, []int{-1, 20, 40, 60}) //, []Elevator{})
		// Set the elevator parameters: floor, direction, destination and moving)
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

	// Display the beginning of the sceanrio
	fmt.Println("column id is:", b.columnList[0].id)

	fmt.Println("elevator1 floor is", b.columnList[0].elevatorList[0].floor, ", direction is", b.columnList[0].elevatorList[0].direction, "and destination is", b.columnList[0].elevatorList[0].destination)
	fmt.Println("elevator2 floor is", b.columnList[0].elevatorList[1].floor, ", direction is", b.columnList[0].elevatorList[1].direction, "and destination is", b.columnList[0].elevatorList[1].destination)
	fmt.Println("elevator3 floor is", b.columnList[0].elevatorList[2].floor, ", direction is", b.columnList[0].elevatorList[2].direction, "and destination is", b.columnList[0].elevatorList[2].destination)
	fmt.Println("elevator4 floor is", b.columnList[0].elevatorList[3].floor, ", direction is", b.columnList[0].elevatorList[3].direction, "and destination is", b.columnList[0].elevatorList[3].destination)
	fmt.Println("elevator5 floor is", b.columnList[0].elevatorList[4].floor, ", direction is", b.columnList[0].elevatorList[4].direction, "and destination is", b.columnList[0].elevatorList[4].destination)

	/* Someone at SS3 wants to go to RC. */
	fmt.Println("Up button on floor SS3 (-3) of column 1 is pressed and button light turns on")
	idElevatorSelected := b.columnList[0].requestElevator(-3,"up")
	//upButtonPressed() call there or in requestElevator (if direction)

	fmt.Println("Floor 1 (L) button light turns on")
	b.columnList[0].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1)
	//floorButtonPressed() call there or in requestFloor (if direction)

	/* Elevator A4 is expected to be sent*/
}

func main() {
	// Create instance of battery
	battery1 := &Battery{}

	battery1.Scenario1()
	//battery1.Scenario2()
	//battery1.Scenario3()
	//battery1.Scenario4()
}

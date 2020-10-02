#Python code for residential building elevators controller 

class Column:
    def __init__(self, elevatorAmount, floorAmount):
        self.elevatorAmount = elevatorAmount
        self.floorAmount = floorAmount
        self.elevatorList = []
        self.potentialElevatorsList= []
        self.nonPotentialElevatorsList= []
        for i in range(elevatorAmount):
            self.elevatorList.append(Elevator(i, floorAmount))


# definition of the class Elevator
class Elevator :
    def __init__(self, _id, _floorAmount):
        self.id = _id
        self.floorAmount = _floorAmount
        self.direction = "idle" # null (idle not moving if destination is null else moving), up, down (moving for both)
        self.floor= 1 # floor domain (1,...,10)
        self.destination = None # floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
        self.floorRequestList= []


#Instance class object Column
columnA = Column(2, 10)
print(columnA.elevatorAmount)
print(columnA.floorAmount)
print(columnA.potentialElevatorsList)
print(columnA.elevatorList[0].floor)



#print ("self.elevatorList" )
# done sequentiel (as seen in the channel) instead of real time no requestFloorList for the elevators
#'-------------------------------------------------------Testing Section------------------------------------------------------------*/
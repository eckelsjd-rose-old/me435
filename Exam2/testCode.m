clc
clear all
parkPlace = MonopolyProperty('PARK PLACE', 350, 35, [175 500 1100 1300 1500], 200)
boardwalk = MonopolyProperty('BOARDWALK', 400, 50, [200 600 1400 1700 2000], 200)
parkPlace.collectRent()
parkPlace.buyHouse()
parkPlace.buyHotel()
parkPlace.collectRent()
for k = 1:4
    parkPlace.buyHouse()
    boardwalk.buyHouse()
end
parkPlace.buyHotel()
parkPlace
boardwalk
for k = 1:2
    parkPlace.collectRent()
    boardwalk.collectRent()
end
parkPlace
boardwalk

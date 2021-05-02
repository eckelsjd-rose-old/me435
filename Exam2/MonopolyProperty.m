classdef MonopolyProperty < handle
    properties
        Name;
        Cost;
        normalRent;
        houseRents;
        houseCost;
        numHouses = 0;
        profit = 0;
        maxHouses = 4;
    end
    
    methods
        function this = MonopolyProperty(name, cost, normalRent, houseRents, houseCost)
            this.Name = name;
            this.Cost = cost;
            this.normalRent = normalRent;
            this.houseRents = houseRents;
            this.houseCost = houseCost;
            fprintf("%s Paid $%.2f\n",upper(this.Name),this.Cost);
            this.profit = this.profit - this.Cost;
        end
        
        function disp(this)
            fprintf("%s Houses: %d  Profit: $%.2f\n",upper(this.Name),this.numHouses,this.profit);
        end
        
        function buyHouse(this)
            if this.numHouses >= this.maxHouses
                fprintf("%s Could not buy house\n",upper(this.Name));
            else
                fprintf("%s Paid $%.2f\n",upper(this.Name),this.houseCost);
                this.numHouses = this.numHouses + 1;
                this.profit = this.profit - this.houseCost;
            end
        end
        
        function buyHotel(this)
            if this.numHouses == this.maxHouses
                this.numHouses = this.numHouses + 1;
                fprintf("%s Paid $%.2f for a hotel\n",upper(this.Name),this.houseCost);
                this.profit = this.profit - this.houseCost;
            else
                fprintf("%s Could not buy hotel\n",upper(this.Name));
            end
        end
        
        function collectRent(this)
            if this.numHouses == 0
                collectAmount = this.normalRent;
            else
                collectAmount = this.houseRents(this.numHouses);
            end
            this.profit = this.profit + collectAmount;
            fprintf("%s Collected $%.2f\n",upper(this.Name),collectAmount);
        end
    end
end
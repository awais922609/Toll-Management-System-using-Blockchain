// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0;
pragma experimental ABIEncoderV2; //Hint (or distraction): Allows returning arrays from functions
contract TollPlaza {

struct vehicle {

    string vehicle_number;
    string vehicle_type;
    string vehicle_model;

}

struct Toll{

    string toll_plaza_id;
    string toll_plaza_name;
    uint256 time; //time enter

}

uint car_tollprice=100000;
uint van_tollprice=200000;
uint bus_tollprice=500000;
address payable public owner;
mapping (address => vehicle [] ) vehicles;
mapping (address => uint) account_balance;
address[] public vehicle_Accts;
Toll[] public Toll_list;
mapping (string => Toll []) vehicle_history;



modifier onlyOwner {
require(msg.sender == owner, "Only owner is allowed");
_;
}

constructor() {
owner=payable(msg.sender);
}

function Register_Vehicle(string memory _vehnum,string memory _vehtype,string memory _vehmodel) public {

    vehicles[msg.sender].push(vehicle(_vehnum, _vehtype,_vehmodel));

    vehicle_Accts.push(msg.sender);

}

function Charge_balance() payable public{

    for (uint i=0; i<vehicle_Accts.length; i++) {
        if (msg.sender == vehicle_Accts[i]){

            account_balance[vehicle_Accts[i]] += msg.value;
            break;

        }
    
    }
}

function Init_Toll(string memory _name,string memory _id) onlyOwner public {

    Toll memory toll_obj = Toll(_id,_name,block.timestamp);
    Toll_list.push(toll_obj); 


}

function getVehicles(address _address)  internal view returns ( vehicle[] memory) {
    
    return vehicles[_address];

    }


function Check_ownership(string memory _vehnum,string memory _vehtype,string memory _vehmodel) public view returns(bool){
    bool _check=false;
    vehicle[] memory obj=getVehicles(msg.sender);
    if (obj.length != 0) {
        for (uint i=0; i<obj.length; i++) {
        if( ( keccak256(bytes(obj[i].vehicle_number)) == keccak256(bytes(_vehnum)) ) && ( keccak256(bytes(obj[i].vehicle_type)) == keccak256(bytes(_vehtype)) ) && ( keccak256(bytes(obj[i].vehicle_model)) == keccak256(bytes(_vehmodel)) ) )
        
        _check=true;

        }

    }

return _check;

}


function Pay_Tolltax(string memory _id,string memory _tollname,string memory _vehnum,string memory _type,string memory _vehmodel) public returns(bool){

    bool _check=false;

    if(Check_ownership(_vehnum,_type,_vehmodel)){

    if( keccak256(bytes(_type)) == keccak256(bytes("car")) && account_balance[msg.sender] >= car_tollprice){
    account_balance[msg.sender] -= car_tollprice;
    _check=true;        
    }
    else if( keccak256(bytes(_type)) == keccak256(bytes("van")) && account_balance[msg.sender] >= van_tollprice){
    account_balance[msg.sender] -= van_tollprice;
    _check=true;        
    }
    else if( keccak256(bytes(_type)) == keccak256(bytes("bus")) && account_balance[msg.sender] >= bus_tollprice){
    account_balance[msg.sender] -= bus_tollprice;
    _check=true;        
    }
    else{
    _check=false;    
    }

    if(_check == true){
    
        vehicle_history[_vehnum].push(Toll(_id,_tollname,block.timestamp));
    
    }

    }

return _check;
}

function get_History(string memory _num) public view returns(Toll[] memory) {
    return vehicle_history[_num];
}

function get_paidhistory(string memory _num,string memory _type) public view returns(uint){

    uint amount=0;
    Toll[] memory obj=get_History(_num);
    if( keccak256(bytes(_type)) == keccak256(bytes("car")) ) {

        amount = obj.length*car_tollprice;

    }
    else if( keccak256(bytes(_type)) == keccak256(bytes("van")) ){

        amount = obj.length*van_tollprice;

    }
    else if( keccak256(bytes(_type)) == keccak256(bytes("bus")) ){

        amount = obj.length*bus_tollprice;

    }

        
return amount;       

}

function withdraw_amount() public onlyOwner {
    
    payable(msg.sender).transfer(address(this).balance);

}

function destroy() public onlyOwner {
selfdestruct(owner);
}


function check_balance() public view returns(uint){

    return account_balance[msg.sender];    

}



function get_owner() public view returns(address){

    return owner;

}

}


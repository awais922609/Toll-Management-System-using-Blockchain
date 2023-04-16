import React, {Component} from 'react';
import Web3 from 'web3'
import {SIMP_STORAGE_ADDRESS, SIMP_STORAGE_ABI} from './config.js'
class App extends Component {
constructor() {
super()
this.state = { account: ''

, simpcontract:'',
payTollTaxConfirmation: true,
getHistoryList:'',
getPaidAmount:0,
getBalance:0,
checkOwnership: false,
CheckOwnerShip_vhNo:'',
CheckOwnerShip_vhtp:'',
CheckOwnerShip_vhModel:'',
PaidHistory_vhNo:'',
PaidHistory_vhtp:'',
GetHistory_vhNo:[],
}

}

componentDidMount() {
this.loadBlockchainData()
}

async loadBlockchainData() {
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const accounts = await web3.eth.getAccounts()
this.setState({ account: accounts[0] })
const simpstorage = new web3.eth.Contract(SIMP_STORAGE_ABI,SIMP_STORAGE_ADDRESS);
this.setState({ simpcontract: simpstorage })

const getBalance = await simpstorage.methods.check_balance().call({ from:this.state.account })
this.setState({ getBalance: getBalance })
const checkOwnership = await simpstorage.methods.Check_ownership(this.state.CheckOwnerShip_vhNo, this.state.CheckOwnerShip_vhtp, this.state.CheckOwnerShip_vhModel).call({ from:this.state.account })
this.setState({ checkOwnership: checkOwnership.toString() })

const getPaidAmount = await simpstorage.methods.get_paidhistory(this.state.PaidHistory_vhNo, this.state.PaidHistory_vhtp).call({ from:this.state.account })
this.setState({ getPaidAmount: getPaidAmount })


var getHistoryList = []
getHistoryList = await simpstorage.methods.get_History(this.state.GetHistory_vhNo).call({ from:this.state.account })
this.setState({ getHistoryList: getHistoryList[0] })

}

render() {
return (
<div>
<p>Your account: {this.state.account}</p>

<hr></hr>
<h1>WELCOME TO TOLL MANAGEMENT</h1>
<hr></hr>
<h2>Users Previlages</h2>
<hr></hr>


<h3>Register Vehicle:</h3>
<p>This feature allows the user to register it's vehicle and then use this information to pay toll taxes.</p>

<form onSubmit={(event) => {
event.preventDefault()
const RegisterVehicle_vhNo = new FormData(event.target).get("RegisterVehicle_vhNo");
const RegisterVehicle_vhtp = new FormData(event.target).get("RegisterVehicle_vhtp");
const RegisterVehicle_vhModel = new FormData(event.target).get("RegisterVehicle_vhModel");
this.state.simpcontract.methods.Register_Vehicle(RegisterVehicle_vhNo, RegisterVehicle_vhtp, RegisterVehicle_vhModel).send({ from:this.state.account })
this.loadBlockchainData()
}}>
<label>{"Vehicle Number: "}</label>
<input id="RegisterVehicle_vhNo" name ="RegisterVehicle_vhNo" type="text" required /><br></br><br></br>
<label>{"Vehicle Type: "}</label>
<input id="RegisterVehicle_vhtp" name ="RegisterVehicle_vhtp" type="text" required /><br></br><br></br>
<label>{"Vehicle Model: "}</label>
<input id="RegisterVehicle_vhModel" name ="RegisterVehicle_vhModel" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>

<hr></hr>


<h3>Charge Balance:</h3>
<p>This feature allows the user to charge his/her wallet(in ether) and then use this balance to pay taxes in future.</p>

<form onSubmit={(event) => {
event.preventDefault()

var temp = this.state.account;

const ChargeBalance_amount = new FormData(event.target).get("ChargeBalance_amount");
this.state.simpcontract.methods.Charge_balance().send({from:temp,value:Web3.utils.toWei(ChargeBalance_amount,"ether")}) 

    
this.loadBlockchainData()
}}>
<label>{"Amount: "}</label>
<input id="ChargeBalance_amount" name ="ChargeBalance_amount" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>

<hr></hr>


<h3>Pay TollTax:</h3>
<p>This feature allows the user to pay the toll tax by providing the information of toll plaza and vehicle.</p>
<form onSubmit={(event) => {
event.preventDefault()

const PayTollTax_tollId = new FormData(event.target).get("PayTollTax_tollId");
const PayTollTax_tollNo = new FormData(event.target).get("PayTollTax_tollNo");
const PayTollTax_vhNo = new FormData(event.target).get("PayTollTax_vhNo");
const PayTollTax_vhtp = new FormData(event.target).get("PayTollTax_vhtp");
const PayTollTax_vhModel = new FormData(event.target).get("PayTollTax_vhModel");

const payTollTaxConfirmation = this.state.simpcontract.methods.Pay_Tolltax(PayTollTax_tollId, PayTollTax_tollNo, PayTollTax_vhNo, PayTollTax_vhtp, PayTollTax_vhModel).send({ from:this.state.account })
this.setState({ payTollTaxConfirmation: payTollTaxConfirmation.toString() })

this.loadBlockchainData()
}}>
<label>{"Toll ID: "}</label>
<input id="PayTollTax_tollId" name ="PayTollTax_tollId" type="text" required /><br></br><br></br>
<label>{"Toll Name: "}</label>
<input id="PayTollTax_tollNo" name ="PayTollTax_vhtp" type="text" required /><br></br><br></br>
<label>{"Vehicle Number: "}</label>
<input id="PayTollTax_vhNo" name ="PayTollTax_vhNo" type="text" required /><br></br><br></br>
<label>{"Vehicle Type: "}</label>
<input id="PayTollTax_vhtp" name ="PayTollTax_vhtp" type="text" required /><br></br><br></br>
<label>{"Vehicle Model: "}</label>
<input id="PayTollTax_vhModel" name ="PayTollTax_vhModel" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>
<p>Result: {this.state.payTollTaxConfirmation}</p>
<hr></hr>


<h3>Vehicle History:</h3>
<p>This feature allows the user to track his/her vehicle with the taxes he/she paid.</p>
<form onSubmit={(event) => {
event.preventDefault()
const GetHistory_vhNo = new FormData(event.target).get("GetHistory_vhNo");

this.setState({ GetHistory_vhNo: GetHistory_vhNo })

var getHistoryList = []
getHistoryList = this.state.simpcontract.methods.get_History(GetHistory_vhNo).send({ from:this.state.account })
this.setState({ getHistoryList: getHistoryList[0] })

this.loadBlockchainData()
}}>
<label>{"Vehicle number: "}</label>
<input id="GetHistory_vhNo" name ="GetHistory_vhNo" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>
<p>Result: {this.state.getHistoryList}</p>
<hr></hr>


<h3>Paid History:</h3>
<p>This feature allows the user to track his/her payments on a specific vehicle.</p>
<form onSubmit={(event) => {
event.preventDefault()
const PaidHistory_vhNo = new FormData(event.target).get("PaidHistory_vhNo");
const PaidHistory_vhtp = new FormData(event.target).get("PaidHistory_vhtp");

this.setState({ PaidHistory_vhNo: PaidHistory_vhNo })
this.setState({ PaidHistory_vhtp: PaidHistory_vhtp })

var getPaidAmount = this.state.simpcontract.methods.get_paidhistory(PaidHistory_vhNo, PaidHistory_vhtp).send({ from:this.state.account })
this.setState({ getPaidAmount: getPaidAmount })

this.loadBlockchainData()
}}>
<label>{"Vehicle number: "}</label>
<input id="PaidHistory_vhNo" name ="PaidHistory_vhNo" type="text" required /><br></br><br></br>
<label>{"Vehicle type: "}</label>
<input id="PaidHistory_vhtp" name ="PaidHistory_vhtp" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>
<p>Amount: {this.state.getPaidAmount}</p>
<hr></hr>


<h3>Check Balance:</h3>
<p>This feature allows the user to check its balance by automatically taking its address.</p>
<form onSubmit={(event) => {
event.preventDefault()

var getBalance = this.state.simpcontract.methods.check_balance().send({ from:this.state.account })

this.setState({ getBalance: getBalance })
this.loadBlockchainData()
}}>
<label>{"Enter the below button to check the remaining balance"}</label><br></br><br></br>

<input type="submit" hidden="" />
</form>
<p>Remaining Balance: {this.state.getBalance}</p>
<hr></hr>



<h3>Check OwnerShip:</h3>
<p>This feature can only be used by the owner and it tranfers all the contract's balance to owner's account.</p>

<form onSubmit={(event) => {
event.preventDefault()

const CheckOwnerShip_vhNo = new FormData(event.target).get("CheckOwnerShip_vhNo");
const CheckOwnerShip_vhtp = new FormData(event.target).get("CheckOwnerShip_vhtp");
const CheckOwnerShip_vhModel = new FormData(event.target).get("CheckOwnerShip_vhModel");

this.setState({ CheckOwnerShip_vhNo: CheckOwnerShip_vhNo })
this.setState({ CheckOwnerShip_vhtp: CheckOwnerShip_vhtp })
this.setState({ CheckOwnerShip_vhModel: CheckOwnerShip_vhModel })

// const abcd = {};
const checkOwnership = this.state.simpcontract.methods.Check_ownership(CheckOwnerShip_vhNo, CheckOwnerShip_vhtp, CheckOwnerShip_vhModel).send({ from:this.state.account })
this.setState({ checkOwnership: checkOwnership.toString() })

this.loadBlockchainData()
}}>
<label>{"Vehicle Number: "}</label>
<input id="CheckOwnerShip_vhNo" name ="CheckOwnerShip_vhNo" type="text" required /><br></br><br></br>
<label>{"Vehicle Type: "}</label>
<input id="CheckOwnerShip_vhtp" name ="CheckOwnerShip_vhtp" type="text" required /><br></br><br></br>
<label>{"Vehicle Model: "}</label>
<input id="CheckOwnerShip_vhModel" name ="CheckOwnerShip_vhModel" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>
<p>Result: {this.state.checkOwnership}</p>
<hr></hr>




<h2>Owner Special Previlages</h2>
<hr></hr>


<h3>Initialize Toll:</h3>
<p>This feature allows the owner to enter the toll information.</p>

<form onSubmit={(event) => {
event.preventDefault()

const tollID = new FormData(event.target).get("initialize_tollId");
const tollName = new FormData(event.target).get("initialize_tollName");
this.state.simpcontract.methods.Init_Toll(tollName, tollID).send({ from:this.state.account })
this.loadBlockchainData()
}}>
    
<label>{"Toll ID: "}</label>
<input id="initialize_tollId" name ="initialize_tollId" type="text" required /><br></br><br></br>
<label>{"Toll Name: "}</label>
<input id="initialize_tollName" name ="initialize_tollName" type="text" required /><br></br><br></br>
<input type="submit" hidden="" />
</form>

<hr></hr>

<h3>Withdraw Amount:</h3>
<p>This feature can only be used by the owner and it tranfers all the contract's balance to owner's account.</p>

<form onSubmit={(event) => {
event.preventDefault()
this.state.simpcontract.methods.withdraw_amount().send({ from:this.state.account })

this.loadBlockchainData()
}}>
<label>{"Enter the below to withdraw the amount"}</label><br></br><br></br>

<input type="submit" hidden="" />
</form>
<hr></hr>




</div> 

);
}

}

export default App;
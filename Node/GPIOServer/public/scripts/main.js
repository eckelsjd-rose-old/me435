/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.variableName = "";

/** function and class syntax examples */
rhit.functionName = function () {
};

rhit.ViewController = class {
	constructor() {
		console.log("Add button listeners");
		document.querySelector("#redLedOnButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOn("r");
		};
		document.querySelector("#redLedOffButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOff("r");
		};
		document.querySelector("#yellowLedOnButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOn("y");
		};
		document.querySelector("#yellowLedOffButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOff("y");
		};
		document.querySelector("#greenLedOnButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOn("g");
		};
		document.querySelector("#greenLedOffButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleLedOff("g");
		};
		document.querySelector("#readButton").onclick = (event) => { // callback fn for id=ledOnButton
			this.handleRead();
		};
		document.querySelector("#servoSlider").onchange = (event) => {
			console.log("Servo slider = ", event.target.value);
			fetch('api/servo/' + event.target.value);
		};
		document.querySelector("#motorSlider").onchange = (event) => {
			console.log("Motor slider = ", event.target.value);
			fetch('api/motor/' + event.target.value);
		};
	}

	handleLedOn(color) {
		console.log("You clicked LED ON for " + color);
		fetch('api/ledon/' + color);

	}

	handleLedOff(color) {
		console.log("You clicked LED OFF for " + color);	
		fetch('api/ledoff/' + color);

	}

	async handleRead() {
		console.log("Fetch button state and update UI");
		// fetch('api/read').then((response) => {
		// 	console.log(response);
		// });
		// console.log("This log happens before fetch returns.");

		const response = await fetch("api/read");
		const data = await response.json();
		console.log(data);
		const isHigh = data["isHigh"];
		console.log(isHigh);
		document.querySelector("#readOutput").innerHTML = isHigh ? "The pushbutton is HIGH" : "The pushbutton is LOW";


	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	new rhit.ViewController();
};

rhit.main();

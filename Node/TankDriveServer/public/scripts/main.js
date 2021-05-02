var rhit = rhit || {};

rhit.TankController = class {
	constructor() {
		const buttons = document.querySelectorAll(".driveButton");
		const sliderInput = document.querySelector("#baseSpeed");

		for (const button of buttons) {
			// Mobile
			// button.onclick = (event) => {
			// 	const leftMultiplier = button.dataset.leftMultiplier;
			// 	const rightMultiplier = button.dataset.rightMultiplier;
			// 	const baseSpeed = sliderInput.value;

			// 	const leftWheelSpeed = baseSpeed * leftMultiplier;
			// 	const rightWheelSpeed = baseSpeed * rightMultiplier;

			// 	this.sendDriveCommand(leftWheelSpeed,rightWheelSpeed);
			// 	console.log(`Send command to server: ${leftWheelSpeed} ${rightWheelSpeed}`);
			// };

			// Desktop
			button.onmousedown = (event) => {
				const leftMultiplier = button.dataset.leftMultiplier;
				const rightMultiplier = button.dataset.rightMultiplier;
				const baseSpeed = sliderInput.value;

				const leftWheelSpeed = baseSpeed * leftMultiplier;
				const rightWheelSpeed = baseSpeed * rightMultiplier;

				this.sendDriveCommand(leftWheelSpeed,rightWheelSpeed);
				console.log(`Send command to server: ${leftWheelSpeed} ${rightWheelSpeed}`);
			}

			button.onmouseup = (event) => {
				this.sendStop();
			}

			document.onkeydown = (event) => {
				this.handleKeyPress(event);
			}

			document.onkeyup = (event) => {
				this.handleKeyPress(event);
			}
		}

		// Servos
		document.querySelector("#servo11").onchange = (event) => {
			console.log(`Camera servo slider = ${event.target.value}`);
			fetch(`api/servo/camera_pw/${event.target.value}`);
		}

		document.querySelector("#servo15").onchange = (event) => {
			console.log(`Gripper servo slider = ${event.target.value}`);
			fetch(`api/servo/gripper_pw/${event.target.value}`);
		}

		document.querySelector("#servo12").onchange = (event) => {
			console.log(`Arm 1 servo slider = ${event.target.value}`);
			fetch(`api/servo/arm_pw/1/${event.target.value}`);
		}

		document.querySelector("#servo13").onchange = (event) => {
			console.log(`Arm 2 servo slider = ${event.target.value}`);
			fetch(`api/servo/arm_pw/2/${event.target.value}`);
		}

		document.querySelector("#servo14").onchange = (event) => {
			console.log(`Arm 3 servo slider = ${event.target.value}`);
			fetch(`api/servo/arm_pw/3/${event.target.value}`);
		}
	}

	sendDriveCommand(leftWheelSpeed,rightWheelSpeed) {
		fetch(`api/motor/go/${leftWheelSpeed}/${rightWheelSpeed}`);
	}

	sendStop(){
		fetch(`api/motor/stop`);
	}

	handleKeyPress(event) {
		if (event.type == "keydown") {

			if (event.key == "ArrowUp") {
				this.sendDriveCommand(100,100);
			} else if (event.key == "ArrowDown") {
				this.sendDriveCommand(-100,-100);
			} else if (event.key == "ArrowLeft") {
				this.sendDriveCommand(-100,100);
			} else if (event.key == "ArrowRight") {
				this.sendDriveCommand(100,-100);
			}
		} else if (event.type == "keyup") {
			this.sendStop();
		}
	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	tankController = new rhit.TankController();
};

rhit.main();

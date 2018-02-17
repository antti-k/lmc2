const Computer = {
	memory: new Array(100).fill(0), // Memory array of 100 zeroes
	programCounter: 0,
	cycleCount: 0,
	accumulator: 0,
	inbox: new Array(),
	outbox: new Array(),
	negativeFlag: false,
	endOfProgram: false,

	reset() {
		/* Resets the computer to initial state */
		this.memory.fill(0);
		this.programCounter = 0;
		this.cycleCount = 0;
		this.accumulator = 0;
		this.inbox = new Array();
		this.outbox = new Array();
		this.negativeFlag = false;
		this.endOfProgram = false;
	},


	add(index) {
		/* Takes index number as an input and adds value in that memory index to the accumulator */
		const tmp = this.accumulator + this.memory[index];
		try {
			if (tmp > 999) throw "overflow";
		}
		catch(err) {
			console.log(err);
			return false
		}

		this.negativeFlag = false;
		this.accumulator = tmp;
		return true
	},

	subtract(index) {
		/* Substract value in memory index pointed by input from the accumulator */
		const tmp = this.accumulator - this.memory[index];
		if (tmp < 0) {
			this.negativeFlag = true;
			this.accumulator = 0;
		}

		else {
			this.accumulator = tmp;
		}
		return true
	},

	store(index) {
		/* Copy a value from a memory index to the accumulator */
		this.memory[index] = this.accumulator;
		return true
	},

	load(index) {
		/* Copy a value from memory to the accumulator */
		this.accumulator = this.memory[index];
		this.negativeFlag = false;
		return true
	},

	branch(index) {
		/* Branch to given index. */
		try {
			if (!Number.isInteger(index)) throw "invalid index";
			if (index > 99) throw "index out of upper bound";
			if (index < 0) throw "index out of lower bound";
		}
		catch(err) {
			console.log(err);
			return false
		}
		this.programCounter = index;
		return true
	},

	branchIfZero(index) {
		/* Branch if the accumulator value is zero. */
		if (this.accumulator === 0 && !this.negativeFlag) {
			this.branch(index);
		}
		return true
	},

	branchIfPositive(index) {
		/* Branch if the value of accumulator is positive */
		if (!this.negativeFlag) {
			this.branch(index);
		}
		return true
	},

	input() {
		/* Get next value from inbox and copy it to the accumulatori. */
		const tmp = this.inbox.shift();
		try {
			if (!Number.isInteger(tmp)) throw "invalid input";
			if (tmp > 999) throw "input out of upper bound";
			if (tmp < 0) throw "input out of lower bound";
		}
		catch(err) {
			console.log(err);
			return false
		}

		this.accumulator = tmp;
		return true
	},

	output() {
		/* Copy the value from the accumulator to the output. */
		this.outbox.push(this.accumulator);
		return true
	},

	halt() {
		/* End the program. */
		this.endOfProgram = true;
		return false
	},

	data(value, index) {
		/* Store given instruction to given index in memory. */
		try {
			if (!Number.isInteger(value)) throw "invalid value";
			if (!Number.isInteger(index)) throw "invalid index";
			if (value > 999) throw "value out of upper bound";
			if (value < 0) throw "value out of lower bound";
			if (index > 99) throw "index out of upper bound";
			if (index < 0) throw "index out of lower bound";
		}
		catch(err) {
			console.log(err);
			return false
		}

		this.memory[index] = value;
		return true
	},

	loadInstructions(instructionArray) {
		/* Loads an array of instrucions (3 digit integers) to memory. Intructions after HALT (000) are considered to be DATA instructions and the values are loaded to next free memory index. */
		try {
			if (!Array.isArray(instructionArray)) throw "invalid input: " + instructionArray;
			if (instructionArray.length > 100) throw "too many instructions";
		}
		catch(err) {
			console.log(err);
			return false
		}

		instructionArray.forEach((value, index) => {
			this.data(value, index);
		});
		return true
	},

	execute(value) {
		/* Execute given instruction */
		try {
			if (!Number.isInteger(value)) throw "invalid value";
			if (value > 999) throw "value out of upper bound";
			if (value < 0) throw "value out of lower bound";
		}
		catch(err) {
			console.log(err);
			return false
		}

		const operation = Math.floor(value / 100);
		const index = value % 100;

		if (value === 0) {
			return this.halt()
		} else if (operation === 1) {
			return this.add(index)
		} else if (operation === 2) {
			return this.subtract(index);
		} else if (operation === 3) {
			return this.store(index)
		} else if (operation === 5) {
			return this.load(index)
		} else if (operation === 6) {
			return this.branch(index)
		} else if (operation === 7) {
			return this.branchIfZero(index)
		} else if (operation === 8) {
			return this.branchIfPositive(index)
		} else if (value === 901) {
			return this.input()
		} else if (value === 902) {
			return this.output()
		} else {
			console.log("invalid operation " + value + " op: " + operation );
			return false
		}
	},

	cycle() {
		/* If not end of program: execute next instricton and increment program counter by one */
		if (!this.endOfProgram) {
			const tmp = this.programCounter;
			this.programCounter++;
			if (this.execute(this.memory[tmp])) {
				this.cycleCount++;
				return true
			} else {
				this.programCounter = tmp;
			}
			if (this.programCounter > 99) {
				this.endOfProgram = true;
			}
		} 
		this.outbox.push("END");
		return false
	},

	/* Clears inbox */
	clearInbox() {
		this.inbox = new Array();
	},
}

export default Computer

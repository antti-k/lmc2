const Assembler = {
	validInstructions : ["ADD", "SUB", "STA", "LDA", "BRA", "BRZ", "BRP",
		"INP", "OUT", "HLT", "DAT"],
	/* Runs the whole assembly process and returns array of machine code */
	assemble(input) {
		const parsedInput = this.parseText(input);
		const labels = this.getLabels(parsedInput);
		const labelsRemoved = this.removeLabels(parsedInput, labels);
		return labelsRemoved.map((arr) => this.toNumeric(arr, labels))
	},

	parseText(textInput) {
		const tmp =  textInput
			.split('\n')
			.filter((row) => !row.startsWith("//"))// Remove rows beginning with comment
			.map((row) => row.split("//")[0]// Remove comments 
				.trim()// Remove whitespace from the start and from the end
				.toUpperCase()// This assembler is not case sensitive
				.split(/\s+/g));// Split at whitespace 
		return tmp
	},

	/* Get labels from parsed input */
	getLabels(input) {
		const labels = new Map();
		input.forEach((arr, index) => {
			if (!this.validInstructions.includes(arr[0])) {
				labels.set(arr[0], index);
			}
		})
		return labels
	},

	removeLabel(arr, labels) {
		let tmp = arr;
		if (labels.has(tmp[0])) {
			tmp.shift();
		}
		return tmp
	},

	/* Removes labels from input */
	removeLabels(input, labels) {
		const tmp = input.map((arr) => this.removeLabel(arr, labels));
		return tmp
	},

	// TODO: Rewrite this crap
	toNumeric(args, labels) {
		const len = args.length;
		if (len == 1) {
			const arg = args[0];
			if (arg == "INP") {
				return 901
			} else if (arg == "OUT") {
				return 902
			} else {
				return 0
			}
		} else if (len == 2) {
			const arg1 = args[0];
			let arg2 = args[1];
			if (labels.has(arg2)) {
				arg2 = labels.get(arg2);
			}

			arg2 = parseInt(arg2);

			if (Number.isInteger(arg2)) {
				if (arg1 == "DAT") {
					if (arg2 > 999 || arg2 < 0) {
						return 0
					} else {
						return arg2
					}
				} else if (arg2 > 99 || arg2 < 0) {
					return 0
				}
			} else {
				return 0
			}

			if (arg1 == "ADD") {
				return 100 + arg2
			} else if (arg1 == "SUB") {
				return 200 + arg2
			} else if (arg1 == "STA") {
				return 300 + arg2
			} else if (arg1 == "LDA") {
				return 500 + arg2
			} else if (arg1 == "BRA") {
				return 600 + arg2
			} else if (arg1 == "BRZ") {
				return 700 + arg2
			} else if (arg1 == "BRP") {
				return 800 + arg2
			} else {
				return 0
			}
		} else {
			return 0
		}
	}
}
	
export default Assembler

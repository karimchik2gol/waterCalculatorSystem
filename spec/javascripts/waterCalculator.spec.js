// UNIT TESTS
describe("Calculate for man with weight of 70 and physical activity 3", function() {
	beforeEach(function() { 
		WEIGHT = 70;
		PHYSICAL_ACTIVITY = 3;
		VAL = WEIGHT * 0.0314 + PHYSICAL_ACTIVITY * 0.63333;
	})

	it("should return", function() {
		expect(calculateForMan()).toEqual(VAL);
	})


	it("will not equal wrong value", function() {
		VAL += 0.00001; // changed last number
		expect(calculateForMan()).not.toEqual(VAL);
	})
})

describe("Calculate for woman with weight of 90 and physical activity 2", function() {
	beforeEach(function() { 
		WEIGHT = 90;
		PHYSICAL_ACTIVITY = 2;
		VAL = WEIGHT * 0.03 + PHYSICAL_ACTIVITY * 0.6;
	})
	
	it("should return", function() {
		expect(calculateForWoman()).toEqual(VAL);
	})


	it("will not equal wrong value", function() {
		VAL += 0.001; // changed last number
		expect(calculateForWoman()).not.toEqual(VAL);
	})
})

describe("Calculate should work", function() {
	it("without any errors", function() {
		expect(function() { calculate() }).not.toThrow();
	})
})

describe("calculateHeight", function() {
	it("should return proper newHeight", function() {
		expect(calculateHeight()).toEqual((VAL / CAPACITY) * BOTTLE_HEIGHT);
	})
})

describe("Draw should work", function() {
	it("without any errors", function() {
		expect(function() { draw() }).not.toThrow();
	})
})

describe("detectGender should return", function() {
	it("calculateForMan", function() {
		expect(detectGender()).toEqual(calculateForMan());
	})

	it("calculateForWoman", function() {
		GENDER = "woman";
		expect(detectGender()).toEqual(calculateForWoman());
	})
})

describe("showNewResult should work", function() {
	it("without any errors", function() {
		expect(function() { showNewResult() }).not.toThrow();
	})
})

describe("Save button should work", function() {
	it("It receives 'successful' response", function() {
		expect(function() { $('.save').click() }).not.toThrow();
	})
})

describe("displayStatusClassName should return", function() {
	it("successful class", function() {
		data = "successful";
		expect(displayStatusClassName(data)).toEqual('.successful');
	})

	it("failed class", function() {
		data = 'any value';
		expect(displayStatusClassName(data)).toEqual('.failed');
	})
})
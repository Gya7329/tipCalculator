// selecting dom element

const numOfPeopleDom = document.getElementById("number_of_people"); // selecting number of people by id
const tipPercentageDom = document.getElementById("tip_percentage"); // selecting tip percentage by id
const billAmtDom = document.getElementById("billamt"); // selecting bill amount by id

// checking if input is number
const isNumber = (number) => {
  const numberCheck = new RegExp("^[0-9]+$");
  return numberCheck.test(Number(number));
};

// counter class create for increment and decrement

class Counter {
  constructor(value = 0, name) {
    this.value = value;
    this.name = name;
  }

  // getting input type
  getInputType() {
    if (this.name === "people") {
      return numOfPeopleDom;
    }
    return tipPercentageDom;
  }

  // setting value of input type
  setValue(value) {
    const input = this.getInputType(this.name);
    input.value = this.name === "tip" ? `${value}%` : value;
    this.value = value;
  }
  // incrementing value +1
  increment() {
    const newValue = this.value + 1;
    if (this.name === "tip" && newValue > 0 && newValue <= 100) {
      this.setValue(newValue);
    }
    if(this.name === "people" && newValue > 0){
      this.setValue(newValue);
    }
  }

  // decrementing value -1
  decrement() {
    const newValue = this.value - 1;
    if (this.name === "people" && newValue === 0) {
      this.setValue(1);
      return;
    }
    if (newValue >= 0) {
      this.setValue(newValue);
    }
  }

  // onchange event for input
  onChange() {
    if (this.value >= 0) {
      this.value = this.getInputType().value;
      if (Number(this.value) >= 100 && this.name === "tip") {
        this.setValue(100);

        return;
      }
      
       // % filled in tip percentage field
      if (String(this.value).includes("%")) {
        this.setValue(Number(this.value.replace("%", "")))
        return;
      }


      // checking if input is number
      if (isNumber(this.value)) {
        this.setValue(Number(this.value));
      } else {
        this.setValue(0);
      }
        return;
      }
    
      // error message if input is not number and set value to 1 in people field
      this.setValue(1);
      throw Error("Invalid value");
    }
  }


//
function calculate() {
  // replace wtih % when no only filled in tip percentage field
  const tipAmount = tipPercentageDom.value.replace("%", "");

  const people = numOfPeopleDom.value;
  const billAmount = billAmtDom.value;

  // converting to number
  const [tip, numOfPeople, bill] = [tipAmount, people, billAmount].map(Number);

  //calculate tip and total amount
  const tipAmountInRupee = bill * (tip / 100);
  const total = bill + tipAmountInRupee;
  const devidedMoney = total / numOfPeople;

  // selecting total per person and tip per persona dom element
  const totalPerson = document.getElementById("total");
  const tipDom = document.getElementById("tip");
  const isNumbOfIsZero = numOfPeople === 0;

  // push  value of total per person and tip per person in dom element
  tipDom.innerHTML = isNumbOfIsZero
    ? "0.00"
    : Number(tipAmountInRupee / numOfPeople).toFixed(2);

  totalPerson.innerHTML = isNumbOfIsZero
    ? "0.00"
    : Number(devidedMoney).toFixed(2);
}

// onchange event for input
const inputCounter = (name, initCount) => {
  const count = new Counter(initCount, name);

  //increment and decrement button selecting by id
  const decremntButton = document.getElementById(`${name}_decrement`);
  const incrementButton = document.getElementById(`${name}_increment`);

  //onclick event for increment
  decremntButton.addEventListener("click", () => {
    count.decrement();
    calculate();
  });

  //onclick event for decrement
  incrementButton.addEventListener("click", () => {
    count.increment();
    calculate();
  });

  // getting input type using getInputType method
  const input = count.getInputType(name);

  // initializing value of input type
  input.value = initCount;

  // onblur event for input type
  input.onblur = function () {
    count.onChange();
    calculate();
  };
};

// checking bill amount is number or not and updating to 2 decimal places (0.00)
billAmtDom.onblur = function () {
  if (Number(this.value) > 0) {
    const billNumber = this.value;
    billAmtDom.value = isNumber(billNumber) ? Number(billNumber).toFixed(2) : Number(billNumber).toFixed(2);
  } else {
    billAmtDom.value = "0.00";

  }

  // calling calculate function
  calculate();
};

// input counter for tip and people
inputCounter("tip", 0);
inputCounter("people", 1);

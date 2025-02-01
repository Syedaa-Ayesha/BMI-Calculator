import React, { useState } from "react";

const BmiCalculator = () => {
  const [UserWeight, setUserWeight] = useState(null);
  const [UserHeight, setUserHeight] = useState(null);
  const [BMI, setBMI] = useState(0);
  const [selectedWeightUnit, setSelectedWeightUnit] = useState("kg");
  const [selectedHeightUnit, setSelectedHeightUnit] = useState("m");
const [status, setStatus] = useState("Not Calculated");
const [color, setcolor] = useState("");
      const weightHandler = (e) => {
    setUserWeight(parseFloat(e.target.value) || 0);
  };

  const heightHandler = (e) => {
    setUserHeight(parseFloat(e.target.value) || 0);
  };

  const ibsToKgConversion = () => {
    if (selectedWeightUnit === "lbs") {
      setUserWeight((prevWeight) => (prevWeight / 2.20462).toFixed(2));
    }
  };

  const cmToMeter = () => {
    if (selectedHeightUnit === "cm") {
      setUserHeight((prevHeight) => (prevHeight / 100).toFixed(2));
    }
  };

  const inchesToMeter = () => {
    if (selectedHeightUnit === "inches") {
      setUserHeight((prevHeight) => (prevHeight * 0.0254).toFixed(2));
    }
  };

  const calculateBMI = () => {
    if (!UserWeight || !UserHeight) {
      alert("Please enter valid weight and height values.");
      return;
    }
  
    const heightInMeters = UserHeight / 100; 
    const bmiValue = (UserWeight / (heightInMeters ** 2)).toFixed(2);
  
    if (bmiValue !== BMI) {
      setBMI(bmiValue);
      
      if (bmiValue < 18.5) {
        setStatus("Underweight");
        setcolor('blue')
        
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus("Normal weight");
        setcolor('green')
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus("Overweight");
        setcolor('orange')
      } else {
        setStatus("Obese");
        setcolor('red')
      }
    }
  };
  
  return (
    <>
    <div className="container">
      <h1>BMI Calculator</h1>
      <p>"Calculate your Body Mass Index and check your weight status."</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          id="weight"
          placeholder="Enter your weight"
          onChange={weightHandler}
        />
        <div className="units"> <p>Select Weight Unit:</p>          
            <label>
            <input
              type="radio"
              name="weightUnit"
              value="kg"
              checked={selectedWeightUnit === "kg"}
              onChange={() => setSelectedWeightUnit("kg")}
            />Kilogram
          </label>
          <label>
            <input
              type="radio"
              name="weightUnit"
              value="lbs"
              checked={selectedWeightUnit === "lbs"}
              onChange={() => {
                setSelectedWeightUnit("lbs");
                ibsToKgConversion();
              }}
            />  Ibs
          </label>
        </div>

        <input
          type="number"
          placeholder="Enter your height"
          onChange={heightHandler}
        />
        <div className="height"><p>Select Height Unit:</p> 
          <label>
            Meter
            <input
              type="radio"
              name="heightUnit"
              value="m"
              checked={selectedHeightUnit === "m"}
              onChange={() => setSelectedHeightUnit("m")}
            />
          </label>
          <label>
            Centimeter
            <input
              type="radio"
              name="heightUnit"
              value="cm"
              checked={selectedHeightUnit === "cm"}
              onChange={() => {
                setSelectedHeightUnit("cm");
                cmToMeter();
              }}
            />
          </label>
          <label>
            Inches
            <input
              type="radio"
              name="heightUnit"
              value="inches"
              checked={selectedHeightUnit === "inches"}
              onChange={() => {
                setSelectedHeightUnit("inches");
                inchesToMeter();
              }}
            />
          </label>
        </div>
      </form>
      <button type="submit" onClick={calculateBMI}>
        Calculate BMI
      </button>

      <div className="BMI">
        <p style={{color : color, fontSize: '20px'}}>Your BMI is: <strong>{BMI}</strong></p>
        <p style={{color : color, fontSize: '20px'}} className={`status ${status.replace(' ', '-').toLowerCase()}`} >Status: {status}</p>
      </div>
      </div>
    </>
  );
};

export default BmiCalculator;

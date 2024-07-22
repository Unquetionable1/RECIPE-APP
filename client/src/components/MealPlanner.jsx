// src/MealPlanner.js
import React, { useState, useEffect } from "react";
import "./MealPlanner.css";

const MealPlanner = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [newMeal, setNewMeal] = useState({ date: "", meals: [""] });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    
    const storedPlans = JSON.parse(localStorage.getItem("mealplans")) || [];
    setMealPlans(storedPlans);
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "date") {
      setNewMeal({ ...newMeal, date: value });
    } else if (name.startsWith("meal-")) {
      const mealIndex = parseInt(name.split("-")[1], 10);
      const meals = [...newMeal.meals];
      meals[mealIndex] = value;
      setNewMeal({ ...newMeal, meals });
    }
  };

  const addMealPlan = () => {
    if (newMeal.date && newMeal.meals.length > 0) {
      const updatedPlans = editIndex !== null ? [...mealPlans] : [...mealPlans, newMeal];
      if (editIndex !== null) {
        updatedPlans[editIndex] = newMeal;
      }
      setMealPlans(updatedPlans);
      localStorage.setItem("mealplans", JSON.stringify(updatedPlans));
      resetForm();
    }
  };

  const updateMealPlan = (index) => {
    setEditIndex(index);
    setNewMeal(mealPlans[index]);
  };

  const deleteMealPlan = (index) => {
    const updatedPlans = mealPlans.filter((_, i) => i !== index);
    setMealPlans(updatedPlans);
    localStorage.setItem("mealplans", JSON.stringify(updatedPlans));
  };

  const resetForm = () => {
    setNewMeal({ date: "", meals: [""] });
    setEditIndex(null);
  };

  return (
    <div className="meal-planner">
      <h2>Meal Planner</h2>
      <div className="meal-planner-form">
        <input
          type="date"
          name="date"
          value={newMeal.date}
          onChange={(e) => handleInputChange(e)}
        />
        {newMeal.meals.map((meal, index) => (
          <input
            key={index}
            type="text"
            name={`meal-${index}`}
            placeholder="Meal"
            value={meal}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
        <button onClick={() => setNewMeal({ ...newMeal, meals: [...newMeal.meals, ""] })}>
          Add Another Meal
        </button>
        <button onClick={addMealPlan}>
          {editIndex !== null ? "Update Meal Plan" : "Add Meal Plan"}
        </button>
      </div>
      <div className="meal-plans-list">
        {mealPlans.map((plan, index) => (
          <div key={index} className="meal-plan">
            <p>{plan.date}</p>
            <ul>
              {plan.meals.map((meal, mealIndex) => (
                <li key={mealIndex}>{meal}</li>
              ))}
            </ul>
            <button onClick={() => updateMealPlan(index)}>Edit</button>
            <button onClick={() => deleteMealPlan(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;

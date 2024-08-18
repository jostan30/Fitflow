function calculateCalories() {
    // Get input values from the user
    var currentWeight = parseFloat(document.getElementById('currentWeight').value);
    var calorieIntake = parseFloat(document.getElementById('calorieIntake').value);
    var calorieBurned = parseFloat(document.getElementById('calorieBurned').value);

    // Check if any of the input fields are empty or contain non-numeric values
    if (isNaN(currentWeight) || isNaN(calorieIntake) || isNaN(calorieBurned)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Calculate calories needed to maintain current weight
    var calorieToMaintain = calorieIntake - calorieBurned;

    // Estimate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
    var bmr = 10 * currentWeight + 6.25 * 170 - 5 * 30 + 5; // Example equation, replace with actual equation

    // Estimate Total Daily Energy Expenditure (TDEE) based on activity level (sedentary, lightly active, moderately active, very active)
    var activityFactor = 1.5; // For example, if moderately active
    var tdee = bmr * activityFactor;

    // Suggest a range of calories based on TDEE
    var healthyCalorieRange = [tdee - 250, tdee + 250]; // Suggesting a range of 250 kcal above and below TDEE

    // Display the results
    var result = document.getElementById('result');
    result.innerHTML = "<p>Calories to maintain current weight: " + calorieToMaintain.toFixed(2) + " kcal</p>";
    result.innerHTML += "<p>Healthy range of calories to consume: " + healthyCalorieRange[0].toFixed(2) + " - " + healthyCalorieRange[1].toFixed(2) + " kcal</p>";

    // If calorie intake falls within the healthy range, suggest maintaining weight
    if (calorieIntake >= healthyCalorieRange[0] && calorieIntake <= healthyCalorieRange[1]) {
        result.innerHTML += "<p>Your calorie intake is within the healthy range. You are maintaining your weight.</p>";
    }
    // If calorie intake is below the healthy range, suggest a calorie surplus
    else if (calorieIntake < healthyCalorieRange[0]) {
        result.innerHTML += "<p>Your calorie intake is below the healthy range. Consider increasing your calorie intake for weight gain.</p>";
    }
    // If calorie intake is above the healthy range, suggest a calorie deficit
    else {
        result.innerHTML += "<p>Your calorie intake is above the healthy range. Consider reducing your calorie intake for weight loss.</p>";
    }

    // Clear input fields after calculation
    document.getElementById('currentWeight').value = '';
    document.getElementById('calorieIntake').value = '';
    document.getElementById('calorieBurned').value = '';

    // Update the chart with the new values
    updateTotalCaloriesAndChart(calorieIntake, calorieToMaintain);
}

//calorie counter
let totalCalories = 0;
let foodList = [];

function addFood() {
    const foodInput = document.getElementById('foodInput').value;
    const quantityInput = document.getElementById('quantityInput').value;

    // Make API request to fetch calorie information
    fetchCalorieInformation(foodInput)
        .then(calories => {
            const totalCaloriesForFood = calories * quantityInput;
            totalCalories += totalCaloriesForFood;
            displayTotalCalories(totalCalories);
            addToFoodList(foodInput, quantityInput, totalCaloriesForFood);
        })
        .catch(error => {
            console.error('Error fetching calorie information:', error);
        });
}

function removeFood(index) {
    if (index >= 0 && index < foodList.length) {
        totalCalories -= foodList[index].calories;
        foodList.splice(index, 1);
        displayTotalCalories(totalCalories);
        displayFoodList();
    } else {
        console.error('Invalid index');
    }
}

function fetchCalorieInformation(food) {
    const API_ID = '9830bf47'; // Replace with your API ID
    const API_KEY = '1ab17b5a96819105fda9eb91373da2af'; // Replace with your API key
    const API_URL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(food)}&app_id=${API_ID}&app_key=${API_KEY}`;


    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.hints && data.hints.length > 0) {
                // Assuming the first hint contains the most relevant information
                return data.hints[0].food.nutrients.ENERC_KCAL;
            } else {
                throw new Error('No calorie information found for the given food');
            }
        });
}


function displayTotalCalories(calories) {
    const totalCaloriesElement = document.getElementById('totalCalories');
    totalCaloriesElement.textContent = calories;
}

function addToFoodList(food, quantity, calories) {
    foodList.push({ food, quantity, calories });
    displayFoodList();
}

function displayFoodList() {
    const foodListElement = document.getElementById('foodList');
    foodListElement.innerHTML = '';

    const table = document.createElement('table');
    table.id = 'foodListTable';

    // Create table header
    const headerRow = table.insertRow();
    const headers = ['Food', 'Quantity', 'Calories', 'Action'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create table rows
    foodList.forEach((item, index) => {
        const row = table.insertRow();
        const cells = [item.food, item.quantity, item.calories, ''];
        cells.forEach(cellText => {
            const cell = row.insertCell();
            cell.textContent = cellText;
        });

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFood(index));

        const actionCell = row.insertCell();
        actionCell.appendChild(removeButton);
    });

    foodListElement.appendChild(table);
}


// 3 classes: Menu, Category, Meal


// Meal class which has name, calories, and protein values for meals
class Meal {
    constructor(name, calories, protein) {
        this.name = name;
        this.calories = calories;
        this.protein = protein;
    }
}

// Category class which takes a name, and has a meals array in each category, to hold meals of that type
class Category {
    constructor(name) {
        this.name = name;
        this.meals = [];
    }
}

// Menu class that holds the funtionality of the program. 
class Menu {
    // Constructor that takes nothing in 
    constructor() {
        // Categories array with 3 pre-loaded categories for breakfast, lunch, and dinner, with the ability to add / delete any, including these.
        this.categories = [
            {
                name : 'Breakfast',
                meals: []
            },{
                name : 'Lunch',
                meals : []
            },{
                name : 'Dinner',
                meals : []
            }
        ];
        // PlannedMeals array to hold meals selected when a meal plan is generated
        this.plannedMeals = [];
        // sets the selected category to null, to ensure there is no category selected prior to any first selection, while also defining it.
        this.selectedCategory = null;
    }

    // function to start menu, which starts showMainMenuOptions(), then has while loop to direct which function to run for each user selection.
    start() {
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch (selection) {
                case '1': 
                    this.addCategory();
                    break;
                case '2':
                    this.viewCategory();
                    break;
                case '3': 
                    this.deleteCategory();
                    break;
                case '4': 
                    this.displayCategoryList();
                    break;
                case '5':
                    this.makeRandomMealPlan();
                    break;
                default: 
                    selection = 0;
            }
            // sets selection back to showMainMenuOptions after a method is called and executed
            selection = this.showMainMenuOptions();
        }
        // runs when user selects 0, since this is the only value outside of the while loop
        alert('Goodbye!');
    }

    // Gives user a prompt to select a menu option, which returns to the start function to determine what to run next
    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Add Category
            2) View Category / Meal Management
            3) Delete Category
            4) Category List
            5) Make Meal Plan
        `)
    }

    // Gives user a prompt when in a category info menu, which allows them to return to main menu, or to add or remove a meal from that category
    showCategoryMenuOptions(categoryInfo) {
        return prompt(`
            0) Return To Main Menu
            1) Add Meal
            2) Remove Meal
        ---------------------------
            ${categoryInfo}
        `)
    }

    // Gives a prompt for a name, then returns that name as a new category and pushes it to the categories array.
    addCategory() {
        let name = prompt(`Enter new category name`);
        this.categories.push(new Category(name));
    }

    // Prompts user to enter index of category they want to view, checks for valid input, and sets selected category to the index entered. 
    viewCategory() {
        let index = prompt(`Enter index of category to view:`);
        if(index > -1 && index < this.categories.length) {
            this.selectedCategory = this.categories[index];
            // Then creates a description of the category. 
            let description = this.selectedCategory.name + ' Meals: ' + '\n'
            // Then runs a loop for each meal inside that category, creating a description of those as well.
            for (let i = 0; i < this.selectedCategory.meals.length; i++) {
                description += i + ') ' + this.selectedCategory.meals[i].name + ' - Calories: ' + this.selectedCategory.meals[i].calories +
                ', Protein: ' + this.selectedCategory.meals[i].protein + '\n';
            }
            // returns prompt with options for that category, to add or delete a meal in this case
            let selection = this.showCategoryMenuOptions(description);
            switch(selection) {
                case '1': 
                    this.addMeal();
                    break;
                case '2': 
                    this.deleteMeal();
            }
        }
    }

    // Prompts user for name, calories, and protein for new meal, then creates a new Meal with those arguments, and adds it to that category's meals array
    addMeal() {
        let name = prompt(`Enter name of new meal:`);
        let calories = prompt(`How many calories does this meal contain?`);
        let protein = prompt(`How many grams of protein does this meal have?`);
        this.selectedCategory.meals.push(new Meal(name, calories, protein));
    }

    // Prompts user for index of meal they wish to delete. Then splices the meal at that index.
    deleteMeal() {
        let index = prompt(`Enter the index of the meal you wish to delete:`);
        if (index > -1 && index < this.selectedCategory.meals.length) {
            this.selectedCategory.meals.splice(index, 1);
        } 
    }

    // Similar as before, only for category rather than a meal
    deleteCategory() {
        let index = prompt(`Enter the index of the category you wish to delete:`);
        if (index > -1 && index < this.categories.length) {
            this.categories.splice(index, 1);
        }
    }

    // Displays all categories and their index
    displayCategoryList() {
        let categoryString = '';
        for(let i = 0; i < this.categories.length; i++) {
            categoryString += i + ') ' + this.categories[i].name + '\n';
        }
        alert(categoryString);
    }

    // Creates a random meal plan. First, sets the plannedMeals array to an empty array.
    makeRandomMealPlan() {
        this.plannedMeals = [];
        let categories = this.categories;
        let plannedMeals = this.plannedMeals;
        let mealPlanString = ''
        let totalCalories = 0;
        try{
            for (let i = 0; i < categories.length; i++) {
                plannedMeals.push(categories[i].meals[Math.floor(Math.random() * categories[i].meals.length)]);
                mealPlanString += categories[i].name + ': ' + plannedMeals[i].name + 
                ' - Calories: ' + plannedMeals[i].calories + ', Protein: ' + plannedMeals[i].protein + '\n';
                totalCalories += parseInt(plannedMeals[i].calories);
            } 
            alert(mealPlanString);
            alert(`${totalCalories} Total Calories!`);
        } catch (err) {
            alert('All categories need at least 1 meal before a plan can be created');
        }
    }
}


let menu = new Menu();
menu.start();



const { Dishes, Cuisines, Restaurants } = require('./data');

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {object} A random menu item with a name, description, price, and special status.
 */
function generateRandomMenuItem(cuisine) {
    const dishes = Dishes[cuisine];
    if (!dishes) {
        throw new Error(`No dishes found for cuisine: ${cuisine}`);
    }

    const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    const price = (Math.random() * 15 + 5).toFixed(2); // Random price between $5.00 and $20.00
    const isSpecial = Math.random() < 0.2; // 20% chance of being a daily special

    return {
        name: randomDish.name,
        description: randomDish.description,
        price: `$${price}`,
        isSpecial,
    };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {string} A random cuisine type.
 */
function selectRandomCuisine() {
    return Cuisines[Math.floor(Math.random() * Cuisines.length)];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {object} An object representing the restaurant's menu, including the cuisine type and items.
 */
function generateMenu() {
    const cuisine = selectRandomCuisine();
    const numberOfItems = Math.floor(Math.random() * 6) + 5; // Random number between 5 and 10
    const menuItems = [];

    for (let i = 0; i < numberOfItems; i++) {
        menuItems.push(generateRandomMenuItem(cuisine));
    }

    return {
        cuisine,
        menuItems,
    };
}

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };


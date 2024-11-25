const { Restaurants, Cuisines } = require("./utils/data");
const express = require('express');
const path = require('path');
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("./utils/restaurantUtils");

const app = express();

// Set up views and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

/**
 * GET /
 * Renders the homepage that lists restaurant names in a dropdown.
 */
app.get('/', (request, response) => {
    response.render('index', { restaurants: Restaurants });
});

/**
 * GET /restaurant
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected, and a menu is generated based on it.
 */
app.get('/restaurant', (request, response) => {
    const restaurantId = request.query.restaurantId;

    // Find the restaurant by ID
    const restaurant = Restaurants.find((r) => r.id === restaurantId);

    if (!restaurant) {
        return response.status(404).send('Restaurant not found');
    }

    // Generate a menu using the utility function
    const menuData = generateMenu();

    // Render the restaurant menu page
    response.render('restaurant', {
        restaurantName: restaurant.name,
        cuisine: menuData.cuisine,
        menuItems: menuData.menuItems,
    });
});

/**
 * GET /alerts
 * Displays daily specials across all restaurants, limited to 5–10 items.
 */
app.get('/alerts', (req, res) => {
    const allSpecials = []; // Array to store all daily specials

    // Generate menus for all restaurants and collect specials
    Restaurants.forEach((restaurant) => {
        const menuData = generateMenu(); // Generate a menu for the restaurant
        const specials = menuData.menuItems.filter((item) => item.isSpecial); // Filter daily specials
        specials.forEach((special) => {
            allSpecials.push({
                restaurantName: restaurant.name,
                ...special,
            });
        });
    });

    // Limit the total number of specials to 5–10 items
    const totalSpecials = Math.min(allSpecials.length, Math.floor(Math.random() * 6) + 5); // Random between 5 and 10
    const limitedSpecials = allSpecials.slice(0, totalSpecials); // Slice the array to limit specials

    // Render the alerts page
    res.render('alerts', { specials: limitedSpecials });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

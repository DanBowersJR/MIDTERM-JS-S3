const { Cuisines, Dishes } = require("../../utils/data");
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("../../utils/restaurantUtils");

describe("Restaurant Functions", () => {
    describe("generateRandomMenuItem", () => {
        it("should return a menu item with the correct properties", () => {
            const cuisine = "italian"; // Test for Italian cuisine
            const menuItem = generateRandomMenuItem(cuisine);

            // Ensure the returned item has the correct structure
            expect(menuItem).toHaveProperty("name");
            expect(menuItem).toHaveProperty("description");
            expect(menuItem).toHaveProperty("price");
            expect(menuItem).toHaveProperty("isSpecial");

            // Ensure the item belongs to the correct cuisine
            const dishNames = Dishes[cuisine].map((dish) => dish.name);
            expect(dishNames).toContain(menuItem.name);
        });
    });

    describe("generateMenu", () => {
        it("should generate a menu with 5 to 10 items", () => {
            const menu = generateMenu();

            // Check the number of menu items
            expect(menu.menuItems.length).toBeGreaterThanOrEqual(5);
            expect(menu.menuItems.length).toBeLessThanOrEqual(10);

            // Ensure all items belong to the selected cuisine
            const dishNames = Dishes[menu.cuisine].map((dish) => dish.name);
            menu.menuItems.forEach((item) => {
                expect(dishNames).toContain(item.name);
            });
        });
    });

    describe("selectRandomCuisine", () => {
        it("should return a valid cuisine type", () => {
            const cuisine = selectRandomCuisine();

            // Ensure the cuisine is in the list of available cuisines
            expect(Cuisines).toContain(cuisine);
        });
    });
});

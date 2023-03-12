// Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
// Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
// Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
// Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8

let highestScore = 0;
for (let sugar = 0; sugar <= 100; sugar++) {
    for (let sprinkles = 0; sprinkles <= 100; sprinkles++) {
        for (let candy = 0; candy <= 100; candy++) {
            const chocolate = 100 - (sugar + sprinkles + candy);
            const capacity = 3 * (sugar - sprinkles) - candy;
            const durability = 3 * sprinkles;
            const flavor = 4 * candy - 2 * chocolate;
            const texture = 2 * chocolate - 3 * sugar;
            if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
                continue;
            }
            let score = capacity * durability * flavor * texture;
            if (score > highestScore) {
                highestScore = score;
            }
        }   
    }   
}

console.log(highestScore)

// part two;

highestScore = 0;

for (let sugar = 0; sugar <= 100; sugar++) {
    for (let sprinkles = 0; sprinkles <= 100; sprinkles++) {
        for (let candy = 0; candy <= 100; candy++) {
            const chocolate = 100 - (sugar + sprinkles + candy);
            const calories = 2 * sugar + 9 * sprinkles + candy + 8 * chocolate;
            if (calories !== 500) {
                continue;
            }
            const capacity = 3 * (sugar - sprinkles) - candy;
            const durability = 3 * sprinkles;
            const flavor = 4 * candy - 2 * chocolate;
            const texture = 2 * chocolate - 3 * sugar;
            if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
                continue;
            }
            let score = capacity * durability * flavor * texture;
            if (score > highestScore) {
                highestScore = score;
            }
        }   
    }   
}

console.log(highestScore)

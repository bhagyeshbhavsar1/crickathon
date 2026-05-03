import fs from 'fs';

const dataFile = './src/data/players.json';
let players = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Bio templates
const bios = {
    'Batter': [
        "Coming off a spectacular domestic season, looking to solidify the top order.",
        "A seasoned veteran bringing aggressive intent and stability to the crease.",
        "Young prodigy known for orthodox technique and explosive power."
    ],
    'Bowler': [
        "Pace sensation ready to rattle the stumps in the death overs.",
        "Mystery spinner who thrives in pressure situations during the middle overs.",
        "Experienced seamer with an uncanny ability to strike in the powerplay."
    ],
    'All-rounder': [
        "Dynamic three-dimensional player capable of changing the game with both bat and ball.",
        "Reliable middle-order anchor who can deliver 4 tight overs of spin.",
        "Explosive finisher and utility medium-pacer crucial for team balance."
    ],
    'Wicket-keeper': [
        "Agile behind the stumps and destructive in front of them.",
        "Experienced leader who controls the game tempo from the back.",
        "Athletic modern keeper-batter prioritizing aggressive strike rates."
    ]
};

const strengthsTemplates = {
    'Batter': ["High Strike Rate against Spin", "Excellent runner between wickets", "Powerplay dominator", "Strong on the off-side"],
    'Bowler': ["Lethal Yorker", "Deceptive slower ball", "Economical in Powerplay", "Sharp turn and bounce"],
    'All-rounder': ["Dual threat match-winner", "Excellent fielder", "Clears the ropes easily", "Breaks crucial partnerships"],
    'Wicket-keeper': ["Lightning fast stumpings", "Great DRS judge", "Anchors the innings", "Explosive finisher"]
};

const weaknessesTemplates = {
    'Batter': ["Vulnerable to Short Balls", "Slow starter", "Struggles against left-arm pace", "Prone to risky shots"],
    'Bowler': ["Can leak runs in death overs", "Predictable length", "Struggles with no-balls", "Less effective on flat pitches"],
    'All-rounder': ["Inconsistent batting form", "Sometimes expensive with the ball", "Prone to injuries", "Takes time to settle"],
    'Wicket-keeper': ["Struggles with extreme pace", "Inconsistent glovework on turning tracks", "Low strike rate in middle overs", "Poor communication while running"]
};

const prosConsTemplates = {
    'Batter': { pro: "Top-order anchor", con: "Takes an over to settle in" },
    'Bowler': { pro: "Guaranteed 4 overs", con: "Can be targeted by left-handers" },
    'All-rounder': { pro: "Provides immense flexibility", con: "Often overworked in high-pressure games" },
    'Wicket-keeper': { pro: "Solves two team roles", con: "High physical fatigue during tournaments" }
};

const getRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

// Sort by rating descending
players.sort((a, b) => b.rating - a.rating);

// Define buckets based on total players (45)
// Elite: top 12
// Mid: next 18
// Budget: remaining 15

players = players.map((p, index) => {
    // 1. Rebalance Price based on rank
    if (index < 12) {
        // Elite: 14 - 16 Cr
        p.price = Math.floor(Math.random() * (16 - 14 + 1) + 14);
    } else if (index < 30) {
        // Mid-Range: 8 - 11 Cr
        p.price = Math.floor(Math.random() * (11 - 8 + 1) + 8);
    } else {
        // Budget: 4 - 7 Cr
        p.price = Math.floor(Math.random() * (7 - 4 + 1) + 4);
    }
    
    // Add decimal for realism if it's mid or budget
    if (p.price < 14) {
        p.price += Math.random() > 0.5 ? 0.5 : 0;
    }

    // 2. Augment Data
    p.background = getRandom(bios[p.role] || bios['Batter'], 1)[0];
    p.strengths = getRandom(strengthsTemplates[p.role] || strengthsTemplates['Batter'], 2);
    p.weaknesses = getRandom(weaknessesTemplates[p.role] || weaknessesTemplates['Batter'], 2);
    p.prosCons = {
        pro: prosConsTemplates[p.role] ? prosConsTemplates[p.role].pro : prosConsTemplates['Batter'].pro,
        con: p.price >= 14 ? "High Budget Consumption" : (prosConsTemplates[p.role] ? prosConsTemplates[p.role].con : prosConsTemplates['Batter'].con)
    };

    return p;
});

// Verification check
const elites = players.slice(0, 12).slice(0, 2);
const mids = players.slice(12, 30).slice(0, 4);
const budgets = players.slice(30).slice(0, 5);

const avg11Cost = [...elites, ...mids, ...budgets].reduce((acc, p) => acc + p.price, 0);

console.log(`Average 11 Cost Check (2 Elites, 4 Mids, 5 Budgets): ₹${avg11Cost} Cr`);

fs.writeFileSync(dataFile, JSON.stringify(players, null, 4));
console.log("Successfully updated players.json with percentile-based rebalancing");

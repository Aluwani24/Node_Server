const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
function initializeDataFile() {
    if (!fs.existsSync(filePath)) {
        const initialData = {
            movies: [
                { id: 1, title: 'Superman', year: 2025 },
                { id: 2, title: 'The Kill Room', year: 2023 },
                { id: 3, title: 'The Order', year: 2024 }
            ],
            series: [
                { id: 1, title: 'Peaky Blinders', year: 2013 },
                { id: 2, title: 'Vikings', year: 2013 },
                { id: 3, title: 'The Witcher', year: 2019 }
            ],
            songs: [
                { id: 1, title: 'Chris Brown - Residuals', year: 2024 },
                { id: 2, title: 'Monica - The Boy Is Mine', year: 1998 },
                { id: 3, title: '2Pac - Dear Mama', year: 1995 }
            ]
        };

        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
        console.log('Data file created successfully.');
    }
}

// Read data from file
function readData() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Write updated data to file
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { initializeDataFile, readData, writeData };

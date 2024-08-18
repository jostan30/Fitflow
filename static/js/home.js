// Mock data for gyms or health-related facilities
const facilitiesData = [
    { name: "Fitness First", address: "123 Fitness Street, City", rating: 4.5, contact: "123-456-7890" },
    { name: "Gym & Co", address: "456 Gym Avenue, Town", rating: 4.2, contact: "987-654-3210" },
    { name: "Health Hub", address: "789 Wellness Road, Village", rating: 4.8, contact: "456-789-0123" },
    { name: "Body Boost Gym", address: "101 Power Lane, Metropolis", rating: 4.7, contact: "111-222-3333" },
    { name: "Flex Fitness", address: "22 Muscle Road, Fitness City", rating: 4.4, contact: "444-555-6666" },
    { name: "Zen Yoga Studio", address: "789 Serenity Street, Calm Town", rating: 4.9, contact: "777-888-9999" },
    { name: "Strong Stride Running Club", address: "555 Endurance Avenue, Marathon City", rating: 4.6, contact: "333-222-1111" },
    { name: "AquaFit Center", address: "456 Waterfront Drive, Ocean City", rating: 4.3, contact: "999-888-7777" },
    { name: "Mindful Meditation Center", address: "888 Peace Place, Tranquil Village", rating: 4.9, contact: "666-555-4444" },
    { name: "Iron Works Gym", address: "321 Strength Street, Musclesville", rating: 4.5, contact: "222-333-4444" }
];


// Function to generate HTML for each facility
function generateFacilityHTML(facility) {
    return `
        <div class="facility">
            <h2>${facility.name}</h2>
            <p><strong>Address:</strong> ${facility.address}</p>
            <p><strong>Rating:</strong> ${facility.rating}</p>
            <p><strong>Contact:</strong> ${facility.contact}</p>
        </div>
    `;
}

// Function to populate content2 div with facility information
function populateFacilities() {
    const content2 = document.querySelector('.content2');
    if (content2) {
        facilitiesData.forEach(facility => {
            const facilityHTML = generateFacilityHTML(facility);
            content2.insertAdjacentHTML('beforeend', facilityHTML);
        });
    }
}

// Call the function to populate facilities
populateFacilities();

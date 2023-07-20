const axios = require('axios');

const IP_REGISTRY_API_KEY = 'e8k7kc2jtqzi9nwe';

// Function to get location details based on IP address
const getLocationFromIP = async (ipAddress) => {
    try {
        const response = await axios.get(`https://api.ipregistry.co/${ipAddress}`, {
            headers: {
                'X-IPREGISTRY-APIKEY': IP_REGISTRY_API_KEY,
            },
        });

        return response.data;
    } catch (error) {
            console.error('Error fetching location data:', error.message);
        return null;
    }
};

module.exports = { getLocationFromIP };

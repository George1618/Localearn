function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // raio da Terra em quilômetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distância em quilômetros
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

module.exports = {
    haversineDistance
};
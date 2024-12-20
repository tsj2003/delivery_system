// Sample delivery dataset
export const deliveryData = [
  { distance: 5, traffic: 2, timeOfDay: 14, weather: 1, actualTime: 25 },
  { distance: 3, traffic: 1, timeOfDay: 10, weather: 0, actualTime: 15 },
  { distance: 8, traffic: 3, timeOfDay: 18, weather: 2, actualTime: 45 },
  { distance: 2, traffic: 1, timeOfDay: 12, weather: 0, actualTime: 10 },
  { distance: 6, traffic: 2, timeOfDay: 16, weather: 1, actualTime: 30 },
  // Add more sample data points
];

// Normalize data between 0 and 1
export function normalizeData(data) {
  const maxValues = {
    distance: Math.max(...data.map(d => d.distance)),
    traffic: 3,
    timeOfDay: 24,
    weather: 2,
    actualTime: Math.max(...data.map(d => d.actualTime))
  };

  return data.map(item => ({
    input: [
      item.distance / maxValues.distance,
      item.traffic / maxValues.traffic,
      item.timeOfDay / maxValues.timeOfDay,
      item.weather / maxValues.weather
    ],
    output: [item.actualTime / maxValues.actualTime]
  }));
}
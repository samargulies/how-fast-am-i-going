import { distance, bearing, point } from '@turf/turf';

export default function sortLocations(dataset, userLocation) {
  if (!userLocation || !dataset) {
    return [];
  }
  const location = point([userLocation.coords.longitude, userLocation.coords.latitude]);
  const caseLocations = dataset.map((caseLocation) => {
    const longitude = parseFloat(caseLocation.Long);
    const latitude = parseFloat(caseLocation.Lat);
    if (!longitude || !latitude) {
      return caseLocation;
    }
    const readingPoint = point([parseFloat(caseLocation.Long), parseFloat(caseLocation.Lat)]);
    const distanceToLocation = distance(location, readingPoint, { units: 'kilometers' });
    const bearingToLocation = bearing(location, readingPoint);
    return { ...caseLocation, distanceToLocation, bearingToLocation };
  });
  return caseLocations.sort((a, b) => a.distanceToLocation - b.distanceToLocation);
}

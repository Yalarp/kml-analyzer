import { XMLParser } from 'fast-xml-parser';

export const parseKML = (kmlData) => {
  const parser = new XMLParser();
  let jsonObj = parser.parse(kmlData);
  return processKMLData(jsonObj);
};

const processKMLData = (data) => {
  if (!data || !data.kml || !data.kml.Document) {
    throw new Error('Invalid KML format');
  }

  const kmlDoc = data.kml.Document;
  const placemarks = extractPlacemarks(kmlDoc);

  // Categories to track
  const elementTypes = {
    Point: { count: 0, elements: [] },
    LineString: { count: 0, elements: [], totalLength: 0 },
    Polygon: { count: 0, elements: [], totalArea: 0 },
    MultiGeometry: { count: 0, elements: [] },
    // Add other types as needed
  };

  // Process each placemark
  placemarks.forEach(placemark => {
    const name = placemark.name || 'Unnamed';
    const description = placemark.description || '';

    // Check for geometry types
    Object.keys(elementTypes).forEach(type => {
      if (placemark[type]) {
        elementTypes[type].count++;

        const element = {
          id: `element-${elementTypes[type].count}`,
          name,
          description,
          coordinates: extractCoordinates(placemark[type]),
          // Add more properties as needed
        };

        // Calculate length for LineString
        if (type === 'LineString') {
          const length = calculateLength(element.coordinates);
          element.length = length;
          elementTypes[type].totalLength += length;
        }

        // Calculate area for Polygon
        if (type === 'Polygon') {
          const area = calculateArea(element.coordinates);
          element.area = area;
          elementTypes[type].totalArea += area;
        }

        elementTypes[type].elements.push(element);
      }
    });
  });

  return {
    name: kmlDoc.name || 'KML Document',
    elementTypes,
    totalElements: Object.values(elementTypes).reduce((sum, type) => sum + type.count, 0)
  };
};

const extractPlacemarks = (document) => {
  let placemarks = [];

  // Handle single placemark
  if (document.Placemark && !Array.isArray(document.Placemark)) {
    placemarks.push(document.Placemark);
  }
  // Handle multiple placemarks
  else if (document.Placemark && Array.isArray(document.Placemark)) {
    placemarks = document.Placemark;
  }

  // Handle folders
  if (document.Folder) {
    const folders = Array.isArray(document.Folder) ? document.Folder : [document.Folder];

    folders.forEach(folder => {
      if (folder.Placemark) {
        const folderPlacemarks = Array.isArray(folder.Placemark)
          ? folder.Placemark
          : [folder.Placemark];
        placemarks.push(...folderPlacemarks);
      }
    });
  }

  return placemarks;
};

const extractCoordinates = (geometry) => {
  if (!geometry) return [];

  // Different geometries store coordinates differently
  let coordString = '';

  if (geometry.coordinates) {
    coordString = geometry.coordinates;
  } else if (geometry.outerBoundaryIs && geometry.outerBoundaryIs.LinearRing) {
    coordString = geometry.outerBoundaryIs.LinearRing.coordinates;
  }

  // Parse coordinate string
  if (typeof coordString === 'string') {
    return coordString.split(/\s+/).filter(Boolean).map(coord => {
      const [lon, lat, alt] = coord.split(',').map(Number);
      return { lon, lat, alt: alt || 0 };
    });
  }

  return [];
};

// Calculate length of a LineString in meters
const calculateLength = (coordinates) => {
  if (!coordinates || coordinates.length < 2) return 0;

  let totalLength = 0;
  for (let i = 1; i < coordinates.length; i++) {
    totalLength += haversineDistance(
      coordinates[i-1].lat, coordinates[i-1].lon,
      coordinates[i].lat, coordinates[i].lon
    );
  }

  return totalLength;
};

// Calculate area of a Polygon in square meters
const calculateArea = (coordinates) => {
  // Simplified area calculation
  // For precise calculations, consider more sophisticated algorithms
  return 0; // Placeholder
};

// Haversine formula for calculating distance between two points
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return distance;
};

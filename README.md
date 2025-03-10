# KML Viewer & Analyzer

A React application for uploading, viewing, and analyzing KML (Keyhole Markup Language) files. This application allows users to visualize geographic data on interactive maps and obtain detailed information about the elements contained in KML files.

## Features

- **File Upload**: Drag and drop or select KML files
- **Map Visualization**: Interactive map display of KML data using Leaflet
- **Multiple Map Layers**: Choose between street, satellite, and topographic views
- **KML Summary**: View count and statistics of different element types
- **Detailed View**: Analyze individual elements including coordinates, lengths, and other properties
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kml-viewer-app
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload a KML file using the upload button or drag-and-drop
2. Navigate between the Map View, Summary, and Detailed View using the tabs
3. In Map View, use the layer control to switch between different map styles
4. In Summary View, see statistics about the KML elements
5. In Detailed View, explore specific information about each element

## Dependencies

- React & React DOM
- React Router DOM
- Leaflet & React Leaflet
- Leaflet-Omnivore (for KML parsing)
- Axios (for API requests)
- xml2js (for XML parsing)
- React Toastify (for notifications)

## Project Structure

```
/src
  /components         # React components
  /styles             # CSS stylesheets
  /utils              # Utility functions
  App.jsx             # Main application
  App.css             # Global styles
  main.jsx            # Entry point
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
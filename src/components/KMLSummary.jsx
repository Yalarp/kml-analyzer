// File: src/components/KMLSummary.jsx
import React from 'react';
import '../styles/KMLSummary.css';

const KMLSummary = ({ parsedData }) => {
  if (!parsedData) {
    return <div className="summary-container empty">No KML data available</div>;
  }

  const { name, elementTypes, totalElements } = parsedData;
  
  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>KML Summary: {name}</h2>
        <p className="summary-total">Total Elements: {totalElements}</p>
      </div>
      
      <div className="summary-content">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Count</th>
              <th>Additional Info</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(elementTypes).map(([type, data]) => (
              data.count > 0 && (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{data.count}</td>
                  <td>
                    {type === 'LineString' && (
                      <span>Total Length: {(data.totalLength / 1000).toFixed(2)} km</span>
                    )}
                    {type === 'Polygon' && (
                      <span>Total Area: {(data.totalArea / 1000000).toFixed(2)} km²</span>
                    )}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="summary-chart">
        <h3>Element Distribution</h3>
        <div className="chart-container">
          {Object.entries(elementTypes).map(([type, data]) => (
            data.count > 0 && (
              <div key={type} className="chart-bar-container">
                <div className="chart-label">{type}</div>
                <div className="chart-bar-wrapper">
                  <div 
                    className="chart-bar" 
                    style={{ 
                      width: `${(data.count / totalElements) * 100}%`,
                      backgroundColor: getColorForType(type)
                    }}
                  ></div>
                  <span className="chart-value">{data.count}</span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get color for each element type
const getColorForType = (type) => {
  const colors = {
    Point: '#ff7800',
    LineString: '#3388ff',
    Polygon: '#28a745',
    MultiGeometry: '#e91e63',
  };
  
  return colors[type] || '#6c757d';
};

export default KMLSummary;
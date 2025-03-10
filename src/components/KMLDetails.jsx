import React, { useState, useEffect } from 'react';
import '../styles/KMLDetails.css';

const KMLDetails = ({ parsedData }) => {
  const [activeType, setActiveType] = useState(null);
  const [expandedElements, setExpandedElements] = useState({});

  useEffect(() => {
    if (!activeType && parsedData) {
      // Find first type with elements
      const firstType = Object.entries(parsedData.elementTypes)
        .find(([_, data]) => data.count > 0);

      if (firstType) {
        setActiveType(firstType[0]);
      }
    }
  }, [parsedData, activeType]);

  const toggleElement = (elementId) => {
    setExpandedElements(prev => ({
      ...prev,
      [elementId]: !prev[elementId]
    }));
  };

  const renderElementDetails = (element, type) => {
    const isExpanded = expandedElements[element.id];

    return (
      <div key={element.id} className="element-card">
        <div
          className="element-header"
          onClick={() => toggleElement(element.id)}
        >
          <h4>{element.name || `${type} ${element.id}`}</h4>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            &#9660;
          </span>
        </div>

        {isExpanded && (
          <div className="element-details">
            {element.description && (
              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{element.description}</span>
              </div>
            )}

            {type === 'LineString' && (
              <div className="detail-item">
                <span className="detail-label">Length:</span>
                <span className="detail-value">{(element.length / 1000).toFixed(2)} km</span>
              </div>
            )}

            {type === 'Polygon' && (
              <div className="detail-item">
                <span className="detail-label">Area:</span>
                <span className="detail-value">{(element.area / 1000000).toFixed(2)} km²</span>
              </div>
            )}

            <div className="detail-item">
              <span className="detail-label">Coordinates:</span>
              <div className="coordinates-container">
                <table className="coordinates-table">
                  <thead>
                    <tr>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Altitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {element.coordinates.slice(0, 5).map((coord, idx) => (
                      <tr key={idx}>
                        <td>{coord.lat.toFixed(6)}</td>
                        <td>{coord.lon.toFixed(6)}</td>
                        <td>{coord.alt.toFixed(2)}</td>
                      </tr>
                    ))}
                    {element.coordinates.length > 5 && (
                      <tr>
                        <td colSpan="3" className="more-coords">
                          ...and {element.coordinates.length - 5} more coordinates
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!parsedData) {
    return <div className="details-container empty">No KML data available</div>;
  }

  return (
    <div className="details-container">
      <div className="details-sidebar">
        <h3>Element Types</h3>
        <ul className="type-list">
          {Object.entries(parsedData.elementTypes).map(([type, data]) => (
            data.count > 0 && (
              <li
                key={type}
                className={`type-item ${activeType === type ? 'active' : ''}`}
                onClick={() => setActiveType(type)}
              >
                <span className="type-name">{type}</span>
                <span className="type-count">{data.count}</span>
              </li>
            )
          ))}
        </ul>
      </div>

      <div className="details-content">
        {activeType && (
          <>
            <div className="details-header">
              <h2>{activeType} Elements</h2>
              <p className="details-summary">
                {parsedData.elementTypes[activeType].count} elements found
                {activeType === 'LineString' && (
                  <span className="details-extra">
                    Total Length: {(parsedData.elementTypes[activeType].totalLength / 1000).toFixed(2)} km
                  </span>
                )}
                {activeType === 'Polygon' && (
                  <span className="details-extra">
                    Total Area: {(parsedData.elementTypes[activeType].totalArea / 1000000).toFixed(2)} km²
                  </span>
                )}
              </p>
            </div>

            <div className="elements-list">
              {parsedData.elementTypes[activeType].elements.map(element =>
                renderElementDetails(element, activeType)
              )}
            </div>
          </>
        )}

        {!activeType && (
          <div className="no-elements">
            <p>No elements found in the KML file</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KMLDetails;

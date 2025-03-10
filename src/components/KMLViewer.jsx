import React, { useState, useEffect } from 'react';
import MapDisplay from './MapDisplay';
import FileUploader from './FileUploader';
import KMLSummary from './KMLSummary';
import KMLDetails from './KMLDetails';
import { parseKML } from '../utils/kmlParser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/KMLViewer.css';

const KMLViewer = () => {
  const [kmlData, setKmlData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (kmlData) {
      try {
        setLoading(true);
        const parsed = parseKML(kmlData);
        setParsedData(parsed);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing KML:', error);
        toast.error('Error parsing KML file. Please check the file format.');
        setLoading(false);
      }
    }
  }, [kmlData]);

  const handleFileUpload = (fileData) => {
    setKmlData(fileData);
    setActiveTab('map');
    toast.success('KML file loaded successfully!');
  };

  const renderTabContent = () => {
    if (loading) {
      return <div className="loading">Processing KML data...</div>;
    }

    switch (activeTab) {
      case 'map':
        return <MapDisplay kmlData={kmlData} parsedData={parsedData} />;
      case 'summary':
        return <KMLSummary parsedData={parsedData} />;
      case 'details':
        return <KMLDetails parsedData={parsedData} />;
      default:
        return <MapDisplay kmlData={kmlData} parsedData={parsedData} />;
    }
  };

  return (
    <div className="content-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="kml-viewer-container">
        <div className="header-section">
          <h1>KML Viewer & Analyzer</h1>
          <p>Upload a KML file to view and analyze geographic data</p>
          <FileUploader onFileUpload={handleFileUpload} />
        </div>

        {kmlData && (
          <div className="content-section">
            <div className="tabs">
              <button
                className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Map View
              </button>
              <button
                className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
              <button
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Detailed View
              </button>
            </div>

            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        )}

        {!kmlData && (
          <div className="placeholder">
            <div className="placeholder-content">
              <i className="fas fa-map-marked-alt"></i>
              <p>Please upload a KML file to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KMLViewer;

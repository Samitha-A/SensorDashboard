import React, { useState } from 'react';
import { Power } from 'lucide-react';
import "./Dashboard.css";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Initialize useNavigate hook at the component level
  const navigate = useNavigate();

  const [devices, setDevices] = useState({
    sensors: {
      'Sensor 1': true,
      'Sensor 2': true,
      'Sensor 3': false,
      'Sensor 4': false,
      'Sensor 5': false,
    },
    actuators: {
      'Actuator 1': false,
      'Actuator 2': true,
      'Actuator 3': false,
      'Actuator 4': true,
    },
    microcontrollers: {
      'Microcontroller 1': false,
      'Microcontroller 2': true,
      'Microcontroller 3': false,
      'Microcontroller 4': true,
    }
  });

  const toggleDevice = (category, device) => {
    setDevices(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [device]: !prev[category][device]
      }
    }));
  };

  const DeviceCard = ({ title, devices, category }) => (
    <div className="card">
      <h3>{title}</h3>
      <div className="device-list">
        {Object.entries(devices).map(([device, isOn]) => (
          <div key={device} className="device-row">
            <button
              className="device-button"
              onClick={() => toggleDevice(category, device)}
            >
              <span className="device-name">{device}</span>
              <div className={`status-indicator ${isOn ? 'on' : 'off'}`}>
                <Power size={16} />
                <span>{isOn ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="icon"></div>
      </div>

      <div className="main">
        <header className="header">Trainer Kit</header>

        <div className="Livebutton">
          {/* Updated the navigation path - make sure this matches your route configuration */}
          <button onClick={() => navigate('/live')}>Live data</button>
        </div>
        <br />

        <div className="section">
          <DeviceCard
            title="Sensors"
            devices={devices.sensors}
            category="sensors"
          />
          <DeviceCard
            title="Actuators"
            devices={devices.actuators}
            category="actuators"
          />
          <DeviceCard
            title="Microcontrollers"
            devices={devices.microcontrollers}
            category="microcontrollers"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
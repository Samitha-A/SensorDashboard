import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './Live.css';
import debounce from 'lodash.debounce';

const historicalData = [
  { time: 2, value: 5 },
  { time: 4, value: 4 },
  { time: 6, value: 24 },
  { time: 8, value: 15 },
  { time: 10, value: 20 },
  { time: 12, value: 18 },
  { time: 14, value: 32 },
  { time: 16, value: 30 },
  { time: 18, value: 35 },
  { time: 20, value: 25 },
  { time: 22, value: 32 },
  { time: 24, value: 30 }
];

const sensorData = [
  {
    id: 1,
    name: 'Sensor 1',
    temperature: '74.45 F',
    chartData: [
      { time: 1, value: 72 },
      { time: 2, value: 73 },
      { time: 3, value: 74 },
      { time: 4, value: 74.45 }
    ]
  },
  {
    id: 2,
    name: 'Sensor 2',
    temperature: '74.63 F',
    chartData: [
      { time: 1, value: 73 },
      { time: 2, value: 74 },
      { time: 3, value: 74.5 },
      { time: 4, value: 74.63 }
    ]
  },
  {
    id: 3,
    name: 'Sensor 3',
    temperature: '74.86 F',
    chartData: [
      { time: 1, value: 73.5 },
      { time: 2, value: 74 },
      { time: 3, value: 74.5 },
      { time: 4, value: 74.86 }
    ]
  }
];

const MiniChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Live = () => {
  const [isMounted, setIsMounted] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Debounced resize handler to avoid ResizeObserver issues
  useEffect(() => {
    const handleResize = debounce(() => {
      // Logic for resizing
    }, 300);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        {/* Historical Data Chart */}
        <div className="card">
          <div className="chart-header">
            <h2 className="chart-title">HISTORICAL SENSOR DATA</h2>
            <span className="date">{currentDate}</span>
          </div>
          <div className="chart-wrapper">
            <div className="chart-container">
              {isMounted && (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={historicalData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="time"
                      stroke="#8b92a5"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#8b92a5"
                      axisLine={false}
                      tickLine={false}
                      ticks={[0, 10, 20, 30, 40]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#252b3b',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={true}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        <br></br>

        <div className="grid-container grid-2-cols">
          {/* Temperature Gauge */}
          <div className="card">
            <div className="temperature-gauge">
              <div className="gauge-circle">
                <div className="gauge-border">
                  <div className="gauge-content">
                    <div className="temperature">77.53 F</div>
                    <div className="temperature-label">Temperature</div>
                  </div>
                </div>
              </div>
              <div className="temperature-stats">
                <div className="stat">
                  <div className="stat-dot dot-high"></div>
                  <div className="stat-value">91.26 F</div>
                  <div className="stat-label">Highest</div>
                </div>
                <div className="stat">
                  <div className="stat-dot dot-low"></div>
                  <div className="stat-value">60.78 F</div>
                  <div className="stat-label">Lowest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Averages */}
          <div className="card">
            <div className="averages-container">
              <div className="circular-progress">
                <div className="progress-ring progress-light"></div>
                <div className="progress-content">
                  <div className="progress-value">7.9%</div>
                  <div className="progress-label">Light</div>
                </div>
              </div>
              <div className="circular-progress">
                <div className="progress-ring progress-movement"></div>
                <div className="progress-content">
                  <div className="progress-value">4.51g's</div>
                  <div className="progress-label">Movement</div>
                </div>
              </div>
              <div className="circular-progress">
                <div className="progress-ring progress-pressure"></div>
                <div className="progress-content">
                  <div className="progress-value">1004</div>
                  <div className="progress-label">Pressure</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensors Section */}
        <div className="card">
          <div className="sensor-tabs">
            <button className="tab active">Active Sensors</button>
          </div>
          <div className="grid-container grid-3-cols">
            {sensorData.map(sensor => (
              <div key={sensor.id} className="sensor-card">
                <div className="sensor-header">
                  <span>{sensor.name}</span>
                  <span className="sensor-location">{sensor.location}</span>
                </div>
                <div className="mini-chart">
                  <MiniChart data={sensor.chartData} />
                </div>
                <div className="sensor-temp">
                  <span className="sensor-temp-label">Current temperature</span>
                  <span>{sensor.temperature}</span>
                </div>
                <button className="more-info-btn">More Info</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;

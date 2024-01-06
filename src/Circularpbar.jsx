
import PropTypes from 'prop-types';
import './App.css';

const CircularProgressBar = ({ sqSize, strokeWidth, percentage }) => {
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const circleProgressStyle = {
    strokeDasharray: dashArray,
    strokeDashoffset: dashOffset,
    transition: 'stroke-dashoffset 1s ease',
  };

  return (
    <svg className="circle-svg" width={sqSize} height={sqSize} viewBox={viewBox}>
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgb(208 29 183)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0000ff', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          stroke: 'url(#circleGradient)',
          ...circleProgressStyle,
        }}
      />
      <text className="circle-text" x="50%" y="50%" dy=".3em" textAnchor="middle">
        {`${percentage}%`}
      </text>
    </svg>
  );
};

CircularProgressBar.propTypes = {
  sqSize: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default CircularProgressBar;

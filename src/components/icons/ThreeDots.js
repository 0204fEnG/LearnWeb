const ThreeDots = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      viewBox="0 0 16 16"
      role="img"
      aria-label="three-dots"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
    </svg>
  );
};

export default ThreeDots;
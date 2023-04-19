import "./Icon.css";

const Icon = ({ icon, onClick, size, className = [""] }) => {
  return (
    <i className={`fas fa-${icon} ${size} ${className}`} onClick={onClick}></i>
  );
};
export default Icon;

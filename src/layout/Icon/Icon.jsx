import "./Icon.css";

const Icon = ({ icon, onClick, size }) => {
  return <i className={`fas fa-${icon} ${size}`} onClick={onClick}></i>;
};
export default Icon;

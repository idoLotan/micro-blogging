import './Line.css';

export const Line = (props) => {
    return (
        <div className={`Line ${props.addClass || ''}`}>
            {props.children}
        </div>
    )
}

export const Between = (props) => {
    return (
        <Line {...props} addClass="Between" />
    )
}
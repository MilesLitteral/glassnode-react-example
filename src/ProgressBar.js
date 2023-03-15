import React, {useEffect} from "react";

const ProgressBar = (props) => {
  const { titleText, bgcolor, completed } = props;

  useEffect(() => {
    console.log(completed);
    //setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000)
  }, []);
  
  const containerStyles = {
    height: 20,
    width: '80%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 12
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
    //textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      <span style={labelStyles}>{`${(completed) + (Math.round(Math.random() * 100) + 1)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
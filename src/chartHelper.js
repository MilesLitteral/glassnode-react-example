import React, {useEffect, useState} from "react";
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';

function ChartHelper(props){
    const {title, barBg, workText, workAverage, barPercent, onClicked} = props;
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
      setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
    }, []);
  
    return(<ButtonGroup className="me-2" aria-label="First group">
                <Button variant="outline-primary" onClick={onClicked}>
                <b>{title}</b>
                <Container style={{alignItems: "center", justifyContent: "center"}} >
                    <span>
                    <p>{workText}</p>
                    <ProgressBar bgcolor={barBg} completed={completed} />
                    <p>{workAverage}</p>
                    </span>
                </Container>
                </Button>
            </ButtonGroup>)
}

export default ChartHelper;
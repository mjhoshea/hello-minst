import React from 'react';
import CanvasDraw from "react-canvas-draw";
import axios from 'axios'
import ChartContainer from "./ChartContainer"




class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    test(){
        axios.post( 'http://127.0.0.1:8000/predict/', {canvas_points: JSON.parse(localStorage.getItem("savedDrawing"))})
            .then((response) => {
                let mappedData = response.data.predicted_digit.map((elm, index) =>
                    ({
                        digit: index,
                        value: elm
                    }));
                this.setState({data: mappedData});
                console.log(this.state.data);
            }, (error) => {
                console.log(error);
            });
    }


    render() {
        return (

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>Digit Predictor</h1>
                <p>i am lord la la la </p>
            <div style={{display: "flex", alignItems: "center"}}>


                <div className="App" style={{ padding: "100px"}}>
                    <div >
                    <header className="App-header">
                        <h1>Draw your digit and predict</h1>

                        <button
                            onClick={() => {
                                localStorage.setItem(
                                    "savedDrawing",
                                    this.saveableCanvas.getSaveData()
                                );
                            }}
                        >
                            Save
                        </button>

                        <button
                            onClick={() => {
                                this.saveableCanvas.clear();
                            }}
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => {
                                this.saveableCanvas.undo();
                            }}
                        >
                            Undo
                        </button>

                        <button
                            onClick={() => {
                                console.log(localStorage.getItem("savedDrawing"))
                            }}
                        >
                            Load
                        </button>

                        <button
                        onClick={() => {
                            this.test()
                        }}
                        >
                            Predict
                        </button>

                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        />
                    </header>
                    </div>
                </div>

                <div style={{padding: "100px"}}>
                    <h1>Prediction pie chart</h1>
                    <ChartContainer data={this.state.data}/>
                </div>

            </div>
            </div>
        );
    }
}

export default App;

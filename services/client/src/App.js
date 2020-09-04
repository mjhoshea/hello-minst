import React from 'react';
import CanvasDraw from "react-canvas-draw";
import axios from 'axios'



function test(){



    axios.post( 'http://127.0.0.1:8000/test/', {canvas_points: JSON.parse(localStorage.getItem("savedDrawing"))})
        .then((response) => {
            alert("Your number was " + response.data.predicted_digit)
        }, (error) => {
            console.log(error);
        });
}


class App extends React.Component{


   render() {
        return (


            <div className="App" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div >
                <header className="App-header">
                    <h1>Number Prediction App</h1>

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
                        test()
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
        );
    }
}

export default App;

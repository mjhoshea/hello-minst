import * as d3 from "d3";
import React, {useState} from "react";
import PieChart from "./PieChart"

const ChartContainer = (props) => {

    return (
        <div className="ChartContainer">

            <div>

                <PieChart
                    data={props.data}
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100}
                />
            </div>

        </div>
    );

}

export default ChartContainer;
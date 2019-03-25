import React from 'react';
import { Line } from 'react-chartjs-2';
// const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";
const wss = window.location.hostname === 'localhost' ? "ws://localhost:1338/" : "wss://trader-api.graudusk.me/";

const options = {
    datasetKeyProvider: "id",
    maintainAspectRatio: false    // Don't maintain w/h ratio
};
const initialState = {
    websocket: null,
    labels: [],
    datasets: [{
            label: "Apple Macbook",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(19,117,173,0.4)",
            borderColor: "rgba(19,117,173,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(19,117,173,1)",
            pointBackgroundColor: "rgba(19,117,173,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(19,117,173,0.4)",
            pointHoverBorderColor: "rgba(19,117,173,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
            ],
            manufacturer: "Apple",
            id: 1
        },
        {
            label: "Asus ZenBook",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(100,50,114,0.4)",
            borderColor: "rgba(100,50,114,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(100,50,114,1)",
            pointBackgroundColor: "rgba(100,50,114,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(100,50,114,0.4)",
            pointHoverBorderColor: "rgba(100,50,114,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
            ],
            manufacturer: "ASUS",
            id: 2
        },
        {
            label: "Lenovo Thinkpad",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(156,250,0,0.4)",
            borderColor: "rgba(156,250,0,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(156,250,0,1)",
            pointBackgroundColor: "rgba(156,250,0,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(156,250,0,0.4)",
            pointHoverBorderColor: "rgba(156,250,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
            ],
            manufacturer: "ASUS",
            id: 2
        },
        {
            label: "Acer Aspire",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(0,50,0,0.4)",
            borderColor: "rgba(0,50,0,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(0,50,0,1)",
            pointBackgroundColor: "rgba(0,50,0,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(0,50,0,0.4)",
            pointHoverBorderColor: "rgba(0,50,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
            ],
            manufacturer: "ASUS",
            id: 2
        },
        {
            label: "HP Omen",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(156,226,114,0.4)",
            borderColor: "rgba(156,226,114,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(156,226,114,1)",
            pointBackgroundColor: "rgba(156,226,114,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(156,226,114,0.4)",
            pointHoverBorderColor: "rgba(156,226,114,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
            ],
            manufacturer: "ASUS",
            id: 2
        }
    ],
    history: [],
    close: false
};

class LineChart extends React.Component {
    // const LineChart = React.createClass({
    displayName = 'LineChart';
    componentWillMount() {
        this.setState(initialState);
    };

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    componentWillUnmount() {
        console.log("closing")
        this.state.close = true;
        // this.setState({
        //     close: true
        // })
        // if(this.state.websocket) this.state.websocket.close();
    }

    componentDidMount() {
        var that = this;
        let websocket = new WebSocket(wss, 'json');
        console.log("Connecting to: " + wss);
        // websocket = new WebSocket(url.value);

        websocket.onopen = function() {
            console.log("The websocket is now open.");
            // console.log(websocket);
            // console.log("The websocket is now open.");
        };

        websocket.onmessage = function(event) {
            if (that.state.close) {
                websocket.close();
                return;
            }
            console.log("Receiving stock prices");
            // console.log(event.data);

            let d = new Date();
            let time = ('0' + d.getUTCHours()).slice(-2) + ':' +
            ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2);

            let result = JSON.parse(event.data);
            if (that.state.labels.length === 0) {
                for (let _i in result) {
                    that.state.history.push([]);
                }
            }
            that.state.labels.push(time);

            let tempDataSets = [];

            for (let item in result) {
                that.state.history[item].push(result[item].price);

                var oldDataSet = that.state.datasets[item];
                var newData = [];

                for (var x = 0; x < that.state.labels.length; x++) {
                    // newData.push(Math.floor(Math.random() * 100));
                    newData.push(that.state.history[item][x]);
                }

                var newDataSet = {
                    ...oldDataSet
                };

                newDataSet.data = newData;
                tempDataSets.push(newDataSet);
            }


            var newState = {
                ...initialState,
                datasets: tempDataSets
            };

            that.setState(newState);
        }

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
            // console.log(websocket);
            // console.log("Websocket is now closed.");
        };

        websocket.onerror = function() {
            websocket.close();
        }
    };


    render() {
        return (
            <Line options={options} data={this.state} />
        );
    };
};

export default LineChart;
// export default React.createClass({
//   displayName: 'LineChart',

//   render() {
//     return (
//         <LineChart />
//     );
//   }
// });

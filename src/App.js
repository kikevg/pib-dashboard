import React from 'react';

import Header from './components/Header';
import Divider from './components/Divider';
import BarChart from './components/BarChart';
import CountryInfo from './components/CountryInfo';
import CountryPicker from './components/CountryPicker';
import Activity from './components/Activity';
import LineChart from './components/LineChart';
import Footer from './components/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { fetchData, fetchActivities, fetchGrowthAnnual, lastUpdated } from './api/index';

class App extends React.Component {

    state = {
        darkTheme: false,
        labelsBarChart: [],
        dataBarChart: [],
        labelsLineChart: [],
        dataLineChart: [],
        countryInf: [],
        lastupdate: new Date().toLocaleDateString(),
        activities: [],
        lineColor: '#eee',
        fontColor: '#02040F'
    }

    countries = [{
        id: 'sv',
        name: 'El Salvador'
    }, {
        id: 'gt',
        name: 'Guatemala'
    }, {
        id: 'hn',
        name: 'Honduras'
    }, {
        id: 'ni',
        name: 'Nicaragua'
    }, {
        id: 'cr',
        name: 'Costa Rica'
    }, {
        id: 'pa',
        name: 'Panama'
    }];

    async componentDidMount() {
        const data = await fetchData();
        const fetchActi = await fetchActivities('sv');
        const growthAnnual = await fetchGrowthAnnual('sv');
        const lastUp = await lastUpdated();
        this.setState({ labelsBarChart: data.map(x => x.name) })
        this.setState({ dataBarChart: data.map(x => (x.value / 1000000 / 1000).toFixed(3)) })
        this.setState({ countryInf: data });
        this.setState({ lastupdate: new Date(lastUp).toLocaleDateString() });
        this.setState({ activities: fetchActi });
        this.setState({ labelsLineChart: growthAnnual.map(x => x.date) });
        this.setState({ dataLineChart: growthAnnual.map(x => x.value) });
    }

    setDarkTheme = () => {
        this.setState({ darkTheme: !this.state.darkTheme }, () => {
            if (this.state.darkTheme) {
                document.body.classList.add('bg-dark');
                this.setState({ lineColor: '#323232' });
                this.setState({ fontColor: '#fff' })
            } else {
                document.body.classList.remove('bg-dark');
                this.setState({ lineColor: '#eee' });
                this.setState({ fontColor: '#02040F' })
            }
        });
    }

    changeCountry = async (e) => {
        let target = e.target.value;
        const fetchActi = await fetchActivities(target);
        const growthAnnual = await fetchGrowthAnnual(target);
        this.setState({ activities: fetchActi });
        this.setState({ labelsLineChart: growthAnnual.map(x => x.date) });
        this.setState({ dataLineChart: growthAnnual.map(x => x.value) });
    }

    render() {
        return (
            <div>
                <Container>
                    <Header
                        onClick={this.setDarkTheme}
                        lastupdate={this.state.lastupdate}
                    />
                    <Divider text='datos generales' />

                    <Row>
                        <Col sm={12} md={12} lg={8} className="my-4">
                            <Card className="border-0">
                                <Card.Header className="bg-transparent border-0">
                                    <span className="d-block text-center text-secondary font-weight-bold font-size-small">PIB Valor actual ($ USD)</span>
                                </Card.Header>
                                <Card.Body>
                                    <BarChart
                                        data={{
                                            labels: this.state.labelsBarChart,
                                            datasets: [
                                                {
                                                    fill: true,
                                                    backgroundColor: [
                                                        'rgba(129, 236, 236, .1)',
                                                        'rgba(162, 155, 254, .1)',
                                                        'rgba(255, 234, 167, .1)',
                                                        'rgba(129, 236, 236, .1)',
                                                        'rgba(162, 155, 254, .1)',
                                                        'rgba(255, 234, 167, .1)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(129, 236, 236, 1)',
                                                        'rgba(162, 155, 254, 1)',
                                                        'rgba(255, 234, 167, 1)',
                                                        'rgba(129, 236, 236, 1)',
                                                        'rgba(162, 155, 254, 1)',
                                                        'rgba(255, 234, 167, 1)',
                                                    ],
                                                    borderWidth: 2,
                                                    data: this.state.dataBarChart
                                                }
                                            ]
                                        }}
                                        options={{
                                            legend: {
                                                display: false,
                                            },
                                            tooltips: {
                                                callbacks: {
                                                    title: (tooltipItem, data) => {
                                                        return data['labels'][tooltipItem[0]['index']];
                                                    },
                                                    label: (tooltipItem, data) => {

                                                        let num = parseFloat(data['datasets'][0]['data'][tooltipItem['index']]) * 1000;
                                                        let str = new Intl.NumberFormat('en-US').format(num);
                                                        return 'PIB: $' + str + 'M';

                                                    },
                                                }
                                            },
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display: false,
                                                        drawBorder: false,
                                                    },
                                                    ticks: {
                                                        display: true,
                                                        padding: 20,
                                                        fontColor: this.state.fontColor,
                                                        fontFamily: "'Roboto', sans-serif",
                                                        fontSize: 14
                                                    }
                                                }],
                                                yAxes: [{
                                                    gridLines: {
                                                        display: true,
                                                        drawBorder: false,
                                                        color: this.state.lineColor
                                                    },
                                                    ticks: {
                                                        display: true,
                                                        padding: 20,
                                                        fontColor: this.state.fontColor,
                                                        fontFamily: "'Roboto', sans-serif",
                                                        fontSize: 14,
                                                        callback: function (value, index, values) {
                                                            return value + 'B';
                                                        }
                                                    },
                                                }]
                                            }
                                        }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={12} lg={4} className="my-4">
                            <Card className="border-0">
                                <Card.Body className="p-0">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[0]}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[1]}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[2]}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[3]}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[4]}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <CountryInfo
                                                country={this.state.countryInf[5]}
                                            />
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Divider text='Datos por país' />

                    <CountryPicker
                        countries={this.countries}
                        onChange={this.changeCountry}
                    />

                    <Row className="text-center py-4">
                        <Col sm={12} md={6} lg={3}>
                            <Card className="border-0 my-2">
                                <Card.Body>
                                    <Activity
                                        activity={this.state.activities[0]}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className="border-0 my-2">
                                <Card.Body>
                                    <Activity
                                        activity={this.state.activities[1]}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className="border-0 my-2">
                                <Card.Body>
                                    <Activity
                                        activity={this.state.activities[2]}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className="border-0 my-2">
                                <Card.Body>
                                    <Activity
                                        activity={this.state.activities[3]}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="border-0">
                        <Card.Header className="bg-transparent border-0">
                            <span className="d-block text-center font-weight-bold text-secondary font-size-small">PIB Crecimiento por año (%)</span>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                data={{
                                    labels: this.state.labelsLineChart,
                                    datasets: [
                                        {
                                            fill: true,
                                            backgroundColor: 'rgba(129, 236, 236, .1)',
                                            borderColor: 'rgba(129, 236, 236, 1)',
                                            borderWidth: 2,
                                            data: this.state.dataLineChart,
                                            pointBorderWidth: 0,
                                        }
                                    ]
                                }}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    tooltips: {
                                        callbacks: {
                                            title: (tooltipItem, data) => {
                                                return data['labels'][tooltipItem[0]['index']];
                                            },
                                            label: (tooltipItem, data) => {

                                                let num = parseFloat(data['datasets'][0]['data'][tooltipItem['index']]);
                                                let str = new Intl.NumberFormat('en-US').format(num);
                                                return 'PIB: ' + str + '%';

                                            },
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                display: false,
                                                drawBorder: false,
                                            },
                                            ticks: {
                                                display: true,
                                                padding: 20,
                                                fontColor: this.state.fontColor,
                                                fontFamily: "'Roboto', sans-serif",
                                                fontSize: 14,
                                            }
                                        }],
                                        yAxes: [{
                                            gridLines: {
                                                display: true,
                                                drawBorder: false,
                                                color: this.state.lineColor
                                            },
                                            ticks: {
                                                display: true,
                                                padding: 20,
                                                fontColor: this.state.fontColor,
                                                fontFamily: "'Roboto', sans-serif",
                                                fontSize: 14,
                                                callback: function (value, index, values) {
                                                    return value + '%';
                                                }
                                            }
                                        }]
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default App;


const connection= require('../../config/sqlconfig')

const getBusHandler=async(req,res)=>{

    const query = `SELECT * FROM BusService;`;

    connection.query(query, (err, busServiceResults) => {
        if (err) {
            res.status(500).send('Error fetching BusService data');
            throw err;
        }

        const data = [];

        busServiceResults.forEach(bus => {
            const busData = {
                busService: bus,
                busStations: [],
                runningDays: []
            };

            const stationQuery = `SELECT * FROM BusStations WHERE bus_id = ?`;
            const runningDaysQuery = `SELECT * FROM RunningDays WHERE bus_id = ?`;

            connection.query(stationQuery, bus.bus_id, (err, stationResults) => {
                if (err) {
                    res.status(500).send('Error fetching BusStations data');
                    throw err;
                }
                busData.busStations = stationResults;

                connection.query(runningDaysQuery, bus.bus_id, (err, runningDaysResults) => {
                    if (err) {
                        res.status(500).send('Error fetching RunningDays data');
                        throw err;
                    }
                    busData.runningDays = runningDaysResults;

                    data.push(busData);
                 
                    if (data.length === busServiceResults.length) {
                        res.status(200).json(data);
                    }
                });
            });
        });
    });
};
module.exports=getBusHandler;
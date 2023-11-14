const connection= require('../../config/sqlconfig')
const postHandler=async(req,res)=>{

    const userId = req.params.user_id;
    const { busService, busStations, runningDays } = req.body;

    const busServiceSql = `INSERT INTO BusService (bus_name, bus_number, public_transport, start_from, end_stop, start_time, end_time, run_all_days, is_running_today, bus_status, user_id ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const busServiceValues = [
        busService.bus_name,
        busService.bus_number,
        busService.public_transport,
        busService.start_from,
        busService.end_stop,
        busService.start_time,
        busService.end_time,
        busService.run_all_days,
        busService.is_running_today,
        busService.bus_status ,
        userId
    ];

    connection.beginTransaction((err) => {
        if (err) throw err;

        connection.query(busServiceSql, busServiceValues, (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).send('Error inserting BusService data');
                    throw err;
                });
            }

            const bus_id = result.insertId; // Retrieve the inserted bus_id

            const busStationsSql = `INSERT INTO BusStations (bus_id, station_name, arrival_time) VALUES ?`;
            const busStationsValues = busStations.map(station => [bus_id, station.station_name, station.arrival_time]);

            const runningDaysSql = `INSERT INTO RunningDays (bus_id, day_of_week) VALUES ?`;
            const runningDaysValues = runningDays.map(day => [bus_id, day.day_of_week]);

            connection.query(busStationsSql, [busStationsValues], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).send('Error inserting BusStations data');
                        throw err;
                    });
                }

                connection.query(runningDaysSql, [runningDaysValues], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error inserting RunningDays data');
                            throw err;
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).send('Transaction commit error');
                                throw err;
                            });
                        }

                        res.status(200).send('Data inserted into all tables');
                    });
                });
            });
        });
    });

}
module.exports=postHandler;
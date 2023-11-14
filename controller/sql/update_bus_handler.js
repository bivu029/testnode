const connection= require('../../config/sqlconfig')

const updateBusHandler=async(req,res)=>{

    const bus_id = req.params.bus_id;
    const { busService, busStations, runningDays } = req.body;

    const updateBusServiceQuery = `UPDATE BusService 
                                   SET bus_name = ?, bus_number = ?, public_transport = ?, start_from = ?, end_stop = ?, start_time = ?, end_time = ?, run_all_days = ?, is_running_today = ?, bus_status = ?
                                   WHERE bus_id = ?`;

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
        busService.bus_status,
        bus_id
    ];

    connection.beginTransaction((err) => {
        if (err) throw err;

        connection.query(updateBusServiceQuery, busServiceValues, (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).send('Error updating BusService data');
                    throw err;
                });
            }

            busStations.forEach(station => {
                const updateBusStationsQuery = `UPDATE BusStations 
                                               SET station_name = ?, arrival_time = ?
                                               WHERE station_id = ?`;

                const stationValues = [
                    station.station_name,
                    station.arrival_time,
                    station.station_id
                ];

                connection.query(updateBusStationsQuery, stationValues, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error updating BusStations data');
                            throw err;
                        });
                    }
                });
            });

            runningDays.forEach(day => {
                const updateRunningDaysQuery = `UPDATE RunningDays 
                                               SET day_of_week = ?
                                               WHERE running_id = ?`;

                const dayValues = [
                    day.day_of_week,
                    day.running_id
                ];

                connection.query(updateRunningDaysQuery, dayValues, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error updating RunningDays data');
                            throw err;
                        });
                    }
                });
            });

            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).send('Transaction commit error');
                        throw err;
                    });
                }

                res.status(200).send('Data updated in all tables');
            });
        });
    });

}

module.exports=updateBusHandler;
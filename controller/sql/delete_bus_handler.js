const connection= require('../../config/sqlconfig')

const deleteHandler=async(req,res)=>{

    const bus_id = req.params.bus_id;

    const deleteRunningDaysQuery = `DELETE FROM RunningDays WHERE bus_id = ?`;
    const deleteBusStationsQuery = `DELETE FROM BusStations WHERE bus_id = ?`;
    const deleteBusServiceQuery = `DELETE FROM BusService WHERE bus_id = ?`;

    connection.query(deleteRunningDaysQuery, bus_id, (err, runningDaysResults) => {
        if (err) {
            res.status(500).send('Error deleting RunningDays data');
            throw err;
        }

        connection.query(deleteBusStationsQuery, bus_id, (err, busStationsResults) => {
            if (err) {
                res.status(500).send('Error deleting BusStations data');
                throw err;
            }

            connection.query(deleteBusServiceQuery, bus_id, (err, busServiceResults) => {
                if (err) {
                    res.status(500).send('Error deleting BusService data');
                    throw err;
                }

                res.status(200).send(`Data related to bus_id ${bus_id} deleted successfully`);
            });
        });
    });

}

module.exports= deleteHandler;
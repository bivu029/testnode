const connection= require('../../../config/sqlconfig');

const getUserHandler=async(req,res)=>{

    const userId = req.params.user_id;

  

    const quesry1=`SELECT
    u.user_id,
    u.email,
    JSON_OBJECT(
        'bus_id', bs.bus_id,
        'bus_name', bs.bus_name,
        'bus_number', bs.bus_number,
        'public_transport', bs.public_transport,
        'start_from', bs.start_from,
        'end_stop', bs.end_stop,
        'start_time', bs.start_time,
        'end_time', bs.end_time,
        'run_all_days', bs.run_all_days,
        'is_running_today', bs.is_running_today,
        'bus_status', bs.bus_status,
        'user_id', bs.user_id
    ) AS busService,
    GROUP_CONCAT(
        JSON_OBJECT(
            'station_id', bst.station_id,
            'station_name', bst.station_name,
            'arrival_time', bst.arrival_time
        )
    ) AS busStations,
    GROUP_CONCAT(
        JSON_OBJECT(
            'running_id', rd.running_id,
            'bus_id', rd.bus_id,
            'day_of_week', rd.day_of_week
        )
    ) AS runningDays
FROM bus_user u
LEFT JOIN BusService bs ON u.user_id = bs.user_id
LEFT JOIN BusStations bst ON bs.bus_id = bst.bus_id
LEFT JOIN RunningDays rd ON bs.bus_id = rd.bus_id
WHERE u.user_id = 1
GROUP BY u.user_id, bs.bus_id;
`

    connection.query(quesry1, userId, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching user and related data');
            throw err;
        }

        // Clean and parse the strings to ensure they are valid JSON
const parseStringJSON = (str)=>{
    try {
        // Clean the string to ensure it's surrounded by []
        const cleanedStr = `[${str.replace(/}{/g, '},{')}]`;
        return JSON.parse(cleanedStr);
    } catch (error) {
        console.error("Error parsing string:", error);
        return [];
    }
};


        results.forEach(element => {
            // Apply JSON parsing to each field containing string data
        element.busService = JSON.parse(element.busService); // Parse single JSON object
element.busStations = parseStringJSON(element.busStations); // Parse array of JSON objects
element.runningDays = parseStringJSON(element.runningDays);

// Remove duplicates from busStations array
element.busStations = Array.from(new Set(element.busStations.map(JSON.stringify))).map(JSON.parse);

// Remove duplicates from runningDays array
element.runningDays = Array.from(new Set(element.runningDays.map(JSON.stringify))).map(JSON.parse);
            
        });
        res.status(200).json(results);

    });

};

module.exports= getUserHandler;
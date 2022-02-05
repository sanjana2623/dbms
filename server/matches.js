const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '1234',
  port:5432,
});
const getMatches = () => {
  return new Promise(function(resolve, reject) {
    pool.query('select m.match_id as match_id, m1.team1 , m2.team2, team_name as result, venue_name as stadium from match as m, team, venue, (select match_id,team_name as team1 from match, team where match.team1=team.team_id) as m1, (select match_id,team_name as team2 from match, team where match.team2 = team.team_id) as m2 where m.venue_id = venue.venue_id and team.team_id = m.match_winner and m.match_id = m1.match_id and m.match_id = m2.match_id;', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}


module.exports = {
  getMerchants,
  
}
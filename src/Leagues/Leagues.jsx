import { useEffect, useState } from "react";
import LeagueOneApi from "../api";

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            try{
                let res = await LeagueOneApi.getLeagues({}) // {} for filters
                setLeagues(res);
            }catch(e){
                console.error(e)
            }
        }
        fetchLeagues();
    }, []);


    return(
        <>
        <h1>Leagues</h1>
        <ul>
            {leagues.map(league=>(
                <li key={league.id}>{league.name}</li>
            ))}
        </ul>
        </>
    )
}

export default Leagues
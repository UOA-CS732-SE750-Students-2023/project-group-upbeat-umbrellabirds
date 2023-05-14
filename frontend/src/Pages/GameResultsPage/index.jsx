function GameResults() {
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;
  const [players, setPlayers] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      const gamePlayersIds = playerList;
      const playerScores = [];
      const playerObjects = [];
      for (let i = 0; i < gamePlayersIds.length; i++) {
        const player = await useGet(`${URI}api/player/${gamePlayersIds[i]._id}`);
        playerScores.push(player.score);
        playerObjects.push(player);
      }
      console.log(playerScores, "this is the score");
      // Create an array of objects with both the score and the player
      const playersWithScores = playerScores.map((score, index) => ({
        score,
        player: playerObjects[index],
      }));
      // Sort the array based on the scores
      playersWithScores.sort((a, b) => (a.score < b.score ? 1 : -1));
      // Extract the sorted players back into a separate array
      const sortedPlayers = playersWithScores.map(({ player }) => player);
      console.log(sortedPlayers,"sorted");
      setPlayers(sortedPlayers);
  
      updateTopPlayers(sortedPlayers);
    };
  
    const updateTopPlayers = (players) => {
      console.log(players,"palyers");
      const topPlayers = [];
      for (let i = 0; i < 3; i++) {
        topPlayers.push({
          avatarURL: players[i].profileURL,
          name: players[i].name,
          score: players[i].score,
        });
      }
      console.log(topPlayers,"top");
      setTopPlayers(topPlayers);
      setIsLoading(false);
    };
  
    getPlayers();
  }, []);

  const renderPlayer = (index) => {
    const player = players[index];
    return (
      <div key={player.place} className="grid-cell">
        <PlayerGameResults
          place={`${index + 4}th`}
          avatarUrl={player.profileURL}
          name={player.name}
          points={player.score}
        />
      </div>
    );
  };

  const playAgainOnClick = ()=>{
    navigate("/")
  }

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="game-results-container">
      <div className="results-header">
        <h1 className="heading">Final Results</h1>
      </div>
      {topPlayers.length === 3 && (
        <>
          <div className="podium-results">
            <PlayerPodiumResults
              firstPlace={topPlayers[0]}
              secondPlace={topPlayers[1]}
              thirdPlace={topPlayers[2]}
            />
          </div>
          <div className="grid-container">{players.map(renderPlayer)}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="button">
        <CustomButton
          text="Play Again"
          onClick={() => setPlayAgain(true)}
        ></CustomButton>
      </div>
    </div>
  );
}

export default GameResults;

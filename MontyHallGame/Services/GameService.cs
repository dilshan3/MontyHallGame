using MontyHallGame.Services.Models;

namespace MontyHallGame.Services
{
	public class GameService : IGameService
	{
		private Random random;

		public GameService() {  this.random = new Random(); }
		public int SimulateGame(int simulationCount, bool isDoorChange)
		{
			var successfulGuesses = SimulateGames(simulationCount, isDoorChange);

			return successfulGuesses;
		}

		private int SimulateGames(int numGames, bool changeDoor)
		{
			int successfulGuesses = 0;

			for (int i = 0; i < numGames; i++)
			{
				if (PlayMontyHall(changeDoor))
				{
					successfulGuesses++;
				}
			}

			return successfulGuesses;
		}

		private bool PlayMontyHall(bool changeDoor)
		{
			int carDoor = random.Next(1, 4);
			int initialChoice = random.Next(1, 4);

			if(!changeDoor)
				return carDoor == initialChoice;

			int hostOpen = GetOpenedDoor(initialChoice, carDoor);
			int finalChoice = GetFinalChoice(initialChoice, hostOpen);
			return finalChoice == carDoor;
		}

		private int GetOpenedDoor(int initialChoice, int carDoor) 
		{
			int[] doorArray = { 1, 2, 3 };

			if (initialChoice != carDoor)
				return doorArray.Where(x => x != carDoor && x != initialChoice).Single();
			else 
			{
				doorArray = doorArray.Where((x) => x != carDoor).ToArray();
				return doorArray[random.Next(0,2)];
			}
		}

		private int GetFinalChoice(int initialChoice, int hostOpen)
		{
			int[] doorArray = { 1, 2, 3 };

			return doorArray.Where(x => x != hostOpen && x != initialChoice).Single();
		}	
	}
}

using MontyHallGame.Services.Models;

namespace MontyHallGame.Services
{
	public interface IGameService
	{
		public int SimulateGame(int simulationCount, bool isDoorChange);
	}
}

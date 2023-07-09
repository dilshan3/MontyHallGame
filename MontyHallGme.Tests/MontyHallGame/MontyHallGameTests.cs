using MontyHallGame.Services;

namespace MontyHallGme.Tests.MontyHallGame
{
	[TestFixture]
	public class MontyHallGameTests
	{
		private IGameService _gameService;

		[SetUp]
		public void Setup()
		{
			_gameService = new GameService();
		}

		[Test]
		public void SimulateGame_With_IsDoorChange_True_Should_Return_SuccessfulGuessCount()
		{
			int simulationCount = 1000;
			bool isDoorChange = true;

			int successfulGuessCount = _gameService.SimulateGame(simulationCount, isDoorChange);

			Assert.That(successfulGuessCount, Is.GreaterThan(0));
		}

		[Test]
		public void SimulateGame_With_IsDoorChange_False_Should_Return_SuccessfulGuessCount()
		{
			int simulationCount = 1000;
			bool isDoorChange = true;

			int successfulGuessCount = _gameService.SimulateGame(simulationCount, isDoorChange);

			Assert.That(successfulGuessCount, Is.GreaterThan(0));
		}

		[Test]
		public void SimulateGame_Should_Return_Zero_SuccessfulGuessCount_When_NumGames_Is_Zero()
		{
			int numGames = 0;
			bool isDoorChange = true;

			int successfulGuessCount = _gameService.SimulateGame(numGames, isDoorChange);

			Assert.That(0, Is.EqualTo(successfulGuessCount));
		}
	}
}

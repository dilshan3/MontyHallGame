using Microsoft.AspNetCore.Mvc;
using MontyHallGame.Services;
using MontyHallGame.Services.Models;

namespace MontyHallGame.Controllers
{
	[ApiController]
    [Route("api/[controller]")]
	public class GameController : ControllerBase
	{
		private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
			_gameService = gameService;		
        }

		[HttpGet]
		public IActionResult SimulateGame(int simulationCount, bool isDoorChange)
		{
			if (simulationCount < 1)
            {
                return BadRequest();
			}
			var simulationResponse = _gameService.SimulateGame(simulationCount, isDoorChange);
			return Ok(simulationResponse);
		}
	}
}

import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GameService', () => {
  let service: GameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService],
    });
    service = TestBed.inject(GameService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should make the correct HTTP GET request with parameters', () => {
    const numGames = 1000;
    const changeDoor = true;
    const expectedUrl = 'https://localhost:44316/api/game';
    const expectedResponse = 42;

    service.simulateGames(numGames, changeDoor).subscribe((result) => {
      expect(result).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne((request) => request.url === expectedUrl); // Match based on URL
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });
});

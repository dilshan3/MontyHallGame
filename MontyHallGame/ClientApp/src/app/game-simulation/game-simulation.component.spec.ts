import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { GameSimulationComponent } from './game-simulation.component';
import { GameService } from '../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { of, Observable} from 'rxjs';

describe('GameSimulationComponent', () => {
  let component: GameSimulationComponent;
  let fixture: ComponentFixture<GameSimulationComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['simulateGames']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      declarations: [ GameSimulationComponent ],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameSimulationComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate games and update successful guesses', () => {
    const numGames = 1000;
    const changeDoor = true;
    const successfulGuesses = 500;

    gameService.simulateGames.and.returnValue(of(successfulGuesses));
    
    component.numGames = numGames;
    component.changeDoor = changeDoor;
    component.simulate();
    
    expect(gameService.simulateGames).toHaveBeenCalledWith(numGames, changeDoor);

    fixture.detectChanges();

    expect(component.successfulGuesses).toBe(successfulGuesses);
    expect(component.loading).toBeFalse();
  });

  it('should handle backend failure', () => {
    const numGames = 1000;
    const changeDoor = true;

    const errorObservable = Observable.create((observer: any) => {
      observer.error('Backend request failed');
    });
    gameService.simulateGames.and.returnValue(errorObservable as Observable<number>);

    component.numGames = numGames;
    component.changeDoor = changeDoor;
    component.simulate();

    expect(gameService.simulateGames).toHaveBeenCalledWith(numGames, changeDoor);

    fixture.detectChanges();

    expect(component.successfulGuesses).toBe(-1);
    expect(component.loading).toBeFalse();
    expect(toastrService.error).toHaveBeenCalledWith('Backend request failed', 'Error');
  });
});



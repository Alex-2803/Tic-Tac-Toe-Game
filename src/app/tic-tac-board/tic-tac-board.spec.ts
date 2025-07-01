import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacBoard } from './tic-tac-board';

describe('TicTacBoard', () => {
  let component: TicTacBoard;
  let fixture: ComponentFixture<TicTacBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicTacBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicTacBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

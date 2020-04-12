import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyspellComponent } from './dailyspell.component';

describe('DailyspellComponent', () => {
  let component: DailyspellComponent;
  let fixture: ComponentFixture<DailyspellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyspellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

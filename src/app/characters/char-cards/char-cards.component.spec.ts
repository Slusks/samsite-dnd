import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCardsComponent } from './char-cards.component';

describe('CharCardsComponent', () => {
  let component: CharCardsComponent;
  let fixture: ComponentFixture<CharCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

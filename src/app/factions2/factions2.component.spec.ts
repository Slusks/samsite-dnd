import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Factions2Component } from './factions2.component';

describe('Factions2Component', () => {
  let component: Factions2Component;
  let fixture: ComponentFixture<Factions2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Factions2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Factions2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

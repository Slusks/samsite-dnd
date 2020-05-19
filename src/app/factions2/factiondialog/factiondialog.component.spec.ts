import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactiondialogComponent } from './factiondialog.component';

describe('FactiondialogComponent', () => {
  let component: FactiondialogComponent;
  let fixture: ComponentFixture<FactiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

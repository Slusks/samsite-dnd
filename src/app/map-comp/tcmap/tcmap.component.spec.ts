import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcmapComponent } from './tcmap.component';

describe('TcmapComponent', () => {
  let component: TcmapComponent;
  let fixture: ComponentFixture<TcmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

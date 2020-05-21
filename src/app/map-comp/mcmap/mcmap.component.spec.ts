import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McmapComponent } from './mcmap.component';

describe('McmapComponent', () => {
  let component: McmapComponent;
  let fixture: ComponentFixture<McmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

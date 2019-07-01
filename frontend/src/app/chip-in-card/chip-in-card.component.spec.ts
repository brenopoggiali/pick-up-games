import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipInCardComponent } from './chip-in-card.component';

describe('ChipInCardComponent', () => {
  let component: ChipInCardComponent;
  let fixture: ComponentFixture<ChipInCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipInCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

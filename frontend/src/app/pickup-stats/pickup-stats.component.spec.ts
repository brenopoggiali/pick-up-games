import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupStatsComponent } from './pickup-stats.component';

describe('PickupStatsComponent', () => {
  let component: PickupStatsComponent;
  let fixture: ComponentFixture<PickupStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

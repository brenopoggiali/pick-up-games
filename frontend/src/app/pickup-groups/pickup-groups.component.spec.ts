import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupGroupsComponent } from './pickup-groups.component';

describe('PickupGroupsComponent', () => {
  let component: PickupGroupsComponent;
  let fixture: ComponentFixture<PickupGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

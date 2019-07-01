import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipInDetailsComponent } from './chip-in-details.component';

describe('ChipInDetailsComponent', () => {
  let component: ChipInDetailsComponent;
  let fixture: ComponentFixture<ChipInDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipInDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipInDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

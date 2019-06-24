import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipInComponent } from './chip-in.component';

describe('ChipInComponent', () => {
  let component: ChipInComponent;
  let fixture: ComponentFixture<ChipInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

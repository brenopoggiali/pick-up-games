import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCardItemComponent } from './small-card-item.component';

describe('SmallCardItemComponent', () => {
  let component: SmallCardItemComponent;
  let fixture: ComponentFixture<SmallCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutJudgeComponent } from './scout-judge.component';

describe('ScoutJudgeComponent', () => {
  let component: ScoutJudgeComponent;
  let fixture: ComponentFixture<ScoutJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVerification } from './worker-verification';

describe('WorkerVerification', () => {
  let component: WorkerVerification;
  let fixture: ComponentFixture<WorkerVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerVerification],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerVerification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

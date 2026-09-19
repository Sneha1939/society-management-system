import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedicatedLogin } from './dedicated-login';

describe('DedicatedLogin', () => {
  let component: DedicatedLogin;
  let fixture: ComponentFixture<DedicatedLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DedicatedLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(DedicatedLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

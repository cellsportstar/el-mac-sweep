import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutStage } from './knockout-stage';

describe('KnockoutStage', () => {
  let component: KnockoutStage;
  let fixture: ComponentFixture<KnockoutStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnockoutStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnockoutStage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

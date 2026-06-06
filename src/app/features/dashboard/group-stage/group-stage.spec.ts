import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStage } from './group-stage';

describe('GroupStage', () => {
  let component: GroupStage;
  let fixture: ComponentFixture<GroupStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupStage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

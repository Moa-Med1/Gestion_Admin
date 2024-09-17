import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendanceEmployesComponent } from './tendance-employes.component';

describe('TendanceEmployesComponent', () => {
  let component: TendanceEmployesComponent;
  let fixture: ComponentFixture<TendanceEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TendanceEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendanceEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

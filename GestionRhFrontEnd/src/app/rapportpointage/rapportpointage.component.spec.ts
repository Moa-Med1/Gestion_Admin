import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportpointageComponent } from './rapportpointage.component';

describe('RapportpointageComponent', () => {
  let component: RapportpointageComponent;
  let fixture: ComponentFixture<RapportpointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapportpointageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportpointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

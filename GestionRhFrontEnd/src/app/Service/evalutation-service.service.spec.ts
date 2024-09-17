import { TestBed } from '@angular/core/testing';
import { EvaluationService } from './evalutation-service.service'; // Corrigez l'importation ici

describe('EvaluationService', () => {
  let service: EvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationService); // Utilisez le bon nom ici
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

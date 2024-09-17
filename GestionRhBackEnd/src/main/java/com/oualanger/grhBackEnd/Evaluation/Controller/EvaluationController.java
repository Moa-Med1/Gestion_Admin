package com.oualanger.grhBackEnd.Evaluation.Controller;
import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/evaluations")
    public ResponseEntity<List<EvaluationDto>> getAllEvaluations() {
        List<EvaluationDto> evaluations = evaluationService.getAllEvaluations();
        return ResponseEntity.ok(evaluations);
    }

    @GetMapping("/evaluations/{id}")
    public ResponseEntity<EvaluationDto> getEvaluationById(@PathVariable Long id) {
        EvaluationDto evaluation = evaluationService.getEvaluationById(id);
        return ResponseEntity.ok(evaluation);
    }

    @PostMapping("/evaluations")
    public ResponseEntity<EvaluationDto> createEvaluation(@RequestBody EvaluationDto evaluationDTO) {
        EvaluationDto createdEvaluation = evaluationService.createEvaluation(evaluationDTO);
        return ResponseEntity.ok(createdEvaluation);
    }

    @PutMapping("/evaluations/{id}")
    public ResponseEntity<EvaluationDto> updateEvaluation(@PathVariable Long id, @RequestBody EvaluationDto evaluationDTO) {
        EvaluationDto updatedEvaluation = evaluationService.updateEvaluation(id, evaluationDTO);
        return ResponseEntity.ok(updatedEvaluation);
    }

    @DeleteMapping("/evaluations/{id}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        evaluationService.deleteEvaluation(id);
        return ResponseEntity.noContent().build();
    }

}

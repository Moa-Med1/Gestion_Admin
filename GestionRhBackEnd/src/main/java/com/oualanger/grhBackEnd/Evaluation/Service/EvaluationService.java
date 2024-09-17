package com.oualanger.grhBackEnd.Evaluation.Service;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Mappers.EvaluationMapper;
import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Evaluation.Repository.EvaluationRepository;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import com.oualanger.grhBackEnd.Technicien.Mappers.TechnicienMapper;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import com.oualanger.grhBackEnd.Technicien.service.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private EvaluationMapper evaluationMapper;

    @Autowired
    private TechnicienService technicienService;

    @Autowired
    private TechnicienMapper technicienMapper;

    public EvaluationDto getEvaluationById(Long id) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));
        return evaluationMapper.toDTO(evaluation);
    }

    public EvaluationDto createEvaluation(EvaluationDto evaluationDTO) {
        Evaluation evaluation = evaluationMapper.toModel(evaluationDTO);
        Evaluation savedEvaluation = evaluationRepository.save(evaluation);
        return evaluationMapper.toDTO(savedEvaluation);
    }

    public EvaluationDto updateEvaluation(Long id, EvaluationDto evaluationDTO) {
        if (evaluationRepository.existsById(id)) {
            Evaluation evaluation = evaluationMapper.toModel(evaluationDTO);
            evaluation.setId(id);  // Set the ID to ensure the correct entity is updated
            Evaluation updatedEvaluation = evaluationRepository.save(evaluation);
            return evaluationMapper.toDTO(updatedEvaluation);
        }
        return null;  // Return null if the Evaluation with the given ID does not exist
    }

    public void deleteEvaluation(Long id) {
        evaluationRepository.deleteById(id);
    }

    public List<EvaluationDto> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        return evaluationMapper.toDTOs(evaluations);
    }

}

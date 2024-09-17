package com.oualanger.grhBackEnd.Evaluation.Dto;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EvaluationDto {

    private Long id;
    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;
    private LocalDateTime dateEvaluation;
    private int scoreTotal;
    private String formation;

    public static EvaluationDto mapToEvaluationRequest(Evaluation evaluation) {
        EvaluationDto mappedEvaluationRequest = new EvaluationDto();

        // Mapping des champs
        mappedEvaluationRequest.setId(evaluation.getId());
        mappedEvaluationRequest.setQualite(evaluation.getQualite());
        mappedEvaluationRequest.setDelai(evaluation.getDelai());
        mappedEvaluationRequest.setCooperation(evaluation.getCooperation());
        mappedEvaluationRequest.setCommentaire(evaluation.getCommentaire());
        mappedEvaluationRequest.setDateEvaluation(evaluation.getDateEvaluation());
        mappedEvaluationRequest.setScoreTotal(evaluation.getScoreTotal());
        mappedEvaluationRequest.setFormation(evaluation.getFormation());
        return mappedEvaluationRequest;
    }

}

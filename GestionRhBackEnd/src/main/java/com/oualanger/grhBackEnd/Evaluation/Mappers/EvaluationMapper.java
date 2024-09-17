package com.oualanger.grhBackEnd.Evaluation.Mappers;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EvaluationMapper {

    EvaluationMapper INSTANCE = Mappers.getMapper(EvaluationMapper.class);

    Evaluation toModel(EvaluationDto evaluationDto);

    EvaluationDto toDTO(Evaluation evaluation);

    List<EvaluationDto> toDTOs(List<Evaluation> evaluations);

    List<Evaluation> toModels(List<EvaluationDto> evaluationDtos);
}

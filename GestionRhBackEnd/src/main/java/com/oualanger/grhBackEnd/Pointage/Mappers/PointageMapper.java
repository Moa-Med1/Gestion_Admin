package com.oualanger.grhBackEnd.Pointage.Mappers;

import com.oualanger.grhBackEnd.Pointage.Dto.PointageDto;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PointageMapper {

    // Il n'est pas nécessaire de définir l'instance statique
    // PointageMapper INSTANCE = Mappers.getMapper(PointageMapper.class);

    PointageDto toDTO(Pointage pointage);

    Pointage toModel(PointageDto pointageDTO);

    List<PointageDto> toDTOs(List<Pointage> pointages);

    List<Pointage> toModels(List<PointageDto> pointageDTOs);
}

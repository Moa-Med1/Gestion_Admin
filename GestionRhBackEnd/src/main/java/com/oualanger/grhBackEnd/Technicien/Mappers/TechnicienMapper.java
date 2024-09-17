package com.oualanger.grhBackEnd.Technicien.Mappers;

import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TechnicienMapper {

    TechnicienMapper INSTANCE = Mappers.getMapper(TechnicienMapper.class);

    @Mapping(source = "pointages", target = "pointages")
    @Mapping(source = "evaluations", target = "evaluations")
    Technicien toModel(TechnicienDto technicienDto);

    @Mapping(source = "pointages", target = "pointages")
    @Mapping(source = "evaluations", target = "evaluations")
    TechnicienDto toDTO(Technicien technicien);

    List<TechnicienDto> toDTOs(List<Technicien> techniciens);

    List<Technicien> toModels(List<TechnicienDto> technicienDtoList);
}

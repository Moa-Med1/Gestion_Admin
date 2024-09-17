package com.oualanger.grhBackEnd.Projet.Mappers;

import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.Mappers.TechnicienMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = TechnicienMapper.class)
public interface ProjetMapper {

    ProjetMapper INSTANCE = Mappers.getMapper(ProjetMapper.class);

    @Mapping(source = "techniciens", target = "techniciens")
    Projet toModel(ProjetDto projetDto);

    @Mapping(source = "techniciens", target = "techniciens")
    ProjetDto toDTO(Projet projet);

    List<ProjetDto> toDTOs(List<Projet> projets);

    List<Projet> toModels(List<ProjetDto> projetDtoList);
}

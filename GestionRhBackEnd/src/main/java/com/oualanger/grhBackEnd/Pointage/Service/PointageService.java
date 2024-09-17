package com.oualanger.grhBackEnd.Pointage.Service;

import com.oualanger.grhBackEnd.Pointage.Dto.PointageDto;
import com.oualanger.grhBackEnd.Pointage.Mappers.PointageMapper;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Pointage.Repository.PointageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PointageService {

    @Autowired
    private PointageRepository pointageRepository;

    @Autowired
    private PointageMapper pointageMapper;

    public PointageDto createPointage(PointageDto pointageDTO) {
        Pointage savedPointage = pointageRepository.save(pointageMapper.toModel(pointageDTO));
        return pointageMapper.toDTO(savedPointage);
    }

    public PointageDto getPointageById(Long id) {
        Optional<Pointage> pointageModel = pointageRepository.findById(id);
        return pointageModel.map(pointageMapper::toDTO).orElse(null);
    }

    public PointageDto updatePointage(Long id, PointageDto pointageDTO) {
        if (pointageRepository.existsById(id)) {
            Pointage pointage = pointageMapper.toModel(pointageDTO);
            pointage.setId(id);
            return pointageMapper.toDTO(pointageRepository.save(pointage));
        }
        return null;
    }

    public boolean deletePointage(Long id) {
        if (pointageRepository.existsById(id)) {
            pointageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<PointageDto> getAllPointages() {
        return pointageMapper.toDTOs(pointageRepository.findAll());
    }
}

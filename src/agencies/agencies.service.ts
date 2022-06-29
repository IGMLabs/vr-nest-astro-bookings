import { Injectable } from '@nestjs/common';
import { AgencyDto } from 'src/models/Agency.dto';
import { Agency } from 'src/models/agency.interface';
import { UtilsService } from 'src/core/utils/utils.service';

@Injectable()
export class AgenciesService {
    private readonly agencies: Agency [] = [];
  
    constructor(private utilsService: UtilsService) {}

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    return this.agencies.find((agency) => agency.id === id);
  }

  public insert(agency: AgencyDto): Agency {
    const newAgency = {
      id: this.utilsService.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }

  
}

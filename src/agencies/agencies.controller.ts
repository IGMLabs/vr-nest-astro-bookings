import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AgencyDto } from 'src/models/Agency.dto';
import { Agency } from 'src/models/agency.interface';
import { AgenciesService } from './agencies.service';
import { ApiKeyGuard } from './api-key.guard';

@Controller('agencies')
export class AgenciesController {
    constructor(private readonly agenciesService: AgenciesService) {}

@Get()
  getAll(): Agency[] {
    return this.agenciesService.selectAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.agenciesService.findById(id);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  postAgency(
    @Body()
    agency: AgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }
}

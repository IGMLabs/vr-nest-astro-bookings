import { Injectable } from '@nestjs/common';
import { AgencyDto } from 'src/models/Agency.dto';
import { UtilsService } from 'src/core/utils/utils.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Agency } from 'src/models/agency.entity';

export class AgenciesRepository {
  constructor(@InjectModel(Agency.name) private readonly agencyModel: Model<Agency>) {}
}

@Injectable()
export class AgenciesService {
  
    constructor(private utilsService: UtilsService,
      @InjectModel(Agency.name) private readonly agencyModel: Model<Agency>,) {}

    async findAll(): Promise<Agency[]> {
      console.log((await this.agencyModel.find()).toString());
      return await this.agencyModel.find();
    }
  
    async findById(id: string): Promise<Agency> {
      const agency = await this.agencyModel.findOne({id:id});
      console.log(agency);
      return agency;
    }
  
    async create(createAgency: AgencyDto): Promise<Agency> {
      const agency = await this.agencyModel.create({
        ...createAgency,
        // _id: this.utilsService.createGUID(),
      });
      await agency.save();
      return agency;
    }
  
    // async update(agency: UpdateAgencyDto) {
    //   const agency2 = await this.agencyModel.findByIdAndUpdate(agency._id, agency, { new: true });
    //   if (!agency2) throw new Error("Agency not found");
    //   console.log(agency2);
    //   return agency2;
    // }
  
    async remove(id: string) {
      return await this.agencyModel.findByIdAndRemove(id);
    }

  
}

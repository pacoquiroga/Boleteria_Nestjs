import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventEntityService } from './eventEntity.service';
import { CreateEventEntityDto } from './dto/create-eventEntity.dto';
import { UpdateEventEntityDto } from './dto/update-eventEntity.dto';
import { EventState } from './enums/event-state.enum';
import { EventEntity } from './entities/eventEntity.entity';
import { PaginationRequest } from 'src/utils/dto/pagination.dto';

@Controller('event-entity')
export class EventEntityController {
  constructor(private readonly eventEntityService: EventEntityService) {}

  @Post()
  create(@Body() createEventEntityDto: CreateEventEntityDto) {
    return this.eventEntityService.create(createEventEntityDto);
  }

  @Get()
  findAll() {
    return this.eventEntityService.findAll();
  }

  @Post('paginated')
  getPaginated(@Body() pagination: PaginationRequest<EventEntity>) {
    return this.eventEntityService.getPaginated(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventEntityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventEntityDto: UpdateEventEntityDto,
  ) {
    return this.eventEntityService.update(+id, updateEventEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventEntityService.remove(+id);
  }

  @Get('user/:idUser')
  findByUser(@Param('idUser') idUser: string) {
    return this.eventEntityService.findByUser(+idUser);
  }

  @Get('state/:state')
  findByState(@Param('state') state: EventState) {
    return this.eventEntityService.findByState(state);
  }
}

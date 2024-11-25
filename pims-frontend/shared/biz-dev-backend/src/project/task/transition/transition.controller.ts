import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransitionService } from './transition.service';
import { CreateTransitionDto } from './dto/create-transition.dto';
import { UpdateTransitionDto } from './dto/update-transition.dto';

@Controller('/api/v1/project/:projectId/task/:taskId/transition')
export class TransitionController {
  constructor(private readonly transitionService: TransitionService) {}

  @Post()
  create(@Body() createTransitionDto: CreateTransitionDto) {
    return this.transitionService.create(createTransitionDto);
  }

  @Get()
  findAll() {
    return this.transitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transitionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransitionDto: UpdateTransitionDto,
  ) {
    return this.transitionService.update(+id, updateTransitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transitionService.remove(+id);
  }
}

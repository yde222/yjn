import { Injectable } from '@nestjs/common';
import { CreateTransitionDto } from './dto/create-transition.dto';
import { UpdateTransitionDto } from './dto/update-transition.dto';

@Injectable()
export class TransitionService {
  create(createTransitionDto: CreateTransitionDto) {
    return 'This action adds a new transition';
  }

  findAll() {
    return `This action returns all transition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transition`;
  }

  update(id: number, updateTransitionDto: UpdateTransitionDto) {
    return `This action updates a #${id} transition`;
  }

  remove(id: number) {
    return `This action removes a #${id} transition`;
  }
}

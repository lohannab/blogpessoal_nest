import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { Comentario } from '../entities/comentario.entity'
import { ComentarioService } from '../services/comentario.service'
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('/comentarios')
export class ComentarioController {

    constructor(private readonly comentarioService: ComentarioService) {}

    @Get()
    findAll(): Promise<Comentario[]> {
        return this.comentarioService.findAll()
    }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
        return this.comentarioService.findById(id)
    }

    @Post()
    create(@Body() comentario: Comentario): Promise<Comentario> {
        return this.comentarioService.create(comentario)
    }

    @Put()
    update(@Body() comentario: Comentario): Promise<Comentario> {
        return this.comentarioService.update(comentario)
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.comentarioService.delete(id)
    }
}
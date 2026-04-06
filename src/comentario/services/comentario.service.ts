import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comentario } from '../entities/comentario.entity'
import { Postagem } from '../../postagem/entities/postagem.entity'

@Injectable()
export class ComentarioService {

    constructor(
        @InjectRepository(Comentario)
        private comentarioRepository: Repository<Comentario>,

        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Comentario[]> {
        return await this.comentarioRepository.find({
            relations: {
                postagem: true
            }
        })
    }

    async findById(id: number): Promise<Comentario> {
        const comentario = await this.comentarioRepository.findOne({
            where: { id },
            relations: {
                postagem: true
            }
        })

        if (!comentario)
            throw new HttpException('Comentário não encontrado!', HttpStatus.NOT_FOUND)

        return comentario
    }

    async create(comentario: Comentario): Promise<Comentario> {

        if (!comentario.postagem || !comentario.postagem.id)
            throw new HttpException('Postagem é obrigatória!', HttpStatus.BAD_REQUEST)

        const buscaPostagem = await this.postagemRepository.findOne({
            where: { id: comentario.postagem.id }
        })

        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return await this.comentarioRepository.save(comentario)
    }

    async update(comentario: Comentario): Promise<Comentario> {

        await this.findById(comentario.id)

        if (!comentario.postagem || !comentario.postagem.id)
            throw new HttpException('Postagem é obrigatória!', HttpStatus.BAD_REQUEST)

        const buscaPostagem = await this.postagemRepository.findOne({
            where: { id: comentario.postagem.id }
        })

        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return await this.comentarioRepository.save(comentario)
    }

    async delete(id: number) {

        const comentario = await this.findById(id)

        await this.comentarioRepository.delete(comentario.id)
    }
}
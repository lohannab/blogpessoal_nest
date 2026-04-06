import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comentario } from './entities/comentario.entity'
import { Postagem } from '../postagem/entities/postagem.entity'
import { ComentarioController } from './controller/comentario.controller'
import { ComentarioService } from './services/comentario.service'

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, Postagem])],
  providers: [ComentarioService],
  controllers: [ComentarioController],
})
export class ComentarioModule {}
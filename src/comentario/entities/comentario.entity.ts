import { IsNotEmpty } from "class-validator"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"

@Entity({ name: "tb_comentarios" })
export class Comentario {

    @PrimaryGeneratedColumn()
    id!: number

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    texto!: string

    @CreateDateColumn()
    data!: Date

    @ManyToOne(() => Postagem, (postagem) => postagem.comentarios, {
        onDelete: "CASCADE"
    })
    postagem!: Postagem

}
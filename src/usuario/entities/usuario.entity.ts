import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id!: number

    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false}) 
    nome!: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false })
    usuario!: string

    @MinLength(8)
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false }) 
    senha!: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    foto!: string

    @ApiProperty() 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]

}
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {  // descrição do teste e2e
  let token: string;
  let usuarioid: any;
  let app: INestApplication; // declara a variável app do tipo INestApplication

  beforeAll(async () => {  // configurações iniciais do teste que serão executadas antes de todos os testes uma vez so no inicio.
    const moduleFixture: TestingModule = await Test.createTestingModule({ // cria o modulo de teste nest e configura as dependências do modulo
      imports: [
        TypeOrmModule.forRoot({ // configuração do typeorm com o banco em memoria
          type: "sqlite",  // tipo de banco
          database: ":memory:", // banco em memoria, sera apagado ao final do teste
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], // caminho dos arquivos de entidades
          synchronize: true, // sincroniza as entidades com o banco
          dropSchema: true // apaga o banco ao final do teste
        }),
        AppModule], // importa o modulo principal para que as dependências sejam resolvidas
    }).compile(); // compila o modulo

    app = moduleFixture.createNestApplication();  // cria a aplicação nest
    app.useGlobalPipes(new ValidationPipe()); // configuração de validação de dados de entrada
    await app.init(); // inicializa a aplicação nest e configuração da porta do servidor que é a porta 4000
  });

  // testes

  it("01 - Deve criar um usuário", async () => {  //testa se o usuário pode ser criado com sucesso
    const resposta = await request(app.getHttpServer()) // faz a requisição para o servidor nest
      .post('/usuarios/cadastrar') // rota de cadastro de usuário
      .send({
        nome: "Capivara", // nome do usuário
        usuario: "capivarinha@email.com", // nome de usuário
        senha: "12345678", // senha do usuário
        foto: "https://i.imgur.com/FETvs20.jpg" // foto do usuário
      });
    expect(201); // espera que a resposta seja 201 (created)
    usuarioid = resposta.body.id; // armazena o id do usuário criado para ser usado nos próximos testes
  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => { // testa se o sistema impede o cadastro de um usuário com email já existente
    await request(app.getHttpServer()).post('/usuarios/cadastrar') // faz a requisição para o servidor nest
    .send({ // dados do usuário a ser cadastrado, com email já existente
      nome: 'Root', // nome do usuário
      usuario: 'capivarinha@email.com', // email do usuário, já existente
      senha: '12345678', // senha do usuário
      foto: '-', //  foto do usuário
    }) 
    .expect(400) }); // espera que a resposta seja 400 (bad request) devido ao email já existente

  it("03 - Deve Autenticar o Usuário (Login)", async () => { // testa se o usuário pode ser autenticado com sucesso e receber um token de autenticação  
    const resposta = await request(app.getHttpServer()) // faz a requisição para o servidor nest    
    .post("/usuarios/logar") // rota de login de usuário
    .send({ //  dados do usuário para login
      usuario: 'capivarinha@email.com', // email do usuário
      senha: '12345678', // senha do usuário
    }) 
    .expect(200); // espera que a resposta seja 200 (ok) devido ao login bem sucedido
    token = resposta.body.token; // espera que a resposta seja 200 (ok) e armazena o token de autenticação para ser usado nos próximos testes 
  }); 

  it("04 - Deve Listar todos os Usuários", async () => { // testa se é possível listar todos os usuários cadastrados
    return await request(app.getHttpServer()) // faz a requisição para o servidor nest
    .get("/usuarios/all") // rota para listar todos os usuários
    .set("Authorization",`${token}`) // configura o token de autenticação no header da requisição
    .expect(200) // espera que a resposta seja 200 (ok)
  });

  it("05 - Deve Atualizar um Usuário", async () => { // testa se é possível atualizar os dados de um usuário cadastrado
    return await request(app.getHttpServer()) // faz a requisição para o servidor nest
    .put("/usuarios/atualizar") // rota para atualizar um usuário
    .set("Authorization", `${token}`) // configura o token de autenticação no header da requisição
    .send({ // dados do usuário a ser atualizado
      id: usuarioid, // id do usuário a ser atualizado
      nome: "Capivara Atualizada", // novo nome do usuário
      usuario: "capivara_atualizada@email.com", // novo email do usuário
      senha: "senhasenha", // nova senha do usuário
      foto: "https://i.imgur.com/FETvs20.jpg" // nova foto do usuário
    })
    .expect(200) // espera que a resposta seja 200 (ok)
    .then((resposta) => { // verifica se os dados do usuário foram atualizados corretamente
      expect("Capivara Atualizada").toEqual(resposta.body.nome); // verifica se o nome do usuário foi atualizado corretamente
    });

  });

  afterAll(async () => { // configurações finais do teste que são executadas depois de todos os testes uma vez so no final
    await app.close(); // fecha a aplicação nest
  });

});

function then(arg0: (resposta: any) => void) {
  throw new Error('Function not implemented.');
}

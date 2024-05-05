import {Test, TestingModule} from '@nestjs/testing';
import {ContentService} from './content.service';
import {FirebaseModule} from "../firebase/firebase.module";

describe('ContentService', () => {
    let service: ContentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [ContentService],
        }).compile();

        service = module.get<ContentService>(ContentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should save content', async () => {
        const id = await service.save({
            username: "Felipe",
            prompt: "Explique esse trecho usando storytelling de uma forma que um adolescente de 15 anos consiga entender, inclua todas as informações e detalhes do trecho, mas não seja longo, use a quantidade necessária para transmitir todas as informações, não omita termos importantes para a matéria do trecho: Conteúdo extraída da imagem acima.  A imagem mostra um diagrama colorido com anotações manuscritas principalmente em azul, vermelho e preto, com alguns destaques em amarelo, relacionadas à física, mais especificamente sobre as leis de Newton e tipos de forças. Vou descrever os elementos textuais e visuais um por um:          No canto superior esquerdo, em azul e destacado com uma nuvem amarela, está escrito:     - \"Princípio Fundamental da Dinâmica\"     - \"F_r = força resultante (N)\"     - \"a = aceleração [m/s²]\"     - \"m = massa (kg)\"          Logo abaixo, numa faixa vermelha e em letras brancas:     - \"2ª Lei de Newton\"     E abaixo, um diagrama de um objeto vermelho com rodas (semelhante a um carro) e as equações:     - \"Fr = m . a\" (dentro de um círculo)     - \"s = so + v . t + (a . t²)/2\" (ao redor do diagrama)     - \"a = Δv / Δt\" (enquanto o diagrama mostra o carro sendo acelerado por um peso através de um sistema de polias)          Acima deste carro, há uma seta apontando para ele com a anotação \"900g = 900N\" e uma seta apontando para a direita com \"1T\".          No canto superior direito, está escrito:     - \"Tipos de forças\"     E uma lista com sete tipos:     - \"Contato: Fricção, Normal, Elástica.\"     - \"*Distância: Peso, Elétrica, Magnética.\"     - \"Gravitacional.\"          Abaixo, há um diagrama mostrando a \"Peso = força de atração gravitacional\" com a equação \"P = m . g\", e \"g = 9,8m/s²\" abaixo de uma seta que aponta para baixo, simbolizando a gravidade.          No meio à direita, existe uma caixa de texto com uma seta apontando para ela escrito \"Ação e Reação (3ª Lei de Newton)\", e um par de diagramas mostrando forças de ação e reação. Um dos diagramas mostra duas mãos sendo pressionadas uma contra a outra e as forças N (Normal) e '-N' (reação), e outro mostra uma mão segurando uma corda que passa por uma polia com as forças T (tração) e '-T' (reação).          No canto inferior direito, há a descrição e a equação da \"1ª Lei de Newton\":     - \"Inércia\"     - \"F_r = 0\"     - \"V = constante ou 0\"          Próximo ao centro na parte inferior, há um desenho de um livro vermelho com um peso azul de 10kg em cima dele e uma seta para baixo indicando \"100N\" e a palavra \"Normal\" escrita várias vezes, isso representa a força exercida pela mesa sobre o livro como uma reação ao peso do mesmo.          Abaixo da descrição da \"1ª Lei de Newton\", há um desenho que parece ser um punho segurando uma corda que está conectada a uma bola vermelha em uma superfície, indicando uma tração.          E, finalmente, no canto inferior esquerdo, está o logotipo do site \"Brasil Escola\".          A imagem possui um estilo descompromissado e didático, parecendo ser um esquema de estudos onde o conceito de força e as leis da dinâmica de Newton são explicados de forma visual e simplificada para facilitar o aprendizado.",
            text: "Vou te contar uma história sobre um princípio importante chamado \"Princípio Fundamental da Dinâmica\". Imagina que você está em um carro com seus amigos, e de repente o carro freia bruscamente. O que acontece? Todos vocês são empurrados para frente, certo? Isso é a força resultante em ação!   A força resultante, representada por Fr, é como uma coberta que cobre todos os corpos e é igual ao peso deles multiplicado pela aceleração que estão experimentando. Em outras palavras, se um objeto tem mais massa, ou está acelerando mais rápido, a força que o move será maior.  Existem diferentes tipos de forças: as de contato, como a tração quando puxamos algo, e as à distância, como o peso, a força elétrica e a magnética. Por exemplo, quando você segura uma corda, você está aplicando uma força de tração nela.   A segunda lei de Newton, que diz que a força resultante aplicada a um objeto é igual à sua massa multiplicada pela sua aceleração, é como uma fórmula mágica que nos ajuda a entender como os objetos se movem. Essa lei é expressa pela equação: F = m * a.  Por fim, a aceleração é a mudança na velocidade de um objeto ao longo do tempo. Então, se você estava parado e começou a se mover, você está acelerando!"
        });

        expect(id).not.toBeNull();
        expect(id.trim().length).not.toBe(0);
    });
});

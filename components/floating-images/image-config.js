// Configuração centralizada de imagens flutuantes
// Cada imagem é mapeada para um elemento específico da página pelo seu ID
// 
// Formato:
// - image: nome do arquivo da imagem (deve estar em /public/imgs/)
// - targetElementId: ID do elemento HTML ao qual a imagem deve ser anexada
// - side: 'left' ou 'right' - lado onde a imagem deve aparecer
// - offset: offset vertical em pixels (opcional, padrão: 0)
// - rotation: rotação em graus (opcional, padrão: aleatório entre -6 e 6)
// - scale: escala da imagem (opcional, padrão: entre 0.85 e 1.0)
// - styles: objeto com propriedades CSS customizadas (opcional)
//   Exemplo: { marginBottom: '20px', marginTop: '10px', opacity: 0.9 }

export const IMAGE_CONFIG = [
  {
    image: '027afed9-0a74-4c07-8db2-34917a62a387.jpg',
    targetElementId: 'bloco-citacao-biblica',
    side: 'right',
    // Exemplo de uso de styles:
    // styles: {
    //   marginBottom: '20px',
    //   marginTop: '10px',
    //   opacity: 0.9,
    // }
  },
  {
    image: '1aa83356-4542-4929-b189-ab66572f6011.jpg',
    targetElementId: 'bloco-opcoes-de-contato',
    side: 'right',
  },
  {
    image: '2a2de5cf-24e3-4165-a0e2-9e63572996c2.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: '3b3ca2ca-b680-4856-a0d2-8f2f10e2c3d7.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: '5055b038-4fca-4824-a51d-88081993e017.jpg',
    targetElementId: 'process',
    side: 'right',
  },
  {
    image: '542d28ce-4bd0-4913-b04a-28d7c0f32782.jpg',
    targetElementId: 'bloco-presentes',
    side: 'right',
  },
  {
    image: '556fbacf-726b-4e8d-9ffb-174cd21fac86.jpg',
    targetElementId: 'bloco-informacoes-do-casamento',
    side: 'right',
  },
  {
    image: '73ce7106-97c2-49ba-9796-08739e9be6eb.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: '77e45fde-d5bf-43f4-b8e1-561fc06306c0.jpg',
    targetElementId: 'bloco-footer-top',
    side: 'right',
    styles: {
      // marginBottom: '600px',
      // marginTop: '10px',
      // padding: '10px',
      // Qualquer propriedade CSS em camelCase
    }
  },
  {
    image: 'logounidos.png',
    targetElementId: 'bloco-local-da-cerimonia',
    side: 'right',
    styles: {
      marginBottom: '600px',
      marginTop: '10px',
      padding: '10px',
      marginLeft: '500px'
      // Qualquer propriedade CSS em camelCase
    }
  },
  {
    image: '80597c3b-7387-40eb-9cd1-ff35c21d4705.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: '8c3a21ad-a1d5-4d78-b462-d6b9bab5e544.jpg',
    targetElementId: 'process',
    side: 'right',
  },
  {
    image: '90f2535d-20f6-41ae-a59c-7b0fbebaadc0.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: '9ac9a0d6-ed73-4472-a356-361ff8866a06.jpg',
    targetElementId: 'bloco-dia-da-cerimonia',
    side: 'right',
  },
  {
    image: '9ecad912-f8ba-4839-a7f1-7f502bcdb904.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'a8586da8-3cd3-49b7-a727-797153cdaeab.jpg',
    targetElementId: 'bloco-opcoes-de-contato',
    side: 'right',
  },
  {
    image: 'aa3ee7f1-54ad-43ce-82f5-38386f5abfd9.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'ace06994-0670-4f5a-a307-593545e59ca1.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'bd24b4cf-bfc9-4827-b198-08de597a1317.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'c8971158-7592-4afa-b194-5b08d5ca2a37.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'cdec994e-2db2-4a26-a299-8df8fac8aca0.jpg',
    targetElementId: 'bloco-hospedagem',
    side: 'right',
  },
  {
    image: 'daf798e9-1183-496f-9401-37d4f946289e.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'e48aec88-dbb6-43ae-a0b8-e6ea5c44230b.jpg',
    targetElementId: 'bloco-opcoes-de-contato',
    side: 'left',
  },
  {
    image: 'e601ed95-4948-406c-9b18-f0c3400a35a6.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
  {
    image: 'f4ad56f3-30f1-48a3-a69a-cf228d855a0d.jpg',
    targetElementId: 'hero',
    side: 'right',
  },
]

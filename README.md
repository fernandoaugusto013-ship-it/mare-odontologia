# Maré Odontologia — landing page (protótipo OdontoFlow)

Site estático de demonstração para validação com a cliente. HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

- `index.html`: página única
- `styles.css`: estilos (paleta azul-petróleo/verde-água, fonte Inter)
- `app.js`: interações (tela de abertura, vídeo controlado pelo mouse, antes e depois, agendamento de demonstração, perguntas frequentes, aviso de cookies)
- `assets/`: vídeo do banner, capa do vídeo e fotos do antes e depois

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta:

```
python3 -m http.server 8000
```

## Publicação

Hospedado no GitHub Pages a partir da branch `main`, pasta raiz.

## Antes de ir ao ar (pendências)

- **CRO da Dra. Hemanuelly Brito:** está como `CRO-PE [nº]` na equipe e no rodapé.
- **Antes e depois:** usa uma foto de demonstração (Yvul, Wikimedia Commons, CC BY-SA 4.0). Trocar por um caso real da clínica, com autorização por escrito do paciente (normas do CFO).
- **Dados fictícios:** endereço, telefones, CNPJ, demais dentistas e avaliações são exemplos.
- **Agendamento e WhatsApp:** são de demonstração. Na versão final, o agendamento grava na agenda do OdontoFlow e o botão do WhatsApp aponta para o número real.
- **Indexação:** a página tem `noindex` para não aparecer no Google durante a validação. Remover essa tag ao publicar de verdade.

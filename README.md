# Maré Odontologia — landing page (protótipo OdontoFlow)

Site estático de demonstração para validação com a cliente. HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

- `index.html`: página única
- `styles.css`: estilos (paleta azul-petróleo/verde-água, fonte Inter)
- `app.js`: interações (tela de abertura, vídeo controlado pelo mouse, antes e depois, agendamento de demonstração, perguntas frequentes, aviso de cookies)
- `assets/`: vídeo do banner, capa do vídeo e fotos do antes e depois

## Áreas do sistema (protótipo)

- `paciente/`: Área do Paciente. Entrada por CPF + código no WhatsApp, próxima consulta com confirmação, remarcação, plano de tratamento com aprovação e assinatura, Pix, documentos, ficha de saúde e assistente com IA.
- `admin/`: Área do Admin (OdontoFlow). Painel com alertas da IA, agenda por dentista com risco de falta, pacientes com odontograma por face e evolução com ditado, funil de orçamentos, financeiro, WhatsApp com assistente e configurações (permissões, auditoria, LGPD). Troque o perfil (Gestor, Dentista, Recepção) no topo para ver as permissões.

Os dados são fictícios e ficam só no navegador (localStorage). Nada é enviado.

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

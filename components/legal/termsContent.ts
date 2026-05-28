import type { LegalContent } from "./privacyContent";

const CONTACT_EMAIL = "patrickigor.ip@gmail.com";
const DATE_EN = "May 27, 2026";
const DATE_PT = "27 de maio de 2026";

const en: LegalContent = {
  backHome: "← Back to Home",
  label: "Legal",
  title: "Terms of Service",
  lastUpdated: `Last updated: ${DATE_EN}`,
  disclaimer: "",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      blocks: [
        {
          type: "p",
          text: `By accessing or using RetroDash ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.`,
        },
        {
          type: "p",
          text: "These Terms apply to all users of the Service, including room facilitators and participants. By signing in with Google, you confirm that you have read, understood, and agree to these Terms, our Privacy Policy, and our Cookie and Local Storage Policy.",
        },
      ],
    },
    {
      id: "description",
      title: "2. Description of Service",
      blocks: [
        {
          type: "p",
          text: "RetroDash (retrodash.com.br) is a real-time retrospective platform for Scrum and Kanban teams. It allows authenticated users to:",
        },
        {
          type: "ul",
          items: [
            "Create and manage password-protected or public retrospective rooms.",
            "Add, edit, and delete retrospective cards within those rooms.",
            "Vote on cards created by other participants.",
            "Assign and track action items.",
            "View a summary of completed retrospective sessions.",
          ],
        },
        {
          type: "p-link",
          before: "The Service also includes an optional AI-powered text improvement feature powered by Google Gemini. When you use this feature, the text of the relevant card is sent to the Gemini API. See our Privacy Policy's ",
          linkText: "AI Text Improvement section",
          href: "/privacy#ai-text-improvement",
          after: " for full details.",
        },
        {
          type: "p",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with or without notice.",
        },
      ],
    },
    {
      id: "eligibility",
      title: "3. Account Registration and Eligibility",
      blocks: [
        {
          type: "p",
          text: "To use RetroDash, you must sign in with a Google account. By using the Service, you represent that:",
        },
        {
          type: "ul",
          items: [
            "You are at least 13 years of age (or at least 16 in the European Union, in accordance with applicable local law).",
            "You have the legal capacity to enter into a binding agreement.",
            "You will use the Service in compliance with these Terms and all applicable laws.",
            "Your Google account information is accurate and up to date.",
          ],
        },
        {
          type: "p",
          text: "RetroDash is designed for professional team contexts. The platform is not directed at minors. There is no technical age-verification mechanism — the representation above is made by you when signing in with Google. If the platform becomes aware that a user below the applicable minimum age has created an account, the account and all associated data will be deleted promptly.",
        },
        {
          type: "p",
          text: "You are responsible for maintaining the security of your Google account and for all activity that occurs through it on RetroDash.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use",
      blocks: [
        {
          type: "p",
          text: "You agree to use RetroDash only for lawful purposes and in a way that does not infringe the rights of others. You must not:",
        },
        {
          type: "ul",
          items: [
            "Post or transmit content that is illegal, harmful, threatening, abusive, harassing, defamatory, or discriminatory.",
            "Impersonate any person or entity or misrepresent your affiliation.",
            "Attempt to gain unauthorized access to other users' rooms or accounts.",
            "Reverse-engineer, decompile, or disassemble any part of the Service.",
            "Use automated tools (bots, scrapers, crawlers) to access the Service without prior written permission.",
            "Transmit malware, viruses, or any code designed to disrupt or damage the Service.",
            "Use the Service in a way that places an unreasonable or disproportionate load on our infrastructure.",
            "Circumvent any security feature, including room passwords or Firestore security rules.",
          ],
        },
        {
          type: "p",
          text: "We reserve the right to remove content and suspend or terminate accounts that violate these rules, without prior notice.",
        },
      ],
    },
    {
      id: "user-content",
      title: "5. User-Generated Content",
      blocks: [
        {
          type: "p",
          text: "You retain ownership of the content you create on RetroDash (room names, card text, column titles, and action items). By submitting content to the Service, you grant RetroDash a limited, non-exclusive, royalty-free license to store, display, and transmit that content solely to operate the Service.",
        },
        {
          type: "p",
          text: "You are solely responsible for the content you submit. You represent that you have all necessary rights to post that content and that it does not violate any third-party rights or applicable law.",
        },
        {
          type: "p",
          text: "Note on anonymous mode: enabling anonymous mode in a room hides your identity in the user interface, but your user ID is stored internally in our database for moderation purposes and voting-rule enforcement. Anonymous mode does not constitute a guarantee of complete anonymity.",
        },
      ],
    },
    {
      id: "ai-feature",
      title: "6. AI Text Improvement (Google Gemini)",
      blocks: [
        {
          type: "p",
          text: `The Service includes an optional "Improve Text" button on retrospective cards. By clicking this button, you acknowledge that the text content of that card will be sent to the Google Gemini API for processing. This action is entirely voluntary — you are not required to use this feature, and the rest of the platform functions normally without it.`,
        },
        {
          type: "p",
          text: "No personal identifiers (name, email, user ID) are included in requests to the Gemini API. You remain solely responsible for the final content saved to any card, regardless of whether you accepted a Gemini suggestion. RetroDash makes no warranty regarding the accuracy, quality, or appropriateness of any AI-generated suggestion.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property",
      blocks: [
        {
          type: "p",
          text: "The RetroDash name, logo, design, and all platform code, features, and interfaces are the exclusive property of Igor Patrick Ponticelli and are protected by applicable intellectual property laws. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the Service without express written permission.",
        },
        {
          type: "p",
          text: "Nothing in these Terms grants you a license to use the RetroDash brand, trademarks, or proprietary technology beyond what is strictly necessary to use the Service as intended.",
        },
      ],
    },
    {
      id: "privacy",
      title: "8. Privacy",
      blocks: [
        {
          type: "p",
          text: "Your use of the Service is also governed by our Privacy Policy and our Cookie and Local Storage Policy, both incorporated into these Terms by reference. Please review them to understand our data collection, use, and retention practices.",
        },
      ],
    },
    {
      id: "third-party",
      title: "9. Third-Party Services",
      blocks: [
        {
          type: "p",
          text: "RetroDash relies on third-party services to operate, including:",
        },
        {
          type: "ul",
          items: [
            "Google Sign-In (Firebase Authentication): your use of Google Sign-In is subject to Google's Terms of Service and Privacy Policy.",
            "Firebase Firestore (Google LLC): data is stored and processed on Firebase infrastructure, subject to Google's terms.",
            "Vercel Inc.: the application is hosted on Vercel, subject to Vercel's terms of service.",
            "Google Gemini API (Google LLC): used for the optional AI text improvement feature, subject to Google's API terms.",
          ],
        },
        {
          type: "p",
          text: "We are not responsible for the availability, content, or practices of any third-party services. Your use of those services is at your own risk and subject to their respective terms.",
        },
      ],
    },
    {
      id: "disclaimers",
      title: "10. Disclaimer of Warranties",
      blocks: [
        {
          type: "p",
          text: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.`,
        },
        {
          type: "p",
          text: "We do not warrant that the Service will be uninterrupted, error-free, or secure; that defects will be corrected; or that the Service is free of viruses or other harmful components. You use the Service at your own risk.",
        },
        {
          type: "p",
          text: "We are not responsible for any loss of data, including retrospective cards, action items, or room data, caused by technical failures, user error, or any other reason.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "11. Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RETRODASH AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.",
        },
        {
          type: "p",
          text: "IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO USE THE SERVICE IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) USD $10.",
        },
        {
          type: "p",
          text: "Nothing in this clause limits or excludes liability that cannot be excluded under applicable consumer protection law, including the Brazilian Consumer Protection Code (Lei 8.078/90) or LGPD, or equivalent consumer rights legislation in your jurisdiction.",
        },
      ],
    },
    {
      id: "termination",
      title: "12. Termination",
      blocks: [
        {
          type: "p",
          text: "We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice, if we believe you have violated these Terms or applicable law.",
        },
        {
          type: "p",
          text: `You may stop using the Service at any time. You may request deletion of your account and all associated data by contacting us at ${CONTACT_EMAIL}. We commit to processing deletion requests within 15 business days of verified receipt, with email confirmation upon completion.`,
        },
        {
          type: "p",
          text: "Upon termination, your right to use the Service ceases immediately. Provisions of these Terms that by their nature should survive termination (including intellectual property rights, disclaimers, and limitations of liability) will continue to apply.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "13. Governing Law and Dispute Resolution",
      blocks: [
        {
          type: "p",
          text: "These Terms are governed by the laws of Brazil. All parties agree to first attempt good-faith negotiation before initiating any formal dispute process.",
        },
        {
          type: "h3",
          text: "Users resident or domiciled in Brazil",
        },
        {
          type: "p",
          text: "Any disputes arising from these Terms or your use of the Service that are not resolved through negotiation shall be submitted to the exclusive jurisdiction of the courts of the Comarca de Blumenau, Santa Catarina, Brazil. Where any clause in these Terms conflicts with the Brazilian Consumer Protection Code (Lei 8.078/90) or the LGPD (Lei 13.709/2018), those laws shall prevail in favor of the consumer or data subject.",
        },
        {
          type: "h3",
          text: "Users outside Brazil",
        },
        {
          type: "p",
          text: "Any disputes arising from these Terms or your use of the Service that are not resolved through negotiation shall be finally settled by arbitration administered by the International Chamber of Commerce (ICC) under its Rules of Arbitration. The seat of arbitration shall be Paris, France. The language of proceedings shall be English. The governing law shall be Brazilian law. Each party shall bear its own costs unless the arbitrator awards otherwise.",
        },
        {
          type: "p",
          text: "Notwithstanding the above, nothing in this clause limits mandatory consumer protection rights available to you under the laws of your country of residence.",
        },
      ],
    },
    {
      id: "changes",
      title: "14. Changes to These Terms",
      blocks: [
        {
          type: "p",
          text: "We may update these Terms from time to time. When we make material changes, we will:",
        },
        {
          type: "ul",
          items: [
            "Update the \"Last updated\" date at the top of this page.",
            "Post a notice within the RetroDash application.",
            "Where required by law, notify you by email at least 30 days before changes take effect.",
          ],
        },
        {
          type: "p",
          text: "Your continued use of the Service after the effective date of updated Terms constitutes your acceptance of the changes.",
        },
      ],
    },
    {
      id: "contact",
      title: "15. Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions about these Terms, please contact us:",
        },
        {
          type: "ul",
          items: [
            `Email: ${CONTACT_EMAIL}`,
            "We aim to respond to all legal inquiries within 15 business days.",
          ],
        },
      ],
    },
  ],
};

const pt: LegalContent = {
  backHome: "← Voltar ao Início",
  label: "Jurídico",
  title: "Termos de Serviço",
  lastUpdated: `Última atualização: ${DATE_PT}`,
  disclaimer: "",
  sections: [
    {
      id: "aceitacao",
      title: "1. Aceitação dos Termos",
      blocks: [
        {
          type: "p",
          text: `Ao acessar ou usar o RetroDash ("o Serviço"), você concorda em cumprir estes Termos de Serviço ("Termos"). Se você não concordar com estes Termos, não poderá usar o Serviço.`,
        },
        {
          type: "p",
          text: "Estes Termos se aplicam a todos os usuários do Serviço, incluindo facilitadores e participantes de salas. Ao fazer login com o Google, você confirma que leu, compreendeu e concorda com estes Termos, com nossa Política de Privacidade e com nossa Política de Cookies e Armazenamento Local.",
        },
      ],
    },
    {
      id: "descricao",
      title: "2. Descrição do Serviço",
      blocks: [
        {
          type: "p",
          text: "O RetroDash (retrodash.com.br) é uma plataforma de retrospectiva em tempo real para equipes Scrum e Kanban. Ele permite que usuários autenticados:",
        },
        {
          type: "ul",
          items: [
            "Criem e gerenciem salas de retrospectiva protegidas por senha ou públicas.",
            "Adicionem, editem e excluam cards de retrospectiva nessas salas.",
            "Votem em cards criados por outros participantes.",
            "Atribuam e acompanhem itens de ação.",
            "Visualizem um resumo das sessões de retrospectiva concluídas.",
          ],
        },
        {
          type: "p-link",
          before: "O Serviço também inclui um recurso opcional de melhoria de texto com IA, baseado no Google Gemini. Ao usar esse recurso, o texto do card relevante é enviado à API Gemini. Consulte a seção ",
          linkText: "Melhoria de Texto com IA",
          href: "/privacy#ai-text-improvement",
          after: " da nossa Política de Privacidade para detalhes completos.",
        },
        {
          type: "p",
          text: "Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do Serviço a qualquer momento, com ou sem aviso prévio.",
        },
      ],
    },
    {
      id: "elegibilidade",
      title: "3. Registro de Conta e Elegibilidade",
      blocks: [
        {
          type: "p",
          text: "Para usar o RetroDash, você deve fazer login com uma conta Google. Ao usar o Serviço, você declara que:",
        },
        {
          type: "ul",
          items: [
            "Você tem pelo menos 13 anos de idade (ou pelo menos 16 anos na União Europeia, conforme a legislação local aplicável).",
            "Você tem capacidade legal para celebrar um contrato vinculante.",
            "Você usará o Serviço em conformidade com estes Termos e toda a legislação aplicável.",
            "As informações da sua conta Google são precisas e estão atualizadas.",
          ],
        },
        {
          type: "p",
          text: "O RetroDash é projetado para contextos profissionais de equipe. A plataforma não é direcionada a menores. Não há mecanismo técnico de verificação de idade — a declaração acima é feita por você ao fazer login com o Google. Se a plataforma tomar conhecimento de que um usuário abaixo da idade mínima aplicável criou uma conta, essa conta e todos os dados associados serão excluídos imediatamente.",
        },
        {
          type: "p",
          text: "Você é responsável por manter a segurança da sua conta Google e por toda a atividade que ocorre por meio dela no RetroDash.",
        },
      ],
    },
    {
      id: "uso-aceitavel",
      title: "4. Uso Aceitável",
      blocks: [
        {
          type: "p",
          text: "Você concorda em usar o RetroDash apenas para fins lícitos e de forma que não infrinja os direitos de outros. Você não deve:",
        },
        {
          type: "ul",
          items: [
            "Publicar ou transmitir conteúdo ilegal, prejudicial, ameaçador, abusivo, assediador, difamatório ou discriminatório.",
            "Fingir ser outra pessoa ou entidade, ou deturpar sua afiliação.",
            "Tentar obter acesso não autorizado às salas ou contas de outros usuários.",
            "Fazer engenharia reversa, descompilar ou desmontar qualquer parte do Serviço.",
            "Usar ferramentas automatizadas (bots, scrapers, crawlers) para acessar o Serviço sem permissão prévia por escrito.",
            "Transmitir malware, vírus ou qualquer código projetado para interromper ou danificar o Serviço.",
            "Usar o Serviço de forma que coloque carga excessiva ou desproporcional em nossa infraestrutura.",
            "Contornar qualquer recurso de segurança, incluindo senhas de sala ou regras de segurança do Firestore.",
          ],
        },
        {
          type: "p",
          text: "Reservamo-nos o direito de remover conteúdo e suspender ou encerrar contas que violem essas regras, sem aviso prévio.",
        },
      ],
    },
    {
      id: "conteudo-usuario",
      title: "5. Conteúdo Gerado pelo Usuário",
      blocks: [
        {
          type: "p",
          text: "Você mantém a propriedade do conteúdo que cria no RetroDash (nomes de salas, textos de cards, títulos de colunas e itens de ação). Ao enviar conteúdo ao Serviço, você concede ao RetroDash uma licença limitada, não exclusiva e gratuita para armazenar, exibir e transmitir esse conteúdo exclusivamente para operar o Serviço.",
        },
        {
          type: "p",
          text: "Você é o único responsável pelo conteúdo que envia. Você declara que possui todos os direitos necessários para publicar esse conteúdo e que ele não viola direitos de terceiros nem a legislação aplicável.",
        },
        {
          type: "p",
          text: "Nota sobre o modo anônimo: ativar o modo anônimo em uma sala oculta sua identidade na interface do usuário, mas seu ID de usuário é armazenado internamente em nosso banco de dados para fins de moderação e aplicação das regras de votação. O modo anônimo não constitui uma garantia de anonimato completo.",
        },
      ],
    },
    {
      id: "recurso-ia",
      title: "6. Melhoria de Texto com IA (Google Gemini)",
      blocks: [
        {
          type: "p",
          text: `O Serviço inclui um botão opcional "Melhorar com IA" nos cards de retrospectiva. Ao clicar neste botão, você reconhece que o conteúdo textual daquele card será enviado à API do Google Gemini para processamento. Esta ação é totalmente voluntária — você não é obrigado a usar este recurso, e o restante da plataforma funciona normalmente sem ele.`,
        },
        {
          type: "p",
          text: "Nenhum identificador pessoal (nome, e-mail, ID de usuário) é incluído nas requisições à API Gemini. Você continua sendo o único responsável pelo conteúdo final salvo em qualquer card, independentemente de ter aceito ou não uma sugestão do Gemini. O RetroDash não oferece nenhuma garantia quanto à precisão, qualidade ou adequação de qualquer sugestão gerada por IA.",
        },
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "7. Propriedade Intelectual",
      blocks: [
        {
          type: "p",
          text: "O nome, logotipo, design e todo o código, recursos e interfaces do RetroDash são propriedade exclusiva de Igor Patrick Ponticelli e estão protegidos pelas leis de propriedade intelectual aplicáveis. Você não pode copiar, reproduzir, modificar, distribuir ou criar obras derivadas de qualquer parte do Serviço sem permissão prévia por escrito.",
        },
        {
          type: "p",
          text: "Nada nestes Termos concede a você uma licença para usar a marca, marcas registradas ou tecnologia proprietária do RetroDash além do estritamente necessário para usar o Serviço conforme pretendido.",
        },
      ],
    },
    {
      id: "privacidade",
      title: "8. Privacidade",
      blocks: [
        {
          type: "p",
          text: "Seu uso do Serviço também é regido pela nossa Política de Privacidade e pela nossa Política de Cookies e Armazenamento Local, ambas incorporadas a estes Termos por referência. Revise-as para entender nossas práticas de coleta, uso e retenção de dados.",
        },
      ],
    },
    {
      id: "terceiros",
      title: "9. Serviços de Terceiros",
      blocks: [
        {
          type: "p",
          text: "O RetroDash depende de serviços de terceiros para operar, incluindo:",
        },
        {
          type: "ul",
          items: [
            "Google Sign-In (Firebase Authentication): seu uso do Google Sign-In está sujeito aos Termos de Serviço e à Política de Privacidade do Google.",
            "Firebase Firestore (Google LLC): os dados são armazenados e processados na infraestrutura do Firebase, sujeitos aos termos do Google.",
            "Vercel Inc.: o aplicativo é hospedado na Vercel, sujeito aos termos de serviço da Vercel.",
            "API do Google Gemini (Google LLC): utilizada para o recurso opcional de melhoria de texto com IA, sujeita aos termos de API do Google.",
          ],
        },
        {
          type: "p",
          text: "Não somos responsáveis pela disponibilidade, conteúdo ou práticas de quaisquer serviços de terceiros. O uso desses serviços é por sua conta e risco, sujeito aos respectivos termos.",
        },
      ],
    },
    {
      id: "isencao-garantias",
      title: "10. Isenção de Garantias",
      blocks: [
        {
          type: "p",
          text: `O SERVIÇO É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA" E "CONFORME DISPONÍVEL", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A, GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO E NÃO VIOLAÇÃO.`,
        },
        {
          type: "p",
          text: "Não garantimos que o Serviço será ininterrupto, livre de erros ou seguro; que defeitos serão corrigidos; ou que o Serviço está livre de vírus ou outros componentes prejudiciais. Você usa o Serviço por sua própria conta e risco.",
        },
        {
          type: "p",
          text: "Não somos responsáveis por qualquer perda de dados, incluindo cards de retrospectiva, itens de ação ou dados de sala, causada por falhas técnicas, erro do usuário ou qualquer outro motivo.",
        },
      ],
    },
    {
      id: "limitacao-responsabilidade",
      title: "11. Limitação de Responsabilidade",
      blocks: [
        {
          type: "p",
          text: "NA MÁXIMA EXTENSÃO PERMITIDA PELA LEGISLAÇÃO APLICÁVEL, O RETRODASH E SEUS OPERADORES NÃO SERÃO RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENTES OU PUNITIVOS, INCLUINDO PERDA DE LUCROS, DADOS OU FUNDO DE COMÉRCIO, DECORRENTES DO USO OU DA IMPOSSIBILIDADE DE USO DO SERVIÇO.",
        },
        {
          type: "p",
          text: "EM NENHUM CASO NOSSA RESPONSABILIDADE TOTAL PARA COM VOCÊ EXCEDERÁ O MAIOR ENTRE (A) O VALOR QUE VOCÊ PAGOU PELO USO DO SERVIÇO NOS DOZE MESES ANTERIORES À RECLAMAÇÃO, OU (B) USD $10.",
        },
        {
          type: "p",
          text: "Nada nesta cláusula limita ou exclui responsabilidades que não possam ser afastadas pela legislação de proteção ao consumidor aplicável, incluindo o Código de Defesa do Consumidor (Lei 8.078/90) e a LGPD (Lei 13.709/2018), ou legislação equivalente em sua jurisdição.",
        },
      ],
    },
    {
      id: "rescisao",
      title: "12. Rescisão",
      blocks: [
        {
          type: "p",
          text: "Reservamo-nos o direito de suspender ou encerrar seu acesso ao Serviço a qualquer momento, com ou sem causa, com ou sem aviso prévio, caso acreditemos que você violou estes Termos ou a legislação aplicável.",
        },
        {
          type: "p",
          text: `Você pode parar de usar o Serviço a qualquer momento. Você pode solicitar a exclusão da sua conta e de todos os dados associados entrando em contato em ${CONTACT_EMAIL}. Comprometemo-nos a processar as solicitações de exclusão em até 15 dias úteis após a verificação do recebimento, com confirmação por e-mail ao término.`,
        },
        {
          type: "p",
          text: "Após a rescisão, seu direito de usar o Serviço cessa imediatamente. As disposições destes Termos que, por sua natureza, devem sobreviver à rescisão (incluindo direitos de propriedade intelectual, isenções de responsabilidade e limitações de responsabilidade) continuarão a se aplicar.",
        },
      ],
    },
    {
      id: "lei-aplicavel",
      title: "13. Lei Aplicável e Resolução de Disputas",
      blocks: [
        {
          type: "p",
          text: "Estes Termos são regidos pela legislação brasileira. As partes concordam em primeiro tentar resolver quaisquer disputas por meio de negociação de boa-fé antes de iniciar qualquer processo formal.",
        },
        {
          type: "h3",
          text: "Usuários residentes ou domiciliados no Brasil",
        },
        {
          type: "p",
          text: "Quaisquer disputas decorrentes destes Termos ou do uso do Serviço que não sejam resolvidas por negociação serão submetidas à jurisdição exclusiva do Foro da Comarca de Blumenau, Santa Catarina, Brasil. Na hipótese de qualquer cláusula destes Termos conflitar com o Código de Defesa do Consumidor (Lei 8.078/90) ou com a LGPD (Lei 13.709/2018), essas leis prevalecerão em favor do consumidor ou titular.",
        },
        {
          type: "h3",
          text: "Usuários fora do Brasil",
        },
        {
          type: "p",
          text: "Quaisquer disputas decorrentes destes Termos ou do uso do Serviço que não sejam resolvidas por negociação serão definitivamente resolvidas por arbitragem, administrada pela Câmara de Comércio Internacional (ICC) sob seu Regulamento de Arbitragem. A sede da arbitragem será Paris, França. O idioma do processo será o inglês. A lei aplicável será a legislação brasileira. Cada parte arcará com seus próprios custos, salvo decisão em contrário do árbitro.",
        },
        {
          type: "p",
          text: "Nada nesta cláusula limita os direitos obrigatórios de proteção ao consumidor disponíveis a você pela legislação do seu país de residência.",
        },
      ],
    },
    {
      id: "alteracoes",
      title: "14. Alterações nestes Termos",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar estes Termos periodicamente. Quando realizarmos alterações materiais:",
        },
        {
          type: "ul",
          items: [
            "Atualizaremos a data de \"Última atualização\" no topo desta página.",
            "Publicaremos um aviso dentro do aplicativo RetroDash.",
            "Quando exigido por lei, notificaremos por e-mail com pelo menos 30 dias de antecedência.",
          ],
        },
        {
          type: "p",
          text: "O uso continuado do Serviço após a data de vigência dos Termos atualizados constitui sua aceitação das alterações.",
        },
      ],
    },
    {
      id: "contato",
      title: "15. Fale Conosco",
      blocks: [
        {
          type: "p",
          text: "Se você tiver dúvidas sobre estes Termos, entre em contato:",
        },
        {
          type: "ul",
          items: [
            `E-mail: ${CONTACT_EMAIL}`,
            "Nosso objetivo é responder a todas as consultas jurídicas em até 15 dias úteis.",
          ],
        },
      ],
    },
  ],
};

export function getTermsContent(locale: string): LegalContent {
  return locale === "pt-BR" ? pt : en;
}

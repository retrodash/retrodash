type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "legal"; text: string };

type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type LegalContent = {
  backHome: string;
  label: string;
  title: string;
  lastUpdated: string;
  disclaimer: string;
  sections: Section[];
};

const CONTACT_EMAIL = "privacy@retrodash.app";
const DATE_EN = "May 18, 2026";
const DATE_PT = "18 de maio de 2026";

const en: LegalContent = {
  backHome: "← Back to Home",
  label: "Legal",
  title: "Privacy Policy",
  lastUpdated: `Last updated: ${DATE_EN}`,
  disclaimer:
    "This document is provided for informational purposes only and does not constitute legal advice. Always have a qualified attorney specializing in data privacy law review and approve this policy before publication.",
  sections: [
    {
      id: "who-we-are",
      title: "1. Who We Are",
      blocks: [
        {
          type: "p",
          text: 'RetroDash ("we," "our," or "us") operates retrodash.app, a real-time retrospective platform for Scrum and Kanban teams. This Privacy Policy explains what personal information we collect, why we collect it, how we use it, with whom we share it, and the rights available to you.',
        },
        {
          type: "p",
          text: "By using RetroDash, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, please discontinue use of the platform.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      blocks: [
        { type: "p", text: "We collect the following categories of information:" },
        {
          type: "ul",
          items: [
            "Account data (via Google Sign-In): your display name, email address, profile photo URL, and Google User ID (UID). We do not collect or store your Google password — authentication is handled entirely by Google.",
            "Room configuration: room names, column titles, and room passwords (stored as cryptographic hashes — never in plain text).",
            "User-generated content: text you type into retrospective cards. In anonymous rooms, your name is hidden in the UI, but your user ID is stored internally to enforce voting rules and for moderation purposes.",
            "Participation and activity data: when you joined a room, your role (facilitator or member), and your voting history — which cards you voted for.",
            "Technical data: Firebase automatically collects your IP address, browser type, operating system, and device identifiers to operate, secure, and improve the service.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required: If your product ever handles special categories of data (health, biometric, financial, or children's data), additional obligations under GDPR Article 9 and equivalent laws apply. Consult a data privacy attorney.",
        },
      ],
    },
    {
      id: "how-we-collect",
      title: "3. How We Collect Information",
      blocks: [
        { type: "p", text: "Information is collected in the following ways:" },
        {
          type: "ul",
          items: [
            "Directly from you: when you sign in with Google, create rooms, write cards, vote, or configure room settings.",
            "From Google: when you authorize Google Sign-In, Google provides your profile data (name, email, photo) under Google's own privacy terms and your authorization.",
            "Automatically: Firebase Authentication and Firestore collect device and network metadata (IP address, browser fingerprint) as part of their standard security infrastructure.",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      title: "4. How We Use Your Information",
      blocks: [
        { type: "p", text: "We use your information to:" },
        {
          type: "ul",
          items: [
            "Authenticate you and maintain your session securely across browser tabs and devices.",
            "Display your name and profile photo on the board, dashboard, and participant lists (unless the room is configured as anonymous).",
            "Create, manage, and display rooms, columns, and cards on your behalf.",
            "Enforce voting rules (preventing duplicate votes and self-votes) by tracking which users voted for which cards.",
            "Allow facilitators to view room participants and manage the retrospective session.",
            "Analyze aggregate, anonymized usage patterns to improve platform features and reliability.",
            "Respond to support requests or communications you initiate with us.",
            "Comply with legal obligations and enforce our Terms of Service.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required (GDPR): For users in the European Union, each processing purpose must be tied to a specific legal basis under GDPR Article 6 (e.g., contract performance, legitimate interest, consent). Map each purpose to its legal basis before publishing.",
        },
      ],
    },
    {
      id: "data-sharing",
      title: "5. Data Sharing and Third Parties",
      blocks: [
        {
          type: "p",
          text: "We do not sell, rent, or trade your personal data. We share data only with the service providers necessary to operate the platform:",
        },
        {
          type: "ul",
          items: [
            "Firebase (Google LLC, Mountain View, CA, USA): we use Firebase Authentication for identity management and Cloud Firestore for real-time database storage. All user data flows through Firebase infrastructure. Google's Privacy Policy governs their processing: https://policies.google.com/privacy",
            "Vercel Inc. (San Francisco, CA, USA): we use Vercel to host the Next.js application and serve it globally via CDN. Vercel may log IP addresses and request metadata for performance and security purposes.",
          ],
        },
        {
          type: "p",
          text: "We may also disclose your information if required by law, court order, or a legitimate government request, or to protect the rights, safety, or property of RetroDash, our users, or the public.",
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required: Adding any new third-party service (analytics, error tracking, A/B testing, marketing) requires updating this section and ensuring appropriate Data Processing Agreements (DPAs) are in place — especially for GDPR and LGPD compliance.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "6. International Data Transfers",
      blocks: [
        {
          type: "p",
          text: "RetroDash's infrastructure is primarily located in the United States. If you access the platform from the European Union, Brazil, or another jurisdiction with data transfer restrictions, your personal data is transferred to and processed in the United States.",
        },
        {
          type: "p",
          text: "For EU users (GDPR): data transfers to the US rely on Standard Contractual Clauses (SCCs) or other appropriate safeguards as maintained by Firebase and Vercel.",
        },
        {
          type: "p",
          text: "For Brazil users (LGPD): international data transfers are conducted on the basis of the necessity of the transfer for the provision of the contracted service (Lei 13.709/2018, Art. 33, VIII).",
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required: Verify periodically that Firebase and Vercel maintain valid transfer mechanisms for the jurisdictions where your users are located. This requires periodic review as regulations evolve.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      blocks: [
        {
          type: "p",
          text: "We retain personal data for as long as necessary to provide the service and comply with legal obligations:",
        },
        {
          type: "ul",
          items: [
            "Account data (name, email, photo): retained until you request account deletion.",
            "Room and card data: retained as long as the room exists in the platform. Room facilitators can delete rooms at any time.",
            "Deleted data: when a card, room, or account is deleted, data is removed from our active database within 30 days. Backup systems may retain copies for up to 90 additional days before permanent deletion.",
            "Firebase authentication logs and security data: retained according to Firebase's standard log retention policies (typically 30–90 days).",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "8. Your Privacy Rights",
      blocks: [
        {
          type: "p",
          text: `Depending on your location, you have the following rights regarding your personal data. To exercise any right, contact us at ${CONTACT_EMAIL}.`,
        },
        {
          type: "ul",
          items: [
            "Right of access: request a copy of the personal data we hold about you.",
            "Right to rectification: correct inaccurate or incomplete information (profile data can be updated directly through your Google account).",
            "Right to erasure (\"right to be forgotten\"): request deletion of your account and personal data.",
            "Right to restriction: ask us to pause processing of your data while a complaint is under review.",
            "Right to data portability: receive your data in a structured, machine-readable format.",
            "Right to object: object to processing based on legitimate interests.",
            "GDPR (EU): all rights above, plus the right to lodge a complaint with your national supervisory authority.",
            "LGPD (Brazil): all rights above, plus the right to know with whom your data is shared, the right to anonymization of unnecessary data, and the right to lodge a complaint with the ANPD (Autoridade Nacional de Proteção de Dados).",
          ],
        },
        {
          type: "p",
          text: "We will respond to verified requests within 30 days. We may need to verify your identity before processing your request.",
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required: Response timeframes, verification requirements, and permissible exceptions for rights requests vary by jurisdiction. An attorney should review your response process before going live.",
        },
      ],
    },
    {
      id: "cookies",
      title: "9. Cookies and Local Storage",
      blocks: [
        {
          type: "p",
          text: "RetroDash does not use advertising cookies or third-party tracking pixels. We use only the following:",
        },
        {
          type: "ul",
          items: [
            "Firebase Authentication tokens: stored in your browser's local storage to maintain your login session. These are essential for the platform to function and cannot be disabled without logging out.",
            "Ephemeral UI state: temporary data (such as in-progress card drafts) may be stored in session storage and is automatically cleared when you close the browser tab.",
          ],
        },
        {
          type: "p",
          text: "You can clear local storage and cookies through your browser settings at any time, which will log you out of the platform.",
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required (GDPR/ePrivacy): Even essential cookies may require disclosure in a cookie banner under some interpretations of EU ePrivacy law. An attorney should advise whether a cookie consent mechanism is required for your user base.",
        },
      ],
    },
    {
      id: "security",
      title: "10. Security",
      blocks: [
        {
          type: "p",
          text: "We implement industry-standard security measures to protect your data:",
        },
        {
          type: "ul",
          items: [
            "Encryption in transit: all data is transmitted over HTTPS/TLS 1.2 or higher.",
            "Encryption at rest: Firebase Firestore encrypts all stored data using AES-256.",
            "Access controls: Firestore security rules restrict data access so users can only read and write data they are authorized to see.",
            "Password hashing: room passwords are stored as cryptographic hashes — plain-text passwords are never stored.",
            "No password handling: user authentication is delegated to Google OAuth 2.0 — we never see or store your Google password.",
          ],
        },
        {
          type: "p",
          text: `Despite these measures, no security system is perfect. We cannot guarantee absolute security of your data. If you discover a security vulnerability, please report it responsibly to ${CONTACT_EMAIL}.`,
        },
      ],
    },
    {
      id: "children",
      title: "11. Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "RetroDash is not directed at children under 13 years of age (or under 16 in jurisdictions where that threshold applies, such as the EU). We do not knowingly collect personal data from children below these ages.",
        },
        {
          type: "p",
          text: `If you are a parent or guardian and believe your child has provided us with personal data, please contact us at ${CONTACT_EMAIL} and we will take steps to delete that data promptly.`,
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required: If your platform may be accessed by minors, COPPA (US), GDPR (EU, age 16 in most Member States), and the UK Children's Code impose strict requirements including parental consent and age verification. Consult an attorney on applicability.",
        },
      ],
    },
    {
      id: "changes",
      title: "12. Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will:",
        },
        {
          type: "ul",
          items: [
            'Update the "Last updated" date at the top of this page.',
            "Post a prominent notice within the RetroDash application.",
            "Where required by applicable law, send email notification at least 30 days before changes take effect.",
          ],
        },
        {
          type: "p",
          text: "Your continued use of RetroDash after the effective date of the updated policy constitutes your acceptance of the changes. If you do not agree, you must stop using the platform before the effective date.",
        },
      ],
    },
    {
      id: "contact",
      title: "13. Contact Us",
      blocks: [
        {
          type: "p",
          text: "For privacy questions, data access requests, complaints, or to exercise your rights under applicable law, please contact us:",
        },
        {
          type: "ul",
          items: [
            `Email: ${CONTACT_EMAIL}`,
            "We aim to respond to all privacy inquiries within 30 days.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Legal Review Required (GDPR): If you process personal data of EU residents at scale or process special-category data, you may be required to appoint a Data Protection Officer (DPO) and register with relevant data protection authorities. An attorney should advise on applicability.",
        },
      ],
    },
  ],
};

const pt: LegalContent = {
  backHome: "← Voltar ao Início",
  label: "Jurídico",
  title: "Política de Privacidade",
  lastUpdated: `Última atualização: ${DATE_PT}`,
  disclaimer:
    "Este documento é fornecido apenas para fins informativos e não constitui aconselhamento jurídico. Sempre consulte um advogado especializado em privacidade de dados antes de publicar esta política.",
  sections: [
    {
      id: "quem-somos",
      title: "1. Quem Somos",
      blocks: [
        {
          type: "p",
          text: 'O RetroDash ("nós," "nosso," ou "nos") opera o retrodash.app, uma plataforma de retrospectiva em tempo real para equipes Scrum e Kanban. Esta Política de Privacidade explica quais informações pessoais coletamos, por que as coletamos, como as usamos, com quem as compartilhamos e os direitos disponíveis a você.',
        },
        {
          type: "p",
          text: "Ao usar o RetroDash, você concorda com a coleta e uso das informações de acordo com esta política. Caso discorde de qualquer parte, por favor interrompa o uso da plataforma.",
        },
      ],
    },
    {
      id: "informacoes-coletadas",
      title: "2. Informações que Coletamos",
      blocks: [
        { type: "p", text: "Coletamos as seguintes categorias de informações:" },
        {
          type: "ul",
          items: [
            "Dados da conta (via Google Sign-In): seu nome de exibição, endereço de e-mail, URL da foto de perfil e ID de usuário do Google (UID). Não coletamos nem armazenamos sua senha do Google — a autenticação é gerenciada inteiramente pelo Google.",
            "Configuração de salas: nomes de salas, títulos de colunas e senhas de acesso (armazenadas como hashes criptográficos — nunca em texto puro).",
            "Conteúdo gerado pelo usuário: textos digitados em cards de retrospectiva. Em salas anônimas, seu nome é ocultado na interface, mas seu ID de usuário é armazenado internamente para aplicar as regras de votação e fins de moderação.",
            "Dados de participação e atividade: quando você entrou em uma sala, seu papel (facilitador ou membro) e seu histórico de votos — em quais cards você votou.",
            "Dados técnicos: o Firebase coleta automaticamente seu endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo para operar, proteger e melhorar o serviço.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária: Se o produto processar categorias especiais de dados (saúde, biométricos, financeiros ou dados de crianças), obrigações adicionais previstas na LGPD (Art. 11) e equivalentes se aplicam. Consulte um advogado especializado.",
        },
      ],
    },
    {
      id: "como-coletamos",
      title: "3. Como Coletamos as Informações",
      blocks: [
        { type: "p", text: "As informações são coletadas das seguintes formas:" },
        {
          type: "ul",
          items: [
            "Diretamente de você: quando você faz login com o Google, cria salas, escreve cards, vota ou configura as salas.",
            "Do Google: ao autorizar o login com Google, o Google nos fornece seus dados de perfil (nome, e-mail, foto) nos termos da política de privacidade do Google e de sua autorização.",
            "Automaticamente: o Firebase Authentication e o Firestore coletam metadados de dispositivo e rede (endereço IP, impressão digital do navegador) como parte de sua infraestrutura padrão de segurança.",
          ],
        },
      ],
    },
    {
      id: "como-usamos",
      title: "4. Como Usamos as Suas Informações",
      blocks: [
        { type: "p", text: "Utilizamos suas informações para:" },
        {
          type: "ul",
          items: [
            "Autenticá-lo e manter sua sessão segura entre abas e dispositivos.",
            "Exibir seu nome e foto de perfil no quadro, dashboard e listas de participantes (exceto em salas configuradas como anônimas).",
            "Criar, gerenciar e exibir salas, colunas e cards em seu nome.",
            "Aplicar as regras de votação (impedindo votos duplicados e autovotos) rastreando quais usuários votaram em quais cards.",
            "Permitir que facilitadores vejam os participantes da sala e gerenciem a sessão de retrospectiva.",
            "Analisar padrões de uso agregados e anonimizados para melhorar os recursos e a confiabilidade da plataforma.",
            "Responder a solicitações de suporte ou comunicações que você nos enviar.",
            "Cumprir obrigações legais e fazer cumprir nossos Termos de Serviço.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária (LGPD/GDPR): Para usuários no Brasil, cada finalidade de tratamento deve ter uma base legal prevista na LGPD (Art. 7). Para usuários na União Europeia, aplica-se o Art. 6 do GDPR. Mapeie cada finalidade para sua base legal antes de publicar.",
        },
      ],
    },
    {
      id: "compartilhamento",
      title: "5. Compartilhamento de Dados e Terceiros",
      blocks: [
        {
          type: "p",
          text: "Não vendemos, alugamos nem comercializamos seus dados pessoais. Compartilhamos dados apenas com os prestadores de serviço necessários para operar a plataforma:",
        },
        {
          type: "ul",
          items: [
            "Firebase (Google LLC, Mountain View, CA, EUA): utilizamos o Firebase Authentication para gerenciamento de identidade e o Cloud Firestore para armazenamento de banco de dados em tempo real. Todos os dados de usuários trafegam pela infraestrutura do Firebase. A Política de Privacidade do Google rege o processamento: https://policies.google.com/privacy",
            "Vercel Inc. (San Francisco, CA, EUA): utilizamos a Vercel para hospedar o aplicativo Next.js e servi-lo globalmente via CDN. A Vercel pode registrar endereços IP e metadados de requisições para fins de desempenho e segurança.",
          ],
        },
        {
          type: "p",
          text: "Também podemos divulgar suas informações quando exigido por lei, ordem judicial ou solicitação legítima de autoridade governamental, ou para proteger direitos, segurança ou propriedade do RetroDash, de nossos usuários ou do público.",
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária: A adição de qualquer novo serviço de terceiros (analytics, rastreamento de erros, testes A/B, marketing) exige a atualização desta seção e a celebração de Contratos de Processamento de Dados (DPAs) adequados, especialmente para conformidade com a LGPD e o GDPR.",
        },
      ],
    },
    {
      id: "transferencias",
      title: "6. Transferências Internacionais de Dados",
      blocks: [
        {
          type: "p",
          text: "A infraestrutura do RetroDash está localizada principalmente nos Estados Unidos. Se você acessa a plataforma do Brasil, da União Europeia ou de outra jurisdição com restrições a transferências de dados, suas informações pessoais são transferidas para e processadas nos Estados Unidos.",
        },
        {
          type: "p",
          text: "Para usuários no Brasil (LGPD): as transferências internacionais de dados são realizadas com base na necessidade da transferência para a prestação do serviço contratado, conforme o Art. 33, VIII, da Lei nº 13.709/2018.",
        },
        {
          type: "p",
          text: "Para usuários na UE (GDPR): as transferências para os EUA baseiam-se em Cláusulas Contratuais Padrão (SCCs) ou outros mecanismos adequados mantidos pelo Firebase e pela Vercel.",
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária: Verifique periodicamente se o Firebase e a Vercel mantêm mecanismos de transferência válidos para as jurisdições onde seus usuários estão localizados, pois as regulamentações evoluem.",
        },
      ],
    },
    {
      id: "retencao",
      title: "7. Retenção de Dados",
      blocks: [
        {
          type: "p",
          text: "Retemos dados pessoais pelo tempo necessário para fornecer o serviço e cumprir obrigações legais:",
        },
        {
          type: "ul",
          items: [
            "Dados da conta (nome, e-mail, foto): retidos até que você solicite a exclusão da conta.",
            "Dados de salas e cards: retidos enquanto a sala existir na plataforma. O facilitador pode excluir a sala a qualquer momento.",
            "Dados excluídos: após exclusão de um card, sala ou conta, os dados são removidos do banco de dados ativo em até 30 dias. Backups podem reter cópias por até 90 dias adicionais antes da exclusão permanente.",
            "Logs do Firebase (autenticação, segurança): retidos conforme as políticas padrão de retenção de logs do Firebase (tipicamente 30 a 90 dias).",
          ],
        },
      ],
    },
    {
      id: "seus-direitos",
      title: "8. Seus Direitos de Privacidade",
      blocks: [
        {
          type: "p",
          text: `Dependendo da sua localização, você possui os seguintes direitos em relação aos seus dados pessoais. Para exercê-los, entre em contato: ${CONTACT_EMAIL}.`,
        },
        {
          type: "ul",
          items: [
            "Direito de acesso: solicitar uma cópia dos dados pessoais que mantemos sobre você.",
            "Direito de retificação: corrigir informações imprecisas ou incompletas (dados de perfil podem ser atualizados diretamente na sua conta Google).",
            "Direito à exclusão: solicitar a exclusão da sua conta e dados pessoais.",
            "Direito à limitação: pedir que pausemos o tratamento dos seus dados enquanto uma reclamação está sendo analisada.",
            "Direito à portabilidade: receber seus dados em formato estruturado e legível por máquina.",
            "Direito de oposição: opor-se ao tratamento baseado em interesse legítimo.",
            "LGPD (Brasil): todos os direitos acima, além do direito à informação sobre compartilhamento de dados, anonimização de dados desnecessários e petição à ANPD (Autoridade Nacional de Proteção de Dados).",
            "GDPR (UE): todos os direitos acima, além do direito de reclamação junto à autoridade supervisora nacional.",
          ],
        },
        {
          type: "p",
          text: "Responderemos a solicitações verificadas em até 30 dias. Podemos precisar verificar sua identidade antes de processar a solicitação.",
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária: Os prazos, requisitos de verificação e exceções para solicitações de direitos variam por jurisdição. Um advogado deve revisar seu processo de resposta antes de entrar em produção.",
        },
      ],
    },
    {
      id: "cookies",
      title: "9. Cookies e Armazenamento Local",
      blocks: [
        {
          type: "p",
          text: "O RetroDash não usa cookies publicitários nem pixels de rastreamento de terceiros. Utilizamos apenas:",
        },
        {
          type: "ul",
          items: [
            "Tokens do Firebase Authentication: armazenados no localStorage do navegador para manter sua sessão ativa. São essenciais para o funcionamento da plataforma e não podem ser desativados sem encerrar a sessão.",
            "Estado temporário da interface: dados efêmeros (como rascunhos de cards em edição) podem ser armazenados no sessionStorage e são automaticamente apagados ao fechar a aba do navegador.",
          ],
        },
        {
          type: "p",
          text: "Você pode limpar o localStorage e os cookies nas configurações do seu navegador a qualquer momento, o que encerrará sua sessão na plataforma.",
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária (LGPD/ePrivacy): Mesmo cookies essenciais podem exigir divulgação e, em algumas jurisdições, um banner de consentimento. Um advogado deve orientar sobre a necessidade de um mecanismo de consentimento para cookies na sua base de usuários.",
        },
      ],
    },
    {
      id: "seguranca",
      title: "10. Segurança",
      blocks: [
        {
          type: "p",
          text: "Implementamos medidas de segurança compatíveis com os padrões da indústria para proteger seus dados:",
        },
        {
          type: "ul",
          items: [
            "Criptografia em trânsito: todos os dados são transmitidos via HTTPS/TLS 1.2 ou superior.",
            "Criptografia em repouso: o Firestore criptografa todos os dados armazenados usando AES-256.",
            "Controles de acesso: regras de segurança do Firestore restringem o acesso para que usuários vejam e escrevam apenas os dados aos quais estão autorizados.",
            "Hash de senhas: as senhas de sala são armazenadas como hashes criptográficos — nunca em texto puro.",
            "Sem manuseio de senhas: a autenticação é delegada ao Google OAuth 2.0 — nunca vemos ou armazenamos sua senha do Google.",
          ],
        },
        {
          type: "p",
          text: `Apesar dessas medidas, nenhum sistema é completamente seguro. Não podemos garantir a segurança absoluta dos seus dados. Se você identificar uma vulnerabilidade, reporte-a de forma responsável: ${CONTACT_EMAIL}.`,
        },
      ],
    },
    {
      id: "criancas",
      title: "11. Privacidade de Crianças",
      blocks: [
        {
          type: "p",
          text: "O RetroDash não é direcionado a crianças menores de 13 anos (ou menores de 16 anos em jurisdições onde esse limite se aplica, como na UE). Não coletamos intencionalmente dados pessoais de menores abaixo dessas idades.",
        },
        {
          type: "p",
          text: `Se você é pai, mãe ou responsável e acredita que seu filho forneceu dados pessoais para nós, entre em contato: ${CONTACT_EMAIL}. Tomaremos medidas imediatas para excluir esses dados.`,
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária: Se a plataforma puder ser acessada por menores, o ECA (Brasil), COPPA (EUA), o GDPR (UE, limite de 16 anos na maioria dos Estados-Membros) e o UK Children's Code impõem requisitos rigorosos. Um advogado deve orientar sobre aplicabilidade.",
        },
      ],
    },
    {
      id: "alteracoes",
      title: "12. Alterações nesta Política",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação aplicável. Quando realizarmos alterações materiais:",
        },
        {
          type: "ul",
          items: [
            'Atualizaremos a data de "Última atualização" no topo desta página.',
            "Publicaremos um aviso destacado dentro do aplicativo RetroDash.",
            "Quando exigido pela legislação aplicável, enviaremos notificação por e-mail com pelo menos 30 dias de antecedência antes das alterações entrarem em vigor.",
          ],
        },
        {
          type: "p",
          text: "O uso continuado do RetroDash após a data de vigência da política atualizada constitui sua aceitação das alterações. Se você não concordar com os novos termos, deve interromper o uso da plataforma antes da data de vigência.",
        },
      ],
    },
    {
      id: "contato",
      title: "13. Fale Conosco",
      blocks: [
        {
          type: "p",
          text: "Para dúvidas sobre privacidade, solicitações de acesso a dados, reclamações ou para exercer seus direitos, entre em contato:",
        },
        {
          type: "ul",
          items: [
            `E-mail: ${CONTACT_EMAIL}`,
            "Nosso objetivo é responder a todas as solicitações de privacidade em até 30 dias.",
          ],
        },
        {
          type: "legal",
          text: "⚠️ Revisão Jurídica Necessária (LGPD/GDPR): Se você tratar dados pessoais de titulares brasileiros ou europeus em larga escala, ou tratar dados sensíveis, pode ser necessário indicar um Encarregado de Proteção de Dados (DPO) e registrar o tratamento junto às autoridades competentes. Consulte um advogado.",
        },
      ],
    },
  ],
};

export function getPrivacyContent(locale: string): LegalContent {
  return locale === "pt-BR" ? pt : en;
}

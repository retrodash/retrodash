type Block =
  | { type: "p"; text: string }
  | { type: "p-link"; before: string; linkText: string; href: string; after: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

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

const CONTACT_EMAIL = "patrickigor.ip@gmail.com";
const DATE_EN = "May 27, 2026";
const DATE_PT = "27 de maio de 2026";

const en: LegalContent = {
  backHome: "← Back to Home",
  label: "Legal",
  title: "Privacy Policy",
  lastUpdated: `Last updated: ${DATE_EN}`,
  disclaimer: "",
  sections: [
    {
      id: "who-we-are",
      title: "1. Who We Are",
      blocks: [
        {
          type: "p",
          text: `RetroDash (retrodash.com.br) is a real-time retrospective platform for Scrum and Kanban teams. This Privacy Policy explains what personal information we collect, why we collect it, how we use it, with whom we share it, and the rights available to you.`,
        },
        {
          type: "p",
          text: `RetroDash is a personal project maintained by Igor Patrick Ponticelli, based in Blumenau, Santa Catarina, Brazil. For purposes of the LGPD (Article 41) and GDPR (Article 4(7)), Igor Patrick Ponticelli acts as the Data Controller of personal data processed by the platform. As this is an individual project rather than a legal entity, no formal Data Protection Officer (DPO) is appointed under LGPD Article 41 §1; the controller handles data subject requests directly via ${CONTACT_EMAIL}.`,
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
        { type: "p", text: "We collect the following categories of personal data:" },
        {
          type: "ul",
          items: [
            "Account data (via Google Sign-In): your display name, email address, profile photo URL, and Google User ID (UID). We do not collect or store your Google password — authentication is handled entirely by Google.",
            "Room configuration: room names, column titles, and room passwords (stored as SHA-256 cryptographic hashes — never in plain text).",
            "User-generated content: text you type into retrospective cards. In anonymous rooms, your display name is hidden in the UI, but your user ID is stored internally to enforce voting rules and for moderation purposes.",
            "Participation and activity data: when you joined a room, your role (facilitator or member), and your voting history — which cards you voted for.",
            "Security logs: Firebase automatically collects your IP address, browser type, operating system, and device identifiers to operate, secure, and improve the service.",
          ],
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
      id: "legal-basis",
      title: "4. Legal Basis for Processing",
      blocks: [
        {
          type: "p",
          text: "We process your personal data under the following legal bases. The table below maps each data category to its legal basis under the LGPD (Lei 13.709/2018, Art. 7º) and the GDPR (Regulation (EU) 2016/679, Article 6).",
        },
        {
          type: "table",
          headers: ["Data Category", "LGPD Basis", "LGPD Art.", "GDPR Basis", "GDPR Art."],
          rows: [
            ["Name, email, photo (Google Sign-In)", "Performance of a contract", "Art. 7º, V", "Performance of a contract", "Art. 6(1)(b)"],
            ["Google UID, authentication token", "Performance of a contract", "Art. 7º, V", "Performance of a contract", "Art. 6(1)(b)"],
            ["Card content, room names, columns", "Performance of a contract", "Art. 7º, V", "Performance of a contract", "Art. 6(1)(b)"],
            ["Room password hash (SHA-256)", "Performance of a contract", "Art. 7º, V", "Performance of a contract", "Art. 6(1)(b)"],
            ["Voting history and participation", "Performance of a contract", "Art. 7º, V", "Performance of a contract", "Art. 6(1)(b)"],
            ["Security logs (IP address, user-agent)", "Legitimate interests", "Art. 7º, IX", "Legitimate interests", "Art. 6(1)(f)"],
            ["Text sent to Google Gemini", "Legitimate interests", "Art. 7º, IX", "Legitimate interests", "Art. 6(1)(f)"],
            ["Feedback messages submitted", "Performance of a contract + Legitimate interests", "Art. 7º, V e IX", "Performance of a contract + Legitimate interests", "Art. 6(1)(b)(f)"],
          ],
        },
        {
          type: "p",
          text: "For processing based on legitimate interests, a balancing test has been applied. In each case, the processing is proportionate to the purpose, aligns with the data subject's reasonable expectations, and appropriate safeguards are in place.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "5. How We Use Your Information",
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
            "Respond to support requests or communications you initiate with us.",
            "Comply with legal obligations and enforce our Terms of Service.",
          ],
        },
      ],
    },
    {
      id: "ai-text-improvement",
      title: "6. AI Text Improvement (Google Gemini)",
      blocks: [
        {
          type: "p",
          text: `RetroDash includes an optional "Improve Text" button on retrospective cards. When you click this button, the text content of that specific card is sent to the Google Gemini API (model: gemini-flash-latest) to generate an improved version of your text.`,
        },
        { type: "p", text: "Key facts about this feature:" },
        {
          type: "ul",
          items: [
            "Only the card's text content is sent — no name, email, user ID, room name, or any other personal identifier is included in the request.",
            "Submission is entirely voluntary: it only occurs when you click \"Improve Text\". There is no automatic or background submission of card content.",
            "If you prefer not to use this feature, simply do not click the button. Every other part of the platform operates normally without it.",
            "Legal basis (LGPD): legitimate interests (Art. 7º, IX) — the processing is initiated by the user to improve their own content, no identifying data is sent, and the user retains full control of whether to save the suggestion.",
            "Legal basis (GDPR): legitimate interests (Art. 6(1)(f)) — same rationale applies.",
            "Google states that data submitted through paid Gemini API access is not used to train models by default. Content you send is also subject to Google's Privacy Policy and API usage terms.",
          ],
        },
        {
          type: "p",
          text: "Content submitted to Google Gemini is processed under Google's Privacy Policy in addition to this policy.",
        },
      ],
    },
    {
      id: "data-sharing",
      title: "7. Data Sharing and Third Parties",
      blocks: [
        {
          type: "p",
          text: "We do not sell, rent, or trade your personal data. We share data only with the service providers strictly necessary to operate the platform:",
        },
        {
          type: "ul",
          items: [
            "Firebase (Google LLC, Mountain View, CA, USA): we use Firebase Authentication for identity management and Cloud Firestore for real-time database storage. All user data flows through Firebase infrastructure. Google's Privacy Policy governs their processing.",
            "Vercel Inc. (San Francisco, CA, USA): we use Vercel to host the Next.js application and serve it globally. Vercel may log IP addresses and request metadata for performance and security purposes.",
            "Google Gemini API (Google LLC): when you voluntarily click \"Improve Text\", that card's text content is sent to the Gemini API. No personal identifiers are included. See Section 6 for full details.",
          ],
        },
        {
          type: "p",
          text: "We may also disclose your information if required by law, court order, or a legitimate government request, or to protect the rights, safety, or property of RetroDash, our users, or the public.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "8. International Data Transfers",
      blocks: [
        {
          type: "p",
          text: "RetroDash's infrastructure is primarily located in the United States. If you access the platform from Brazil, the European Union, or another jurisdiction with data transfer restrictions, your personal data is transferred to and processed in the United States.",
        },
        {
          type: "p",
          text: "For Brazil users (LGPD): international data transfers are conducted on the basis of necessity of the transfer for the provision of the contracted service (Lei 13.709/2018, Art. 33, VIII).",
        },
        {
          type: "p",
          text: "For EU/EEA users (GDPR): data transfers to the US rely on Standard Contractual Clauses (SCCs) or other appropriate safeguards maintained by Firebase and Vercel in accordance with Chapter V of the GDPR.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "9. Data Retention",
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
            "Deleted data: when a card, room, or account is deleted, data is removed from our active database. Backup systems may retain copies for up to 90 days before permanent deletion.",
            "Security logs (IP address, user-agent): retained according to Firebase's standard log retention policies, typically 30 to 90 days.",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "10. Your Privacy Rights",
      blocks: [
        {
          type: "p",
          text: `Depending on your location, you have the following rights regarding your personal data. To exercise any right, contact the Data Controller directly at ${CONTACT_EMAIL}.`,
        },
        { type: "h3", text: "Rights under the LGPD (users in Brazil)" },
        {
          type: "ul",
          items: [
            "Confirmation and access (Art. 18, I–II): confirm whether your data is processed and obtain a copy.",
            "Rectification (Art. 18, III): correct inaccurate or incomplete data.",
            "Anonymization, blocking, or deletion of unnecessary data (Art. 18, IV).",
            "Portability (Art. 18, V): receive your data in a structured, interoperable format.",
            "Deletion of data processed under consent (Art. 18, VI).",
            "Information about sharing (Art. 18, VII): know with whom your data is shared.",
            "Revocation of consent (Art. 18, IX), where consent is the applicable basis.",
            "Right to object to processing based on legitimate interests (Art. 18, IX).",
            "Right to petition the ANPD (Autoridade Nacional de Proteção de Dados).",
          ],
        },
        { type: "h3", text: "Rights under the GDPR (EU/EEA users)" },
        {
          type: "ul",
          items: [
            "Right of access (Art. 15): request a copy of the personal data we hold about you.",
            "Right to rectification (Art. 16): correct inaccurate or incomplete information.",
            "Right to erasure / right to be forgotten (Art. 17): request deletion of your personal data.",
            "Right to restriction of processing (Art. 18): pause processing while a complaint is under review.",
            "Right to data portability (Art. 20): receive your data in a machine-readable format.",
            "Right to object (Art. 21): object to processing based on legitimate interests.",
            "Right to lodge a complaint with your national supervisory authority.",
          ],
        },
        { type: "h3", text: "Account Deletion" },
        {
          type: "p",
          text: `Account deletion is currently handled by request via email to ${CONTACT_EMAIL}. The Data Controller commits to processing deletion requests within 15 business days of verified receipt, with confirmation sent to your email upon completion.`,
        },
        {
          type: "p",
          text: "Deletion covers: your profile data (name, email, photo), rooms you created (with notification to co-participants), your voting history, and feedback messages you submitted. Security logs and backups follow the retention cycle described in Section 9 (up to 90 days) before permanent deletion.",
        },
        {
          type: "p",
          text: "The platform roadmap includes a self-service account deletion feature. This is acknowledged as a future goal and is not currently available in the platform.",
        },
      ],
    },
    {
      id: "cookies",
      title: "11. Cookies and Local Storage",
      blocks: [
        {
          type: "p",
          text: "RetroDash does not use advertising cookies or third-party tracking pixels. We use only browser-local storage that is strictly necessary for the platform to function — Firebase Authentication tokens and temporary UI state.",
        },
        {
          type: "p-link",
          before: "For complete details on what is stored, why, how long it persists, and how to clear it, see our ",
          linkText: "Cookie and Local Storage Policy",
          href: "/cookies",
          after: ".",
        },
      ],
    },
    {
      id: "security",
      title: "12. Security",
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
            "Access controls: Firestore security rules restrict data access so users can only read and write data they are authorized to access.",
            "Password hashing: room passwords are stored as SHA-256 cryptographic hashes — plain-text passwords are never stored or transmitted.",
            "No credential handling: user authentication is delegated entirely to Google OAuth 2.0 — we never see or store your Google account password.",
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
      title: "13. Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "RetroDash is not directed at children under 13 years of age (or under 16 in the European Union, in accordance with applicable local law). The platform is designed for professional team contexts — the expected and typical users are working adults.",
        },
        {
          type: "p",
          text: "There is no technical age-verification mechanism. By signing in with Google and using the platform, users represent that they meet the applicable minimum age requirement for their jurisdiction.",
        },
        {
          type: "p",
          text: `If the Data Controller is notified that a user below the applicable minimum age has created an account, that account and all associated data will be deleted promptly. To report such a case, contact ${CONTACT_EMAIL}.`,
        },
      ],
    },
    {
      id: "changes",
      title: "14. Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy to reflect changes in our practices or applicable law. When we make material changes, we will:",
        },
        {
          type: "ul",
          items: [
            "Update the \"Last updated\" date at the top of this page.",
            "Post a notice within the RetroDash application.",
            "Where required by applicable law, notify affected users by email at least 30 days before changes take effect.",
          ],
        },
        {
          type: "p",
          text: "Your continued use of RetroDash after the effective date constitutes acceptance of the updated policy. If you do not agree, you must stop using the platform before the effective date.",
        },
      ],
    },
    {
      id: "contact",
      title: "15. Contact Us",
      blocks: [
        {
          type: "p",
          text: "For privacy questions, data access requests, complaints, or to exercise your rights under applicable law, contact the Data Controller directly:",
        },
        {
          type: "ul",
          items: [
            `Email: ${CONTACT_EMAIL}`,
            "Data Controller: Igor Patrick Ponticelli, Blumenau, Santa Catarina, Brazil.",
            "As this is an individual project, no formal DPO is appointed. The controller handles all data subject requests personally. We aim to respond within 15 business days.",
          ],
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
  disclaimer: "",
  sections: [
    {
      id: "quem-somos",
      title: "1. Quem Somos",
      blocks: [
        {
          type: "p",
          text: "O RetroDash (retrodash.com.br) é uma plataforma de retrospectiva em tempo real para equipes Scrum e Kanban. Esta Política de Privacidade explica quais informações pessoais coletamos, por que as coletamos, como as usamos, com quem as compartilhamos e os direitos disponíveis a você.",
        },
        {
          type: "p",
          text: `O RetroDash é um projeto pessoal mantido por Igor Patrick Ponticelli, sediado em Blumenau, Santa Catarina, Brasil. Para fins da LGPD (Art. 41), Igor Patrick Ponticelli atua como Controlador dos dados pessoais tratados pela plataforma. Por se tratar de projeto individual e não de pessoa jurídica, não há indicação formal de Encarregado de Dados (DPO) nos termos do Art. 41, §1º; o próprio controlador atende às solicitações de titulares através do e-mail ${CONTACT_EMAIL}.`,
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
        { type: "p", text: "Coletamos as seguintes categorias de dados pessoais:" },
        {
          type: "ul",
          items: [
            "Dados da conta (via Google Sign-In): seu nome de exibição, endereço de e-mail, URL da foto de perfil e ID de usuário do Google (UID). Não coletamos nem armazenamos sua senha do Google — a autenticação é gerenciada inteiramente pelo Google.",
            "Configuração de salas: nomes de salas, títulos de colunas e senhas de acesso (armazenadas como hashes SHA-256 — nunca em texto puro).",
            "Conteúdo gerado pelo usuário: textos digitados em cards de retrospectiva. Em salas anônimas, seu nome de exibição é ocultado na interface, mas seu ID de usuário é armazenado internamente para aplicar as regras de votação e para fins de moderação.",
            "Dados de participação e atividade: quando você entrou em uma sala, seu papel (facilitador ou membro) e seu histórico de votos — em quais cards você votou.",
            "Logs de segurança: o Firebase coleta automaticamente seu endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo para operar, proteger e melhorar o serviço.",
          ],
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
      id: "base-legal",
      title: "4. Base Legal para o Tratamento",
      blocks: [
        {
          type: "p",
          text: "Tratamos seus dados pessoais com base nas hipóteses legais a seguir. A tabela abaixo mapeia cada categoria de dado à sua base legal conforme a LGPD (Lei 13.709/2018, Art. 7º) e o GDPR (Regulamento (UE) 2016/679, Art. 6).",
        },
        {
          type: "table",
          headers: ["Categoria de dado", "Base legal LGPD", "Art. LGPD", "Base legal GDPR", "Art. GDPR"],
          rows: [
            ["Nome, e-mail, foto (Google Sign-In)", "Execução de contrato", "Art. 7º, V", "Execução de contrato", "Art. 6(1)(b)"],
            ["UID Google, token de autenticação", "Execução de contrato", "Art. 7º, V", "Execução de contrato", "Art. 6(1)(b)"],
            ["Conteúdo de cards, nomes de sala, colunas", "Execução de contrato", "Art. 7º, V", "Execução de contrato", "Art. 6(1)(b)"],
            ["Hash de senha de sala (SHA-256)", "Execução de contrato", "Art. 7º, V", "Execução de contrato", "Art. 6(1)(b)"],
            ["Histórico de votos e participação", "Execução de contrato", "Art. 7º, V", "Execução de contrato", "Art. 6(1)(b)"],
            ["Logs de segurança (IP, user-agent)", "Legítimo interesse", "Art. 7º, IX", "Legítimo interesse", "Art. 6(1)(f)"],
            ["Texto enviado ao Google Gemini", "Legítimo interesse", "Art. 7º, IX", "Legítimo interesse", "Art. 6(1)(f)"],
            ["Mensagens de feedback enviadas", "Execução de contrato + Legítimo interesse", "Art. 7º, V e IX", "Execução de contrato + Legítimo interesse", "Art. 6(1)(b)(f)"],
          ],
        },
        {
          type: "p",
          text: "Para os tratamentos baseados em legítimo interesse, foi realizado teste de balanceamento (balancing test). Em cada caso, o tratamento é proporcional à finalidade, está alinhado às expectativas razoáveis do titular e conta com salvaguardas adequadas.",
        },
      ],
    },
    {
      id: "como-usamos",
      title: "5. Como Usamos as Suas Informações",
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
            "Responder a solicitações de suporte ou comunicações que você nos enviar.",
            "Cumprir obrigações legais e fazer cumprir nossos Termos de Serviço.",
          ],
        },
      ],
    },
    {
      id: "ai-text-improvement",
      title: "6. Melhoria de Texto com IA (Google Gemini)",
      blocks: [
        {
          type: "p",
          text: `O RetroDash inclui um botão opcional "Melhorar com IA" nos cards de retrospectiva. Ao clicar neste botão, o conteúdo textual daquele card específico é enviado à API do Google Gemini (modelo: gemini-flash-latest) para gerar uma versão aprimorada do texto.`,
        },
        { type: "p", text: "Pontos importantes sobre este recurso:" },
        {
          type: "ul",
          items: [
            "Apenas o texto do card é enviado — nenhum nome, e-mail, ID de usuário, nome da sala ou outro identificador pessoal é incluído na requisição.",
            "O envio é totalmente voluntário: só ocorre quando você clica em \"Melhorar com IA\". Não há envio automático ou em segundo plano do conteúdo dos cards.",
            "Se preferir não usar o recurso, simplesmente não clique no botão. O restante da plataforma funciona normalmente sem ele.",
            "Base legal (LGPD): legítimo interesse (Art. 7º, IX) — o tratamento é solicitado pelo próprio usuário para melhorar seu conteúdo, nenhum dado identificador é enviado, e o usuário mantém controle total sobre aceitar ou não a sugestão.",
            "Base legal (GDPR): legítimo interesse (Art. 6(1)(f)) — aplica-se o mesmo raciocínio.",
            "O Google declara que dados enviados via acesso pago à API Gemini não são usados para treinar modelos por padrão. O conteúdo enviado também está sujeito à Política de Privacidade do Google e aos termos de uso da API.",
          ],
        },
        {
          type: "p",
          text: "O conteúdo enviado ao Google Gemini é processado conforme a Política de Privacidade do Google, além desta política.",
        },
      ],
    },
    {
      id: "compartilhamento",
      title: "7. Compartilhamento de Dados e Terceiros",
      blocks: [
        {
          type: "p",
          text: "Não vendemos, alugamos nem comercializamos seus dados pessoais. Compartilhamos dados apenas com os prestadores de serviço estritamente necessários para operar a plataforma:",
        },
        {
          type: "ul",
          items: [
            "Firebase (Google LLC, Mountain View, CA, EUA): utilizamos o Firebase Authentication para gerenciamento de identidade e o Cloud Firestore para armazenamento de banco de dados em tempo real. Todos os dados de usuários trafegam pela infraestrutura do Firebase. A Política de Privacidade do Google rege o processamento.",
            "Vercel Inc. (San Francisco, CA, EUA): utilizamos a Vercel para hospedar o aplicativo Next.js. A Vercel pode registrar endereços IP e metadados de requisições para fins de desempenho e segurança.",
            "API do Google Gemini (Google LLC): quando você clica voluntariamente em \"Melhorar com IA\", o texto daquele card é enviado à API Gemini. Nenhum identificador pessoal é incluído. Veja a Seção 6 para detalhes completos.",
          ],
        },
        {
          type: "p",
          text: "Também podemos divulgar suas informações quando exigido por lei, ordem judicial ou solicitação legítima de autoridade governamental, ou para proteger direitos, segurança ou propriedade do RetroDash, de nossos usuários ou do público.",
        },
      ],
    },
    {
      id: "transferencias",
      title: "8. Transferências Internacionais de Dados",
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
          text: "Para usuários na UE/EEE (GDPR): as transferências para os EUA baseiam-se em Cláusulas Contratuais Padrão (SCCs) ou outros mecanismos adequados mantidos pelo Firebase e pela Vercel, em conformidade com o Capítulo V do GDPR.",
        },
      ],
    },
    {
      id: "retencao",
      title: "9. Retenção de Dados",
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
            "Dados excluídos: após exclusão de um card, sala ou conta, os dados são removidos do banco de dados ativo. Backups podem reter cópias por até 90 dias antes da exclusão permanente.",
            "Logs de segurança (IP, user-agent): retidos conforme as políticas padrão de retenção de logs do Firebase, tipicamente de 30 a 90 dias.",
          ],
        },
      ],
    },
    {
      id: "seus-direitos",
      title: "10. Seus Direitos de Privacidade",
      blocks: [
        {
          type: "p",
          text: `Dependendo da sua localização, você possui os seguintes direitos em relação aos seus dados pessoais. Para exercê-los, entre em contato diretamente com o Controlador: ${CONTACT_EMAIL}.`,
        },
        { type: "h3", text: "Direitos pela LGPD (usuários no Brasil)" },
        {
          type: "ul",
          items: [
            "Confirmação e acesso (Art. 18, I–II): confirmar se seus dados são tratados e obter uma cópia.",
            "Retificação (Art. 18, III): corrigir dados imprecisos ou incompletos.",
            "Anonimização, bloqueio ou eliminação de dados desnecessários (Art. 18, IV).",
            "Portabilidade (Art. 18, V): receber seus dados em formato estruturado e interoperável.",
            "Eliminação de dados tratados com consentimento (Art. 18, VI).",
            "Informação sobre compartilhamento (Art. 18, VII): saber com quem seus dados são compartilhados.",
            "Revogação do consentimento (Art. 18, IX), quando o consentimento for a base legal aplicável.",
            "Oposição ao tratamento baseado em legítimo interesse (Art. 18, IX).",
            "Direito de petição à ANPD (Autoridade Nacional de Proteção de Dados).",
          ],
        },
        { type: "h3", text: "Direitos pelo GDPR (usuários na UE/EEE)" },
        {
          type: "ul",
          items: [
            "Direito de acesso (Art. 15): solicitar uma cópia dos dados pessoais que mantemos sobre você.",
            "Direito de retificação (Art. 16): corrigir informações imprecisas ou incompletas.",
            "Direito à eliminação / direito ao esquecimento (Art. 17): solicitar a exclusão dos seus dados.",
            "Direito à limitação do tratamento (Art. 18): pausar o tratamento enquanto uma reclamação está sendo analisada.",
            "Direito à portabilidade dos dados (Art. 20): receber seus dados em formato legível por máquina.",
            "Direito de oposição (Art. 21): opor-se ao tratamento baseado em legítimo interesse.",
            "Direito de reclamação junto à autoridade supervisora nacional.",
          ],
        },
        { type: "h3", text: "Exclusão de Conta" },
        {
          type: "p",
          text: `A exclusão de conta é realizada atualmente mediante solicitação por e-mail para ${CONTACT_EMAIL}. O Controlador se compromete a processar as solicitações de exclusão em até 15 dias úteis após a verificação do recebimento, com confirmação enviada ao seu e-mail ao término.`,
        },
        {
          type: "p",
          text: "A exclusão abrange: seus dados de perfil (nome, e-mail, foto), salas que você criou (com aviso aos co-participantes), seu histórico de votos e mensagens de feedback que você enviou. Logs de segurança e backups seguem o ciclo de retenção descrito na Seção 9 (até 90 dias) antes da exclusão permanente.",
        },
        {
          type: "p",
          text: "O roadmap da plataforma inclui um recurso de exclusão de conta em autoatendimento. Isso é reconhecido como meta futura e não está disponível atualmente na plataforma.",
        },
      ],
    },
    {
      id: "cookies",
      title: "11. Cookies e Armazenamento Local",
      blocks: [
        {
          type: "p",
          text: "O RetroDash não usa cookies publicitários nem pixels de rastreamento de terceiros. Utilizamos apenas armazenamento local do navegador estritamente necessário para o funcionamento da plataforma — tokens do Firebase Authentication e estado temporário da interface.",
        },
        {
          type: "p-link",
          before: "Para detalhes completos sobre o que é armazenado, por quê, por quanto tempo e como limpar, consulte nossa ",
          linkText: "Política de Cookies e Armazenamento Local",
          href: "/cookies",
          after: ".",
        },
      ],
    },
    {
      id: "seguranca",
      title: "12. Segurança",
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
            "Controles de acesso: regras de segurança do Firestore restringem o acesso para que usuários leiam e escrevam apenas os dados aos quais estão autorizados.",
            "Hash de senhas: as senhas de sala são armazenadas como hashes SHA-256 — nunca em texto puro nem transmitidas como tal.",
            "Sem manuseio de credenciais: a autenticação é delegada inteiramente ao Google OAuth 2.0 — nunca vemos nem armazenamos sua senha do Google.",
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
      title: "13. Privacidade de Crianças",
      blocks: [
        {
          type: "p",
          text: "O RetroDash não é direcionado a crianças menores de 13 anos (ou menores de 16 anos na União Europeia, conforme a legislação local aplicável). A plataforma é projetada para contextos profissionais de equipe — os usuários esperados e típicos são adultos em ambiente de trabalho.",
        },
        {
          type: "p",
          text: "Não há mecanismo técnico de verificação de idade. Ao fazer login com o Google e usar a plataforma, os usuários declaram que atendem ao requisito de idade mínima aplicável em sua jurisdição.",
        },
        {
          type: "p",
          text: `Se o Controlador for notificado de que um usuário abaixo da idade mínima aplicável criou uma conta, essa conta e todos os dados associados serão excluídos imediatamente. Para comunicar tal situação, entre em contato: ${CONTACT_EMAIL}.`,
        },
      ],
    },
    {
      id: "alteracoes",
      title: "14. Alterações nesta Política",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar esta Política de Privacidade para refletir mudanças em nossas práticas ou na legislação aplicável. Quando realizarmos alterações materiais:",
        },
        {
          type: "ul",
          items: [
            "Atualizaremos a data de \"Última atualização\" no topo desta página.",
            "Publicaremos um aviso dentro do aplicativo RetroDash.",
            "Quando exigido pela legislação aplicável, notificaremos os usuários afetados por e-mail com pelo menos 30 dias de antecedência antes das alterações entrarem em vigor.",
          ],
        },
        {
          type: "p",
          text: "O uso continuado do RetroDash após a data de vigência constitui aceitação da política atualizada. Se você não concordar, deve interromper o uso da plataforma antes da data de vigência.",
        },
      ],
    },
    {
      id: "contato",
      title: "15. Fale Conosco",
      blocks: [
        {
          type: "p",
          text: "Para dúvidas sobre privacidade, solicitações de acesso a dados, reclamações ou para exercer seus direitos, entre em contato diretamente com o Controlador:",
        },
        {
          type: "ul",
          items: [
            `E-mail: ${CONTACT_EMAIL}`,
            "Controlador: Igor Patrick Ponticelli, Blumenau, Santa Catarina, Brasil.",
            "Por se tratar de projeto individual, não há DPO formalmente designado. O controlador atende pessoalmente todas as solicitações dos titulares. Nosso objetivo é responder em até 15 dias úteis.",
          ],
        },
      ],
    },
  ],
};

export function getPrivacyContent(locale: string): LegalContent {
  return locale === "pt-BR" ? pt : en;
}

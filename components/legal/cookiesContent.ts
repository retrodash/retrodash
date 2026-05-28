import type { LegalContent } from "./privacyContent";

const CONTACT_EMAIL = "patrickigor.ip@gmail.com";
const DATE_EN = "May 27, 2026";
const DATE_PT = "27 de maio de 2026";

const en: LegalContent = {
  backHome: "← Back to Home",
  label: "Legal",
  title: "Cookie and Local Storage Policy",
  lastUpdated: `Last updated: ${DATE_EN}`,
  disclaimer: "",
  sections: [
    {
      id: "what-this-covers",
      title: "1. What This Policy Covers",
      blocks: [
        {
          type: "p",
          text: "This policy explains how RetroDash (retrodash.com.br) uses your browser's local storage and session storage. It is a companion document to our Privacy Policy and exists to give you a dedicated, clear reference for all storage-related practices.",
        },
        {
          type: "p",
          text: "The short version: RetroDash does not use tracking cookies, advertising cookies, analytics cookies, or any third-party cookies. We use only browser-local storage that is strictly necessary for the platform to function.",
        },
      ],
    },
    {
      id: "definitions",
      title: "2. Quick Definitions",
      blocks: [
        {
          type: "p",
          text: "Here is a plain-language explanation of the technologies referenced in this policy:",
        },
        {
          type: "ul",
          items: [
            "HTTP Cookie: a small text file set by a server and stored in your browser. Sent back to the server on every request for that domain. Can persist across browser sessions.",
            "localStorage: a browser API that stores key-value pairs on your device. Data persists until explicitly cleared — it survives closing and reopening the browser tab.",
            "sessionStorage: similar to localStorage, but data is automatically deleted when you close the browser tab. It does not persist across tabs or sessions.",
          ],
        },
      ],
    },
    {
      id: "what-we-use",
      title: "3. What We Use",
      blocks: [
        {
          type: "p",
          text: "The table below is a complete inventory of everything RetroDash stores in your browser.",
        },
        {
          type: "table",
          headers: ["Technology", "Location", "What It Stores", "Purpose", "Duration", "Essential?"],
          rows: [
            [
              "localStorage",
              "Your browser",
              "Firebase Authentication token",
              "Keeps you signed in across tabs and page reloads",
              "Until sign-out or manual clear",
              "Yes",
            ],
            [
              "sessionStorage",
              "Your browser",
              "Temporary UI state (e.g. card drafts in progress)",
              "Prevents losing text when switching tabs",
              "Deleted when the tab is closed",
              "Yes",
            ],
            [
              "HTTP Cookies",
              "—",
              "None — no cookies are set by RetroDash",
              "—",
              "—",
              "—",
            ],
            [
              "Third-party Cookies",
              "—",
              "None — no analytics, no ad pixels, no tracking",
              "—",
              "—",
              "—",
            ],
          ],
        },
      ],
    },
    {
      id: "no-consent-banner",
      title: "4. Why We Don't Show a Cookie Consent Banner",
      blocks: [
        {
          type: "p",
          text: "You may have noticed that RetroDash does not display a cookie consent banner. This is intentional and legally grounded:",
        },
        {
          type: "ul",
          items: [
            "LGPD (Brazil): storage that is strictly necessary to provide a service explicitly requested by the user is covered by the legal basis of performance of a contract (Art. 7º, V of Lei 13.709/2018). Separate consent is not required for technically necessary storage.",
            "GDPR / ePrivacy Directive (EU): Article 5(3) of the ePrivacy Directive (2002/58/EC) exempts from the consent requirement any storage that is \"strictly necessary\" to provide a communication service explicitly requested by the user. All storage listed in Section 3 falls within this exemption.",
            "No non-essential storage: because RetroDash uses no marketing, analytics, personalization, or behavioral-profiling storage, the scenarios that trigger the consent requirement do not apply.",
          ],
        },
        {
          type: "p",
          text: "In plain terms: we only store what is needed to keep you signed in and to avoid losing your in-progress text. No consent banner is needed for that.",
        },
      ],
    },
    {
      id: "user-control",
      title: "5. How You Can Control Storage",
      blocks: [
        {
          type: "p",
          text: "You can clear localStorage and sessionStorage at any time through your browser's developer tools or settings. Note that clearing these will sign you out of RetroDash and may discard any unsaved card drafts.",
        },
        { type: "h3", text: "Chrome / Chromium-based browsers (Chrome, Edge, Brave)" },
        {
          type: "ul",
          items: [
            "Open DevTools: F12 or right-click and select Inspect.",
            "Go to Application tab.",
            "Under Storage, expand Local Storage or Session Storage.",
            "Select the retrodash.com.br entry and click the delete icon, or use Clear Site Data.",
          ],
        },
        { type: "h3", text: "Firefox" },
        {
          type: "ul",
          items: [
            "Open DevTools: F12.",
            "Go to Storage tab.",
            "Expand Local Storage or Session Storage.",
            "Right-click on the retrodash.com.br entry and select Delete All.",
          ],
        },
        { type: "h3", text: "Safari" },
        {
          type: "ul",
          items: [
            "Go to Safari menu: Develop > Show Web Inspector (enable Develop menu first in Safari Preferences > Advanced).",
            "Go to Storage tab.",
            "Select Local Storage or Session Storage and delete the RetroDash entries.",
          ],
        },
        { type: "h3", text: "Alternatively — Clear all browsing data" },
        {
          type: "p",
          text: "All major browsers offer a \"Clear browsing data\" option (typically in Settings) that lets you remove all site data, including localStorage. This will sign you out of all websites.",
        },
      ],
    },
    {
      id: "future-changes",
      title: "6. If This Changes",
      blocks: [
        {
          type: "p",
          text: "We are committed to transparency. If RetroDash ever adopts analytics, advertising, or any other non-essential storage technology in the future, we will:",
        },
        {
          type: "ul",
          items: [
            "Update this policy before activating the technology.",
            "Implement an appropriate consent banner or mechanism before any non-essential storage is placed.",
            "Notify users of the change via the Privacy Policy update notice and, where required by law, by email.",
          ],
        },
        {
          type: "p",
          text: "We will not activate non-essential storage without a compliant consent mechanism in place first.",
        },
      ],
    },
    {
      id: "contact",
      title: "7. Contact Us",
      blocks: [
        {
          type: "p",
          text: `For questions about this policy or our storage practices, contact the Data Controller at ${CONTACT_EMAIL}.`,
        },
        {
          type: "p",
          text: "Data Controller: Igor Patrick Ponticelli, Blumenau, Santa Catarina, Brazil.",
        },
      ],
    },
  ],
};

const pt: LegalContent = {
  backHome: "← Voltar ao Início",
  label: "Jurídico",
  title: "Política de Cookies e Armazenamento Local",
  lastUpdated: `Última atualização: ${DATE_PT}`,
  disclaimer: "",
  sections: [
    {
      id: "o-que-cobre",
      title: "1. O Que Esta Política Cobre",
      blocks: [
        {
          type: "p",
          text: "Esta política explica como o RetroDash (retrodash.com.br) utiliza o localStorage e o sessionStorage do seu navegador. É um documento complementar à nossa Política de Privacidade e existe para oferecer uma referência dedicada e clara sobre todas as práticas de armazenamento.",
        },
        {
          type: "p",
          text: "Resumo: o RetroDash não usa cookies de rastreamento, cookies publicitários, cookies de analytics nem cookies de terceiros. Utilizamos apenas armazenamento local do navegador estritamente necessário para o funcionamento da plataforma.",
        },
      ],
    },
    {
      id: "definicoes",
      title: "2. Definições Rápidas",
      blocks: [
        {
          type: "p",
          text: "Explicação em linguagem acessível das tecnologias mencionadas nesta política:",
        },
        {
          type: "ul",
          items: [
            "Cookie HTTP: pequeno arquivo de texto definido por um servidor e armazenado no seu navegador. É reenviado ao servidor a cada requisição para aquele domínio. Pode persistir entre sessões do navegador.",
            "localStorage: API do navegador que armazena pares chave-valor no seu dispositivo. Os dados persistem até serem explicitamente apagados — sobrevivem ao fechamento e reabertura da aba.",
            "sessionStorage: semelhante ao localStorage, mas os dados são automaticamente deletados ao fechar a aba. Não persiste entre abas nem entre sessões.",
          ],
        },
      ],
    },
    {
      id: "o-que-usamos",
      title: "3. O Que Usamos",
      blocks: [
        {
          type: "p",
          text: "A tabela abaixo é um inventário completo de tudo que o RetroDash armazena no seu navegador.",
        },
        {
          type: "table",
          headers: ["Tecnologia", "Onde", "O que armazena", "Finalidade", "Duração", "Essencial?"],
          rows: [
            [
              "localStorage",
              "Navegador do usuário",
              "Token de autenticação do Firebase Auth",
              "Manter sessão entre abas e recarregamentos",
              "Até logout ou limpeza manual",
              "Sim",
            ],
            [
              "sessionStorage",
              "Navegador do usuário",
              "Estado temporário da interface (ex.: rascunhos de cards)",
              "Não perder texto ao trocar de aba",
              "Apagado ao fechar a aba",
              "Sim",
            ],
            [
              "Cookies HTTP",
              "—",
              "Nenhum — o RetroDash não define cookies",
              "—",
              "—",
              "—",
            ],
            [
              "Cookies de terceiros",
              "—",
              "Nenhum — sem analytics, sem pixels, sem ads",
              "—",
              "—",
              "—",
            ],
          ],
        },
      ],
    },
    {
      id: "sem-banner",
      title: "4. Por Que Não Exibimos Banner de Consentimento",
      blocks: [
        {
          type: "p",
          text: "Você pode ter notado que o RetroDash não exibe um banner de consentimento de cookies. Isso é intencional e juridicamente fundamentado:",
        },
        {
          type: "ul",
          items: [
            "LGPD (Brasil): o armazenamento estritamente necessário para prestar um serviço explicitamente solicitado pelo usuário é coberto pela base legal de execução de contrato (Art. 7º, V da Lei 13.709/2018). Consentimento separado não é exigido para armazenamento tecnicamente necessário.",
            "GDPR / Diretiva ePrivacy (UE): o Art. 5(3) da Diretiva ePrivacy (2002/58/CE) isenta do requisito de consentimento qualquer armazenamento \"estritamente necessário\" para fornecer um serviço de comunicação explicitamente solicitado pelo usuário. Todo o armazenamento listado na Seção 3 se enquadra nesta isenção.",
            "Sem armazenamento não essencial: como o RetroDash não usa armazenamento de marketing, analytics, personalização ou perfis comportamentais, os cenários que acionam o requisito de consentimento não se aplicam.",
          ],
        },
        {
          type: "p",
          text: "Em termos simples: armazenamos apenas o necessário para manter você autenticado e para não perder textos em andamento. Não é necessário banner de consentimento para isso.",
        },
      ],
    },
    {
      id: "controle-usuario",
      title: "5. Como Você Pode Controlar o Armazenamento",
      blocks: [
        {
          type: "p",
          text: "Você pode limpar o localStorage e o sessionStorage a qualquer momento pelas ferramentas de desenvolvedor ou configurações do navegador. Atenção: limpar esses dados encerrará sua sessão no RetroDash e pode descartar rascunhos de cards não salvos.",
        },
        { type: "h3", text: "Chrome / navegadores baseados em Chromium (Chrome, Edge, Brave)" },
        {
          type: "ul",
          items: [
            "Abra o DevTools: F12 ou clique com o botão direito e selecione Inspecionar.",
            "Vá até a aba Aplicativo (Application).",
            "Em Armazenamento, expanda Armazenamento Local ou Armazenamento de Sessão.",
            "Selecione a entrada retrodash.com.br e clique no ícone de exclusão, ou use Limpar dados do site.",
          ],
        },
        { type: "h3", text: "Firefox" },
        {
          type: "ul",
          items: [
            "Abra o DevTools: F12.",
            "Vá até a aba Armazenamento (Storage).",
            "Expanda Armazenamento Local ou Armazenamento de Sessão.",
            "Clique com o botão direito na entrada retrodash.com.br e selecione Excluir tudo.",
          ],
        },
        { type: "h3", text: "Safari" },
        {
          type: "ul",
          items: [
            "Vá em menu Safari: Desenvolvedor > Mostrar Inspetor Web (ative o menu Desenvolvedor em Preferências do Safari > Avançado).",
            "Vá à aba Armazenamento (Storage).",
            "Selecione Armazenamento Local ou Armazenamento de Sessão e exclua as entradas do RetroDash.",
          ],
        },
        { type: "h3", text: "Alternativamente: limpar todos os dados de navegação" },
        {
          type: "p",
          text: "Todos os principais navegadores oferecem a opção \"Limpar dados de navegação\" (geralmente em Configurações) que permite remover todos os dados de sites, incluindo o localStorage. Isso encerrará sua sessão em todos os sites.",
        },
      ],
    },
    {
      id: "mudancas-futuras",
      title: "6. Se Isso Mudar",
      blocks: [
        {
          type: "p",
          text: "Estamos comprometidos com a transparência. Se o RetroDash vier a adotar analytics, publicidade ou qualquer outra tecnologia de armazenamento não essencial no futuro:",
        },
        {
          type: "ul",
          items: [
            "Atualizaremos esta política antes de ativar a tecnologia.",
            "Implementaremos um banner ou mecanismo de consentimento adequado antes de qualquer armazenamento não essencial ser inserido.",
            "Notificaremos os usuários sobre a mudança por meio do aviso de atualização da Política de Privacidade e, quando exigido por lei, por e-mail.",
          ],
        },
        {
          type: "p",
          text: "Não ativaremos armazenamento não essencial sem que um mecanismo de consentimento adequado esteja em vigor primeiro.",
        },
      ],
    },
    {
      id: "contato",
      title: "7. Fale Conosco",
      blocks: [
        {
          type: "p",
          text: `Para dúvidas sobre esta política ou nossas práticas de armazenamento, entre em contato com o Controlador: ${CONTACT_EMAIL}.`,
        },
        {
          type: "p",
          text: "Controlador: Igor Patrick Ponticelli, Blumenau, Santa Catarina, Brasil.",
        },
      ],
    },
  ],
};

export function getCookiesContent(locale: string): LegalContent {
  return locale === "pt-BR" ? pt : en;
}

/**
 * Documents légaux affichés dans l'app (route /legal/[slug]) et sur la version web.
 *
 * ⚠️ Premier jet à faire valider par un professionnel avant commercialisation.
 * Les passages entre crochets [À COMPLÉTER …] doivent être renseignés.
 *
 * Toute modification substantielle des CGU ou de la politique de confidentialité
 * doit s'accompagner d'une nouvelle `version` (l'acceptation est enregistrée
 * avec la version en vigueur, cf. getTermsAcceptanceMetadata).
 */

export type LegalSlug = "cgu" | "confidentialite" | "mentions-legales";

export interface LegalSection {
  heading: string;
  /** Un paragraphe par entrée ; les lignes commençant par "• " sont des puces */
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  version: string;
  updatedAt: string;
  sections: LegalSection[];
}

const CONTACT_EMAIL =
  "[À COMPLÉTER : email de contact, ex. contact@equigroom.fr]";
const PUBLISHER = "[À COMPLÉTER : nom de l'éditeur / raison sociale]";

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocument> = {
  "mentions-legales": {
    title: "Mentions légales",
    version: "1.0",
    updatedAt: "25/10/2026",
    sections: [
      {
        heading: "Éditeur de l'application",
        paragraphs: [
          `L'application Equigroom est éditée par ${PUBLISHER}.`,
          "• Forme juridique : [À COMPLÉTER : micro-entreprise, SAS, SARL…]",
          "• Capital social : [À COMPLÉTER, si société]",
          "• Siège social : [À COMPLÉTER : adresse]",
          "• SIRET : [À COMPLÉTER]",
          "• RCS / RNE : [À COMPLÉTER]",
          "• N° TVA intracommunautaire : [À COMPLÉTER, si applicable]",
          `• Email : ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: "Directeur de la publication",
        paragraphs: ["[À COMPLÉTER : prénom et nom]"],
      },
      {
        heading: "Hébergement",
        paragraphs: [
          "Les données de l'application sont hébergées par Supabase Inc. [À COMPLÉTER : adresse postale et téléphone, à vérifier sur supabase.com].",
          "Région d'hébergement de la base de données : [À COMPLÉTER : ex. Union européenne – Francfort (eu-central-1)].",
          "[À COMPLÉTER si la version web est hébergée ailleurs : nom, adresse et téléphone de l'hébergeur web, ex. Expo / EAS Hosting]",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des éléments de l'application (marque, logo, textes, illustrations, code) est la propriété exclusive de l'éditeur ou fait l'objet d'une autorisation d'utilisation. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Pour toute question, vous pouvez nous écrire à ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },

  confidentialite: {
    title: "Politique de confidentialité",
    version: "1.0",
    updatedAt: "25/10/2026",
    sections: [
      {
        heading: "1. Qui sommes-nous ?",
        paragraphs: [
          `Le responsable du traitement de vos données personnelles est ${PUBLISHER}, éditeur de l'application Equigroom (voir les mentions légales).`,
          `Pour toute question relative à vos données : ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: "2. Données collectées",
        paragraphs: [
          "Nous collectons uniquement les données nécessaires au fonctionnement de l'application :",
          "• Données de compte : prénom, nom, adresse email, mot de passe (stocké sous forme chiffrée, jamais en clair), numéro de téléphone (facultatif).",
          "• Si vous utilisez la connexion Google : nom, adresse email et identifiant de compte transmis par Google.",
          "• Données que vous saisissez : informations sur vos chevaux (nom, race, robe, taille, date de naissance), suivi de santé de vos chevaux, rendez-vous.",
          "• Données techniques : date de création du compte, dates de connexion et informations de session nécessaires à la sécurité du service.",
          "• Preuve d'acceptation : date et version des CGU et de la présente politique au moment de l'inscription.",
          "Les informations de santé concernent vos chevaux et non votre personne ; elles ne constituent pas des données de santé au sens du RGPD.",
        ],
      },
      {
        heading: "3. Pourquoi et sur quelle base ?",
        paragraphs: [
          "• Créer et gérer votre compte, fournir les fonctionnalités de l'application : exécution du contrat (les CGU que vous acceptez).",
          "• Vous envoyer les emails liés au compte (confirmation d'adresse, réinitialisation du mot de passe) : exécution du contrat.",
          "• Assurer la sécurité du service et prévenir les abus : intérêt légitime de l'éditeur.",
          "• Conserver la preuve de votre acceptation des CGU : obligation légale et intérêt légitime.",
          "Nous ne vendons pas vos données et ne les utilisons pas à des fins publicitaires.",
        ],
      },
      {
        heading: "4. Qui a accès à vos données ?",
        paragraphs: [
          "Vos données sont accessibles uniquement à l'éditeur et aux prestataires techniques strictement nécessaires, qui agissent sur nos instructions :",
          "• Supabase Inc. : hébergement de la base de données et authentification.",
          "• Google Ireland Limited : uniquement si vous choisissez la connexion avec Google.",
          "[À COMPLÉTER si vous ajoutez d'autres services : statistiques, notifications, paiement…]",
        ],
      },
      {
        heading: "5. Transferts hors de l'Union européenne",
        paragraphs: [
          "Vos données sont hébergées dans l'Union européenne [À COMPLÉTER : région exacte]. Certains prestataires (Supabase, Google) sont des sociétés dont le siège est situé hors de l'Union européenne ; le cas échéant, les transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou par le Data Privacy Framework UE–États-Unis.",
        ],
      },
      {
        heading: "6. Durée de conservation",
        paragraphs: [
          "• Données du compte et données saisies : pendant toute la durée d'utilisation de votre compte.",
          "• En cas de suppression du compte : effacement de vos données dans un délai maximal de 30 jours, sauf obligation légale de conservation.",
          "• En cas d'inactivité pendant 3 ans : nous vous prévenons par email, puis supprimons le compte sans réaction de votre part.",
          "• Preuve d'acceptation des CGU : jusqu'à 5 ans après la suppression du compte (délai de prescription).",
        ],
      },
      {
        heading: "7. Vos droits",
        paragraphs: [
          "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :",
          "• accès à vos données et obtention d'une copie ;",
          "• rectification des données inexactes ;",
          "• effacement (vous pouvez supprimer votre compte directement depuis l'onglet Profil de l'application) ;",
          "• portabilité de vos données dans un format lisible ;",
          "• opposition et limitation du traitement ;",
          "• définition de directives sur le sort de vos données après votre décès.",
          `Pour exercer ces droits, écrivez-nous à ${CONTACT_EMAIL}. Nous répondons dans un délai d'un mois.`,
          "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).",
        ],
      },
      {
        heading: "8. Sécurité",
        paragraphs: [
          "Les échanges entre l'application et nos serveurs sont chiffrés (HTTPS). Les mots de passe sont stockés sous forme chiffrée. L'accès aux données est restreint à chaque utilisateur pour ses propres informations.",
        ],
      },
      {
        heading: "9. Traceurs",
        paragraphs: [
          "L'application n'utilise aucun traceur publicitaire ni outil de mesure d'audience. Seules des données strictement nécessaires au fonctionnement (maintien de votre session) sont enregistrées sur votre appareil.",
          "[À METTRE À JOUR si vous ajoutez un outil de statistiques ou de suivi d'erreurs]",
        ],
      },
      {
        heading: "10. Modifications",
        paragraphs: [
          "Nous pouvons faire évoluer cette politique. En cas de modification importante, vous en serez informé dans l'application ou par email.",
        ],
      },
    ],
  },

  cgu: {
    title: "Conditions générales d'utilisation",
    version: "1.0",
    updatedAt: "25/10/2026",
    sections: [
      {
        heading: "1. Objet",
        paragraphs: [
          `Les présentes conditions générales d'utilisation (CGU) encadrent l'accès et l'utilisation de l'application Equigroom, éditée par ${PUBLISHER}. Equigroom permet de gérer et suivre ses chevaux : fiches, suivi de santé et rendez-vous.`,
          "En créant un compte, vous acceptez les présentes CGU sans réserve.",
        ],
      },
      {
        heading: "2. Accès au service",
        paragraphs: [
          "L'application est accessible gratuitement. Les éventuels frais de connexion à internet restent à votre charge.",
          "Des fonctionnalités payantes pourront être proposées ultérieurement ; elles feront alors l'objet de conditions générales de vente distinctes, que vous devrez accepter avant tout achat.",
          "L'éditeur s'efforce d'assurer la disponibilité du service mais ne peut garantir un fonctionnement sans interruption. Le service peut être suspendu pour maintenance ou mise à jour.",
        ],
      },
      {
        heading: "3. Inscription et compte",
        paragraphs: [
          "L'inscription est réservée aux personnes âgées d'au moins 15 ans. En dessous de cet âge, l'accord d'un titulaire de l'autorité parentale est nécessaire.",
          "Vous vous engagez à fournir des informations exactes et à les maintenir à jour. Vos identifiants sont personnels : vous êtes responsable de leur confidentialité et de toute activité réalisée depuis votre compte.",
          `En cas d'utilisation non autorisée de votre compte, prévenez-nous sans délai à ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: "4. Utilisation du service",
        paragraphs: [
          "Vous vous engagez à utiliser l'application de manière loyale et conforme à la loi, et notamment à ne pas :",
          "• porter atteinte au fonctionnement ou à la sécurité du service ;",
          "• tenter d'accéder aux données d'autres utilisateurs ;",
          "• publier des contenus illicites, injurieux ou portant atteinte aux droits de tiers.",
        ],
      },
      {
        heading: "5. Informations de santé des chevaux",
        paragraphs: [
          "Les fonctionnalités de suivi de santé sont un outil d'organisation personnel. Elles ne constituent en aucun cas un avis médical vétérinaire et ne remplacent pas la consultation d'un vétérinaire.",
          "En cas de doute sur l'état de santé d'un animal, consultez un professionnel. L'éditeur ne saurait être tenu responsable des décisions prises sur la base des informations enregistrées dans l'application.",
        ],
      },
      {
        heading: "6. Vos contenus",
        paragraphs: [
          "Vous restez propriétaire des informations que vous saisissez. Vous accordez à l'éditeur le droit de les héberger et de les traiter uniquement dans le but de vous fournir le service.",
        ],
      },
      {
        heading: "7. Responsabilité",
        paragraphs: [
          "L'éditeur met en œuvre les moyens raisonnables pour assurer un service de qualité, dans le cadre d'une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de force majeure, de mauvaise utilisation du service ou de défaillance de votre appareil ou de votre connexion.",
          "Nous vous recommandons de conserver par ailleurs les documents importants concernant vos chevaux (carnet de santé, ordonnances…).",
        ],
      },
      {
        heading: "8. Propriété intellectuelle",
        paragraphs: [
          "L'application, sa marque, son logo et ses contenus sont protégés. Vous bénéficiez d'un droit d'utilisation personnel et non exclusif, limité à l'usage normal du service.",
        ],
      },
      {
        heading: "9. Suspension et suppression du compte",
        paragraphs: [
          "Vous pouvez supprimer votre compte à tout moment depuis l'onglet Profil de l'application. Cette suppression entraîne l'effacement de vos données dans les conditions prévues par la politique de confidentialité.",
          "L'éditeur peut suspendre ou supprimer un compte en cas de manquement grave aux présentes CGU, après vous en avoir informé, sauf urgence ou obligation légale.",
        ],
      },
      {
        heading: "10. Données personnelles",
        paragraphs: [
          "Le traitement de vos données personnelles est décrit dans la politique de confidentialité, accessible depuis l'application.",
        ],
      },
      {
        heading: "11. Modification des CGU",
        paragraphs: [
          "Les CGU peuvent évoluer. Vous serez informé de toute modification importante ; la poursuite de l'utilisation du service après cette information vaut acceptation des nouvelles CGU.",
        ],
      },
      {
        heading: "12. Droit applicable et litiges",
        paragraphs: [
          "Les présentes CGU sont soumises au droit français.",
          `En cas de litige, nous vous invitons à nous contacter en premier lieu à ${CONTACT_EMAIL} afin de rechercher une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents ; si vous êtes un consommateur, vous pouvez saisir la juridiction du lieu de votre domicile.`,
        ],
      },
    ],
  },
};

/** Métadonnées enregistrées sur l'utilisateur Supabase lors de l'acceptation */
export function getTermsAcceptanceMetadata() {
  return {
    terms_version: LEGAL_DOCUMENTS.cgu.version,
    privacy_version: LEGAL_DOCUMENTS.confidentialite.version,
    terms_accepted_at: new Date().toISOString(),
  };
}

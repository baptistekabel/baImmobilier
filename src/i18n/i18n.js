import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.services": "Nos Services",
      "nav.about": "Qui sommes-nous ?",
      "nav.properties": "Propriétés",
      "nav.sell": "Vendre",
      "nav.contact": "Contact",

      // Hero Section
      "hero.title": "Unir nos histoires, construire notre avenir.",
      "hero.subtitle": "Votre partenaire immobilier de confiance entre l'Afrique et les Antilles",
      "hero.cta.discover": "Découvrir nos biens",
      "hero.cta.contact": "Nous contacter",

      // Services
      "services.title": "Nos Services",
      "services.location.title": "Location",
      "services.location.desc": "Trouvez votre lieu de vie idéal",
      "services.buyAndSell.title": "Achat & Vente",
      "services.buyAndSell.desc": "Nous vous accompagnons dans tous vos projets d'acquisition et de cession immobilière",
      "services.achat.title": "Achat Immobilier",
      "services.achat.desc": "Trouvez et acquérez le bien immobilier de vos rêves avec notre accompagnement expert",
      "services.vente.title": "Vente Immobilière",
      "services.vente.desc": "Valorisez et vendez votre bien immobilier dans les meilleures conditions",
      "services.renovationAndConstruction.title": "Rénovation & Construction",
      "services.renovationAndConstruction.desc": "De la rénovation complète à la construction neuve, concrétisons vos projets",
      "services.renovation.title": "Rénovation",
      "services.renovation.desc": "Transformez et modernisez votre bien immobilier avec notre expertise",
      "services.construction.title": "Construction",
      "services.construction.desc": "Concrétisez vos projets de construction neuve de A à Z",
      "services.consulting.title": "Conseil",
      "services.consulting.desc": "Accompagnement personnalisé dans vos projets immobiliers",
      "services.propertyHunting.title": "Chasseur de biens",
      "services.propertyHunting.desc": "Service personnalisé de recherche de biens immobiliers selon vos critères spécifiques.",

      // Why Choose Us
      "why.title": "Pourquoi nous choisir ?",
      "why.transparency.title": "Transparence totale",
      "why.transparency.desc": "Tous nos process sont clairs et transparents",
      "why.diaspora.title": "Diaspora & Afrique connectées",
      "why.diaspora.desc": "Nous unissons deux mondes, deux cultures",
      "why.expertise.title": "Formation ESG, expérience Cogedim et Foncia",
      "why.expertise.desc": "Une expertise immobilière reconnue et certifiée",

      // About - New detailed sections
      "about.story.title": "Mon histoire",
      "about.story.intro": "Je suis Idriss Ba, fondateur de BA Immobilier. Fils d'un père sénégalais et d'une mère guadeloupéenne, j'ai grandi avec deux cultures, deux continents, deux visions du monde.",
      "about.story.identity": "Cette double identité m'a appris une chose essentielle : l'Afrique et la Caraïbe doivent être reliées par des passerelles solides.",
      "about.story.mission": "C'est cette conviction qui m'anime aujourd'hui : permettre à la diaspora et aux investisseurs locaux de bâtir ensemble un immobilier durable, rentable et transparent.",

      "about.senegal.title": "Pourquoi le Sénégal ?",
      "about.senegal.intro": "Le Sénégal est aujourd'hui l'un des marchés immobiliers les plus attractifs d'Afrique :",
      "about.senegal.economy": "Une économie en pleine croissance et un environnement politique stable",
      "about.senegal.demand": "Une demande locative forte, portée par l'urbanisation et la jeunesse de la population",
      "about.senegal.diaspora": "Une diaspora très active qui investit de plus en plus dans la pierre",
      "about.senegal.conclusion": "C'est pour toutes ces raisons que BA Immobilier a choisi de commencer au Sénégal. Mais notre vision va au-delà : avec notre expertise et nos réseaux, nous ouvrons la voie pour investir demain dans toute l'Afrique, en toute sécurité.",

      "about.journey.title": "Mon parcours",
      "about.journey.education": "Diplômé d'un Master en Immobilier et Développement Commercial à l'ESG Bordeaux, j'ai construit une expertise solide dans la gestion de projets immobiliers, la stratégie et le développement commercial.",
      "about.journey.experience": "J'ai travaillé avec deux grands acteurs de l'immobilier :",
      "about.journey.cogedim": "L'un des meilleurs promoteurs immobiliers français - rigueur et exigence dans la commercialisation et le suivi de projets d'envergure",
      "about.journey.foncia": "Leader européen de la gestion et transaction - expertise en transaction, relation client et gestion locative",
      "about.journey.conclusion": "Ces expériences m'ont donné une vision complète de l'immobilier – de la promotion à la transaction, en passant par la gestion locative et le conseil.",

      "about.mission.title": "Notre mission avec BA Immobilier",
      "about.mission.intro": "Fort de ce parcours, j'ai créé BA Immobilier avec une mission claire :",
      "about.mission.diaspora": "Accompagner la diaspora africaine et caribéenne qui souhaite investir à distance, avec un cadre sécurisé et transparent",
      "about.mission.local": "Offrir aux investisseurs locaux un service fiable, moderne et rigoureux, adapté aux réalités du marché sénégalais",
      "about.mission.future": "Poser les bases d'un modèle qui permettra demain à nos clients d'investir partout en Afrique, avec le même niveau de confiance et d'exigence",

      "about.commitments.title": "Nos engagements",
      "about.commitments.intro": "Chez BA Immobilier, nous travaillons exclusivement avec des promoteurs sérieux, des notaires partenaires et des professionnels locaux de confiance.",
      "about.commitments.services": "Nous proposons un accompagnement complet :",
      "about.commitments.buyAndSell": "Achat & Vente sécurisée",
      "about.commitments.buyAndSellDesc": "Transactions immobilières avec accompagnement complet",
      "about.commitments.construction": "Construction & Suivi",
      "about.commitments.constructionDesc": "Gestion de chantiers avec rigueur et transparence",
      "about.commitments.rental": "Location & Gestion",
      "about.commitments.rentalDesc": "Gestion locative professionnelle",
      "about.commitments.concierge": "Conciergerie",
      "about.commitments.conciergeDesc": "Services personnalisés pour vos biens",
      "about.commitments.estimation": "Estimation de biens",
      "about.commitments.estimationDesc": "Évaluation précise de votre patrimoine",
      "about.commitments.advice": "Conseil diaspora",
      "about.commitments.adviceDesc": "Accompagnement spécialisé à distance",
      "about.commitments.quality": "Chaque projet est suivi avec rigueur et transparence pour garantir la sérénité de nos clients.",

      "about.promise.title": "Ma promesse",
      "about.promise.intro": "Avec BA Immobilier, je m'engage à :",
      "about.promise.rigor": "Vous accompagner avec la rigueur d'un grand promoteur",
      "about.promise.proximity": "Vous conseiller avec la proximité d'un interlocuteur de confiance",
      "about.promise.vision": "Vous ouvrir la porte à un immobilier panafricain durable et rentable",
      "about.promise.conclusion": "Nous commençons au Sénégal, mais avec BA Immobilier, vous avez un partenaire pour investir demain dans toute l'Afrique.",

      "about.video.title": "Mon parcours en quelques mots",
      "about.video.description": "Découvrez comment mon expérience chez les leaders français de l'immobilier et ma double culture m'ont mené à créer BA Immobilier. Un parcours professionnel au service de votre réussite.",

      // Newsletter
      "newsletter.title": "Restez informé",
      "newsletter.subtitle": "Recevez nos opportunités en Afrique et aux Antilles",
      "newsletter.placeholder": "Votre adresse email",
      "newsletter.button": "S'abonner",

      // Footer
      "footer.slogan": "Unir nos histoires, construire notre avenir.",
      "footer.links": "Liens utiles",
      "footer.legal": "Mentions légales",
      "footer.privacy": "Politique de confidentialité",
      "footer.contact.title": "Contact",
      "footer.contact.phone": "Téléphone",
      "footer.contact.email": "Email",
      "footer.social": "Suivez-nous",

      // Contact Form
      "contact.title": "Contactez-nous",
      "contact.name": "Nom complet",
      "contact.email": "Email",
      "contact.phone": "Téléphone",
      "contact.subject": "Sujet",
      "contact.message": "Message",
      "contact.send": "Envoyer",

      // Properties
      "properties.title": "Nos Biens",
      "properties.filter.location": "Localisation",
      "properties.filter.type": "Type",
      "properties.filter.price": "Prix",
      "properties.filter.surface": "Surface",
      "properties.details": "Voir détails"
    }
  },
  wo: {
    translation: {
      // Navigation
      "nav.home": "Kër",
      "nav.services": "Sunuy liggéey",
      "nav.about": "Kan la nu?",
      "nav.properties": "Kër yi",
      "nav.sell": "Jaay",
      "nav.contact": "Jokkul ak nu",

      // Hero Section
      "hero.title": "Bokk sunuy taariix, jëfandikoo sunuy àdduna",
      "hero.subtitle": "Samay mbëkk-kër bu nekk ci Afrig ak Antiy yi",
      "hero.cta.discover": "Gis sunuy kër yi",
      "hero.cta.contact": "Jokkul ak nu",

      // Services
      "services.title": "Sunuy liggéey",
      "services.location.title": "Këru jaar",
      "services.location.desc": "Jaar kër bu baax",
      "services.buyAndSell.title": "Jënd & Jaay",
      "services.buyAndSell.desc": "Jàppandoo la ci jënd ak jaay kër",
      "services.achat.title": "Jënd kër",
      "services.achat.desc": "Jënd kër bu baax ak sunuy jàppale",
      "services.vente.title": "Jaay kër",
      "services.vente.desc": "Jaay sa kër ci njariñ bu baax",
      "services.renovationAndConstruction.title": "Soppi & Jëf",
      "services.renovationAndConstruction.desc": "Ci soppiku ak jëf kër bu bees, def na sunuy proyee",
      "services.renovation.title": "Soppi kër",
      "services.renovation.desc": "Soppi ak jëfandikoo sa kër",
      "services.construction.title": "Jëf kër bu bees",
      "services.construction.desc": "Jëf kër bu bees ci samay jàppale",
      "services.consulting.title": "Ngënëm",
      "services.consulting.desc": "Jàppale ci kër ngir bokk ak yow",
      "services.propertyHunting.title": "Wutalkat kër",
      "services.propertyHunting.desc": "Liggéey bu njariñ ngir gis kër bu baax ci sa bëgg-bëgg.",

      // Why Choose Us
      "why.title": "Lu tax nga tànn nu?",
      "why.transparency.title": "Tëruwul bu mat",
      "why.transparency.desc": "Sunuy liggéey dafay tëruwul",
      "why.diaspora.title": "Diaspora ak Afrig yu bokk",
      "why.diaspora.desc": "Danu bokk ñaari àdduna, ñaari laaj",
      "why.expertise.title": "Jàng ESG, baax Cogedim ak Foncia",
      "why.expertise.desc": "Xam-xam bu mat ci kër bu gëstu",

      // About - New detailed sections
      "about.story.title": "Sama taariix",
      "about.story.intro": "Maa ngi Idriss Ba, ki sos BA Immobilier. Doom ba sama papa Senegale la, sama yaay Gwadalup la, mag naa ak ñaari laaj, ñaari jàmm, ñaari gees.",
      "about.story.identity": "Ñaari laaj yi jàngal naa benn dara bu mag: Afrig ak Karayib war na li ñu bokk ci pasrèl yu solide.",
      "about.story.mission": "Loolu la mën naa tey: jàppale diaspora ak ndogu-kër ci nekk suñu ñépp, jëf kër bu yeesal, bu am bénef ak bu tëruwul, daal ci Senegal.",

      "about.senegal.title": "Lu tax Senegal?",
      "about.senegal.intro": "Senegal la ci tey benn ci marché kër yu gëna nekk ci Afrig:",
      "about.senegal.economy": "Ekonomi bu ñëw-ñëw ak jàmmu politike bu sedd",
      "about.senegal.demand": "Waar bu mag ci jaar kër, jublu ci urbanisation ak doom-njaay yu bari",
      "about.senegal.diaspora": "Diaspora bu mag bu daj lekk-kër yu gëna yàgg",
      "about.senegal.conclusion": "Ci loolu lépp la BA Immobilier tànn Senegal. Waaye sunuy gees yàq na: ak sunuy xam-xam ak sunuy mbokk, dafay ubbi yoon ngir ñu lekk ci Afrig lépp, ci këy-këy.",

      "about.journey.title": "Sama yoon",
      "about.journey.education": "Jàngal Master ci kër ak développement commercial ci ESG Bordeaux, jëf naa xam-xam bu sedd ci gérer projet kër, stratégie ak développement commercial.",
      "about.journey.experience": "Liggéey naa ak ñaari bopp-bopp yu mag ci kër:",
      "about.journey.cogedim": "Benn ci promoteur kër yu gëna baax ci France - rigueur ak exigence ci commercialisation ak suivi projet yu mag",
      "about.journey.foncia": "Leader européen ci gestion ak transaction - xam-xam ci transaction, jëkkër client ak gestion locative",
      "about.journey.conclusion": "Xeeti jëf yi jox naa benn gees bu mat ci kër - ci promotion ba naan ci transaction, ci gestion locative ak conseil.",

      "about.mission.title": "Sunuy mission ak BA Immobilier",
      "about.mission.intro": "Ak moom taariix la, jëf naa BA Immobilier ak benn mission bu tëruwul:",
      "about.mission.diaspora": "Jàppale diaspora bu Afrig ak Karayib bu bëgg lekk ci kaw, ak benn cadre bu sûr ak bu tëruwul",
      "about.mission.local": "Jox ndogu-lekk yu nekk ci kaw benn service bu mat, bu bees ak bu sedd, mu baax ci réalité marché senegale",
      "about.mission.future": "Denc sunuy suñu-dëkk ngir ñu client yi lekk ci Afrig lépp suba, ak niveau confiance ak exigence bu mel ni",

      "about.commitments.title": "Sunuy engagement",
      "about.commitments.intro": "Ci BA Immobilier, liggéey nanu ak promoteur yu mat rekk, notaire yu bokk ak professionnel yu nekk ci kaw yu am confiance.",
      "about.commitments.services": "Jox nanu jàppale bu mat:",
      "about.commitments.buyAndSell": "Jënd & Jaay bu sûr",
      "about.commitments.buyAndSellDesc": "Transaction kër ak jàppale bu mat",
      "about.commitments.construction": "Jëf & Suivi",
      "about.commitments.constructionDesc": "Gérer chantier ak rigueur ak transparence",
      "about.commitments.rental": "Jaar & Gestion",
      "about.commitments.rentalDesc": "Gestion locative professionnelle",
      "about.commitments.concierge": "Conciergerie",
      "about.commitments.conciergeDesc": "Service yu njariñoo sa kër",
      "about.commitments.estimation": "Njëkka kër",
      "about.commitments.estimationDesc": "Njëkka bu mat sa alal",
      "about.commitments.advice": "Conseil diaspora",
      "about.commitments.adviceDesc": "Jàppale bu njariñ ci kaw",
      "about.commitments.quality": "Benn projet bu nekk suqali na ko ak rigueur ak transparence ngir client yi nekk ci jam.",

      "about.promise.title": "Sama engagement",
      "about.promise.intro": "Ak BA Immobilier, jàppante naa:",
      "about.promise.rigor": "Jàppale la ak rigueur bu promoteur bu mag",
      "about.promise.proximity": "Ngënal la ak kenn ku gën la seen ak ne",
      "about.promise.vision": "Ubbi la bunt ngir kër panafricain bu yeesal ak bu am bénef",
      "about.promise.conclusion": "Daal nanu ci Senegal, waaye ak BA Immobilier, am nga benn mbokk ngir lekk ci Afrig lépp suba.",

      "about.video.title": "Sama mbedd ci wàllu kenn",
      "about.video.description": "Gis ni sama liggéey ci boole yu mag yu Fereñs ci kër ak sama njariñ culture ñéppi ma défar BA Immobilier. Benn mbedd bu liggéey ci sa réussite.",

      // Newsletter
      "newsletter.title": "Am-am xibaar",
      "newsletter.subtitle": "Am xibaar yu bees ci Afrig ak Antiy",
      "newsletter.placeholder": "Sa email",
      "newsletter.button": "Bind",

      // Footer
      "footer.slogan": "Bokk sunuy taariix, jëfandikoo sunuy àdduna.",
      "footer.links": "Lëkk yu bees",
      "footer.legal": "Jub yi",
      "footer.privacy": "Sutura mbëgg",
      "footer.contact.title": "Jokkul",
      "footer.contact.phone": "Telefon",
      "footer.contact.email": "Email",
      "footer.social": "Topp nu",

      // Contact Form
      "contact.title": "Jokkul ak nu",
      "contact.name": "Tur bu mat",
      "contact.email": "Email",
      "contact.phone": "Telefon",
      "contact.subject": "Lu jëm",
      "contact.message": "Bataaxal",
      "contact.send": "Yóbbu",

      // Properties
      "properties.title": "Sunuy kër yi",
      "properties.filter.location": "Fan",
      "properties.filter.type": "Jëf",
      "properties.filter.price": "Njariñ",
      "properties.filter.surface": "Mbedd",
      "properties.details": "Gis lu ëpp"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
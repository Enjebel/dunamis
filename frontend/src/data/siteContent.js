export const localImages = [
  '/images/hero image.jpeg',
  '/images/Screenshot 2026-05-16 125341.png',
  '/images/Screenshot 2026-05-16 125420.png',
  '/images/Screenshot 2026-05-16 125435.png',
  '/images/Screenshot 2026-05-16 125456.png',
  '/images/Screenshot 2026-05-16 125514.png',
  '/images/Screenshot 2026-05-16 125538.png',
  '/images/Screenshot 2026-05-16 125612.png',
  '/images/Screenshot 2026-05-16 125634.png',
  '/images/Screenshot 2026-05-16 125653.png',
  '/images/Screenshot 2026-05-16 130928.png',
  '/images/Screenshot 2026-05-16 130959.png',
  '/images/WhatsApp Image 2026-06-01 at 12.50.33 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.34 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.35 PM (1).jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.35 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.37 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.38 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 12.50.39 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 2.25.59 PM.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 3.16.27 PM.jpeg',
  '/images/WhatsApp Image 2026-06-02 at 2.43.11 PM.jpeg',
  '/images/WhatsApp Image 2026-06-02 at 2.43.12 PM.jpeg',
  '/images/WhatsApp Image 2026-06-02 at 2.43.12 PM (1).jpeg',
  '/images/WhatsApp Image 2026-06-02 at 2.43.12 PM (2).jpeg',
  '/images/WhatsApp Image 2026-06-02 at 2.43.13 PM.jpeg',
];

export const heroImages = {
  home: localImages[0],
  training: localImages[11],
  university: localImages[0],
  admission: localImages[0],
  apprenticeship: localImages[25],
  international: localImages[5],
  studentLife: localImages[6],
  research: localImages[10],
  businesses: localImages[24],
  news: localImages[5],
  contact: localImages[0],
};

export const heroImagePositions = {
  home: 'center 46%',
  university: 'center 46%',
  admission: 'center 46%',
  training: 'center 50%',
  apprenticeship: 'center 45%',
  international: 'center 45%',
  studentLife: 'center 42%',
  research: 'center 45%',
  businesses: 'center 45%',
  news: 'center 45%',
  contact: 'center 45%',
};

export const facebookVideos = [
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1562989268098472/',
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/26709767955282658/',
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1348351483785766/',
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1315229193272222/',
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1DF41tp1qs',
  'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1BAFj5FScm',
];

export const contactInfo = {
  phone: '+237 6 58 68 25 33',
  phoneHref: 'tel:+237658682533',
  whatsapp: '+237 6 58 68 25 33',
  whatsappHref: 'https://wa.me/237658682533',
  email: 'dunamisresta@gmail.com',
};

export const officialPartners = [
  { name: 'Fondation Muna', category: 'Foundation partner', url: 'http://www.munafoundation.org/', logo: '/images/partners/fondation-muna.svg' },
  { name: 'ACE FINANCE', category: 'Financial partner', url: 'https://www.ace-finance.net/', logo: '/images/partners/ace-finance.svg' },
  { name: 'CREDIT FONCIER', category: 'Institutional finance', url: 'https://www.creditfoncier.cm/en/', logo: '/images/partners/credit-foncier.svg' },
  { name: 'RESTA AGREAP', category: 'Enterprise partner', url: '', logo: '/images/partners/resta-agreap.svg' },
  { name: 'Hotel AUGUSTA', category: 'Hospitality partner', url: 'https://hotelaugusta-cm.com/', logo: '/images/partners/hotel-augusta.svg' },
];

export const faculties = [
  {
    slug: 'engineering-technology',
    en: {
      title: 'Faculty of Engineering & Technology',
      summary: 'Applied engineering, digital systems, infrastructure, and secure technology for modern industry.',
      programs: [
        { title: 'Civil Engineering', courses: ['Building Science and Technology', 'Road and Civil Engineering', 'Topography'] },
        { title: 'Chemical Engineering', courses: ['Chemical Manufacturing', 'Chemical Process Technology'] },
        { title: 'Computer Engineering', courses: ['Software Engineering', 'Hardware Maintenance', 'E-Commerce and Digital Marketing', 'Computer Graphics and Web Design', 'Industrial Computing and Automation'] },
        { title: 'Electrical Engineering', courses: ['Electrotechnics', 'Maintenance of Biomedical Equipment'] },
        { title: 'Mechanical Engineering', courses: ['Mechanical Manufacturing', 'Automotive Maintenance and Services'] },
        { title: 'Thermal Engineering', courses: ['Air Conditioning and Refrigeration', 'Sustainable and Renewable Energy'] },
        { title: 'Agriculture and Food Science', courses: ['Animal Production Technology', 'Crop Production Technology', 'Food Processing'] },
        { title: 'Home Economics', courses: ['Fashion Designing', 'Clothing and Textiles'] },
      ],
    },
    fr: {
      title: "Faculte d'Ingenierie & Technologie",
      summary: 'Ingenierie appliquee, systemes numeriques, infrastructures et technologies securisees pour l industrie.',
      programs: [
        { title: 'Genie civil', courses: ['Batiment', 'Travaux publics', 'Geometre topographe', 'Installation sanitaire'] },
        { title: 'Genie chimique et des procedes', courses: ['Chimie industrielle', 'Pilotage des procedes'] },
        { title: 'Genie informatique', courses: ['Genie logiciel', 'Maintenance des systemes informatiques', 'E-commerce et marketing digital', 'Infographie et web design', 'Informatique industrielle et automatisme'] },
        { title: 'Genie electrique', courses: ['Electrotechnique', 'Maintenance des appareils biomedicaux'] },
        { title: 'Genie mecanique', courses: ['Mecanique', 'Maintenance industrielle et productique'] },
        { title: 'Genie thermique', courses: ['Froid et climatisation', 'Energie renouvelable'] },
        { title: 'Agriculture et elevage', courses: ['Production animale', 'Production vegetale', 'Aquaculture technique', 'Commerce agricole'] },
        { title: 'Art et metiers de la culture', courses: ['Design de mode', 'Industrie de l habillement'] },
      ],
    },
  },
  {
    slug: 'commerce-finance-management',
    en: {
      title: 'Faculty of Commerce, Finance & Management',
      summary: 'Business, accounting, finance, marketing, logistics, and entrepreneurial management.',
      programs: [
        { title: 'Business and Finance', courses: ['Accountancy', 'Marketing', 'Banking and Finance', 'Insurance'] },
        { title: 'Management', courses: ['Assistant Manager', 'Project Management', 'Human Resource Management'] },
        { title: 'Home Economics, Tourism and Hotel Management', courses: ['Logistics and Transport Management', 'Port Shipping Management', 'Tourism and Travel Agency Management', 'Hotel Management and Catering'] },
        { title: 'Legal Careers', courses: ['Legal Assistant', 'Business Law', 'Customs and Transit', 'Tax Management'] },
        { title: 'Education and Professional Development', courses: ['Didactics, Curriculum Development and Teaching', 'Education Management and Administration', 'Special Education'] },
        { title: 'Communication', courses: ['Journalism'] },
      ],
    },
    fr: {
      title: 'Faculte de Commerce, Finance & Management',
      summary: 'Commerce, comptabilite, finance, marketing, logistique et management entrepreneurial.',
      programs: [
        { title: 'Commerce et finance', courses: ['Comptabilite', 'Marketing', 'Banque et finance', 'Assurance'] },
        { title: 'Gestion', courses: ['Assistant manager', 'Gestion de projet', 'Gestion des ressources humaines'] },
        { title: 'Economie domestique, tourisme et gestion hoteliere', courses: ['Gestion de la logistique et du transport', 'Gestion portuaire et maritime', 'Gestion du tourisme et des agences de voyage', 'Gestion hoteliere et restauration'] },
        { title: 'Carrieres juridiques', courses: ['Assistant juridique', 'Droit des affaires', 'Douane et transit', 'Gestion fiscale'] },
        { title: 'Education et developpement professionnel', courses: ['Didactique, developpement des curricula et enseignement', 'Gestion et administration de l education', 'Education speciale'] },
        { title: 'Communication', courses: ['Journalisme'] },
      ],
    },
  },
  {
    slug: 'health-sciences',
    en: {
      title: 'Faculty of Health Sciences',
      summary: 'Professional health training focused on clinical practice, diagnostics, care, and public health.',
      programs: [
        { title: 'Biomedical Science', courses: ['Nursing', 'Medical Laboratory Sciences', 'Medical Imaging Technology', 'Pharmacy Technology', 'Dental Therapy', 'Midwifery', 'Optical/Clinical Optometry', 'Physiotherapy', 'Health Sanitary Inspection', 'Nutrition and Dietetics'] },
      ],
    },
    fr: {
      title: 'Faculte des Sciences de la Sante',
      summary: 'Formations de sante orientees pratique clinique, diagnostic, soins et sante publique.',
      programs: [
        { title: 'Sciences medicales et biomedicales', courses: ['Soins infirmiers', 'Sciences de laboratoire medical', 'Imagerie medicale', 'Technologie pharmaceutique', 'Therapie dentaire', 'Sage-femme / maieutique', 'Optique / optometrie clinique', 'Physiotherapie', 'Inspection sanitaire de la sante', 'Nutrition et dietetique'] },
      ],
    },
  },
];

export const professionalCertifications = [
  {
    faculty: 'engineering-technology',
    en: {
      title: 'Technology & Cybersecurity Certifications',
      summary: 'Short professional credentials connected to software engineering, networks, data, and infrastructure.',
      tracks: ['Cybersecurity Operations', 'Network Administration', 'Data & AI Foundations', 'Industrial Maintenance Systems'],
    },
    fr: {
      title: 'Certifications Technologie & Cybersecurite',
      summary: 'Certifications courtes connectees au genie logiciel, reseaux, data et infrastructures.',
      tracks: ['Operations cybersecurite', 'Administration reseaux', 'Data & IA fondamentaux', 'Systemes de maintenance industrielle'],
    },
  },
  {
    faculty: 'commerce-finance-management',
    en: {
      title: 'Finance, Accounting & Management Certifications',
      summary: 'Executive credentials aligned with commerce, finance, banking, accounting, logistics, and leadership.',
      tracks: ['DSCG Preparation', 'Banking & Insurance Practice', 'Logistics & Supply Chain', 'Entrepreneurial Management'],
    },
    fr: {
      title: 'Certifications Finance, Comptabilite & Management',
      summary: 'Parcours executifs lies au commerce, finance, banque, comptabilite, logistique et leadership.',
      tracks: ['Preparation DSCG', 'Pratique banque & assurance', 'Logistique & supply chain', 'Management entrepreneurial'],
    },
  },
  {
    faculty: 'health-sciences',
    en: {
      title: 'Health Sciences Professional Upskilling',
      summary: 'Practice-oriented modules for health, laboratory, pharmacy, and community care professionals.',
      tracks: ['Clinical Care Refresher', 'Medical Laboratory Quality', 'Pharmacy Operations', 'Community Health Projects'],
    },
    fr: {
      title: 'Perfectionnement Professionnel en Sante',
      summary: 'Modules pratiques pour les professionnels de sante, laboratoire, pharmacie et sante communautaire.',
      tracks: ['Actualisation soins cliniques', 'Qualite laboratoire medical', 'Operations pharmaceutiques', 'Projets de sante communautaire'],
    },
  },
  {
    faculty: 'executive',
    en: {
      title: 'Executive & Doctoral Pathways',
      summary: 'Advanced professional pathways for managers, entrepreneurs, and senior professionals.',
      tracks: ['Specialized Masters', 'DBA', 'Leadership & Strategy', 'Business Innovation'],
    },
    fr: {
      title: 'Parcours Executifs & Doctoraux',
      summary: 'Parcours avances pour managers, entrepreneurs et professionnels seniors.',
      tracks: ['Masters specialises', 'DBA', 'Leadership & strategie', 'Innovation business'],
    },
  },
];

export const trainingCycles = [
  {
    slug: 'bts-bachelor-master',
    en: {
      title: 'BTS / Bachelor / Master - Francophone',
      summary: 'French-language BTS, Bachelor, and Master tracks with day and evening sessions, projects, internships, and work-study options.',
    },
    fr: {
      title: 'Cycle BTS / Licence / Master',
      summary: 'Parcours francophones BTS, Licence et Master avec cours du jour et du soir, projets, stages et alternance.',
    },
  },
  {
    slug: 'hnd-cycle',
    en: {
      title: 'HND / Bachelor / Master - English',
      summary: 'English-language HND, Bachelor, and Master pathways across business, engineering, technology, and biomedical sciences.',
    },
    fr: {
      title: 'Cycle HND / Bachelor / Master - Anglophone',
      summary: 'Parcours anglophones HND, Bachelor et Master en business, ingenierie, technologie et sciences biomedicales.',
    },
  },
];

export const pages = {
  university: {
    image: localImages[1],
    en: {
      eyebrow: 'The University',
      title: 'An entrepreneurial university built for professional impact',
      intro: 'Dunamis turns academic potential into concrete success through entrepreneurial training, corporate immersion, and practical know-how.',
      sections: [
        { title: 'Message from the Director', text: 'Welcome to Dunamis, the university of entrepreneurship. Facing youth unemployment and the shortage of practical experience among graduates, Dunamis chose a different path: training leaders and wealth creators with real corporate know-how, not theory alone.' },
        { title: 'Mission & Vision', text: 'Dunamis aims to become a leading reference for entrepreneurial higher education in Africa by closing the gap between training and employment. Our mission is to equip every student with both theoretical mastery and continuous professional immersion.' },
        { title: 'Values & Charter', text: 'Our values are pragmatism, integrity, entrepreneurial boldness, and professional excellence. From day one, every student is expected to behave like a corporate professional and protect the Dunamis brand across our partner network.' },
        { title: 'Governance', text: 'Dunamis is led by a Director who drives strategy and market alignment, supported by the Dean, Vice-Dean, Academic Affairs Officer, and Registrar for quality, innovation, scheduling, enrollment, tuition, and academic tracking.' },
        { title: 'Faculty', text: 'Our lecturers are recruited from the pedagogical elite of Douala and include PhD holders, engineers, senior executives, and professionals with international project, humanitarian, and cooperation experience.' },
        { title: 'Accreditations', text: 'Programs are designed around recognized academic standards and employability outcomes.' },
        { title: 'Campus & Infrastructure', text: 'Classrooms, labs, collaboration spaces, and digital tools support practical learning.' },
      ],
    },
    fr: {
      eyebrow: "L'Universite",
      title: 'Une universite entrepreneuriale tournee vers l impact professionnel',
      intro: 'Dunamis transforme le potentiel academique en reussite concrete grace a l entrepreneuriat, l immersion en entreprise et le savoir-faire pratique.',
      sections: [
        { title: 'Message du Directeur', text: 'Bienvenue a Dunamis, l universite de l entrepreneuriat. Face au chomage des jeunes et au manque d experience pratique, Dunamis forme des leaders et createurs de richesse avec un vrai savoir-faire d entreprise.' },
        { title: 'Mission & Vision', text: 'Dunamis ambitionne de devenir une reference africaine de l enseignement superieur entrepreneurial en supprimant l ecart entre formation et emploi. Notre mission est de donner a chaque etudiant une double competence theorique et pratique.' },
        { title: 'Valeurs & Charte', text: 'Nos valeurs sont le pragmatisme, l integrite, l audace entrepreneuriale et l excellence professionnelle. Des le premier jour, chaque etudiant adopte une attitude professionnelle et preserve l image de Dunamis.' },
        { title: 'Gouvernance', text: 'Dunamis est dirigee par un Directeur charge de la strategie et de l alignement avec le marche, appuye par le Doyen, le Vice-Doyen, les Affaires Academiques et le Registrar.' },
        { title: 'Corps enseignant', text: 'Nos enseignants viennent de l elite pedagogique de Douala et comprennent des docteurs, ingenieurs, cadres superieurs et professionnels ayant une experience internationale solide.' },
        { title: 'Accreditations', text: 'Les programmes sont construits autour de standards academiques reconnus et de resultats d employabilite.' },
        { title: 'Campus & Infrastructure', text: 'Salles, laboratoires, espaces collaboratifs et outils numeriques soutiennent l apprentissage pratique.' },
      ],
    },
  },
  admission: {
    image: localImages[2],
    en: {
      eyebrow: 'Admission',
      title: 'Start your Dunamis application',
      intro: 'Prepare your admission file and contact the admissions team for program placement, scholarship information, and registration support.',
      sections: [
        { title: 'Admission requirements', text: 'Valid ID card or passport, academic transcripts, previous diploma or certificate, passport photo, and a completed application request.' },
        { title: 'Scholarship support', text: 'A 50,000 FCFA scholarship is promoted on the admission flyer, with guidance from the admissions team.' },
        { title: 'Student advantages', text: 'Free laptop offer for eligible early registrations, modern classrooms, multimedia spaces, biomedical laboratories, and campus Wi-Fi.' },
        { title: 'Class sessions', text: 'Day and evening sessions are available depending on the program and intake.' },
      ],
    },
    fr: {
      eyebrow: 'Admission',
      title: 'Demarrez votre candidature a Dunamis',
      intro: 'Preparez votre dossier et contactez les admissions pour le choix du programme, les bourses et l inscription.',
      sections: [
        { title: 'Conditions d admission', text: 'Piece d identite ou passeport, releves de notes, diplome ou attestation, photo passeport et demande de candidature completee.' },
        { title: 'Bourse', text: 'Une bourse de 50 000 FCFA est annoncee sur le flyer, avec accompagnement par le service admissions.' },
        { title: 'Avantages etudiants', text: 'Offre de laptop gratuit pour les inscriptions eligibles avant septembre, salles modernes, multimedia, laboratoires biomedical et Wi-Fi.' },
        { title: 'Sessions de cours', text: 'Cours du jour et du soir selon le programme et la rentree.' },
      ],
    },
  },
  apprenticeship: {
    image: localImages[3],
    en: {
      eyebrow: 'Apprenticeship',
      title: '3 days in class, 3 days in a company',
      intro: 'The Dunamis apprenticeship model breaks the gap between classroom learning and employability by combining weekly theory and company immersion.',
      sections: [
        { title: 'How it works', text: 'Each week is divided into two phases: 3 days of lecture-based courses on campus and 3 days of practical immersion in a company. Students apply classroom concepts immediately in real professional environments.' },
        { title: 'Finding a company', text: 'Dunamis leads the placement process by negotiating partnerships with vetted local and international companies aligned with each student specialty. The student remains responsible for seriousness, efficiency, and professional attitude.' },
        { title: 'Partner responsibilities', text: 'Partner companies act as co-educators. They integrate students into daily operations, assign real technical tasks, appoint mentors, evaluate progress, and may provide stipends or compensation for strong productivity.' },
        { title: 'Student contribution', text: 'Students contribute 50,000 FCFA to support company prospecting, contract negotiation, logistics, and workplace supervision. This investment reinforces accountability and access to a structured practical environment.' },
        { title: 'Graduate advantage', text: 'By the end of a BTS or HND cycle, students graduate with both a diploma and up to two years of real professional experience, making them more credible to recruiters and better prepared to launch ventures.' },
      ],
    },
    fr: {
      eyebrow: 'Alternance',
      title: '3 jours en cours, 3 jours en entreprise',
      intro: 'Le modele d alternance Dunamis reduit l ecart entre formation academique et employabilite grace a la theorie et l immersion en entreprise chaque semaine.',
      sections: [
        { title: 'Comment ca marche', text: 'Chaque semaine est divisee en deux phases: 3 jours de cours au campus et 3 jours d immersion pratique en entreprise. Les etudiants appliquent immediatement les notions apprises.' },
        { title: 'Trouver une entreprise', text: 'Dunamis pilote le placement en negociant avec des entreprises locales et internationales selectionnees selon la specialite de l etudiant. L attitude professionnelle de l etudiant reste decisive.' },
        { title: 'Responsabilites des partenaires', text: 'Les entreprises partenaires deviennent de vrais co-educateurs. Elles integrent l etudiant aux operations, confient des taches techniques, nomment un mentor et evaluent sa progression.' },
        { title: 'Contribution etudiante', text: 'Une contribution de 50 000 FCFA soutient la prospection, les conventions, la logistique et le suivi en entreprise. Elle renforce l engagement de l etudiant dans ce parcours pratique.' },
        { title: 'Avantage diplome', text: 'A la fin du BTS ou HND, l etudiant obtient son diplome avec jusqu a deux annees d experience professionnelle reelle, un avantage fort pour convaincre les recruteurs ou lancer son activite.' },
      ],
    },
  },
  international: {
    image: localImages[4],
    en: {
      eyebrow: 'International',
      title: 'Global pathways from Cameroon to the world',
      intro: 'Dunamis prepares students for mobility, international study options, and cross-border professional networks.',
      sections: [
        { title: 'Studying abroad', text: 'Orientation for applications, equivalencies, documentation, and student readiness.' },
        { title: 'Studying in Canada', text: 'Guidance for Canadian study projects, language readiness, and partner pathways.' },
        { title: 'Studying in Germany', text: 'Support for technical and management tracks connected to German opportunities.' },
        { title: 'University partnerships', text: 'Academic relationships designed for progression, mobility, and collaborative learning.' },
        { title: 'Student mobility', text: 'Exchange, internships, and international professional exposure.' },
      ],
    },
    fr: {
      eyebrow: 'International',
      title: 'Des parcours mondiaux du Cameroun vers le monde',
      intro: 'Dunamis prepare les etudiants a la mobilite, aux etudes internationales et aux reseaux professionnels transfrontaliers.',
      sections: [
        { title: 'Etudier a l etranger', text: 'Orientation pour dossiers, equivalences, documents et preparation de l etudiant.' },
        { title: 'Etudier au Canada', text: 'Accompagnement des projets canadiens, preparation linguistique et parcours partenaires.' },
        { title: 'Etudier en Allemagne', text: 'Appui aux filieres techniques et de management connectees aux opportunites allemandes.' },
        { title: 'Partenariats universitaires', text: 'Relations academiques pour progression, mobilite et apprentissage collaboratif.' },
        { title: 'Mobilite etudiante', text: 'Echanges, stages et exposition professionnelle internationale.' },
      ],
    },
  },
  studentLife: {
    image: localImages[5],
    en: {
      eyebrow: 'Student Life',
      title: 'A campus built for growth beyond the classroom',
      intro: 'Students find community, wellbeing, creativity, sports, and entrepreneurial support at Dunamis.',
      sections: [
        { title: 'Associations & Clubs', text: 'Student groups develop leadership, culture, service, and professional networks.' },
        { title: 'Sports', text: 'Campus activities encourage discipline, teamwork, and wellbeing.' },
        { title: 'Health & Wellness', text: 'Supportive services help students remain balanced and focused.' },
        { title: 'Entrepreneurship & Incubator', text: 'Student ideas receive mentoring, coaching, and a pathway toward launch.' },
      ],
    },
    fr: {
      eyebrow: 'Vie Etudiante',
      title: 'Un campus pour grandir au-dela des cours',
      intro: 'Les etudiants trouvent communaute, bien-etre, creativite, sport et accompagnement entrepreneurial.',
      sections: [
        { title: 'Associations & Clubs', text: 'Les groupes etudiants developpent leadership, culture, service et reseaux.' },
        { title: 'Sports', text: 'Les activites encouragent discipline, esprit d equipe et bien-etre.' },
        { title: 'Sante & Bien-etre', text: 'Des services de soutien aident les etudiants a rester equilibres et concentres.' },
        { title: 'Entrepreneuriat & Incubateur', text: 'Les idees etudiantes beneficient de mentorat, coaching et accompagnement au lancement.' },
      ],
    },
  },
  research: {
    image: localImages[6],
    en: {
      eyebrow: 'Research',
      title: 'Applied research for enterprise and society',
      intro: 'Research at Dunamis connects laboratories, publications, proposals, and R&D partnerships.',
      sections: [
        { title: 'Laboratories', text: 'Applied spaces for technology, management, health, and entrepreneurship research.' },
        { title: 'Publications', text: 'Faculty and students contribute papers, case studies, and professional insights.' },
        { title: 'Calls for proposals', text: 'Opportunities invite teams to solve industry and community challenges.' },
        { title: 'R&D partnerships', text: 'Companies and institutions can co-develop research with academic teams.' },
      ],
    },
    fr: {
      eyebrow: 'Recherche',
      title: 'Recherche appliquee pour l entreprise et la societe',
      intro: 'La recherche a Dunamis relie laboratoires, publications, appels a projets et partenariats R&D.',
      sections: [
        { title: 'Laboratoires', text: 'Espaces appliques pour technologie, management, sante et entrepreneuriat.' },
        { title: 'Publications', text: 'Enseignants et etudiants produisent articles, cas et analyses professionnelles.' },
        { title: 'Appels a projets', text: 'Des opportunites invitent les equipes a resoudre des defis industriels et communautaires.' },
        { title: 'Partenariats R&D', text: 'Entreprises et institutions peuvent co-developper la recherche avec les equipes academiques.' },
      ],
    },
  },
  businesses: {
    image: localImages[7],
    en: {
      eyebrow: 'Businesses',
      title: 'Work with Dunamis talent',
      intro: 'Companies can recruit, host apprentices, co-design training, and become strategic partners.',
      sections: [
        { title: 'Recruit our students', text: 'Access motivated learners trained for practical performance.' },
        { title: 'Offer work-study programs', text: 'Host apprentices and shape skills through real company missions.' },
        { title: 'Customized training', text: 'Build short programs for your team needs in technology, management, health, or finance.' },
        { title: 'Become a partner', text: 'Join the Dunamis ecosystem through mentoring, projects, events, and innovation initiatives.' },
      ],
    },
    fr: {
      eyebrow: 'Entreprises',
      title: 'Collaborez avec les talents Dunamis',
      intro: 'Les entreprises peuvent recruter, accueillir des alternants, co-construire des formations et devenir partenaires.',
      sections: [
        { title: 'Recruter nos etudiants', text: 'Accedez a des apprenants motives, formes pour la performance pratique.' },
        { title: 'Proposer l alternance', text: 'Accueillez des alternants et developpez leurs competences avec de vraies missions.' },
        { title: 'Formations sur mesure', text: 'Construisez des programmes courts pour vos besoins en tech, management, sante ou finance.' },
        { title: 'Devenir partenaire', text: 'Rejoignez l ecosysteme Dunamis via mentorat, projets, evenements et innovation.' },
      ],
    },
  },
  news: {
    image: localImages[8],
    en: {
      eyebrow: 'News',
      title: 'News, events, alumni, and resources',
      intro: 'Follow campus updates, conferences, press releases, alumni stories, and practical resources.',
      sections: [
        { title: 'News & Press Releases', text: 'Official announcements and institutional updates.' },
        { title: 'Events & Conferences', text: 'Open days, workshops, panels, competitions, and public lectures.' },
        { title: 'Alumni Testimonials', text: 'Stories from graduates building careers, companies, and community impact.' },
        { title: 'Blog & Resources', text: 'Guides for applicants, students, employers, and partners.' },
      ],
    },
    fr: {
      eyebrow: 'Actualites',
      title: 'Actualites, evenements, alumni et ressources',
      intro: 'Suivez les nouvelles du campus, conferences, communiques, temoignages et ressources pratiques.',
      sections: [
        { title: 'Actualites & Communiques', text: 'Annonces officielles et informations institutionnelles.' },
        { title: 'Evenements & Conferences', text: 'Journees portes ouvertes, ateliers, panels, concours et conferences.' },
        { title: 'Temoignages Alumni', text: 'Parcours de diplomes qui construisent carrieres, entreprises et impact.' },
        { title: 'Blog & Ressources', text: 'Guides pour candidats, etudiants, employeurs et partenaires.' },
      ],
    },
  },
  contact: {
    image: localImages[9],
    en: {
      eyebrow: 'Contact',
      title: 'Talk to Dunamis',
      intro: 'Reach the admissions and information team for directions, answers, and application support.',
      sections: [],
    },
    fr: {
      eyebrow: 'Contact',
      title: 'Contactez Dunamis',
      intro: 'Joignez l equipe admissions et information pour orientation, reponses et accompagnement.',
      sections: [],
    },
  },
};

export const navigation = [
  { id: 'home', path: '/' },
  {
    id: 'university',
    path: '/university',
    children: [
      ['Message from the Director', 'Message du Directeur', '/university/rector'],
      ['Mission & Vision', 'Mission & Vision', '/university/mission-vision'],
      ['Values & Charter', 'Valeurs & Charte', '/university/values-charter'],
      ['Governance', 'Gouvernance', '/university/governance'],
      ['Faculty', 'Corps enseignant', '/university/faculty'],
      ['Accreditations', 'Accreditations', '/university/accreditations'],
      ['Campus & Infrastructure', 'Campus & Infrastructure', '/university/campus-infrastructure'],
    ],
  },
  {
    id: 'training',
    path: '/training',
    children: [
      ['BTS / Bachelor / Master', 'BTS / Licence / Master', '/training/bts-bachelor-master'],
      ['HND / Bachelor / Master', 'HND / Bachelor / Master', '/training/hnd-cycle'],
    ],
  },
  {
    id: 'admission',
    path: '/admission',
    children: [
      ['How to apply', 'Comment postuler', '/admission/how-to-apply'],
      ['Admission requirements', 'Conditions d admission', '/admission/requirements'],
      ['Tuition fees', 'Frais de scolarite', '/admission/tuition-fees'],
      ['Scholarships & Financial aid', 'Bourses & aides', '/admission/scholarships'],
      ['Academic calendar', 'Calendrier academique', '/admission/calendar'],
      ['Apply Online', 'Postuler en ligne', '/admission/apply'],
    ],
  },
  { id: 'apprenticeship', path: '/apprenticeship' },
  { id: 'international', path: '/international' },
  {
    id: 'studentLife',
    path: '/student-life',
    children: [
      ['Associations & Clubs', 'Associations & Clubs', '/student-life/clubs'],
      ['Sports', 'Sports', '/student-life/sports'],
      ['Health & Wellness', 'Sante & Bien-etre', '/student-life/wellness'],
      ['Entrepreneurship & Incubator', 'Entrepreneuriat & Incubateur', '/student-life/incubator'],
    ],
  },
  { id: 'businesses', path: '/businesses' },
  { id: 'contact', path: '/contact' },
];

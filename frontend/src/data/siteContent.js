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
        { title: 'Message from the Director', text: `"Welcome to Dunamis, the university of entrepreneurship that turns academic potential into concrete success. Facing the alarming rate of youth unemployment in Cameroon--where graduates are plenty but practical experience is scarce--we chose to break away from traditional teaching methods. Our mission is to train a new generation of leaders and wealth creators who are armed not with mere theories, but with solid, practical know-how acquired at the very heart of the corporate world.\n\nAt Dunamis, we firmly believe that excellence is forged on the field. By choosing our unique apprenticeship model, you are choosing boldness, independence, and direct employment. Together, let us make your two years of study the ultimate launchpad for your professional career."` },
        { title: 'What is Dunamis mission and vision?', text: `The vision of Dunamis stems from a stark reality in Cameroon: despite the high number of Private Institutions of Higher Education (IPES) offering professional programs, graduates suffer from a severe lack of field experience. Traditional two-month internships in non-specialized fields prove insufficient to convince recruiters or to start a business. Dunamis aims to become the leading reference for entrepreneurial higher education in Africa, eradicating the gap between training and employment.\n\nOur mission is to equip every student with a dual skillset--both theoretical and highly practical--through continuous professional immersion. We shape pragmatic, bold, and immediately operational graduates capable of stepping directly into the job market or building viable businesses that generate real value for the national economy.` },
        { title: 'What are Dunamis values and charter?', text: `The core values of Dunamis are built on pragmatism, integrity, entrepreneurial boldness, and professional excellence. Our institutional charter demands total commitment from the administration, the faculty, and the students alike. We cultivate an environment where academic discipline meets corporate rigor, inspiring everyone to push their limits and create a measurable social and economic impact.\n\nWe highly value a results-driven culture and individual responsibility. The Dunamis charter states that from day one on campus, every student must behave like a corporate professional, thereby safeguarding the institution's brand image and reputation across our entire economic partner network.` },
        { title: 'What is Dunamis governance structure?', text: `To drive its forward-thinking vision, Dunamis relies on a collaborative, agile governance structure focused entirely on student success. The administration is led by a Director who drives the global strategy and ensures the university remains aligned with market demands. He is supported by a Dean and a Vice-Dean, who guarantee educational quality, academic program innovation, and university research tracking.\n\nThe operational core also relies on the Academic Affairs Officer, who coordinates theoretical course scheduling and ensures the smooth execution of the academic calendar. Finally, the Registrar manages the strict administrative handling of enrollments, tuition records, and academic tracking, ensuring seamless services for all students.` },
        { title: 'Faculty: Titles and qualifications', text: `The faculty at Dunamis stands as one of our greatest sources of pride. Recruited primarily from the pedagogical elite of Douala, our lecturers hold top-tier academic qualifications, including numerous PhDs. This academic excellence is systematically paired with solid field expertise, ensuring a first-class, up-to-date transfer of professional skills.\n\nOur teaching staff stands out through the inclusion of highly experienced engineers and senior executives who have completed prestigious international careers. Their backgrounds include managing large-scale development projects, global humanitarian programs, and bilateral cooperation initiatives. This diversity offers our students a broad international perspective and an exceptional network of mentors for their future careers.` },
        { title: 'Campus & Infrastructure', text: 'Classrooms, labs, collaboration spaces, and digital tools support practical learning.' },
      ],
    },
    fr: {
      eyebrow: "L'Universite",
      title: 'Une universite entrepreneuriale tournee vers l impact professionnel',
      intro: 'Dunamis transforme le potentiel academique en reussite concrete grace a l entrepreneuriat, l immersion en entreprise et le savoir-faire pratique.',
      sections: [
        { title: 'Message du Directeur', text: `"Bienvenue a Dunamis, l universite de l entrepreneuriat qui transforme le potentiel academique en succes concret. Face au taux alarmant de chomage des jeunes au Cameroun--ou les diplomes sont nombreux mais l experience pratique reste rare--nous avons choisi de rompre avec les methodes d enseignement traditionnelles. Notre mission est de former une nouvelle generation de leaders et de createurs de richesse, armes non pas de simples theories, mais d un savoir-faire solide et pratique acquis au coeur meme du monde de l entreprise.\n\nA Dunamis, nous croyons fermement que l excellence se forge sur le terrain. En choisissant notre modele unique d alternance, vous choisissez l audace, l autonomie et l emploi direct. Ensemble, faisons de vos deux annees d etudes le tremplin ultime de votre carriere professionnelle."` },
        { title: 'Mission & Vision', text: `La vision de Dunamis part d une realite forte au Cameroun: malgre le grand nombre d Institutions Privees d Enseignement Superieur (IPES) proposant des programmes professionnels, les diplomes souffrent d un grave manque d experience de terrain. Les stages traditionnels de deux mois, souvent dans des domaines non specialises, restent insuffisants pour convaincre les recruteurs ou lancer une entreprise. Dunamis ambitionne de devenir la reference majeure de l enseignement superieur entrepreneurial en Afrique, en supprimant l ecart entre formation et emploi.\n\nNotre mission est de doter chaque etudiant d une double competence--a la fois theorique et hautement pratique--grace a une immersion professionnelle continue. Nous formons des diplomes pragmatiques, audacieux et immediatement operationnels, capables d entrer directement sur le marche de l emploi ou de creer des entreprises viables qui generent une vraie valeur pour l economie nationale.` },
        { title: 'Valeurs & Charte', text: `Les valeurs fondamentales de Dunamis reposent sur le pragmatisme, l integrite, l audace entrepreneuriale et l excellence professionnelle. Notre charte institutionnelle exige un engagement total de l administration, du corps enseignant et des etudiants. Nous cultivons un environnement ou la discipline academique rencontre la rigueur de l entreprise, afin d inspirer chacun a repousser ses limites et a creer un impact social et economique mesurable.\n\nNous accordons une grande importance a la culture du resultat et a la responsabilite individuelle. La charte de Dunamis affirme que, des le premier jour sur le campus, chaque etudiant doit se comporter comme un professionnel d entreprise, afin de proteger l image de marque et la reputation de l institution dans tout notre reseau de partenaires economiques.` },
        { title: 'Gouvernance', text: `Pour porter sa vision innovante, Dunamis s appuie sur une gouvernance collaborative, agile et entierement orientee vers la reussite des etudiants. L administration est conduite par un Directeur qui pilote la strategie globale et veille a ce que l universite reste alignee sur les exigences du marche. Il est appuye par un Doyen et un Vice-Doyen, qui garantissent la qualite pedagogique, l innovation des programmes academiques et le suivi de la recherche universitaire.\n\nLe noyau operationnel s appuie egalement sur le Responsable des Affaires Academiques, qui coordonne la programmation des cours theoriques et assure la bonne execution du calendrier academique. Enfin, le Registrar gere avec rigueur les inscriptions, les dossiers de scolarite et le suivi academique, afin d offrir des services fluides a tous les etudiants.` },
        { title: 'Corps enseignant', text: `Le corps enseignant de Dunamis constitue l une de nos plus grandes fiertes. Recrutes principalement parmi l elite pedagogique de Douala, nos enseignants detiennent des qualifications academiques de haut niveau, dont de nombreux doctorats. Cette excellence academique est systematiquement associee a une solide expertise de terrain, afin d assurer une transmission actualisee et de premier ordre des competences professionnelles.\n\nNotre equipe pedagogique se distingue aussi par la presence d ingenieurs hautement experimentes et de cadres superieurs ayant accompli de prestigieuses carrieres internationales. Leurs parcours comprennent la gestion de grands projets de developpement, de programmes humanitaires mondiaux et d initiatives de cooperation bilaterale. Cette diversite offre a nos etudiants une perspective internationale et un reseau exceptionnel de mentors pour leur future carriere.` },
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
        { title: 'How it works?', text: `The apprenticeship program at Dunamis reinvents academic learning to break the cycle of youth unemployment in Cameroon once and for all. Our exclusive model perfectly balances each week into two distinct phases: 3 days of theoretical lecture-based courses on campus and 3 days of practical immersion within a company. This structured rhythm allows students to instantly apply core classroom concepts directly to real-world corporate environments.\n\nBy the end of the two-year BTS or HND cycle, our students do not just graduate with a degree--they graduate with an exceptional track record of two full years of real professional experience. This radical approach transforms their professional profile, making them immediately operational experts who can easily convince demanding recruiters or successfully launch their own business ventures.` },
        { title: 'How to find a company?', text: `At Dunamis, securing a host company is not a burden left entirely on the student's shoulders. Our institution actively takes the lead by directly negotiating strategic partnerships with a strictly vetted network of local and international corporations. We meticulously ensure that each host company perfectly aligns with the student's specialty and field of study to maintain total educational coherence.\n\nWhile Dunamis drives this placement process through corporate framework agreements, the student remains the primary actor in their own success. Their efficiency, seriousness, and professional attitude from the very first corporate contact are decisive factors. This synergy between university-led outreach and student dedication maximizes the chances of securing direct employment even before graduation.` },
        { title: 'What responsibilities are listed by the partners?', text: `Dunamis' corporate partners formally agree to move past the traditional framework of basic observation internships to become true co-educators. They take on the responsibility of integrating the student into the heart of their daily operations and assigning them genuine technical tasks. Each partner appoints a professional mentor to guide the student, evaluate their practical growth, and ensure they acquire critical industry skills.\n\nIn return for this strong commitment and the value added by our students, partner companies actively value their hard work. They provide a structured work environment, high-level corporate mentorship, and often offer stipends or financial compensation to reward the intern's efficiency and productivity within their teams.` },
        { title: 'What is the student contribution?', text: `To support this premium learning model and sustain our corporate placement network, students are required to make a financial contribution of 50,000 FCFA as part of this partnership. This direct investment goes entirely toward covering logistical costs tied to corporate prospecting, contract negotiations, and the rigorous workplace supervision conducted by the university staff.\n\nFar from being a mere expense, this contribution fosters accountability and seals the student's moral commitment toward both the institution and the host company. It guarantees access to an elite practical environment, turning a minor financial cost into a major catalyst for employability and entrepreneurial success.` },
      ],
    },
    fr: {
      eyebrow: 'Alternance',
      title: '3 jours en cours, 3 jours en entreprise',
      intro: 'Le modele d alternance Dunamis reduit l ecart entre formation academique et employabilite grace a la theorie et l immersion en entreprise chaque semaine.',
      sections: [
        { title: 'Comment ca marche ?', text: `Le programme d alternance de Dunamis reinvente l apprentissage academique afin de briser une fois pour toutes le cycle du chomage des jeunes au Cameroun. Notre modele exclusif equilibre parfaitement chaque semaine en deux phases distinctes: 3 jours de cours theoriques sur le campus et 3 jours d immersion pratique au sein d une entreprise. Ce rythme structure permet aux etudiants d appliquer instantanement les concepts appris en classe dans des environnements professionnels reels.\n\nA la fin du cycle BTS ou HND de deux ans, nos etudiants ne sortent pas seulement avec un diplome--ils sortent avec un parcours exceptionnel de deux annees completes d experience professionnelle reelle. Cette approche radicale transforme leur profil professionnel, les rendant immediatement operationnels, capables de convaincre des recruteurs exigeants ou de lancer avec succes leurs propres projets d entreprise.` },
        { title: 'Comment trouver une entreprise ?', text: `A Dunamis, trouver une entreprise d accueil n est pas une charge laissee entierement sur les epaules de l etudiant. Notre institution prend activement les devants en negociant directement des partenariats strategiques avec un reseau strictement selectionne d entreprises locales et internationales. Nous veillons avec soin a ce que chaque entreprise d accueil corresponde parfaitement a la specialite et au domaine d etudes de l etudiant, afin de maintenir une coherence educative totale.\n\nBien que Dunamis pilote ce processus de placement a travers des accords cadres avec les entreprises, l etudiant reste l acteur principal de sa propre reussite. Son efficacite, son serieux et son attitude professionnelle des le premier contact avec l entreprise sont des facteurs decisifs. Cette synergie entre l accompagnement de l universite et l engagement de l etudiant maximise les chances d obtenir un emploi direct avant meme l obtention du diplome.` },
        { title: 'Quelles sont les responsabilites des partenaires ?', text: `Les partenaires d entreprise de Dunamis acceptent formellement de depasser le cadre traditionnel des stages d observation de base pour devenir de veritables co-educateurs. Ils prennent la responsabilite d integrer l etudiant au coeur de leurs operations quotidiennes et de lui confier de veritables taches techniques. Chaque partenaire designe un mentor professionnel charge de guider l etudiant, d evaluer sa progression pratique et de s assurer qu il acquiert des competences industrielles essentielles.\n\nEn retour de cet engagement fort et de la valeur ajoutee par nos etudiants, les entreprises partenaires valorisent activement leur travail. Elles offrent un environnement de travail structure, un mentorat d entreprise de haut niveau et proposent souvent des indemnites ou une compensation financiere afin de recompenser l efficacite et la productivite du stagiaire au sein de leurs equipes.` },
        { title: 'Quelle est la contribution de l etudiant ?', text: `Pour soutenir ce modele d apprentissage premium et maintenir notre reseau de placement en entreprise, les etudiants doivent verser une contribution financiere de 50 000 FCFA dans le cadre de ce partenariat. Cet investissement direct sert entierement a couvrir les couts logistiques lies a la prospection des entreprises, aux negociations contractuelles et au suivi rigoureux effectue par le personnel de l universite sur les lieux de travail.\n\nLoin d etre une simple depense, cette contribution favorise la responsabilisation et scelle l engagement moral de l etudiant envers l institution et l entreprise d accueil. Elle garantit l acces a un environnement pratique d excellence, transformant un cout modeste en un puissant levier d employabilite et de reussite entrepreneuriale.` },
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

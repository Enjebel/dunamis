import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, FileText, MessageCircle, Phone } from 'lucide-react';
import { contactInfo, heroImagePositions, heroImages, trainingCycles } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');

const ApplyPage = () => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const copy = {
    en: {
      eyebrow: 'Admission',
      title: 'Apply online to Dunamis University',
      intro: 'Submit your first application details. The admissions team will contact you to confirm your program, documents, interview, and next steps.',
      requirementsTitle: 'Admission requirements',
      requirements: ['Valid ID card or passport', 'Academic transcripts', 'Previous diploma or certificate', 'Passport photo', 'Completed application request'],
      documents: ['50,000 FCFA scholarship support promoted on the flyer', 'Free laptop offer for eligible early registrations', 'Day and evening sessions', 'Modern classrooms, multimedia spaces, biomedical laboratory, and campus Wi-Fi'],
      formTitle: 'Application request',
      submit: 'Send request on WhatsApp',
      call: 'Call admissions',
      whatsapp: 'Write on WhatsApp',
    },
    fr: {
      eyebrow: 'Admission',
      title: 'Postuler en ligne à Dunamis University',
      intro: "Envoyez vos premières informations de candidature. L'équipe admissions vous contactera pour confirmer le programme, les pièces, l'entretien et les prochaines étapes.",
      requirementsTitle: "Conditions d'admission",
      requirements: ["Pièce d'identité ou passeport", 'Relevés de notes', 'Diplôme ou attestation', 'Photo passeport', 'Demande de candidature complétée'],
      documents: ['Bourse de 50 000 FCFA annoncée sur le flyer', 'Offre de laptop gratuit pour inscriptions éligibles', 'Cours du jour et du soir', 'Salles modernes, multimédia, laboratoire biomédical et Wi-Fi'],
      formTitle: 'Demande de candidature',
      submit: 'Envoyer sur WhatsApp',
      call: 'Appeler les admissions',
      whatsapp: 'Écrire sur WhatsApp',
    },
  }[lang];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Dunamis admission request',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Cycle: ${data.get('cycle') || ''}`,
      `Message: ${data.get('message') || ''}`,
    ].join('\n');
    window.open(`${contactInfo.whatsappHref}?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.admission} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" style={{ objectPosition: heroImagePositions.admission }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/30 to-slate-950/5" />
        <div className="du-section relative grid min-h-[52vh] gap-10 py-16 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="reveal-up">
            <p className="du-kicker mb-5">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{copy.intro}</p>
          </div>
          <div className="reveal-soft bg-white p-7 text-slate-950 shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-univOrange">Direct Contact</p>
            <div className="mt-5 grid gap-3">
              <a href={contactInfo.phoneHref} className="flex items-center justify-between border border-slate-200 px-4 py-4 font-black hover:border-univGreen hover:text-univGreen">
                <span className="flex items-center gap-3"><Phone size={18} /> {copy.call}</span>
                <ArrowRight size={16} />
              </a>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-univGreen px-4 py-4 font-black text-white hover:bg-univOrange">
                <span className="flex items-center gap-3"><MessageCircle size={18} /> {copy.whatsapp}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="du-section grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div className="du-panel p-7 reveal-up">
            <h2 className="text-3xl font-black text-slate-950">{copy.requirementsTitle}</h2>
            <div className="mt-6 space-y-4">
              {copy.requirements.map((step, index) => (
                <div key={step} className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-univOrange text-sm font-black text-white">0{index + 1}</span>
                  <p className="font-bold text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="du-panel p-7 reveal-up" style={{ animationDelay: '0.08s' }}>
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-black text-slate-950"><FileText className="text-univGreen" /> Documents</h2>
            <div className="grid gap-3">
              {copy.documents.map((doc) => (
                <p key={doc} className="flex items-center gap-3 font-semibold text-slate-700"><CheckCircle2 className="text-univGreen" size={18} /> {doc}</p>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="du-panel grid gap-5 p-7 reveal-up" style={{ animationDelay: '0.12s' }}>
          <h2 className="text-3xl font-black text-slate-950">{copy.formTitle}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Nom complet du candidat' : 'Applicant full name'}</span><input name="name" className="du-input py-4" placeholder={lang === 'fr' ? 'Entrez votre nom complet' : 'Enter your full name'} required /></label>
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Adresse email du candidat' : 'Applicant email address'}</span><input name="email" className="du-input py-4" placeholder={lang === 'fr' ? 'Entrez votre adresse email' : 'Enter your email address'} type="email" /></label>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Numéro de téléphone ou WhatsApp' : 'Phone or WhatsApp number'}</span><input name="phone" className="du-input py-4" placeholder={lang === 'fr' ? 'Entrez votre numéro de téléphone' : 'Enter your phone number'} required /></label>
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Cycle de formation souhaité' : 'Desired training cycle'}</span><select name="cycle" className="du-input py-4" defaultValue="" required>
              <option value="" disabled>{lang === 'fr' ? 'Choisir un cycle' : 'Choose a cycle'}</option>
              {trainingCycles.map((cycle) => <option key={cycle.slug}>{cycle[lang].title}</option>)}
            </select></label>
          </div>
          <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Programme, niveau actuel et questions' : 'Program, current level, and questions'}</span><textarea name="message" className="du-input min-h-36 py-4" placeholder={lang === 'fr' ? 'Décrivez le programme souhaité, votre niveau actuel et vos questions' : 'Describe your desired program, current level, and questions'} /></label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 bg-univOrange px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-univGreen">
            {copy.submit} <ArrowRight size={18} />
          </button>
          <a href={`mailto:${contactInfo.email}`} className="text-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-univGreen">{contactInfo.email}</a>
        </form>
      </section>
    </div>
  );
};

export default ApplyPage;

import React, { useState, useEffect } from 'react';
import { Language, LeadData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, ArrowRight, ShieldCheck, Mail, Building, User, Phone, CheckCircle } from 'lucide-react';

interface LeadFormProps {
  currentLang: Language;
  leadData: LeadData;
  onDataChange: (data: LeadData) => void;
  onSubmit: (data: LeadData) => void;
  onOpenModal: (id: string) => void;
  onClose: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ currentLang, leadData, onDataChange, onSubmit, onOpenModal, onClose }) => {
  const [firstname, setFirstname] = useState(leadData.firstname || '');
  const [lastname, setLastname] = useState(leadData.lastname || '');
  const [email, setEmail] = useState(leadData.email || '');
  const [company, setCompany] = useState(leadData.company || '');
  const [role, setRole] = useState(leadData.role || '');
  const [phone, setPhone] = useState(leadData.phone || '');
  const [country, setCountry] = useState(leadData.country || (currentLang === 'fr' ? 'France' : currentLang === 'es' ? 'Espagne / España' : 'Germany'));

  // Automatically save form state to parent/localStorage in real-time
  useEffect(() => {
    onDataChange({
      firstname,
      lastname,
      email,
      company,
      role,
      phone,
      country,
    });
  }, [firstname, lastname, email, company, role, phone, country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname.trim() || !email.trim() || !company.trim() || !role.trim()) {
      alert(currentLang === 'fr' 
        ? 'Merci de remplir tous les champs obligatoires (*).' 
        : currentLang === 'es'
        ? 'Por favor, complete todos los campos obligatorios (*).'
        : 'Please fill in all required fields (*).');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(currentLang === 'fr' 
        ? 'Veuillez saisir une adresse email professionnelle valide.' 
        : currentLang === 'es'
        ? 'Por favor, introduzca una dirección de correo válida.'
        : 'Please enter a valid business email address.');
      return;
    }

    onSubmit({
      firstname,
      lastname,
      email,
      company,
      role,
      phone,
      country,
    });
  };

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header banner */}
        <div className="bg-[#1e3a5f] p-8 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white text-[10px] sm:text-xs font-semibold bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            {currentLang === 'fr' ? 'Sauvegarder & Quitter' : currentLang === 'es' ? 'Guardar y Salir' : currentLang === 'de' ? 'Speichern & Beenden' : currentLang === 'nl' ? 'Opslaan & Afbreken' : 'Save & Exit'}
          </button>
          <h2 className="font-sans font-extrabold text-xl sm:text-2xl mb-2 text-center">
            {TRANSLATIONS['lead.title'][currentLang]}
          </h2>
          <p className="text-xs sm:text-sm text-white/70 text-center leading-relaxed max-w-md mx-auto">
            {TRANSLATIONS['lead.desc'][currentLang]}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                {TRANSLATIONS['lead.firstname'][currentLang]}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Jane' : 'Marie'}
                  className="w-full text-sm text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                {TRANSLATIONS['lead.lastname'][currentLang]}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Doe' : 'Dupont'}
                  className="w-full text-sm text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
              {TRANSLATIONS['lead.email'][currentLang]}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@company.com"
                className="w-full text-sm text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
              {TRANSLATIONS['lead.company'][currentLang]}
            </label>
            <div className="relative">
              <Building size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="w-full text-sm text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                {TRANSLATIONS['lead.role'][currentLang]}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm text-slate-800 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-3 outline-none transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394a3b8%22_stroke-width=%221.5%22_fill=%22none%22/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_14px_center] pr-10"
                required
              >
                <option value="">{TRANSLATIONS['lead.role.placeholder'][currentLang]}</option>
                <option value="CEO">CEO / Directeur Général / Director General</option>
                <option value="DAF">DAF / Directeur Financier / CFO</option>
                <option value="DSI">DSI / Directeur des SI / CIO</option>
                <option value="DIR_ADM">Directeur Administratif / Operations</option>
                <option value="RESP_IT">Responsable IT / Chef de projet</option>
                <option value="RESP_COMPTA">Responsable Comptabilité / Accounting</option>
                <option value="RESP_ACHATS">Responsable Achats / Procurement</option>
                <option value="AUTRE">Autre / Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                {TRANSLATIONS['lead.phone'][currentLang]}
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full text-sm text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
              {TRANSLATIONS['lead.country'][currentLang]}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full text-sm text-slate-800 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-3 outline-none transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394a3b8%22_stroke-width=%221.5%22_fill=%22none%22/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_14px_center] pr-10"
              required
            >
              <option value="France">France</option>
              <option value="Espagne / España">Espagne / España</option>
              <option value="Germany">Germany / Deutschland</option>
              <option value="Netherlands">Netherlands / Nederland</option>
              <option value="Belgique / Bélgica">Belgique / Bélgica</option>
              <option value="Suisse / Suiza">Suisse / Suiza</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Royaume-Uni / United Kingdom">Royaume-Uni / United Kingdom</option>
              <option value="Autre / Other">Autre / Other</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-[#2563eb] hover:bg-[#1e3a5f] rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>{TRANSLATIONS['lead.btn'][currentLang]}</span>
            <ArrowRight size={18} />
          </button>

          {/* RGPD Disclaimer */}
          <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
            <ShieldCheck size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-slate-400">
              {TRANSLATIONS['lead.privacy'][currentLang]}{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenModal('rgpd-modal');
                }}
                className="text-blue-600 font-semibold underline"
              >
                {currentLang === 'fr' ? 'En savoir plus' : currentLang === 'es' ? 'Saber más' : currentLang === 'de' ? 'Mehr erfahren' : currentLang === 'nl' ? 'Meer weten' : 'Learn more'}
              </a>
              .
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3 flex-wrap pt-4 justify-center">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <CheckCircle size={12} className="text-emerald-500" />
              <span>{TRANSLATIONS['lead.badge.rgpd'][currentLang]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <CheckCircle size={12} className="text-emerald-500" />
              <span>{TRANSLATIONS['lead.badge.ssl'][currentLang]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <CheckCircle size={12} className="text-emerald-500" />
              <span>{TRANSLATIONS['lead.badge.sales'][currentLang]}</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

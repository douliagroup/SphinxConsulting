export const ASSETS = {
  LOGO: "https://i.postimg.cc/nc38WwHs/Whats_App_Image_2026_03_02_at_17_51_58.jpg",
  USER_ICON: "https://i.postimg.cc/QtQPHK7D/sphinx-carte-de-visite.jpg",
  DR_TOKO: "https://i.postimg.cc/gkg97BYn/Whats_App_Image_2026_03_02_at_17_52_01.jpg",
  INNOVATION: "https://i.postimg.cc/TYt8sHRP/Whats_App_Image_2026_03_02_at_17_51_59.jpg",
  RESEARCH: "https://i.postimg.cc/3JtMqbKK/Whats_App_Image_2026_03_02_at_17_51_58_(1).jpg",
  SOCIO: "https://i.postimg.cc/Z5qxNBGN/Gemini_Generated_Image_d81fapd81fapd81f.png",
  GESTION: "https://i.postimg.cc/cLJB3gpn/Gemini_Generated_Image_6z7of6z7of6z7of6.png",
};

export const CONTENT = {
  fr: {
    chat: {
      welcome: "Bienvenue chez **SPHINX Consulting** ! Je suis **Sphinx-AI**, votre assistant stratégique.\n\nJe peux vous accompagner sur plusieurs volets :\n\n① Explorer notre **Expertise** en **Santé Publique** et **Gouvernance**.\n② Découvrir nos **Solutions d'Innovation** technologique.\n③ Comprendre notre impact et notre **Rayonnement International**.\n④ Préparer un **Audit** ou une collaboration stratégique.\n\nComment puis-je vous aider à propulser vos projets aujourd'hui ?",
      placeholder: "Posez votre question...",
      switchLang: "Audit",
    },
    expertise: {
      title: "Notre Expertise",
      subtitle: "Des solutions stratégiques portées par l'excellence scientifique.",
      domains: [
        {
          title: "Santé Publique & Systèmes 4.0",
          desc: "Appui à la CSU, épidémiologie de précision et cartographie sanitaire par IA.",
          tags: ["Couverture Santé Universelle", "Santé Communautaire", "Cartographie IA"],
          image: ASSETS.RESEARCH
        },
        {
          title: "Économie & Gouvernance",
          desc: "Études coût-efficacité, impact budgétaire et soutenabilité financière des programmes.",
          tags: ["Impact Budgétaire", "Audits Organisationnels", "Soutenabilité"],
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Socio-Anthropologie",
          desc: "Analyses comportementales et évaluations sensibles au genre et aux droits humains.",
          tags: ["Inclusion Sociale", "Droits de l'enfant", "Analyse Comportementale"],
          image: ASSETS.SOCIO
        },
        {
          title: "Gestion & Évaluation",
          desc: "Montage de projets, cadres logiques et appui à la mobilisation des financements.",
          tags: ["Notes Conceptuelles", "Suivi & Évaluation", "Mobilisation Fonds"],
          image: ASSETS.GESTION
        }
      ]
    },
    innovation: {
      title: "Innovation",
      solutions: [
        {
          id: "insight",
          title: "SPHINX Insight",
          description: "Analyse prédictive et intelligence de marché avancée.",
          features: ["Data Mining", "Predictive Analytics", "Market Intelligence"]
        },
        {
          id: "process",
          title: "SPHINX Process",
          description: "Optimisation des processus métier par l'IA.",
          features: ["Automation", "Workflow Optimization", "Efficiency Audit"]
        },
        {
          id: "connect",
          title: "SPHINX Connect",
          description: "Écosystème collaboratif et intégration technologique.",
          features: ["API Integration", "Cloud Solutions", "IoT Ecosystem"]
        }
      ]
    },
    international: {
      title: "Rayonnement International",
      subtitle: "Une présence stratégique et des standards mondiaux pour l'Afrique.",
      sections: [
        {
          title: "Standards Mondiaux",
          desc: "Application des protocoles internationaux de recherche et de conseil (OMS, Banque Mondiale, ONU)."
        },
        {
          title: "Représentation Stratégique",
          desc: "Accompagnement des délégations africaines dans les sommets mondiaux de santé et d'économie."
        },
        {
          title: "BPO & Externalisation",
          desc: "Gestion déléguée de projets complexes pour le compte de bailleurs internationaux."
        },
        {
          title: "Conformité Bailleurs",
          desc: "Audit et mise en conformité des procédures locales avec les exigences des fonds mondiaux."
        }
      ],
      projects: {
        title: "Projets Récents",
        items: [
          "Cartographie IA des zones blanches sanitaires en Afrique Centrale.",
          "Audit de soutenabilité financière des programmes de lutte contre le paludisme.",
          "Évaluation d'impact socio-anthropologique des politiques de genre."
        ]
      },
      partner: {
        title: "Devenir Partenaire",
        desc: "Vous souhaitez collaborer avec SPHINX Consulting sur des projets d'envergure ?",
        btn: "Demander la brochure"
      }
    },
    about: {
      title: "À Propos",
      intro: "SPHINX CONSULTING est un cabinet de conseil stratégique et opérationnel de référence, spécialisé dans l'accompagnement des transformations sociales et sanitaires en Afrique Centrale. Sous la direction du Dr Jongwane TOKO, nous fusionnons la rigueur de la recherche académique avec l'agilité des nouvelles technologies. Notre force réside dans une approche multidisciplinaire unique, portée par un collège de Docteurs et Professeurs engagés pour le développement durable du continent.",
      values: {
        title: "Valeurs Cardinales",
        items: [
          { title: "Excellence", desc: "Le standard de chacune de nos interventions." },
          { title: "Éthique", desc: "L'intégrité au cœur de la décision." },
          { title: "Innovation", desc: "Anticiper les ruptures de demain." },
          { title: "Équité", desc: "Un impact juste et durable." }
        ]
      }
    },
    contact: {
      title: "Contactez-nous",
      faqTitle: "Questions Fréquemment Posées",
      faqs: [
        {
          q: "Quels sont vos délais d'intervention ?",
          a: "Nos délais varient selon la complexité du projet, mais nous mobilisons généralement nos experts sous 72 heures pour les audits d'urgence."
        },
        {
          q: "Accompagnez-vous les institutions publiques ?",
          a: "Oui, nous travaillons étroitement avec les ministères et les organismes internationaux sur des programmes de santé publique et de gouvernance."
        },
        {
          q: "Proposez-vous des solutions sur mesure ?",
          a: "Absolument. Chaque intervention est unique et adaptée aux spécificités contextuelles et budgétaires de nos partenaires."
        }
      ],
      name: "Nom",
      firstName: "Prénom",
      email: "Email professionnel",
      message: "Votre projet",
      send: "Envoyer la demande",
      info: "Informations officielles",
      address: "Douala, Mbanya, Immeuble SPHINX",
      phone: "(+237) 6 72 00 42 01 / 6 96 75 61 94",
      emailAddr: "contact@sphinxconsulting.cm",
      web: "www.sphinxconsulting.cm"
    }
  },
  en: {
    chat: {
      welcome: "Welcome to **SPHINX Consulting**! I am **Sphinx-AI**, your strategic assistant.\n\nI can assist you in several areas:\n\n① Explore our **Expertise** in **Public Health** and **Governance**.\n② Discover our technological **Innovation Solutions**.\n③ Understand our impact and **International Reach**.\n④ Prepare an **Audit** or a strategic collaboration.\n\nHow can I help you propel your projects today?",
      placeholder: "Ask your question...",
      switchLang: "Audit",
    },
    expertise: {
      title: "Our Expertise",
      subtitle: "Strategic solutions driven by scientific excellence.",
      domains: [
        {
          title: "Public Health & Systems 4.0",
          desc: "Support for UHC, precision epidemiology, and AI health mapping.",
          tags: ["Universal Health Coverage", "Community Health", "AI Mapping"],
          image: ASSETS.RESEARCH
        },
        {
          title: "Economy & Governance",
          desc: "Cost-effectiveness studies, budget impact, and financial sustainability.",
          tags: ["Budget Impact", "Organizational Audits", "Sustainability"],
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Socio-Anthropology",
          desc: "Behavioral analysis and gender/human rights sensitive evaluations.",
          tags: ["Social Inclusion", "Children's Rights", "Behavioral Analysis"],
          image: ASSETS.SOCIO
        },
        {
          title: "Management & Evaluation",
          desc: "Project design, logical frameworks, and support for fund mobilization.",
          tags: ["Concept Notes", "Monitoring & Evaluation", "Fund Mobilization"],
          image: ASSETS.GESTION
        }
      ]
    },
    innovation: {
      title: "Innovation",
      solutions: [
        {
          id: "insight",
          title: "SPHINX Insight",
          description: "Advanced predictive analysis and market intelligence.",
          features: ["Data Mining", "Predictive Analytics", "Market Intelligence"]
        },
        {
          id: "process",
          title: "SPHINX Process",
          description: "Business process optimization through AI.",
          features: ["Automation", "Workflow Optimization", "Efficiency Audit"]
        },
        {
          id: "connect",
          title: "SPHINX Connect",
          description: "Collaborative ecosystem and technological integration.",
          features: ["API Integration", "Cloud Solutions", "IoT Ecosystem"]
        }
      ]
    },
    international: {
      title: "International Reach",
      subtitle: "Strategic presence and global standards for Africa.",
      sections: [
        {
          title: "Global Standards",
          desc: "Application of international research and consulting protocols (WHO, World Bank, UN)."
        },
        {
          title: "Strategic Representation",
          desc: "Supporting African delegations in global health and economic summits."
        },
        {
          title: "BPO & Outsourcing",
          desc: "Delegated management of complex projects for international donors."
        },
        {
          title: "Donor Compliance",
          desc: "Audit and alignment of local procedures with global fund requirements."
        }
      ],
      projects: {
        title: "Recent Projects",
        items: [
          "AI mapping of health white zones in Central Africa.",
          "Financial sustainability audit of malaria control programs.",
          "Socio-anthropological impact assessment of gender policies."
        ]
      },
      partner: {
        title: "Become a Partner",
        desc: "Would you like to collaborate with SPHINX Consulting on major projects?",
        btn: "Request brochure"
      }
    },
    about: {
      title: "About Us",
      intro: "SPHINX CONSULTING is a leading strategic and operational consulting firm, specialized in supporting social and health transformations in Central Africa. Under the direction of Dr. Jongwane TOKO, we merge the rigor of academic research with the agility of new technologies. Our strength lies in a unique multidisciplinary approach, carried out by a college of Doctors and Professors committed to the sustainable development of the continent.",
      values: {
        title: "Core Values",
        items: [
          { title: "Excellence", desc: "The standard of each of our interventions." },
          { title: "Ethics", desc: "Integrity at the heart of decision-making." },
          { title: "Innovation", desc: "Anticiper les ruptures de demain." },
          { title: "Equity", desc: "A fair and sustainable impact." }
        ]
      }
    },
    contact: {
      title: "Contact Us",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What are your response times?",
          a: "Our response times vary by project complexity, but we typically mobilize our experts within 72 hours for urgent audits."
        },
        {
          q: "Do you support public institutions?",
          a: "Yes, we work closely with ministries and international organizations on public health and governance programs."
        },
        {
          q: "Do you offer custom solutions?",
          a: "Absolutely. Every intervention is unique and adapted to the specific contextual and budgetary needs of our partners."
        }
      ],
      name: "Last Name",
      firstName: "First Name",
      email: "Professional Email",
      message: "Your Project",
      send: "Send Request",
      info: "Official Information",
      address: "Douala, Mbanya, SPHINX Building",
      phone: "(+237) 6 72 00 42 01 / 6 96 75 61 94",
      emailAddr: "contact@sphinxconsulting.cm",
      web: "www.sphinxconsulting.cm"
    }
  }
};

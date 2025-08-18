import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carieră - AI Chat Mega Promoting',
  description: 'Alătură-te echipei AI Chat și construiește viitorul comunicării între business și clienți.',
};

export default function CareerPage() {
  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "București / Remote",
      type: "Full-time",
      experience: "5+ ani",
      description: "Dezvoltă algoritmi avansați de NLP și machine learning pentru îmbunătățirea capabilităților AI Chat.",
      requirements: [
        "Experiență solidă cu Python, TensorFlow/PyTorch",
        "Cunoștințe avansate de NLP și machine learning",
        "Experiență cu cloud platforms (AWS, Azure, GCP)",
        "Doctorat sau Master în Computer Science/AI"
      ]
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "București / Remote",
      type: "Full-time",
      experience: "3+ ani",
      description: "Construiește interfețe utilizator intuitive și responsive pentru platforma AI Chat.",
      requirements: [
        "Expert în React, TypeScript, Next.js",
        "Experiență cu Tailwind CSS și design systems",
        "Cunoștințe de UX/UI principles",
        "Familiaritate cu testing frameworks"
      ]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "București",
      type: "Full-time",
      experience: "4+ ani",
      description: "Definește strategia produsului și coordonează echipele pentru lansarea de funcționalități noi.",
      requirements: [
        "Experiență în product management pentru SaaS",
        "Înțelegerea tehnologiilor AI și chatbots",
        "Abilități excelente de comunicare și leadership",
        "Experiență cu metodologii Agile/Scrum"
      ]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "București / Remote",
      type: "Full-time",
      experience: "2+ ani",
      description: "Asigură succesul clienților și îi ajută să obțină valoare maximă din platforma AI Chat.",
      requirements: [
        "Experiență în customer success sau account management",
        "Abilități excelente de comunicare în română și engleză",
        "Orientare către rezultate și customer satisfaction",
        "Cunoștințe de bază despre tehnologii AI"
      ]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "București / Remote",
      type: "Full-time",
      experience: "4+ ani",
      description: "Gestionează infrastructura cloud și optimizează procesele de deployment și monitoring.",
      requirements: [
        "Experiență cu Kubernetes, Docker, CI/CD",
        "Cunoștințe avansate de AWS/Azure/GCP",
        "Experiență cu monitoring tools (Prometheus, Grafana)",
        "Scripting în Bash/Python"
      ]
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "București",
      type: "Full-time",
      experience: "1+ ani",
      description: "Identifică și califică prospect-uri pentru echipa de vânzări prin outreach strategic.",
      requirements: [
        "Experiență în B2B sales sau lead generation",
        "Abilități excelente de comunicare și persuasiune",
        "Orientare către targets și rezultate",
        "Cunoștințe de CRM systems (Salesforce, HubSpot)"
      ]
    }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Salariu Competitiv",
      description: "Pachete salariale atractive cu bonusuri și equity options pentru pozițiile senior"
    },
    {
      icon: "🏠",
      title: "Remote/Hybrid",
      description: "Flexibilitate completă să lucrezi de acasă sau din birou, după preferințe"
    },
    {
      icon: "📚",
      title: "Dezvoltare Continuă",
      description: "Budget anual pentru cursuri, conferințe și certificări profesionale"
    },
    {
      icon: "🏥",
      title: "Asigurare de Sănătate",
      description: "Pachet medical complet pentru tine și familia ta"
    },
    {
      icon: "🌴",
      title: "Concediu Extins",
      description: "25 zile de concediu de odihnă plus sărbători și zile libere flexible"
    },
    {
      icon: "💻",
      title: "Echipamente Premium",
      description: "MacBook Pro/PC performant și setup ergonomic pentru birou acasă"
    },
    {
      icon: "🎯",
      title: "Stock Options",
      description: "Participare la creșterea companiei prin programe de equity"
    },
    {
      icon: "🍕",
      title: "Team Building",
      description: "Evenimente regulate de team building și retreats anuale"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Cariere la AI Chat
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Alătură-te unei echipe pasionate care construiește viitorul comunicării 
              între business și clienți prin tehnologii AI de ultimă generație
            </p>
          </div>

          {/* Why Join Us */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">De Ce AI Chat?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Fii parte din transformarea digitală a businessurilor din România și Europa
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-lg font-semibold mb-2">Creștere Rapidă</h3>
                  <p className="text-blue-100 text-sm">
                    Compania noastră se dezvoltă cu 300% an la an
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-3xl mb-4">🔬</div>
                  <h3 className="text-lg font-semibold mb-2">Tehnologii Avansate</h3>
                  <p className="text-blue-100 text-sm">
                    Lucrezi cu cele mai noi tehnologii AI și cloud
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-3xl mb-4">🌍</div>
                  <h3 className="text-lg font-semibold mb-2">Impact Global</h3>
                  <p className="text-blue-100 text-sm">
                    Produsul nostru este folosit în toată Europa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Beneficii și Avantaje
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Poziții Deschise
            </h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {position.department}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {position.location}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                            {position.type}
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                            {position.experience}
                          </span>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-md transition-all mt-4 lg:mt-0">
                        Aplică Acum
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{position.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Cerințe:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Culture Section */}
          <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Cultura Noastră
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Focus pe Rezultate</h3>
                <p className="text-gray-600 mb-6">
                  Valorăm performanța și impactul real asupra businessului clienților noștri. 
                  Fiecare membru al echipei are obiective clare și măsurabile.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🤝 Colaborare Deschisă</h3>
                <p className="text-gray-600 mb-6">
                  Promovăm o cultură de feedback constant și comunicare transparentă. 
                  Ideile bune pot veni de oriunde în organizație.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 Învățare Continuă</h3>
                <p className="text-gray-600 mb-6">
                  Investim în dezvoltarea fiecărei persoane din echipă prin training-uri, 
                  cursuri și oportunități de mentorat.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Inovație Rapidă</h3>
                <p className="text-gray-600">
                  Experimentăm constant cu tehnologii noi și abordări inovatoare. 
                  Eșecurile sunt văzute ca oportunități de învățare.
                </p>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Procesul de Aplicare
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aplică Online</h3>
                <p className="text-gray-600 text-sm">
                  Trimite CV-ul și o scrisoare de intenție personalizată
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Screening HR</h3>
                <p className="text-gray-600 text-sm">
                  Discuție inițială despre experiență și motivație
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interviu Tehnic</h3>
                <p className="text-gray-600 text-sm">
                  Evaluarea competențelor specifice poziției
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Decizia Finală</h3>
                <p className="text-gray-600 text-sm">
                  Ofertă și onboarding în echipa AI Chat
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Nu vezi poziția potrivită?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Trimite-ne CV-ul tău și te vom contacta când va apărea o oportunitate potrivită pentru tine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Trimite CV-ul spontan
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Urmărește-ne pe LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

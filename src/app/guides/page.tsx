import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gid-uri',
  description: 'Gid-uri complete',
};

export default function GidsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Gid-uri Complete
            </h1>
            <p className="text-xl text-gray-600">
              Tot ce ai nevoie să știi pentru a utiliza AI Chat la maximum
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
              Toate
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Început
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Configurare
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Optimizare
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Avansate
            </button>
          </div>

          {/* Featured Guides */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Gid-uri Populare
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">GUIDE 1</h3>
                    <span className="bg-black text-white px-3 py-1 rounded-lg text-sm">Început</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Primii pași cu AI Chat
                </h4>
                <p className="text-gray-600 mb-4">
                  Află cum să configurezi primul tău chatbot în mai puțin de 10 minute. 
                  Ghid pas cu pas pentru începători.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">15 min citire</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește ghidul
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">GUIDE 2</h3>
                    <span className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">Configurare</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Personalizarea conversațiilor
                </h4>
                <p className="text-gray-600 mb-4">
                  Învață să creezi conversații naturale și utile care reflectă vocea brand-ului tău.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">25 min citire</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește ghidul
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">GUIDE 3</h3>
                    <span className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">Optimizare</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Analiza performanțelor
                </h4>
                <p className="text-gray-600 mb-4">
                  Folosește dashboard-ul de analytics pentru a optimiza rata de conversie a chatbot-ului.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">20 min citire</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește ghidul
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* All Guides */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Toate Gidsurile
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-black text-white px-3 py-1 rounded-lg text-sm">Început</span>
                      <h3 className="text-xl font-bold text-black">Configurarea inițială</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Un ghid complet pentru configurarea primului tău chatbot AI, de la crearea contului 
                      până la prima conversație cu un client.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>GUIDE 4</span>
                      <span>•</span>
                      <span>10 min citire</span>
                      <span>•</span>
                      <span>Nivel: Începător</span>
                    </div>
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Citește
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">Configurare</span>
                      <h3 className="text-xl font-bold text-black">Integrarea cu website-ul</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Pasii necesari pentru a integra chatbot-ul pe website-ul tău, inclusiv opțiuni 
                      de personalizare și best practices.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>GUIDE 5</span>
                      <span>•</span>
                      <span>15 min citire</span>
                      <span>•</span>
                      <span>Nivel: Intermediar</span>
                    </div>
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Citește
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">Avansate</span>
                      <h3 className="text-xl font-bold text-black">API și integrări personalizate</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Pentru dezvoltatori: cum să folosești API-ul nostru pentru integrări personalizate 
                      și automatizări avansate.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>GUIDE 6</span>
                      <span>•</span>
                      <span>35 min citire</span>
                      <span>•</span>
                      <span>Nivel: Avansat</span>
                    </div>
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Citește
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="bg-black rounded-lg p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Tutoriale Video
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-black font-bold">▶</span>
                    </div>
                    <p className="text-gray-300">VIDEO 1</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Primul chatbot în 5 minute</h3>
                <p className="text-gray-300 text-sm">Tutorial video pas cu pas</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-black font-bold">▶</span>
                    </div>
                    <p className="text-gray-300">VIDEO 2</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Personalizarea aspectului</h3>
                <p className="text-gray-300 text-sm">Adaptează chatbot-ul la brand-ul tău</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-black font-bold">▶</span>
                    </div>
                    <p className="text-gray-300">VIDEO 3</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Analiza rezultatelor</h3>
                <p className="text-gray-300 text-sm">Interpretează datele din dashboard</p>
              </div>
            </div>
          </div>

          {/* Help CTA */}
          <div className="text-center bg-gray-50 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Ai nevoie de ajutor suplimentar?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contactează echipa noastră de suport pentru asistență personalizată
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Contactează suportul
              </button>
              <button className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Programează sesiune 1-on-1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studii de Caz - AI Chat Mega Promoting',
  description: 'Descoperă cum companiile folosesc AI Chat pentru a-și transforma businessul și a obține rezultate extraordinare.',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Studii de Caz
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Povești de succes ale companiilor care au implementat AI Chat
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Case Study 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-black text-center">
                  <h3 className="text-2xl font-bold mb-2">E-commerce Fashion</h3>
                  <p className="text-gray-600">Retailer online premium</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm font-medium">
                    +340% Conversii
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">
                  Transformarea Experienței de Shopping
                </h4>
                <p className="text-gray-600 mb-6">
                  Prin implementarea AI Chat, această companie de fashion a reușit să automatizeze 
                  întregul proces de recomandare produse și să îmbunătățească dramatic rata de conversie.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">85%</div>
                    <div className="text-sm text-gray-500">Reducere timp răspuns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">€2.5M</div>
                    <div className="text-sm text-gray-500">Venituri adiționale</div>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Citește studiul complet
                </button>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-black text-center">
                  <h3 className="text-2xl font-bold mb-2">Servicii Bancare</h3>
                  <p className="text-gray-600">Bancă digitală</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm font-medium">
                    +95% Satisfacție Client
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">
                  Revolutul Suportului Bancar
                </h4>
                <p className="text-gray-600 mb-6">
                  Implementarea AI Chat în serviciile bancare a redus timpul de așteptare al 
                  clienților și a îmbunătățit semnificativ experiența utilizatorilor.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">24/7</div>
                    <div className="text-sm text-gray-500">Disponibilitate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">70%</div>
                    <div className="text-sm text-gray-500">Reducere costuri</div>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Citește studiul complet
                </button>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-black text-center">
                  <h3 className="text-2xl font-bold mb-2">Real Estate</h3>
                  <p className="text-gray-600">Agenție imobiliară</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm font-medium">
                    +250% Lead-uri
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">
                  Automatizarea Vânzărilor Imobiliare
                </h4>
                <p className="text-gray-600 mb-6">
                  AI Chat a transformat modul în care această agenție imobiliară gestionează 
                  lead-urile și programează vizionările, crescând dramatic numărul de tranzacții.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">150+</div>
                    <div className="text-sm text-gray-500">Proprietăți/lună</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">60%</div>
                    <div className="text-sm text-gray-500">Timp economisit</div>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Citește studiul complet
                </button>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-black text-center">
                  <h3 className="text-2xl font-bold mb-2">Healthcare</h3>
                  <p className="text-gray-600">Clinică privată</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm font-medium">
                    +180% Programări
                  </div>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">
                  Digitalizarea Serviciilor Medicale
                </h4>
                <p className="text-gray-600 mb-6">
                  Implementarea AI Chat în sectorul medical a optimizat programările și a îmbunătățit 
                  comunicarea dintre pacienți și personal medical.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">92%</div>
                    <div className="text-sm text-gray-500">Programări automate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">45min</div>
                    <div className="text-sm text-gray-500">Timp economisit zilnic</div>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Citește studiul complet
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              Vrei să fii următorul nostru studiu de caz?
            </h2>
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-lg">
              Începe transformarea ta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prețuri - AI Chat Mega Promoting',
  description: 'Planuri și prețuri transparente pentru soluțiile AI Chat Mega Promoting.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Prețuri Simple și Transparente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Alege planul care se potrivește cel mai bine nevoilor afacerii tale. 
              Fără costuri ascunse, fără contracte pe termen lung.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button className="px-6 py-2 rounded-lg bg-black text-white font-semibold">
                Lunar
              </button>
              <button className="px-6 py-2 rounded-lg text-black hover:bg-gray-200 font-semibold transition-colors">
                Anual (2 luni gratuite)
              </button>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {/* Starter Plan */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect pentru afaceri mici</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">299</span>
                  <span className="text-gray-600 ml-2">MDL/lună</span>
                </div>
                
                <button className="w-full border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Începe perioada de testare
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-black mb-4">Inclus:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">1,000 conversații/lună</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">1 chatbot</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Suport email</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Integrări de bază</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Analytics de bază</span>
                </div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">Professional</h3>
                <p className="text-gray-600 mb-6">Pentru afaceri în creștere</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">799</span>
                  <span className="text-gray-600 ml-2">MDL/lună</span>
                </div>
                
                <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Începe perioada de testare
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-black mb-4">Tot din Starter, plus:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">5,000 conversații/lună</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">3 chatbots</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Suport prioritar</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Integrări avansate</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Personalizare brand</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">API access</span>
                </div>
              </div>
            </div>

            {/* Business Plan - Most Popular */}
            <div className="bg-black rounded-lg p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gray-200 text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Cel mai popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Business</h3>
                <p className="text-gray-300 mb-6">Pentru companii etablite</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">1,899</span>
                  <span className="text-gray-300 ml-2">MDL/lună</span>
                </div>
                
                <button className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Începe perioada de testare
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold mb-4">Tot din Professional, plus:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">15,000 conversații/lună</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">10 chatbots</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Suport telefonic 24/7</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Manager de cont dedicat</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">White-label opțional</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-gray-300">Analytics avansate</span>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">Enterprise</h3>
                <p className="text-gray-600 mb-6">Pentru corporații mari</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">Custom</span>
                </div>
                
                <button className="w-full border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contactează vânzările
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-black mb-4">Tot din Business, plus:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Conversații nelimitate</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Chatbots nelimitați</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Integrări personalizate</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">SLA garantat</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Training dedicat</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">Hosting dedicat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Servicii Suplimentare
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                <h3 className="text-xl font-bold text-black mb-4">Conversații Extra</h3>
                <p className="text-gray-600 mb-4">
                  Pentru când depășești limita planului tău
                </p>
                <div className="text-2xl font-bold text-black mb-4">
                  0.15 MDL
                </div>
                <p className="text-sm text-gray-500">per conversație suplimentară</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                <h3 className="text-xl font-bold text-black mb-4">Implementare Premium</h3>
                <p className="text-gray-600 mb-4">
                  Configurare completă și training pentru echipa ta
                </p>
                <div className="text-2xl font-bold text-black mb-4">
                  2,500 MDL
                </div>
                <p className="text-sm text-gray-500">tarif unic</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                <h3 className="text-xl font-bold text-black mb-4">Integrări Personalizate</h3>
                <p className="text-gray-600 mb-4">
                  Dezvoltare de integrări specifice nevoilor tale
                </p>
                <div className="text-2xl font-bold text-black mb-4">
                  De la 5,000 MDL
                </div>
                <p className="text-sm text-gray-500">în funcție de complexitate</p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Comparația Detaliată
            </h2>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="text-left p-4 font-bold text-black">Funcționalități</th>
                      <th className="text-center p-4 font-bold text-black">Starter</th>
                      <th className="text-center p-4 font-bold text-black">Professional</th>
                      <th className="text-center p-4 font-bold text-black">Business</th>
                      <th className="text-center p-4 font-bold text-black">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="p-4 text-black">Conversații/lună</td>
                      <td className="p-4 text-center text-gray-600">1,000</td>
                      <td className="p-4 text-center text-gray-600">5,000</td>
                      <td className="p-4 text-center text-gray-600">15,000</td>
                      <td className="p-4 text-center text-gray-600">Nelimitate</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-4 text-black">Număr chatbots</td>
                      <td className="p-4 text-center text-gray-600">1</td>
                      <td className="p-4 text-center text-gray-600">3</td>
                      <td className="p-4 text-center text-gray-600">10</td>
                      <td className="p-4 text-center text-gray-600">Nelimitate</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-4 text-black">Suport 24/7</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-black">✓</td>
                      <td className="p-4 text-center text-black">✓</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-4 text-black">Manager de cont</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-black">✓</td>
                      <td className="p-4 text-center text-black">✓</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-4 text-black">White-label</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-gray-600">-</td>
                      <td className="p-4 text-center text-gray-600">Opțional</td>
                      <td className="p-4 text-center text-black">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Întrebări despre Prețuri
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-3">
                  Există o perioadă de testare gratuită?
                </h3>
                <p className="text-gray-600">
                  Da, oferim 14 zile de testare gratuită pentru toate planurile, 
                  fără să fie necesare detalii de plată.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-3">
                  Pot schimba planul oricând?
                </h3>
                <p className="text-gray-600">
                  Absolut! Poți face upgrade sau downgrade oricând. 
                  Modificările se aplică la următoarea facturare.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-3">
                  Ce se întâmplă dacă depășesc limita de conversații?
                </h3>
                <p className="text-gray-600">
                  Conversațiile suplimentare se taxează la 0.15 MDL per conversație, 
                  sau poți face upgrade la un plan superior.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-3">
                  Acceptați diferite metode de plată?
                </h3>
                <p className="text-gray-600">
                  Da, acceptăm carduri de credit/debit, transfer bancar 
                  și facturare pentru companii.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-black rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Gata să începi?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Testează gratuit 14 zile și vezi diferența pe care o poate face AI Chat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Începe testarea gratuită
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Vorbește cu un expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

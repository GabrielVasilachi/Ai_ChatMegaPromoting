import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI Chat Mega Promoting',
  description: 'Descoperă cele mai recente articole și insights despre inteligența artificială în marketing și automatizare.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Blog AI Chat
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Află ultimele noutăți și insights despre inteligența artificială în marketing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mb-3">
                  Viitorul Marketingului cu AI
                </h2>
                <p className="text-gray-600 mb-4">
                  Cum transformă inteligența artificială modul în care companiile comunică cu clienții...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">15 Dec 2024</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește mai mult
                  </button>
                </div>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mb-3">
                  Automatizarea Customer Service
                </h2>
                <p className="text-gray-600 mb-4">
                  Beneficiile implementării chatbot-urilor inteligente pentru suportul clienților...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">12 Dec 2024</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește mai mult
                  </button>
                </div>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mb-3">
                  ROI în Campaniile AI
                </h2>
                <p className="text-gray-600 mb-4">
                  Cum să măsuri și să optimizezi returnul investiției în soluțiile AI...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">10 Dec 2024</span>
                  <button className="text-black hover:text-gray-600 font-medium">
                    Citește mai mult
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Vezi toate articolele
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

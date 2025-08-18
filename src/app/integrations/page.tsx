import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrări - AI Chat Mega Promoting',
  description: 'Conectează AI Chat cu platformele și sistemele pe care le folosești deja.',
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Integrări
            </h1>
            <p className="text-xl text-gray-600">
              Conectează AI Chat cu toate platformele tale preferate
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
              Toate
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              CRM
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              E-commerce
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Marketing
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Analytics
            </button>
          </div>

          {/* Popular Integrations */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Integrări Populare
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Salesforce */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">SF</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Salesforce</h3>
                    <p className="text-sm text-gray-600">CRM</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Sincronizează automat lead-urile și conversațiile cu Salesforce CRM.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-black font-semibold">Conectat</span>
                  <button className="text-black hover:text-gray-600">
                    Configurează
                  </button>
                </div>
              </div>

              {/* Shopify */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">SH</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Shopify</h3>
                    <p className="text-sm text-gray-600">E-commerce</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Integrare directă pentru suport comenzi și informații produse.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibil</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Conectează
                  </button>
                </div>
              </div>

              {/* WordPress */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">WP</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">WordPress</h3>
                    <p className="text-sm text-gray-600">CMS</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Plugin oficial pentru integrare rapidă în site-uri WordPress.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibil</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Instalează
                  </button>
                </div>
              </div>

              {/* HubSpot */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">HS</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">HubSpot</h3>
                    <p className="text-sm text-gray-600">Marketing & CRM</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Integrare completă cu HubSpot pentru marketing și vânzări.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibil</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Conectează
                  </button>
                </div>
              </div>

              {/* Google Analytics */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">GA</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Google Analytics</h3>
                    <p className="text-sm text-gray-600">Analytics</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Urmărește conversațiile și conversiile în Google Analytics.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibil</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Configurează
                  </button>
                </div>
              </div>

              {/* Slack */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">SL</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Slack</h3>
                    <p className="text-sm text-gray-600">Communication</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Primește notificări despre conversații importante în Slack.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibil</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Conectează
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* All Integrations */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Toate Integrările
            </h2>
            
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'Magento', 'WooCommerce', 'Zapier', 'Microsoft Teams',
                'Discord', 'Telegram', 'WhatsApp', 'Facebook Messenger',
                'Zendesk', 'Freshdesk', 'Intercom', 'Mailchimp',
                'Stripe', 'PayPal', 'Square', 'PrestaShop',
                'Joomla', 'Drupal', 'BigCommerce', 'OpenCart',
                'Zoho CRM', 'Pipedrive', 'ActiveCampaign', 'ConvertKit'
              ].map((integration) => (
                <div
                  key={integration}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-black font-bold text-xs">
                      {integration.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black text-sm">{integration}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* API Section */}
          <div className="bg-black rounded-lg p-8 text-white mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Nu vezi platforma ta?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Folosește API-ul nostru pentru a crea integrări personalizate
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 text-left mb-8">
                <code className="text-sm text-white">
                  {`curl -X POST "https://api.aichat.md/webhook" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello from my app!",
    "user_id": "12345"
  }'`}
                </code>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Vezi documentația API
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Solicită integrare customă
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center bg-gray-50 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Ai nevoie de ajutor cu integrările?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Echipa noastră tehnică te poate ajuta cu orice integrare
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Contactează suportul tehnic
              </button>
              <button className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Programează consultația
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

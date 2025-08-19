'use client';

// Static logo wall (no motion) styled to match Clay-style compact section
// Replace the placeholder image paths with your 20 sponsor logos.

type Sponsor = {
  name: string;
  src: string;
  caseStudy?: boolean;
  customSize?: string; // custom size class for specific logos
};

const sponsors: Sponsor[] = [
  { name: 'MolarMed', src: '/Sponsors/sponsor-1.png', customSize: 'w-16 h-6' },
  { name: 'Aquadis', src: '/Sponsors/sponsor-2.png', customSize: 'w-28 h-20' },
  { name: 'Mealtime', src: '/Sponsors/sponsor-3.png', customSize: 'w-16 h-8' },
  { name: 'universul-ferestrelor', src: '/Sponsors/sponsor-4.png', customSize: 'w-16 h-6' },
  { name: 'Autoplaza', src: '/Sponsors/sponsor-5.png', customSize: 'w-25 h-9' },
  { name: 'Megadent', src: '/Sponsors/sponsor-6.png', customSize: 'w-16 h-6' },
  { name: 'Dentpark', src: '/Sponsors/sponsor-7.png', customSize: 'w-16 h-6' },
  { name: 'Impactacademies', src: '/Sponsors/sponsor-8.png', customSize: 'w-14 h-6' },
  { name: 'BygGym', src: '/Sponsors/sponsor-9.png', customSize: 'w-16 h-6' },
  { name: 'Valdimobila', src: '/Sponsors/sponsor-10.png', customSize: 'w-18 h-16' },
  { name: 'Acoperisassigur', src: '/Sponsors/sponsor-11.png', customSize: 'w-12 h-6' },
  { name: 'Munch', src: '/Sponsors/sponsor-12.png', customSize: 'w-16 h-6' },
  { name: 'Zavoiul_nistrului_insta', src: '/Sponsors/sponsor-13.png', customSize: 'w-10 h-6' },
  { name: 'Pizza9', src: '/Sponsors/sponsor-14.png', customSize: 'w-16 h-6' },
  { name: 'Casadellapizza', src: '/Sponsors/sponsor-15.png', customSize: 'w-12 h-6' },
  { name: 'Picoteo', src: '/Sponsors/sponsor-16.png', customSize: 'w-14 h-6' },
  { name: 'Django', src: '/Sponsors/sponsor-17.png', customSize: 'w-16 h-6' },
  { name: 'Sauto', src: '/Sponsors/sponsor-18.png', customSize: 'w-14 h-6' },
  { name: 'MyCleanShoes', src: '/Sponsors/sponsor-19.png', customSize: 'w-12 h-6' },
  { name: 'CipAuto', src: '/Sponsors/sponsor-20.png', customSize: 'w-16 h-6' },
];

export default function LogoWall() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="w-full px-0 flex flex-col items-center">
        {/* Eyebrow + rating row (optional, easy to remove) */}
        <div className="text-center mb-8">
          <p className="uppercase tracking-[0.18em] text-[11px] font-semibold text-gray-700">
            Trusted by more than 300,000 leading GTM teams of all sizes
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
              <span>4.9 rating</span>
            </span>
            <span>•</span>
            <span>20K+ GTM engineering community</span>
          </div>
        </div>

        {/* Compact static grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 max-w-6xl mx-auto">
          {sponsors.map((s, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                  {s.name === 'Pizza9' ? (
                    <img
                      src={s.src}
                      alt={s.name}
                      className={`${['Aquadis','Mealtime','Autoplaza'].includes(s.name) ? s.customSize : (s.customSize ? s.customSize.replace(/w-\d+/,'w-24').replace(/h-\d+/,'h-10') : 'w-24 h-10') } object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-200 -ml-3`}
                    />
                  ) : s.name === 'Zavoiul_nistrului_insta' ? (
                    <img
                      src={s.src}
                      alt={s.name}
                      className={`${['Aquadis','Mealtime','Autoplaza'].includes(s.name) ? s.customSize : (s.customSize ? s.customSize.replace(/w-\d+/,'w-24').replace(/h-\d+/,'h-10') : 'w-24 h-10') } object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-200 ml-3 scale-125`}
                    />
                  ) : s.name === 'Autoplaza' ? (
                    <img
                      src={s.src}
                      alt={s.name}
                      className={`${['Aquadis','Mealtime','Autoplaza'].includes(s.name) ? s.customSize : (s.customSize ? s.customSize.replace(/w-\d+/,'w-24').replace(/h-\d+/,'h-10') : 'w-24 h-10') } object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-200 scale-110`}
                    />
                  ) : (
                    <img
                      src={s.src}
                      alt={s.name}
                      className={`${['Aquadis','Mealtime','Autoplaza','Valdimobila'].includes(s.name) ? s.customSize : (s.customSize ? s.customSize.replace(/w-\d+/,'w-24').replace(/h-\d+/,'h-10') : 'w-24 h-10') } object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-200`}
                    />
                  )}
              </div>
              {s.caseStudy && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  Case study
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

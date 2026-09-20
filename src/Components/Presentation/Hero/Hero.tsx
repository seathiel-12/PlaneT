import { Plane } from 'lucide-react'
import SearchBar from '../../../Utils/Components/SearchBar/SearchBar';
import SplitText from '../../../Utils/Components/SplitText/SplitText';
import { useLanguage } from '../../../contexts/LanguageContext';

function Hero() {
    const { t } = useLanguage();
  return (
    
    <div className="bg-[linear-gradient(to_bottom,_rgb(225,244,251)_10%,_var(--color-gray-50)_95%)]">
        <div className="min-h-[620px] px-4 pb-16 pt-12 sm:min-h-[680px] sm:pt-20">
            <div className='mx-auto flex w-max max-w-full items-center gap-2 rounded-full border border-gray-300 px-4 py-1.25'>
                <Plane width={20} stroke='var(--sb-blue-250)'/>            
                <p className='text-gray-500'>{t('hero.badge')}</p>
            </div>

            <div className='my-10 sm:mb-15'>

                <div className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-center gap-x-3 playfair-display">
                    <SplitText
                        text={t('hero.title')}
                        className="mt-6 mb-3 text-center text-4xl font-bold sm:text-5xl lg:text-6xl"
                        delay={20}
                        duration={0.7}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                    />
                    <p className='h-max text-4xl font-bold text-(--sb-blue-250) sm:text-5xl lg:text-6xl'>PlaneT</p>
                </div>
                <div className='mx-auto mt-4 max-w-3xl px-2 text-center text-lg text-gray-600 sm:px-6 sm:text-2xl'>
                    <SplitText
                        text={t('hero.description')}
                        delay={6}
                        duration={0.5}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                    />

                </div>
            </div>

        <SearchBar/>        

        </div>
            
    </div>
  )
}

export default Hero
export type ClassTravel = 'Economy' | 'Business' | 'First Class';
export type Continent = 'Europe' | 'Asia' | 'Africa' | 'America' | 'Oceania'
export type Flight = {
    company:string,
    classTravel: ClassTravel,
    fromCountry: string,
    continent: Continent,
    toCountry: string,
    departureAt: string,
    landingAt: string,
    duration: string,
    price: number,
    typeFlight: 'Direct' | 'Connecting',
    seatsLeft: number,
    city: string,
    rating: number,
    ratingCount: number,
    description: string,
    caracteristics: string[],
    isLiked: boolean,
    isPopular:boolean
    imagePath: string[] | string
}

export type HTTPResponse<T> = {
    success: boolean,
    message: string,
    body: T,
}
type FlightCard = {
    imagePath: string;
    city: string;
    country: string;
    price: number;
    rating: number;
    ratingNumber: number;
    departureTime: string;
    description: string;
    isLiked: boolean;
    isPopular:boolean,
    caracteristics: string[];
};

export const flightCardsMock: FlightCard[] = [
    {
        imagePath: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
        city: "Paris",
        country: "France",
        price: 350,
        rating: 4.8,
        ratingNumber: 1240,
        departureTime: "08:30",
        description: "Magical city of lights and romance",
        isLiked: true,
        isPopular: true,
        caracteristics: ["WiFi", "Meals", "Direct Flight"]
    },
    {
        imagePath: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=300&fit=crop",
        city: "Tokyo",
        country: "Japan",
        price: 520,
        rating: 4.9,
        ratingNumber: 2180,
        departureTime: "14:15",
        description: "Vibrant capital with ancient temples and modern skyscrapers",
        isLiked: false,
        isPopular: false,
        caracteristics: ["WiFi", "Business Class", "Meals", "Entertainment"]
    },
    {
        imagePath: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop",
        city: "Barcelona",
        country: "Spain",
        price: 280,
        rating: 4.6,
        ratingNumber: 980,
        departureTime: "10:45",
        description: "Beach city with architectural wonders",
        isLiked: true,
        isPopular: true,
        caracteristics: ["WiFi", "Meals", "Direct Flight", "Luggage"]
    },
    {
        imagePath: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&h=300&fit=crop",
        city: "New York",
        country: "USA",
        price: 420,
        rating: 4.7,
        ratingNumber: 1560,
        departureTime: "11:00",
        description: "The city that never sleeps with iconic landmarks",
        isLiked: false,
        isPopular: true,
        caracteristics: ["WiFi", "Entertainment", "Meals"]
    },
    {
        imagePath: "/assets/Images/Canada.jpg",
        city: "Dubai",
        country: "United Arab Emirates",
        price: 380,
        rating: 4.9,
        ratingNumber: 2025,
        departureTime: "16:30",
        description: "Luxury desert city with stunning architecture",
        isLiked: true,
        isPopular: true,
        caracteristics: ["WiFi", "Luxury Service", "Meals", "Premium Seating"]
    },
    {
        imagePath: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=500&h=300&fit=crop",
        city: "London",
        country: "United Kingdom",
        price: 310,
        rating: 4.5,
        ratingNumber: 870,
        departureTime: "09:20",
        description: "Historic capital with royal palaces and museums",
        isLiked: false,
        isPopular: true,
        caracteristics: ["WiFi", "Meals", "Direct Flight"]
    },
    {
        imagePath: "/assets/Images/Mexico.jpg",
        city: "Rome",
        country: "Italy",
        price: 320,
        rating: 4.8,
        ratingNumber: 1430,
        departureTime: "13:00",
        description: "Ancient city of history, art, and delicious cuisine",
        isLiked: true,
        isPopular: false,
        caracteristics: ["WiFi", "Meals", "Direct Flight", "Extra Baggage"]
    },
    {
        imagePath: "/assets/Images/Lisbon.jpg",
        city: "Sydney",
        country: "Australia",
        price: 680,
        rating: 4.7,
        ratingNumber: 1880,
        departureTime: "22:00",
        description: "Vibrant coastal city with iconic Opera House",
        isLiked: false,
        isPopular: true,
        caracteristics: ["WiFi", "Meals", "Entertainment", "Long Haul Service"]
    },
    {
        imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        city: "Bangkok",
        country: "Thailand",
        price: 290,
        rating: 4.6,
        ratingNumber: 1120,
        departureTime: "18:45",
        description: "Vibrant capital with temples, markets, and street food",
        isLiked: true,
        isPopular: false,
        caracteristics: ["WiFi", "Meals", "Direct Flight"]
    },
    {
        imagePath: "/assets/Images/Korea.jpg",
        city: "Miami",
        country: "USA",
        price: 250,
        rating: 4.4,
        ratingNumber: 760,
        departureTime: "07:00",
        description: "Beach paradise with vibrant nightlife and Art Deco architecture",
        isLiked: false,
        isPopular: true,
        caracteristics: ["WiFi", "Meals", "Direct Flight", "Priority Boarding"]
    }
];

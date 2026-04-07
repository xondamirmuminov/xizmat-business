import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { BookingType, BookingStatusEnum } from "@/types";

import { AnimatedQueueCard } from "../animated-queue-card";

export const mockBookings: BookingType[] = [
  {
    price: 85000,
    _id: "bkg_001",
    isStandBy: false,
    durationMinutes: 60,
    dateKey: "2025-04-15",
    bookingId: "BOOK-20250415-0001",
    status: BookingStatusEnum.CONFIRMED,
    endAt: new Date("2025-04-15T11:00:00.000Z"),
    startAt: new Date("2025-04-15T10:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_001",
      isActive: true,
      isBlocked: false,
      isRecommended: true,
      name: "Glow Salon & Spa",
      phoneNumbers: ["+1-555-0101"],
      address: "142 W 57th St, New York, NY 10019",
      coords: { latitude: 40.7128, longitude: -74.006 },
      logo: "https://cdn.example.com/logos/glow-salon.png",
      images: ["https://cdn.example.com/images/glow-1.jpg"],
      thumbnail: "https://cdn.example.com/thumbnails/glow-salon.jpg",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    service: {
      price: 85000,
      _id: "svc_001",
      isActive: true,
      isFavorite: true,
      isRecommended: true,
      durationMinutes: 60,
      businessId: "biz_001",
      categoryId: "cat_001",
      providerId: "user_001",
      description: "Full haircut and styling session.",
      primaryImage: "https://cdn.example.com/services/haircut.jpg",
      title: {
        uz: "Soch olish",
        en: "Haircut & Styling",
        ru: "Стрижка и укладка",
      },
      business: {
        images: [],
        _id: "biz_001",
        isActive: true,
        categories: [],
        isRecommended: true,
        name: "Glow Salon & Spa",
        phoneNumbers: ["+1-555-0101"],
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
  },
  {
    price: 40000,
    _id: "bkg_002",
    isStandBy: true,
    durationMinutes: 30,
    dateKey: "2025-04-16",
    bookingId: "BOOK-20250416-0002",
    status: BookingStatusEnum.PENDING,
    endAt: new Date("2025-04-16T14:30:00.000Z"),
    startAt: new Date("2025-04-16T14:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_002",
      isActive: true,
      isBlocked: false,
      isRecommended: false,
      name: "Pure Skin Clinic",
      phoneNumbers: ["+1-555-0202"],
      address: "88 Spring St, Manhattan, NY 10012",
      coords: { latitude: 40.7223, longitude: -74.0025 },
      logo: "https://cdn.example.com/logos/pure-skin.png",
      images: ["https://cdn.example.com/images/pure-skin-1.jpg"],
      thumbnail: "https://cdn.example.com/thumbnails/pure-skin.jpg",
      workingDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    service: {
      price: 40000,
      _id: "svc_002",
      isActive: true,
      isFavorite: false,
      durationMinutes: 30,
      isRecommended: false,
      businessId: "biz_002",
      providerId: "user_002",
      description: "Deep cleansing facial treatment.",
      primaryImage: "https://cdn.example.com/services/facial.jpg",
      title: {
        en: "Express Facial",
        uz: "Tez yuz parvarishi",
        ru: "Экспресс-уход за лицом",
      },
      business: {
        images: [],
        _id: "biz_002",
        isActive: true,
        categories: [],
        isRecommended: false,
        name: "Pure Skin Clinic",
        phoneNumbers: ["+1-555-0202"],
        workingDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      },
    },
  },
  {
    price: 120000,
    _id: "bkg_003",
    isStandBy: false,
    durationMinutes: 90,
    dateKey: "2025-04-17",
    bookingId: "BOOK-20250417-0003",
    status: BookingStatusEnum.COMPLETED,
    endAt: new Date("2025-04-17T10:30:00.000Z"),
    startAt: new Date("2025-04-17T09:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_003",
      isActive: true,
      isBlocked: false,
      isRecommended: true,
      name: "Zen Massage Studio",
      phoneNumbers: ["+1-555-0303"],
      address: "300 Mercer St, New York, NY 10003",
      coords: { latitude: 40.7282, longitude: -73.9942 },
      logo: "https://cdn.example.com/logos/zen-massage.png",
      thumbnail: "https://cdn.example.com/thumbnails/zen-massage.jpg",
      workingDays: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
      images: [
        "https://cdn.example.com/images/zen-1.jpg",
        "https://cdn.example.com/images/zen-2.jpg",
      ],
    },
    service: {
      price: 120000,
      _id: "svc_003",
      isActive: true,
      isFavorite: true,
      isRecommended: true,
      durationMinutes: 90,
      businessId: "biz_003",
      categoryId: "cat_003",
      providerId: "user_003",
      primaryImage: "https://cdn.example.com/services/deep-tissue.jpg",
      description: "Deep tissue massage targeting muscle tension and stress.",
      title: {
        uz: "Chuqur massaj",
        ru: "Глубокий массаж",
        en: "Deep Tissue Massage",
      },
      business: {
        images: [],
        _id: "biz_003",
        isActive: true,
        categories: [],
        isRecommended: true,
        name: "Zen Massage Studio",
        phoneNumbers: ["+1-555-0303"],
        workingDays: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
      },
    },
  },
  {
    price: 55000,
    _id: "bkg_004",
    isStandBy: false,
    durationMinutes: 45,
    dateKey: "2025-04-18",
    bookingId: "BOOK-20250418-0004",
    status: BookingStatusEnum.CANCELLED,
    endAt: new Date("2025-04-18T16:45:00.000Z"),
    startAt: new Date("2025-04-18T16:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_004",
      isActive: true,
      isBlocked: false,
      name: "Nail Atelier",
      isRecommended: false,
      phoneNumbers: ["+1-555-0404"],
      address: "54 Prince St, New York, NY 10012",
      coords: { latitude: 40.7231, longitude: -73.9947 },
      images: ["https://cdn.example.com/images/nail-1.jpg"],
      logo: "https://cdn.example.com/logos/nail-atelier.png",
      thumbnail: "https://cdn.example.com/thumbnails/nail-atelier.jpg",
      workingDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    },
    service: {
      price: 55000,
      _id: "svc_004",
      isActive: true,
      isFavorite: false,
      durationMinutes: 45,
      isRecommended: false,
      businessId: "biz_004",
      categoryId: "cat_004",
      providerId: "user_004",
      description: "Gel manicure with UV finish and cuticle care.",
      primaryImage: "https://cdn.example.com/services/gel-nails.jpg",
      title: { uz: "Gel manikur", en: "Gel Manicure", ru: "Гель-маникюр" },
      business: {
        images: [],
        _id: "biz_004",
        isActive: true,
        categories: [],
        name: "Nail Atelier",
        isRecommended: false,
        phoneNumbers: ["+1-555-0404"],
        workingDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      },
    },
  },
  {
    price: 95000,
    _id: "bkg_005",
    isStandBy: true,
    durationMinutes: 60,
    dateKey: "2025-04-20",
    bookingId: "BOOK-20250420-0005",
    status: BookingStatusEnum.PENDING,
    endAt: new Date("2025-04-20T12:00:00.000Z"),
    startAt: new Date("2025-04-20T11:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_005",
      isActive: true,
      isBlocked: false,
      name: "BarberKing",
      isRecommended: true,
      phoneNumbers: ["+1-555-0505"],
      address: "210 Bleecker St, New York, NY 10014",
      coords: { latitude: 40.7306, longitude: -74.0021 },
      logo: "https://cdn.example.com/logos/barberking.png",
      thumbnail: "https://cdn.example.com/thumbnails/barberking.jpg",
      socialMediaLinks: { instagram: "https://instagram.com/barberking" },
      images: [
        "https://cdn.example.com/images/barber-1.jpg",
        "https://cdn.example.com/images/barber-2.jpg",
      ],
      workingDays: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    service: {
      price: 95000,
      _id: "svc_005",
      isActive: true,
      isFavorite: true,
      isRecommended: true,
      durationMinutes: 60,
      businessId: "biz_005",
      categoryId: "cat_005",
      providerId: "user_005",
      primaryImage: "https://cdn.example.com/services/beard-trim.jpg",
      description: "Classic shave, beard sculpting, and hot towel treatment.",
      title: {
        en: "Shave & Beard Sculpt",
        ru: "Бритьё и оформление бороды",
        uz: "Soqol olish va shakllantirish",
      },
      business: {
        images: [],
        _id: "biz_005",
        isActive: true,
        categories: [],
        name: "BarberKing",
        isRecommended: true,
        phoneNumbers: ["+1-555-0505"],
        workingDays: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
  },
  {
    price: 150000,
    _id: "bkg_006",
    isStandBy: false,
    durationMinutes: 60,
    dateKey: "2025-04-22",
    bookingId: "BOOK-20250422-0006",
    status: BookingStatusEnum.CONFIRMED,
    endAt: new Date("2025-04-22T14:00:00.000Z"),
    startAt: new Date("2025-04-22T13:00:00.000Z"),
    user: {
      _id: "32323",
      phone: "+998932050799",
      fullName: "Xondamir Muminov",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    business: {
      _id: "biz_006",
      isActive: true,
      isBlocked: false,
      isRecommended: true,
      name: "Lumière Beauty Lounge",
      phoneNumbers: ["+1-555-0606"],
      address: "19 E 71st St, New York, NY 10021",
      logo: "https://cdn.example.com/logos/lumiere.png",
      coords: { latitude: 40.7694, longitude: -73.9637 },
      thumbnail: "https://cdn.example.com/thumbnails/lumiere.jpg",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      images: [
        "https://cdn.example.com/images/lumiere-1.jpg",
        "https://cdn.example.com/images/lumiere-2.jpg",
      ],
      socialMediaLinks: {
        facebook: "https://facebook.com/lumierebeauty",
        instagram: "https://instagram.com/lumierebeauty",
      },
    },
    service: {
      price: 150000,
      _id: "svc_006",
      isActive: true,
      isFavorite: false,
      isRecommended: true,
      durationMinutes: 60,
      businessId: "biz_006",
      categoryId: "cat_006",
      providerId: "user_006",
      primaryImage: "https://cdn.example.com/services/lash-lift.jpg",
      description:
        "Lash lift and tint with brow lamination for a polished look.",
      title: {
        en: "Lash Lift & Brow Lamination",
        uz: "Kirpik va qosh laminatsiyasi",
        ru: "Ламинирование ресниц и бровей",
      },
      business: {
        images: [],
        _id: "biz_006",
        isActive: true,
        categories: [],
        isRecommended: true,
        name: "Lumière Beauty Lounge",
        phoneNumbers: ["+1-555-0606"],
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
  },
];

const spacing = 16;
const itemSize = 360;
const itemFullSize = itemSize + spacing;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export function QueueList() {
  const { height: windowHeight } = useWindowDimensions();
  const safeHeight = windowHeight;

  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / itemFullSize;
  });

  return (
    <AnimatedFlashList
      data={mockBookings}
      onScroll={handleScroll}
      decelerationRate="fast"
      scrollEventThrottle={16}
      snapToInterval={itemFullSize}
      keyExtractor={(booking) => (booking as BookingType)?._id}
      ItemSeparatorComponent={() => <View style={{ height: spacing }}></View>}
      contentContainerStyle={[
        styles.listContainer,
        { paddingVertical: (safeHeight - itemFullSize) / 2 },
      ]}
      renderItem={({ index, item: booking }) => (
        <AnimatedQueueCard
          index={index}
          scrollY={scrollY}
          booking={booking as BookingType}
        />
      )}
    />
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  listContainer: {
    paddingInline: space(2),
  },
}));

export interface Team {
    id: string;
    name: string;
    isStillIn: boolean;
    randomRotation?: number;
    randomTop?: number;
    randomLeft?: number;
  }

  export const TEAMS = {
    ALGERIA: { id: 'ALG', name: 'Algeria', isStillIn: true },
    ARGENTINA: { id: 'ARG', name: 'Argentina', isStillIn: true },
    AUSTRALIA: { id: 'AUS', name: 'Australia', isStillIn: true },
    AUSTRIA: { id: 'AUT', name: 'Austria', isStillIn: true },
    BELGIUM: { id: 'BEL', name: 'Belgium', isStillIn: true },
    BOSNIA_HERZEGOVINA: { id: 'BIH', name: 'Bosnia and Herzegovina', isStillIn: true },
    BRAZIL: { id: 'BRA', name: 'Brazil', isStillIn: true },
    CANADA: { id: 'CAN', name: 'Canada', isStillIn: true },
    CAPE_VERDE: { id: 'CPV', name: 'Cape Verde', isStillIn: true },
    COLOMBIA: { id: 'COL', name: 'Colombia', isStillIn: true },
    CROATIA: { id: 'CRO', name: 'Croatia', isStillIn: true },
    CURACAO: { id: 'CUW', name: 'Curaçao', isStillIn: false },
    CZECH_REPUBLIC: { id: 'CZE', name: 'Czech Republic', isStillIn: false },
    DR_CONGO: { id: 'COD', name: 'DR Congo', isStillIn: false },
    ECUADOR: { id: 'ECU', name: 'Ecuador', isStillIn: false },
    EGYPT: { id: 'EGY', name: 'Egypt', isStillIn: true },
    ENGLAND: { id: 'ENG', name: 'England', isStillIn: true },
    FRANCE: { id: 'FRA', name: 'France', isStillIn: true },
    GERMANY: { id: 'GER', name: 'Germany', isStillIn: false },
    GHANA: { id: 'GHA', name: 'Ghana', isStillIn: true },
    HAITI: { id: 'HAI', name: 'Haiti', isStillIn: false },
    IRAN: { id: 'IRN', name: 'Iran', isStillIn: false },
    IRAQ: { id: 'IRQ', name: 'Iraq', isStillIn: false },
    IVORY_COAST: { id: 'CIV', name: 'Ivory Coast', isStillIn: false },
    JAPAN: { id: 'JPN', name: 'Japan', isStillIn: false },
    JORDAN: { id: 'JOR', name: 'Jordan', isStillIn: false },
    MEXICO: { id: 'MEX', name: 'Mexico', isStillIn: true },
    MOROCCO: { id: 'MAR', name: 'Morocco', isStillIn: true },
    NETHERLANDS: { id: 'NED', name: 'Netherlands', isStillIn: false },
    NEW_ZEALAND: { id: 'NZL', name: 'New Zealand', isStillIn: false },
    NORWAY: { id: 'NOR', name: 'Norway', isStillIn: true },
    PANAMA: { id: 'PAN', name: 'Panama', isStillIn: false },
    PARAGUAY: { id: 'PAR', name: 'Paraguay', isStillIn: true },
    PORTUGAL: { id: 'POR', name: 'Portugal', isStillIn: true },
    QATAR: { id: 'QAT', name: 'Qatar', isStillIn: false },
    SAUDI_ARABIA: { id: 'KSA', name: 'Saudi Arabia', isStillIn: false },
    SCOTLAND: { id: 'SCO', name: 'Scotland', isStillIn: false },
    SENEGAL: { id: 'SEN', name: 'Senegal', isStillIn: false },
    SOUTH_AFRICA: { id: 'RSA', name: 'South Africa', isStillIn: false },
    SOUTH_KOREA: { id: 'KOR', name: 'South Korea', isStillIn: false },
    SPAIN: { id: 'ESP', name: 'Spain', isStillIn: true },
    SWEDEN: { id: 'SWE', name: 'Sweden', isStillIn: false },
    SWITZERLAND: { id: 'SUI', name: 'Switzerland', isStillIn: true },
    TUNISIA: { id: 'TUN', name: 'Tunisia', isStillIn: false },
    TURKIYE: { id: 'TUR', name: 'Türkiye', isStillIn: false },
    URUGUAY: { id: 'URU', name: 'Uruguay', isStillIn: false },
    USA: { id: 'USA', name: 'USA', isStillIn: true },
    UZBEKISTAN: { id: 'UZB', name: 'Uzbekistan', isStillIn: false },
  };
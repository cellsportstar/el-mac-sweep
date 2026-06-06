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
    CURACAO: { id: 'CUW', name: 'Curaçao', isStillIn: true },
    CZECH_REPUBLIC: { id: 'CZE', name: 'Czech Republic', isStillIn: true },
    DR_CONGO: { id: 'COD', name: 'DR Congo', isStillIn: true },
    ECUADOR: { id: 'ECU', name: 'Ecuador', isStillIn: true },
    EGYPT: { id: 'EGY', name: 'Egypt', isStillIn: true },
    ENGLAND: { id: 'ENG', name: 'England', isStillIn: true },
    FRANCE: { id: 'FRA', name: 'France', isStillIn: true },
    GERMANY: { id: 'GER', name: 'Germany', isStillIn: true },
    GHANA: { id: 'GHA', name: 'Ghana', isStillIn: true },
    HAITI: { id: 'HAI', name: 'Haiti', isStillIn: true },
    IRAN: { id: 'IRN', name: 'Iran', isStillIn: true },
    IRAQ: { id: 'IRQ', name: 'Iraq', isStillIn: true },
    IVORY_COAST: { id: 'CIV', name: 'Ivory Coast', isStillIn: true },
    JAPAN: { id: 'JPN', name: 'Japan', isStillIn: true },
    JORDAN: { id: 'JOR', name: 'Jordan', isStillIn: true },
    MEXICO: { id: 'MEX', name: 'Mexico', isStillIn: true },
    MOROCCO: { id: 'MAR', name: 'Morocco', isStillIn: true },
    NETHERLANDS: { id: 'NED', name: 'Netherlands', isStillIn: true },
    NEW_ZEALAND: { id: 'NZL', name: 'New Zealand', isStillIn: true },
    NORWAY: { id: 'NOR', name: 'Norway', isStillIn: true },
    PANAMA: { id: 'PAN', name: 'Panama', isStillIn: true },
    PARAGUAY: { id: 'PAR', name: 'Paraguay', isStillIn: true },
    PORTUGAL: { id: 'POR', name: 'Portugal', isStillIn: true },
    QATAR: { id: 'QAT', name: 'Qatar', isStillIn: true },
    SAUDI_ARABIA: { id: 'KSA', name: 'Saudi Arabia', isStillIn: true },
    SCOTLAND: { id: 'SCO', name: 'Scotland', isStillIn: true },
    SENEGAL: { id: 'SEN', name: 'Senegal', isStillIn: true },
    SOUTH_AFRICA: { id: 'RSA', name: 'South Africa', isStillIn: true },
    SOUTH_KOREA: { id: 'KOR', name: 'South Korea', isStillIn: true },
    SPAIN: { id: 'ESP', name: 'Spain', isStillIn: true },
    SWEDEN: { id: 'SWE', name: 'Sweden', isStillIn: true },
    SWITZERLAND: { id: 'SUI', name: 'Switzerland', isStillIn: true },
    TUNISIA: { id: 'TUN', name: 'Tunisia', isStillIn: true },
    TURKIYE: { id: 'TUR', name: 'Türkiye', isStillIn: true },
    URUGUAY: { id: 'URY', name: 'Uruguay', isStillIn: true },
    USA: { id: 'USA', name: 'USA', isStillIn: true },
    UZBEKISTAN: { id: 'UZB', name: 'Uzbekistan', isStillIn: true },
  };
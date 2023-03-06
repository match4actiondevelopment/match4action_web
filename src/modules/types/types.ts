export enum UserRole {
  "volunteer",
  "admin",
  "organization",
}

export interface UserI {
  name: string;
  email: string;
  image?: string;
  termsAndConditions: boolean;
  role?: UserRole;
  birthDate?: Date;
  bio?: string;
  location: {
    city: string;
    country: string;
  };
  provider?: string;
  answers: Record<string, any>;
  _id: string;
}

export interface GoalsInterface {
  _id: string;
  name: string;
  order: number;
  image?: string;
}

export type GenericPageInterface = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export interface ProfileFormInterface {
  name?: string;
  role?: string;
  birthDate?: string;
  location?: {
    city?: string;
    country?: string;
  };
  bio?: string;
  image?: string;
}

export interface RegisterInterface {
  data: TokensInterface;
  success: boolean;
}

export interface TokensInterface {
  access_token: string;
  refresh_token: string;
}

export interface RequestInterface<T> {
  success: boolean;
  data: T;
}

export type UpdateProfilePayload = {
  body: ProfileFormInterface;
  id: string;
};

export interface UpdatedProfileInterface {
  success: boolean;
  data: UserI;
}
export interface Location {
  country: string;
  city: string;
}

export interface Provider {
  id: string;
  name: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface InitiativeInterface {
  userId: string;
  eventTimeFrame?: string;
  eventType?: string;
  initiativeName: string;
  whatMovesThisInitiative?: string[];
  whichAreasAreCoveredByThisInitiative?: string[];
  servicesNeeded: string[];
  description: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  postalCode?: string;
  website?: string;
  location: Location;
  goals?: string[];
  image?: string[];
  applicant?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

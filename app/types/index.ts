// import { Listing, Reservation, User } from "@prisma/client";

// export type SafeListing = Omit<Listing, "createdAt"> & {
//   createdAt: string;
// };

// export type SafeReservation = Omit<
//   Reservation, 
//   "createdAt" | "startDate" | "endDate" | "listing"
// > & {
//   createdAt: string;
//   startDate: string;
//   endDate: string;
//   listing: SafeListing;
// };

// export type SafeUser = Omit<
//   User,
//   "createdAt" | "updatedAt" | "emailVerified"
// > & {
//   createdAt: string;
//   updatedAt: string;
//   emailVerified: string | null;
// };

interface userInfo {
  username: string,
  iat: string,
  exp: string
};

export type cUser = Omit<
  userInfo,
  "username" | "iat" | "exp"
> & {
  username: string,
  iat: string,
  exp: string
};

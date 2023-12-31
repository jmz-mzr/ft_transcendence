import { Game } from '@/components/profile/types/profile.type';

export interface IUserData {
  id: number;
  fortytwoId: number;
  username: string;
  firstName: string;
  lastName: string;
  has2FA: boolean;
  profilePicture: string;
  status: Status;
  matchHistory: Game[];
  elo: number;
  wins: number;
  draws: number;
  losses: number;
  rank: number;
  achievements: string[];
  blockedUsers: { id: number }[];
}

export type UpdateProfile = Partial<
  Pick<IUserData, 'username' | 'has2FA' | 'profilePicture'>
>;

export enum Status {
  ONLINE = 'online',
  IN_GAME = 'in-game',
  OFFLINE = 'offline',
}

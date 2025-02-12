export interface Hero {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: 'jpg';
  };
  comics: Comics;
}
export interface Comics {
    available: number;
}

export interface HeroResponse{
    data: {
        results: Hero[];
        total: number;
    }
}

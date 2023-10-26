interface ILayout {
  title?: string;
  children: React.ReactNode;
}
interface IMovieAdd {
  id: number;
  title: string;
  year: number;
}
export type { ILayout, IMovieAdd };

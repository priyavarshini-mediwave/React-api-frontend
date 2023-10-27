interface ILayout {
  title?: string;
  children: React.ReactNode;
}
interface IMovieAdd {
  id: number;
  title: string;
  year: number;
}
interface IShowError {
  action: string;
  msg: string;
}
export type { ILayout, IMovieAdd, IShowError };

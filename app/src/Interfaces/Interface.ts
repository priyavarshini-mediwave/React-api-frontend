interface ILayout {
  title?: string;
  children: React.ReactNode;
}
interface IMovieAdd {
  id: number;
  title: string;
  year: undefined | number;
}
interface IShowError {
  action: string;
  msg: string;
}
export type { ILayout, IMovieAdd, IShowError };

import { Nullable } from './common.types';
export interface IImageData {
  alternativeText: Nullable<string>;
  width: number;
  height: number;
  url: string;
}

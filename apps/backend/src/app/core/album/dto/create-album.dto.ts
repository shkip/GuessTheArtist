import { IAlbum } from '@guess-the-artist/interfaces';

export class CreateAlbumDto implements IAlbum {
  title: string;
  artist: string;
  img: string;
}

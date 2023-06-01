import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './models/album.model';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>
  ) {}

  async getByArtist(artist: string, limit: number): Promise<Album[]> {
    return this.albumModel.find({ artist }).limit(limit).exec();
  }

  async createMany(createAlbumDtos: CreateAlbumDto[]) {
    return this.albumModel.insertMany(createAlbumDtos);
  }
}

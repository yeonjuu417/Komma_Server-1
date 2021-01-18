import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import Song from "../entity/Songlist";

export default class CreateSongList implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // ** 예시
    // const SongList = [
    //   {
    //     title: "불",
    //     iconImg: "Imgfile",
    //     soundFile: "Soundfile",
    //     defaultVolume: "50"
    //   },
    //   {
    //     title: "바람",
    //     iconImg: "Imgfile",
    //     soundFile: "Soundfile",
    //     defaultVolume: "50"
    //   },
    //   {
    //     title: "숲",
    //     iconImg: "Imgfile",
    //     soundFile: "Soundfile",
    //     defaultVolume: "50"
    //   },
    //   {
    //     title: "물",
    //     iconImg: "Imgfile",
    //     soundFile: "Soundfile",
    //     defaultVolume: "50"
    //   }
    // ];
    // await connection.getRepository(Song).save(SongList);
  }
}
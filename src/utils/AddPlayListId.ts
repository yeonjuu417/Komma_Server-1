export const addPlayListId: Function = (savesongs: Array<any>, id: number) => {
  savesongs.map(savesong => {
    savesong.playlist = id;
  })
  return savesongs;
}
import {stores} from '../stores';
import loadFonts from '../config/loadFonts';
import loadImages from '@app/config/loadImages';

const {ui} = stores;

export class OnStart implements IService {
  private inited = false;

  init = async (): PVoid => {
    if (!this.inited) {
      ui.incAppLaunces();

      await this.loadAssets();

      this.inited = true;
    }
  };

  private loadAssets = async () => {
    await loadFonts();
    loadImages();
  };
}

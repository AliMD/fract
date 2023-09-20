import {AlwatrDynamicDirective, directive, html, Part, type PartInfo} from '@alwatr/fract';

export class AlwatrPageTestDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-page-test>');
  }

  protected progress() {
    this._logger.logMethod?.('progress');
    let progress = 0;
    const progressBar = document.querySelector('ion-progress-bar');

    if (!progressBar) return;
    setInterval(() => {
      progressBar.value = progress += 0.01;
      if (progress > 1) {
        setTimeout(() => {
          progressBar.value = progress = 0;
        }, 1000);
      }
    }, 50);
  }

  override update(_part: Part, props: unknown[]): unknown {
    this.progress();
    return super.update(_part, props);
  }

  render(name: string): unknown {
    this._logger.logMethodArgs?.('render', name);
    return html`
      <div class="flex w-full flex-col gap-10">
        <ion-segment value="default">
          <ion-segment-button value="default">
            <ion-label>Default</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
          <ion-segment-button value="tab">
            <ion-label>Tab</ion-label>
          </ion-segment-button>
          <ion-segment-button value="file">
            <ion-label>File</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-searchbar></ion-searchbar>

        <ion-card>
          <ion-progress-bar></ion-progress-bar>

          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
          </ion-card-content>

          <ion-button fill="clear">Action 1</ion-button>
          <ion-button fill="clear">Action 2</ion-button>
        </ion-card>
      </div>
    `;
  }
}

export const alwatrPageTest = directive(AlwatrPageTestDirective);

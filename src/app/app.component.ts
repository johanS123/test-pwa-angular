import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testlogger-front';

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.updateClient();
    this.checkUpdate();
  }

  updateClient() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.subscribe((ev: VersionEvent) => {
      console.log(ev.type, 'evento')
      if (ev.type === 'VERSION_READY') {
        Swal.fire({
          title: 'Actualización Disponible',
          text: '¡Debes realizar actualizacion de la aplicación, asi podras utilizar nuevas funcionalidades!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Actualizar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.swUpdate.activateUpdate().then(() => location.reload())
          }
        })
      }
    })
  }
  
  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {

        const timeInterval = interval(60 * 1000);

        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => console.log('checked'))
          console.log('update checked')  
        })
      }
    })
  }


}


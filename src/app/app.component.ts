import { Component } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testlogger-front';

  constructor(
    private swUpdate: SwUpdate
  ) {
    this.updateClient();
  }

  updateClient() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.subscribe((ev: VersionEvent) => {
      console.log(ev.type)
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
}




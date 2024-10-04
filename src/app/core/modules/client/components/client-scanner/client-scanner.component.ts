import { AfterViewInit, Component, inject, OnInit, output } from '@angular/core';
import {
  Subject,
  Observable,
  Subscription,
  debounceTime,
  fromEvent,
} from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { DocumentServiceService } from '@services';
import { NxConfirmDialogService } from '@shared';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'client-scanner',
  templateUrl: './client-scanner.component.html',
  styleUrl: './client-scanner.component.css',
})
export class ClientScannerComponent implements OnInit, AfterViewInit {
  public width = 300;
  public height = 700;
  public showWebcam = true;
  public deviceId: string = '';
  public errors: WebcamInitError[] = [];
  private _serviceConfirm = inject(NxConfirmDialogService);

  public onClose = output<void>();
  public onSave = output<string>();

  public webcamImage: WebcamImage | null = null;

  // @ViewChild('myCanvas', { static: true })
  // canvas!: ElementRef<HTMLCanvasElement>;
  // private ctx!: CanvasRenderingContext2D;
  // points = [
  //   { x: 100, y: 100 },
  //   { x: 300, y: 100 },
  //   { x: 300, y: 300 },
  //   { x: 100, y: 300 },
  // ];
  // selectedPoint:
  //   | {
  //       x: number;
  //       y: number;
  //     }
  //   | undefined;

  // private img = new Image();

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  private _subscription = new Subscription();
  private _serviceDoc = inject(DocumentServiceService);

  public ngOnInit(): void {
    this.setInnerSizes();
    this.initSubscription();
  }

  private initSubscription() {
    this._subscription.add(
      fromEvent(window, 'resize')
        .pipe(debounceTime(200))
        .subscribe(() => {
          this.setInnerSizes();
        })
    );
  }

  private setInnerSizes() {
    if (this.webcamImage) return;
    this.width = window.innerWidth <= 900 ? window.innerWidth - 32 : 750;
    this.height = window.innerHeight - 200;
    // this.points = [
    //   { x: 25, y: 25 },
    //   { x: this.width - 25, y: 25 },
    //   { x: this.width - 25, y: this.height - 25 },
    //   { x: 25, y: this.height - 25 },
    // ];
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.showWebcam = false;
    this.webcamImage = webcamImage;
    // this.img.width = this.width;
    // this.img.height = this.height;
    // this.img.src = this.webcamImage.imageAsDataUrl;
    // this.drawCanvas();
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  ngAfterViewInit() {
    // this.ctx = this.canvas.nativeElement.getContext('2d')!;
    // this.drawCanvas();
  }

  // drawCanvas() {
  //   const ctx = this.ctx;
  //   if (!this.img.complete) {
  //     this.img.onload = () => {
  //       this.redrawCanvas(ctx);
  //     };
  //   } else {
  //     this.redrawCanvas(ctx);
  //   }
  // }

  // redrawCanvas(ctx: CanvasRenderingContext2D) {
  //   ctx.clearRect(0, 0, this.width, this.height);
  //   ctx.drawImage(this.img, 0, 0, this.width, this.height);
  //   this.drawShapesAndPoints(ctx);
  // }

  // drawShapesAndPoints(ctx: CanvasRenderingContext2D) {
  //   ctx.beginPath();
  //   ctx.moveTo(this.points[0].x, this.points[0].y);
  //   for (let i = 1; i < this.points.length; i++) {
  //     ctx.lineTo(this.points[i].x, this.points[i].y);
  //   }
  //   ctx.closePath();
  //   ctx.strokeStyle = 'orange';
  //   ctx.stroke();
  //   for (const point of this.points) {
  //     this.drawPoint(point.x, point.y);
  //   }
  // }

  // drawPoint(x: number, y: number) {
  //   const ctx = this.ctx;
  //   ctx.beginPath();
  //   ctx.arc(x, y, 15, 0, Math.PI * 2);
  //   ctx.fillStyle = 'orange';
  //   ctx.fill();
  //   ctx.closePath();
  // }

  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   const { offsetX, offsetY } = event;
  //   this.selectedPoint = this.points.find((p) =>
  //     this.isPointClicked(p, offsetX, offsetY)
  //   );
  // }

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (this.selectedPoint) {
  //     const { offsetX, offsetY } = event;
  //     this.selectedPoint.x = offsetX;
  //     this.selectedPoint.y = offsetY;
  //     this.drawCanvas();
  //   }
  // }

  // @HostListener('mouseup')
  // onMouseUp() {
  //   this.selectedPoint = undefined;
  // }

  // @HostListener('touchstart', ['$event'])
  // onTouchStart(event: TouchEvent) {
  //   const touch = event.touches[0];
  //   const { clientX, clientY } = touch;
  //   const rect = this.canvas.nativeElement.getBoundingClientRect();

  //   const offsetX = clientX - rect.left;
  //   const offsetY = clientY - rect.top;

  //   this.selectedPoint = this.points.find((p) =>
  //     this.isPointClicked(p, offsetX, offsetY)
  //   );
  //   this.onTouchMove(event);
  // }

  // @HostListener('touchmove', ['$event'])
  // onTouchMove(event: TouchEvent) {
  //   if (this.selectedPoint) {
  //     const touch = event.touches[0];
  //     const { clientX, clientY } = touch;
  //     const rect = this.canvas.nativeElement.getBoundingClientRect();

  //     const offsetX = clientX - rect.left;
  //     const offsetY = clientY - rect.top;

  //     this.selectedPoint.x = offsetX;
  //     this.selectedPoint.y = offsetY;
  //     this.drawCanvas();
  //   }
  // }

  // @HostListener('touchend')
  // onTouchEnd() {
  //   this.selectedPoint = undefined;
  // }

  // private isPointClicked(point: any, x: number, y: number) {
  //   const radius = 25;
  //   return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) < radius;
  // }

  //distortToLetterSize() {
  // const points = this.points.map((point) => [point.x, point.y]);
  // const result = {
  //   width: this.width,
  //   height: this.height,
  //   image: this.img.src.replace('data:image/jpeg;base64,', ''),
  //   points: [points[0], points[3], points[2], points[1]],
  // };
  // console.log(result);
  // this._serviceDoc.cutImage(result).subscribe({
  //   next: (value) => {
  //     console.log(value);
  //   },
  // });
  //}

  clearImage() {
    this._serviceConfirm.addConfirmDialog({
      type: 'warning',
      title: 'Confirmación de borrado',
      message: 'Se perderá la imagen tomada ¿Esta seguro de borrar?',
      buttons: {
        primary: 'Aceptar',
        secondary: 'Cancelar',
      },
      next: () => {
        this.showWebcam = true;
        this.webcamImage = null;
      },
    });
  }

  saveImage() {
    this.onSave.emit(`data:image/jpeg;base64,${this.webcamImage!.imageAsBase64}`)
  }
}

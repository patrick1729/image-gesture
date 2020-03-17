import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('video') video: ElementRef;

    constraints = {
        video: {
            facingMode: 'environment',
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

    videoWidth = 0;
    videoHeight = 0;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.startCamera();
    }

    startCamera() {
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            navigator.mediaDevices.getUserMedia(this.constraints)
                .then((stream) => this.attachVideo(stream)).catch((error) => this.handleError(error));
        } else {
            alert('Camera not available');
        }
    }

    captureImage() {
        this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoHeight);
        this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoWidth);
        this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
    }

    handleError(error) {
        console.error(error)
    }

    attachVideo(stream) {
        this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.video.nativeElement, 'play', (event) => {
            this.videoHeight = this.video.nativeElement.videoHeight;
            this.videoWidth = this.video.nativeElement.videoWidth;
        });
    }
}

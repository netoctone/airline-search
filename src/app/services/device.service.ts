export class DeviceService {

  isMobile() {
    return !window.matchMedia("(min-width: 768px)").matches;
  }

}

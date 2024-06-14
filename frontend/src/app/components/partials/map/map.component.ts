import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private readonly MARKER_ZOON_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEAFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })
   mapRef!: ElementRef;
   map!: L.Map;
   currentMarker!:Marker;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEAFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng)
    })
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOON_LEVEL)
        this.setMarker(latlng)
      },
    });
  }

  setMarker(latlng: LatLngExpression) {
    if(this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map)
   
  }
}

<script lang="ts">
	import { type Marker, type LatLngExpression, type LatLngTuple, type Map as LMap } from 'leaflet';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Feature } from './apitypes';

	type Props = {
		fires: Feature[];
		highlighted: Feature | undefined;
	};
	let { fires, highlighted }: Props = $props();

	const animDuration = 0.5;

	let mapElement: HTMLDivElement;
	let map: LMap;
	const featureMarkerMap = new Map<string, Marker>();

	function getPoint(feature: Feature): LatLngTuple {
		return [feature.centroid.y, feature.centroid.x] as LatLngTuple;
	}

	function getGeometry(feature: Feature): LatLngExpression[] {
		const geometry = feature.geometry.rings.flatMap((ring) =>
			ring.map(([x, y]) => [y, x] as LatLngTuple)
		);
		return geometry;
	}

	const highlight = function (feature: Feature) {
		zoomTo(feature);
		const marker = featureMarkerMap.get(feature.attributes.poly_SourceGlobalID);
		marker?.openPopup();
	};

	const zoomTo = function (feature: Feature) {
		map.flyTo(getPoint(feature), 13, {
			duration: animDuration
		});
	};

	const resetZoom = function (animate = true) {
		const point = [42.167, -71.689] as LatLngTuple;
		const zoom = 8;
		if (animate) {
			map.flyTo(point, zoom, {
				duration: animDuration
			});
		} else {
			map.setView(point, zoom);
		}
	};

	$effect(() => {
		highlighted;
		if (map) {
			if (highlighted == undefined) {
				resetZoom();
			} else {
				highlight(highlighted);
			}
		}
	});

	onMount(async () => {
		const { map: createLeafletMap, tileLayer, marker, polygon } = await import('leaflet');
		map = createLeafletMap(mapElement);
		resetZoom(false);
		tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		for (const fire of fires) {
			const mark = marker(getPoint(fire))
				.bindPopup(fire.attributes.attr_IncidentName, {})
				.on('click', () => {
					zoomTo(fire);
				});
			mark.addTo(map);
			featureMarkerMap.set(fire.attributes.poly_SourceGlobalID, mark);
			polygon(getGeometry(fire), { color: 'orange' }).addTo(map);
		}

		map.on('popupclose', () => {
			if (highlighted === undefined) {
				resetZoom();
			}
		});
	});
</script>

<div bind:this={mapElement} id="map"></div>

<style>
	#map {
		width: auto;
		display: block;
		aspect-ratio: 4 / 3;
	}
</style>
